export interface MemberIndex {
  id: number;
  name: string;
  description: string;
  role: string;
  pictureUrl: string;
  documentUrl: string;
  memberCategory:
    | 'FOUNDER'
    | 'BASE_TEAM'
    | 'COLLABORATOR'
    | 'STUDENTS'
    | 'ASSOCIATE_MEMBER';
}
