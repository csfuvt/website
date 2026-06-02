export interface Volume {
  id: number;
  title: string;
  cover: string;
  pdf: string;
  volumePdf?: string | null;
  rezumatPdf1?: string | null;
  rezumatPdf2?: string | null;
  tematica: string;
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
