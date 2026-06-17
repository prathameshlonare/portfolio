# Adding Projects to Portfolio

## File to edit

`src/app/page.tsx` — everything lives in one file.

## Project structure

Each project has two parts: a `ProjectCard` and an optional `ArchDiagram`.

```tsx
<ProjectCard
  name="project-name"           // Display name (also used for scramble hover)
  role="Your Role"              // e.g. "Backend Engineer", "Cloud Engineer"
  year="2026"                   // Year you worked on it
  githubUrl="https://..."       // Optional — link to repo
  demoUrl="https://..."         // Optional — link to live demo
  tech="Service1 · Service2"    // Stack — separated by · (middle dot)
  bullets={[                    // 2-4 bullet points describing what you did
    "What you built or achieved.",
    "Quantify when possible (cost reduction, latency, scale).",
  ]}
  isLast={false}                // true ONLY on the last project in the list
/>
```

## Step-by-step

### 1. Find the projects section

Search for `{/* Projects */}` in `page.tsx`. The projects live inside:

```tsx
<TerminalSection command="ls projects">
  <div className="space-y-6">
    {/* your projects here */}
  </div>
</TerminalSection>
```

### 2. Add your ProjectCard

Insert before the last project's closing `</div>` (or after it if you're adding at the end).

Example — adding a new project called "infra-pipeline":

```tsx
<ProjectCard
  name="infra-pipeline"
  role="DevOps Engineer"
  year="2026"
  githubUrl="https://github.com/prathameshlonare/infra-pipeline"
  tech="GitHub Actions · Terraform · Lambda · CloudFormation · S3"
  bullets={[
    "Built a CI/CD pipeline that deploys serverless infrastructure across 3 AWS accounts.",
    "Reduced deployment time from 45 minutes to 3 minutes using parallel CloudFormation stack execution.",
    "Implemented automated rollback on CloudWatch alarm triggers.",
  ]}
/>
```

### 3. Update `isLast`

If your new project is the last one in the list, set `isLast={true}` on it and remove `isLast` from the previous last project.

```tsx
{/* Before: old-voting-system had isLast */}
<ProjectCard name="old-voting-system" ... isLast />

{/* After: add new project, move isLast */}
<ProjectCard name="old-voting-system" ... />          {/* removed isLast */}
<ProjectCard name="infra-pipeline" ... isLast />      {/* new last project */}
```

### 4. (Optional) Add an ArchDiagram

If the project has AWS architecture worth showing, add an `ArchDiagram` right after the `ProjectCard`:

```tsx
<ArchDiagram
  nodes={[
    { label: "GitHub Actions" },
    { label: "Terraform" },
    { label: "Lambda" },
    { label: "CloudFormation" },
    { label: "S3" },
  ]}
  title="infra-pipeline"
/>
```

**Node labels must match AWS service names** for the color coding to work. Supported services:

| Service | Color |
|---|---|
| Lambda, API Gateway, DynamoDB, S3, CloudFront, CloudFormation, CloudWatch, IAM, Cognito, VPC, Step Functions, SQS, SNS, EventBridge, Kinesis, Athena, Glue, Redshift, ECS, EKS, Fargate, EC2 | Auto-colored by the component |

If your service isn't in the color map, it gets a default gray. You can add custom colors in `src/components/ArchDiagram.tsx` — search for `awsColors`.

### 5. Bullet point tips

- Start with a verb: Built, Deployed, Reduced, Implemented, Configured
- Quantify: "reduced cost by 80%", "handles 10K requests/sec", "3 CloudFormation stacks"
- Keep to 2-4 bullets per project
- Focus on what YOU did, not what the services do

## Full example with 3 projects

```tsx
<div className="space-y-6">
  <ProjectCard
    name="Dorm-Dish"
    role="Backend Engineer"
    year="2026"
    githubUrl="https://github.com/prathameshlonare/Dorm-and-Dish"
    tech="Lambda · API Gateway · DynamoDB · S3 · CloudFront · CloudFormation"
    bullets={[
      "Designed a serverless platform on AWS, reducing hosting costs by 80%.",
      "Developed 6 RESTful API endpoints using API Gateway and Python Lambda.",
    ]}
  />
  <ArchDiagram
    nodes={[
      { label: "CloudFront" },
      { label: "S3" },
      { label: "API Gateway" },
      { label: "Lambda" },
      { label: "DynamoDB" },
    ]}
    title="Dorm-Dish"
  />
  <ProjectCard
    name="infra-pipeline"
    role="DevOps Engineer"
    year="2026"
    githubUrl="https://github.com/prathameshlonare/infra-pipeline"
    tech="GitHub Actions · Terraform · Lambda · S3"
    bullets={[
      "Built CI/CD pipeline deploying across 3 AWS accounts.",
      "Reduced deployment time from 45 min to 3 min.",
    ]}
  />
  <ProjectCard
    name="online-voting-system"
    role="Cloud Engineer"
    year="2025"
    githubUrl="https://github.com/prathameshlonare/Online-voting-system"
    tech="Lambda · DynamoDB · Cognito · GitHub Actions"
    bullets={[
      "Engineered CI/CD pipeline, reducing manual steps from 8 to zero.",
      "Secured access via Cognito with least-privilege IAM policies.",
    ]}
    isLast
  />
  <ArchDiagram
    nodes={[
      { label: "S3" },
      { label: "Cognito" },
      { label: "Lambda" },
      { label: "DynamoDB" },
      { label: "IAM" },
    ]}
    title="online-voting-system"
  />
</div>
```

## Gotchas

- **Middle dot separator**: Use `·` (not `•` or `-`) between tech stack items
- **No trailing comma** after the last bullet in the array
- **`isLast` only on the very last project** — controls the tree character (`├──` vs `└──`)
- **ArchDiagram is optional** — skip it if the project is simple or non-AWS
- **Order matters** — projects render top to bottom, put your best/most recent first
