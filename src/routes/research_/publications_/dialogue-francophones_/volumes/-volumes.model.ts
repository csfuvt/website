export interface Volume {
  id: number;
  title: string;
  cover: string;
  pdf: string;
  articles: Article[];
}

export interface Article {
  id: number;
  title: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: number;
  title: string;
  authors: string;
  pageStart: number;
  pageEnd: number;
  pdf: string;
}
