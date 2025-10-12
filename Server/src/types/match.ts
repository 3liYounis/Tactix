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

export interface Match {
  name: string;
  code: string;
  location: string;
  date: Date | string;
  time?: string;
  players_count: number;
  maxPlayers: number;
  isLive: boolean;
  formation: string;
  teams: Team[];
}
