# Deploy Portfolio to AWS (Serverless)

Static Next.js site → S3 + CloudFront + GitHub Actions CI/CD.

## Architecture

```
GitHub push → GitHub Actions → next build → next export → S3 sync → CloudFront invalidation
```

```
User → Route 53 (optional) → CloudFront (CDN + HTTPS) → S3 (static files)
```

**Cost:** ~$0-1/month (S3 + CloudFront free tier covers most portfolio traffic).

---

## Prerequisites

- AWS account (free tier is fine)
- GitHub repository with your portfolio code
- AWS CLI installed locally (for initial setup only)

---

## Step 1: Enable Static Export

### 1a. Update `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**Why `images.unoptimized`?** Static export can't use Next.js image optimization server. All images get served as-is.

### 1b. Test locally

```bash
npm run build
```

This creates an `out/` folder with pure HTML/CSS/JS. No server needed.

Verify it works:

```bash
npx serve out
```

Open `http://localhost:3000` — should look identical to `npm run dev`.

---

## Step 2: Create S3 Bucket

### Via AWS Console

1. Go to **S3** → **Create bucket**
2. Bucket name: `prathamesh-portfolio` (must be globally unique)
3. Region: `ap-south-1` (Mumbai — closest to India)
4. **Block all public access**: UNCHECK this (we need public access for a website)
5. Acknowledge the warning
6. Click **Create bucket**

### Enable static website hosting

1. Click your bucket → **Properties** tab
2. Scroll to **Static website hosting** → **Edit**
3. Enable it
4. Index document: `index.html`
5. Error document: `index.html` (SPA fallback)
6. Save

### Set bucket policy

