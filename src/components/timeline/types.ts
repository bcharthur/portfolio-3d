export interface TimelineFormation {
  title: string;
  org: string;
  location?: string;
  period: string;
  description: string;
}

export interface TimelineExperience {
  id: string;
  title: string;
  org: string;
  location?: string;
  period: string;
  description: string;
  logo?: string;
  logoInitial?: string;
  href?: string;
}

export interface TimelineGroup {
  id: string;
  period: string;
  formation?: TimelineFormation;
  experiences: TimelineExperience[];
}
