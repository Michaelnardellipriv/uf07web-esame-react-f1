/**
 * Type definition per Driver F1
 */
export interface Driver {
  driverId: string;
  name: string;
  surname: string;
  number: number;
  nationality?: string;
  country?: string;
  birthday: string;
  shortName: string;
  url?: string;
}
