export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  description: string;
  longDescription: string;
  image: string;
  videoSrc?: string;
  status?: string;
  tools: string[];
  aspectSpan: string; // for bento layout: e.g. "col-span-12 lg:col-span-8" vs "col-span-12 lg:col-span-4"
  metrics?: string;
  directorNote: string;
  promptExcerpt: string;
}

export type VisualCategory =
  | 'All'
  | 'Fashion'
  | 'Beauty'
  | 'Product'
  | 'Lifestyle'
  | 'Architecture'
  | 'Character'
  | 'Experimental';

export interface AIVisual {
  id: string;
  title: string;
  category: Exclude<VisualCategory, 'All'>;
  image: string;
  aspectClass: string;
  dimensions: string;
  tools: string;
  prompt: string;
  lightingSetup: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  typicalTimeline: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
  activities: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  verifiedMetric: string;
}
