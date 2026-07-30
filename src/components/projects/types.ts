export type ProjectCategory = "API Security" | "Session Security" | "GraphQL" | "Web Server Security";

export interface ProjectSnippet {
  label: string;
  code: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  category: ProjectCategory;
  source: string;
  summary: string;
  impact: string;
  techniques: string[];
  color: string;
  context: string;
  approach: string;
  automation: string;
  remediation: string;
  snippet?: ProjectSnippet;
}
