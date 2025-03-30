export interface Translation {
  id: number;
  description: string;
  links: {
    label: string;
    url: string;
    author: string;
    bionote: string;
    editura: string;
    year: string;
  }[];
  coverExtension: string;
}
