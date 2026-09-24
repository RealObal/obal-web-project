export interface WorkItem {
  id: string;
  type: string;
  title: string;
  fullTitle: string;
  summary: string;
  year: string;
  status: string;
  theme: string;
  source?: string;
  sourceLabel?: string;
  role: string;
  context: string;
  detail: string;
  takeaways: string[];
  evidence: string;
  citation?: string;
}

export const work: WorkItem[];
