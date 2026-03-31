export type ProjectCategory = "API Security" | "Session Security" | "GraphQL" | "Web Server Security";

export interface ProjectItem {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  impact: string;
  techniques: string[];
  href?: string;
  color: string;
}
