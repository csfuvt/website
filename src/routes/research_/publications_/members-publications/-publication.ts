export interface MemberPublication {
  id: number;
  title: string;
  author?: string;
  publishingHouse: string;
  publicationYear: string;
  bionota?: string;
  description: string;
  pdf: string;
  images?: MemberPublicationImage[];
}

export interface MemberPublicationImage {
  id: number;
  path: string;
  memberId: number;
}
