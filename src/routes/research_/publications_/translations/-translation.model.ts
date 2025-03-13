export interface Translation {
  id: number;
  description: string;
  links: {
    url: string;
    author: string;
    bionote: string;
    editura: string;
    year: string;
  }[];
  coverExtension: string;
}
