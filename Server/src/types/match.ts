export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;
  avatar?: string;
}

export interface TeamPlayer {
  player: Player;
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
  date: Date | string;
  time: string;
  maxPlayers: number;
}
export interface Match {
  name: string;
  location: string;
  date: Date | string;
  time: string;
  code: number;
  capacity: number;
  count: number;
  started: boolean;
  teams: Team[];
}
