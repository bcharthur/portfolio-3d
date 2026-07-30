export type TimelineType = "education" | "experience";

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  org: string;
  location?: string;
  description: string;
  type: TimelineType;
  href?: string;
}
