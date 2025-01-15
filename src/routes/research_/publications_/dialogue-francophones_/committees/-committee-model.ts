export interface CommitteeIndex {
  id: number;
  name: string;
  university: string;
  country: string;
  role: string;
  email: string;
  link: string;
  category: 'HONORIFIC' | 'SCIENTIFIC' | 'EDITORIAL';
}
