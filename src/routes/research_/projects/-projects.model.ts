export interface Project {
  id: number;
  title: string;
  responsible: string;
  members: string;
  funding: string;
  budget: string;
  hostingUni: string;
  partners: string;
  implementationPeriod: string;
  description: string;
  link: string;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  path: string;
  projectId: number;
}