1. Click your bucket → **Permissions** tab
2. Scroll to **Bucket policy** → **Edit**
3. Paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::prathamesh-portfolio/*"
    }
  ]
}
```

4. Replace `prathamesh-portfolio` with your actual bucket name
5. Save

---

## Step 3: Create CloudFront Distribution

### Via AWS Console

1. Go to **CloudFront** → **Create distribution**
2. **Origin domain**: Select your S3 bucket (the one with static website hosting enabled — pick the one ending in `.s3-website-<region>.amazonaws.com`, NOT the regional one)
3. **Viewer protocol policy**: Redirect HTTP to HTTPS
4. **Default root object**: `index.html`
5. **Cache policy**: Use `CachingOptimized` (managed policy)
6. Click **Create distribution**

### Get the distribution URL

After creation, CloudFront gives you a URL like:
```
d1234abcd.cloudfront.net
```

Visit it — your portfolio should be live. It may take 2-5 minutes to deploy.

---

## Step 4: Create IAM User for GitHub Actions

### 4a. Create IAM policy

1. Go to **IAM** → **Policies** → **Create policy**
2. Switch to **JSON** tab
3. Paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Sync",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::prathamesh-portfolio",
        "arn:aws:s3:::prathamesh-portfolio/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

4. Replace `prathamesh-portfolio` with your bucket name
5. Name: `portfolio-deploy-policy`
6. Create policy

### 4b. Create IAM user

1. Go to **IAM** → **Users** → **Create user**
2. Username: `portfolio-deployer`
3. Click **Next**
4. Attach the `portfolio-deploy-policy` you just created
5. Click **Next** → **Create user**

### 4c. Create access keys

1. Click `portfolio-deployer` user → **Security credentials** tab
2. Under **Access keys** → **Create access key**
3. Use case: **Other**
4. Check the warning checkbox
5. Click **Create access key**
6. **COPY the Access Key ID and Secret Access Key immediately** — you can't see them again

---

## Step 5: Add Secrets to GitHub

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these two:

| Name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | The Access Key ID from Step 4c |
| `AWS_SECRET_ACCESS_KEY` | The Secret Access Key from Step 4c |

---

## Step 6: Create GitHub Actions Workflow

### 6a. Create the workflow file

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

  # Allow manual trigger
  workflow_dispatch:

# Cancel in-progress runs for the same branch
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build and export
        run: npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-south-1

      - name: Sync to S3
        run: |
          aws s3 sync out/ s3://prathamesh-portfolio \
            --delete \
            --cache-control "public, max-age=31536000, immutable"

      - name: Invalidate CloudFront
        run: |
          # Find the distribution ID
          DIST_ID=$(aws cloudfront list-distributions \
            --query "DistributionList.Items[?Origins.Items[0].DomainName=='prathamesh-portfolio.s3-website-ap-south-1.amazonaws.com'].Id" \
            --output text)

          aws cloudfront create-invalidation \
            --distribution-id $DIST_ID \
            --paths "/*"
```

### 6b. Update the bucket name and region

Replace in the workflow:
- `prathamesh-portfolio` → your actual bucket name
- `ap-south-1` → your actual region
- `prathamesh-portfolio.s3-website-ap-south-1.amazonaws.com` → your S3 website endpoint

### 6c. Push to deploy

```bash
git add .
git commit -m "ci: add deployment workflow"
git push origin main
```

Go to **Actions** tab in GitHub — the workflow runs automatically.

---

## Step 7: Custom Domain (Optional)

### 7a. Buy a domain

- Route 53 (AWS) — ~$12/year for `.com`
- Namecheap, Cloudflare Registrar — often cheaper

### 7b. Request ACM certificate

1. Go to **Certificate Manager** → **Request certificate**
2. Enter your domain: `prathamesh.dev` (or whatever)
3. Choose **Email validation** (or DNS if you use Route 53)
4. Approve the validation email
5. Copy the certificate ARN

### 7c. Add domain to CloudFront

1. Go to your CloudFront distribution → **Settings**
2. **Alternate domain name (CNAME)**: Add your domain
3. **Custom SSL certificate**: Select the ACM certificate
4. Save

### 7d. Point DNS to CloudFront

If using Route 53:
1. Create an **A** record (Alias)
2. Route to CloudFront distribution

If using another registrar:
1. Create a **CNAME** record pointing to `d1234abcd.cloudfront.net`

---

## Verification Checklist

After deployment, verify:

- [ ] Site loads at CloudFront URL over HTTPS
- [ ] All sections render (hero, projects, skills, etc.)
- [ ] Dark/light theme toggle works
- [ ] Animations work (scroll down to trigger)
- [ ] Custom cursor works on desktop
- [ ] Email copy toast works
- [ ] Project accordions expand/collapse
- [ ] Mobile responsive (test at 375px width)
- [ ] Resume PDF downloads
- [ ] All external links open in new tabs

---

## Updating the Site

After initial setup, every push to `main` auto-deploys:

```bash
# Make changes
git add .
git commit -m "feat: add new project"
git push origin main
```

GitHub Actions handles: build → export → S3 sync → CloudFront invalidation.

Manual deploy (if needed):
```bash
npm run build
aws s3 sync out/ s3://prathamesh-portfolio --delete
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| 403 on CloudFront URL | S3 bucket policy missing or wrong. Check the `Resource` ARN matches your bucket name |
| Site loads but no CSS/JS | CloudFront origin is pointing to S3 regional endpoint, not the website endpoint. Fix: origin should end in `.s3-website-<region>.amazonaws.com` |
| Images not loading | Check `next.config.ts` has `images: { unoptimized: true }` |
| GitHub Actions fails | Check AWS secrets are set correctly. Check the workflow has the right bucket name and region |
| CloudFront shows old version | Invalidation takes 1-2 minutes. Check the invalidation status in CloudFront console |
| `npm run build` fails on GitHub | Check `package-lock.json` is committed. The workflow uses `npm ci` which requires it |

---

## Cost Estimate

| Service | Free Tier | After Free Tier |
|---|---|---|
| S3 | 5 GB storage, 20K GET requests/month | $0.023/GB stored, $0.0004/1K requests |
| CloudFront | 1 TB transfer, 10M requests/month | $0.085/GB transfer |
| Route 53 | N/A | $0.50/month per hosted zone + $0.40/M queries |
| GitHub Actions | 2,000 min/month (free repos) | N/A for public repos |

**For a portfolio:** Free tier covers everything. You'll likely pay $0.
