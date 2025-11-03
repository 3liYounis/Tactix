export enum Position {
  GK = 'GK',
  DEF = 'DEF',
  MID = 'MID',
  FWD = 'FWD'
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
export type PositionsMap = Record<Position, number>;
export interface Player {
  id: string;
  name: string;
  username: string;
  dateJoined: Date | { seconds: number; nanoseconds: number };
  level: number;
  streak: number;
  profilePicture: string;
  favourite_position: Position;
  skills: Skills;
  physicalAttributes: PhysicalAttributes;
  statistics: Statistics;
  initials: string;
  friends: string[];
  trend: 'up' | 'down' | 'stable';
  positions: PositionsMap;
  matchCode: string;
}
export interface TeamPlayer {
  id: string;
  name: string;
  profilePicture: string;
  initials: string;
  overall: number;
  positions: PositionsMap;
  position: Position;
}

export interface Team {
  name: string;
  color: string;
  players: TeamPlayer[];
}
export interface MatchInfo {
  name: string;
  location: string;
  date: Date;
  time: string;
  capacity: number;
  formation: string;
}
export interface Match {
  name: string;
  location: string;
  date: Date;
  time: string;
  capacity: number;
  formation: string;

  code: number;
  count: number;
  started: boolean;
  teams: Team[];
}
export type PositionsCapacities = { [key in Position]: number };
export interface Badge {
  label: string;
  level: number;
  icon: string;
}
