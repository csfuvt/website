export interface Volume {
  id: number;
  title: string;
  cover: string;
  pdf: string;
  articles: Article[];
}

export interface Article {
  title: string;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  description: string;
  pageStart: number;
  pageEnd: number;
  pdf: string;
}
