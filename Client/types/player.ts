export enum Position {
  GK = 'GK',
  DEF = 'DEF',
  MID = 'MID',
  FWD = 'FWD'
}

export interface Badge {
  label: string;
  level: number;
  icon: string;
}

export interface Skills {
  PHY: number;
  PAC: number;
  PAS: number;
  DEF: number;
  DRI: number;
  SHO: number;
}

export interface PhysicalAttributes {
  age: number;
  height: number;
  weight: number;
}

export interface Statistics {
  matches_played: number;
  matches_won: number;
  matches_lost?: number;
  overall: number;
}

export interface Player {
  name: string;
  username: string;
  dateJoined: Date | { seconds: number; nanoseconds: number };
  level: number;
  streak: number;
  profilePicture: string;
  position: Position;
  badges: Badge[];
  skills: Skills;
  physicalAttributes: PhysicalAttributes;
  statistics: Statistics;
  initials: string;
  friends: string[]; // Array of UIDs of other players
  trend: 'up' | 'down' | 'stable'; // Player performance trend
}
