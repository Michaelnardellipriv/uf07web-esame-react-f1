
/**
 * Type definition per Team F1
 */
export interface Team {
  teamId: string;
  teamName: string;
  teamNationality?: string;
  country?: string;
  firstAppeareance?: number;
  firstAppearance?: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url?: string;
}
