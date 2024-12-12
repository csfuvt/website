export interface PartnerIndex {
  id: number;
  name: string;
  pictureUrl: string;
  address: string;
  link: { url: string }[];
  partnerLocation:
    | 'CENTRAL_EASTERN_EUROPE'
    | 'WESTERN_EUROPE'
    | 'NORTH_AMERICA'
    | 'CENTRAL_SOUTH_AMERICA'
    | 'AFRICA'
    | 'ASIA'
    | 'CIEFT_PAGE'
    | 'COLOCVIU_PAGE';
}
