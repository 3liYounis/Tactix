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
  formation: string;
}
export interface Match {
  match_information: MatchInfo
  code: string;
  players_count: number;
  maxPlayers: number;
  isLive: boolean;
  teams: Team[];
}
