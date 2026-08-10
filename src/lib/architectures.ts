"use client";

type Node = { id: string; type: string; position: { x: number; y: number }; data: Record<string, unknown> };
type Edge = { id: string; source: string; target: string; type: string };

export const votingArchitectureNodes: Node[] = [
  {
    id: "users",
    type: "custom",
    position: { x: 0, y: 100 },
    data: { label: "Voters", type: "500+ students", service: "users" },
  },
  {
    id: "cloudfront",
    type: "custom",
    position: { x: 250, y: 40 },
    data: {
      label: "CloudFront",
      type: "CDN + SSL",
      service: "cloudfront",
    },
  },
  {
    id: "apigw",
    type: "custom",
    position: { x: 250, y: 180 },
    data: {
      label: "API Gateway",
      type: "REST API",
      service: "api",
    },
  },
  {
    id: "cognito",
    type: "custom",
    position: { x: 500, y: 20 },
    data: {
      label: "Cognito",
      type: "JWT Auth",
      service: "cognito",
    },
  },
  {
    id: "lambda-vote",
    type: "custom",
    position: { x: 500, y: 120 },
    data: {
      label: "Vote Lambda",
      type: "Submit + Validate",
      service: "lambda",
    },
  },
  {
    id: "lambda-results",
    type: "custom",
    position: { x: 500, y: 240 },
    data: {
      label: "Results Lambda",
      type: "Aggregate + Serve",
      service: "lambda",
    },
  },
  {
    id: "dynamodb",
    type: "custom",
    position: { x: 750, y: 80 },
    data: {
      label: "DynamoDB",
      type: "Votes + Eligibility",
      service: "dynamodb",
    },
  },
  {
    id: "cloudwatch",
    type: "custom",
    position: { x: 750, y: 220 },
    data: {
      label: "CloudWatch",
      type: "Logs + Metrics",
      service: "monitoring",
    },
  },
];

export const votingArchitectureEdges: Edge[] = [
  { id: "e1", source: "users", target: "cloudfront", type: "smoothstep" },
  { id: "e2", source: "users", target: "apigw", type: "smoothstep" },
  { id: "e3", source: "cloudfront", target: "cognito", type: "smoothstep" },
  { id: "e4", source: "apigw", target: "lambda-vote", type: "smoothstep" },
  { id: "e5", source: "apigw", target: "lambda-results", type: "smoothstep" },
  { id: "e6", source: "cognito", target: "lambda-vote", type: "smoothstep" },
  { id: "e7", source: "lambda-vote", target: "dynamodb", type: "smoothstep" },
  { id: "e8", source: "lambda-results", target: "dynamodb", type: "smoothstep" },
  { id: "e9", source: "lambda-vote", target: "cloudwatch", type: "smoothstep" },
  {
    id: "e10",
    source: "lambda-results",
    target: "cloudwatch",
    type: "smoothstep",
  },
];
