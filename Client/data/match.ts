import { Match } from "@/types/match";
import { Position } from "@/types/player";

export const sampleMatch: Match = {
  name: "Sunday League Final",
  code: "SLF2025",
  location: "Cosmmunity Sports Stadium",
  date: new Date(),
  players_count: 22,
  maxPlayers: 22,
  isLive: false,
  formation: "",
  teams: [
    {
      name: "Red Warriors",
      color: "Red",
      players: [
        {
          player: {
            initials: "AA",
            name: "James Ali",
            dateJoined: new Date("2022-03-15"),
            level: 6,
            streak: 4,
            profilePicture: "https://example.com/james.png",
            position: Position.GK,
            badges: [{ label: "Golden Glove", level: 2, icon: "🧤" }],
            skills: { PHY: 88, PAC: 65, PAS: 75, DEF: 90, DRI: 55, SHO: 45 },
            physicalAttributes: { age: 28, height: 188, weight: 82 },
            statistics: { matches_played: 85, matches_won: 48, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.GK
        },
        {
          player: {
            initials: "MJ",
            name: "Marcus Johnson",
            dateJoined: new Date("2021-08-20"),
            level: 5,
            streak: 2,
            profilePicture: "https://example.com/marcus.png",
            position: Position.DEF,
            badges: [{ label: "Iron Wall", level: 2, icon: "🛡️" }],
            skills: { PHY: 85, PAC: 72, PAS: 70, DEF: 88, DRI: 65, SHO: 50 },
            physicalAttributes: { age: 26, height: 185, weight: 78 },
            statistics: { matches_played: 72, matches_won: 42, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.DEF
        },
        {
          player: {
            initials: "RD",
            name: "Ryan Davis",
            dateJoined: new Date("2023-01-10"),
            level: 4,
            streak: 1,
            profilePicture: "https://example.com/ryan.png",
            position: Position.DEF,
            badges: [{ label: "Defender", level: 1, icon: "🔒" }],
            skills: { PHY: 80, PAC: 75, PAS: 68, DEF: 82, DRI: 62, SHO: 45 },
            physicalAttributes: { age: 24, height: 182, weight: 76 },
            statistics: { matches_played: 35, matches_won: 20, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.DEF
        },
        {
          player: {
            initials: "LB",
            name: "Liam Brown",
            dateJoined: new Date("2022-11-05"),
            level: 5,
            streak: 3,
            profilePicture: "https://example.com/liam.png",
            position: Position.DEF,
            badges: [{ label: "Defender", level: 1, icon: "🔒" }],
            skills: { PHY: 82, PAC: 70, PAS: 72, DEF: 85, DRI: 68, SHO: 48 },
            physicalAttributes: { age: 25, height: 183, weight: 77 },
            statistics: { matches_played: 58, matches_won: 33, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.DEF
        },
        {
          player: {
            initials: "AS",
            name: "Alex Smith",
            dateJoined: new Date("2022-08-01"),
            level: 6,
            streak: 5,
            profilePicture: "https://example.com/alex.png",
            position: Position.DEF,
            badges: [{ label: "Playmaker", level: 2, icon: "🎯" }],
            skills: { PHY: 78, PAC: 80, PAS: 90, DEF: 65, DRI: 85, SHO: 75 },
            physicalAttributes: { age: 27, height: 175, weight: 72 },
            statistics: { matches_played: 78, matches_won: 45, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.DEF
        },
        {
          player: {
            initials: "NT",
            name: "Noah Taylor",
            dateJoined: new Date("2023-06-12"),
            level: 4,
            streak: 2,
            profilePicture: "https://example.com/noah.png",
            position: Position.MID,
            badges: [{ label: "Midfielder", level: 1, icon: "⚡" }],
            skills: { PHY: 75, PAC: 78, PAS: 82, DEF: 70, DRI: 80, SHO: 68 },
            physicalAttributes: { age: 23, height: 178, weight: 74 },
            statistics: { matches_played: 28, matches_won: 16, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.MID
        },
        {
          player: {
            initials: "EM",
            name: "Ethan Miller",
            dateJoined: new Date("2021-12-18"),
            level: 5,
            streak: 1,
            profilePicture: "https://example.com/ethan.png",
            position: Position.MID,
            badges: [{ label: "Midfielder", level: 1, icon: "⚡" }],
            skills: { PHY: 80, PAC: 82, PAS: 78, DEF: 68, DRI: 85, SHO: 72 },
            physicalAttributes: { age: 26, height: 180, weight: 75 },
            statistics: { matches_played: 65, matches_won: 38, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.MID
        },
        {
          player: {
            initials: "OW",
            name: "Oliver Wilson",
            dateJoined: new Date("2022-04-22"),
            level: 4,
            streak: 3,
            profilePicture: "https://example.com/oliver.png",
            position: Position.MID,
            badges: [{ label: "Midfielder", level: 1, icon: "⚡" }],
            skills: { PHY: 77, PAC: 85, PAS: 80, DEF: 62, DRI: 88, SHO: 70 },
            physicalAttributes: { age: 24, height: 176, weight: 73 },
            statistics: { matches_played: 42, matches_won: 25, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.MID
        },
        {
          player: {
            initials: "JD",
            name: "John Doe",
            dateJoined: new Date("2023-03-12"),
            level: 6,
            streak: 4,
            profilePicture: "https://example.com/john.png",
            position: Position.MID,
            badges: [
              { label: "Top Scorer", level: 3, icon: "⚽" },
              { label: "MVP", level: 2, icon: "⭐" }
            ],
            skills: { PHY: 85, PAC: 88, PAS: 75, DEF: 45, DRI: 82, SHO: 92 },
            physicalAttributes: { age: 24, height: 180, weight: 75 },
            statistics: { matches_played: 55, matches_won: 35, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.MID
        },
        {
          player: {
            initials: "WG",
            name: "William Garcia",
            dateJoined: new Date("2022-09-08"),
            level: 5,
            streak: 2,
            profilePicture: "https://example.com/william.png",
            position: Position.FWD,
            badges: [{ label: "Striker", level: 2, icon: "🎯" }],
            skills: { PHY: 82, PAC: 85, PAS: 70, DEF: 40, DRI: 80, SHO: 88 },
            physicalAttributes: { age: 25, height: 182, weight: 76 },
            statistics: { matches_played: 48, matches_won: 28, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.FWD
        },
        {
          player: {
            initials: "BP",
            name: "Benjamin Perez",
            dateJoined: new Date("2024-04-02"),
            level: 4,
            streak: 1,
            profilePicture: "https://example.com/benjamin.png",
            position: Position.FWD,
            badges: [{ label: "Poacher", level: 1, icon: "🥅" }],
            skills: { PHY: 78, PAC: 84, PAS: 68, DEF: 38, DRI: 76, SHO: 86 },
            physicalAttributes: { age: 23, height: 179, weight: 73 },
            statistics: { matches_played: 18, matches_won: 10, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.FWD
        },
        {
          player: {
            initials: "AY",
            name: "Ali Younis",
            dateJoined: new Date("2024-04-02"),
            level: 7,
            streak: 2,
            profilePicture: "https://example.com/benjamin.png",
            position: Position.FWD,
            badges: [{ label: "Poacher", level: 1, icon: "🥅" }],
            skills: { PHY: 78, PAC: 84, PAS: 68, DEF: 38, DRI: 76, SHO: 86 },
            physicalAttributes: { age: 23, height: 179, weight: 73 },
            statistics: { matches_played: 18, matches_won: 10, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.FWD
        }
      ]
    },
    {
      name: "Blue Titans",
      color: "Blue",
      players: [
        {
          player: {
            initials: "ML",
            name: "Michael Lee",
            dateJoined: new Date("2021-05-20"),
            level: 7,
            streak: 6,
            profilePicture: "https://example.com/michael.png",
            position: Position.GK,
            badges: [{ label: "Golden Glove", level: 3, icon: "🧤" }],
            skills: { PHY: 90, PAC: 65, PAS: 75, DEF: 92, DRI: 55, SHO: 40 },
            physicalAttributes: { age: 29, height: 190, weight: 85 },
            statistics: { matches_played: 120, matches_won: 68, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.GK
        },
        {
          player: {
            initials: "DK",
            name: "David Kim",
            dateJoined: new Date("2024-01-10"),
            level: 4,
            streak: 2,
            profilePicture: "https://example.com/david.png",
            position: Position.DEF,
            badges: [{ label: "Iron Wall", level: 1, icon: "🛡️" }],
            skills: { PHY: 82, PAC: 70, PAS: 65, DEF: 84, DRI: 60, SHO: 55 },
            physicalAttributes: { age: 22, height: 185, weight: 80 },
            statistics: { matches_played: 25, matches_won: 15, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.DEF
        },
        {
          player: {
            initials: "DR",
            name: "Daniel Rodriguez",
            dateJoined: new Date("2022-07-14"),
            level: 5,
            streak: 3,
            profilePicture: "https://example.com/daniel.png",
            position: Position.DEF,
            badges: [{ label: "Defender", level: 1, icon: "🔒" }],
            skills: { PHY: 83, PAC: 72, PAS: 70, DEF: 86, DRI: 65, SHO: 50 },
            physicalAttributes: { age: 26, height: 184, weight: 79 },
            statistics: { matches_played: 52, matches_won: 30, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.DEF
        },
        {
          player: {
            initials: "CM",
            name: "Christopher Martinez",
            dateJoined: new Date("2023-02-28"),
            level: 4,
            streak: 1,
            profilePicture: "https://example.com/christopher.png",
            position: Position.DEF,
            badges: [{ label: "Defender", level: 1, icon: "🔒" }],
            skills: { PHY: 80, PAC: 75, PAS: 68, DEF: 82, DRI: 62, SHO: 45 },
            physicalAttributes: { age: 23, height: 181, weight: 77 },
            statistics: { matches_played: 32, matches_won: 18, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.DEF
        },
        {
          player: {
            initials: "MA",
            name: "Matthew Anderson",
            dateJoined: new Date("2021-11-03"),
            level: 6,
            streak: 4,
            profilePicture: "https://example.com/matthew.png",
            position: Position.MID,
            badges: [{ label: "Playmaker", level: 2, icon: "🎯" }],
            skills: { PHY: 78, PAC: 82, PAS: 88, DEF: 70, DRI: 85, SHO: 72 },
            physicalAttributes: { age: 27, height: 177, weight: 74 },
            statistics: { matches_played: 68, matches_won: 40, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.DEF
        },
        {
          player: {
            initials: "AT",
            name: "Anthony Thompson",
            dateJoined: new Date("2022-05-16"),
            level: 5,
            streak: 2,
            profilePicture: "https://example.com/anthony.png",
            position: Position.MID,
            badges: [{ label: "Midfielder", level: 1, icon: "⚡" }],
            skills: { PHY: 76, PAC: 80, PAS: 82, DEF: 68, DRI: 78, SHO: 70 },
            physicalAttributes: { age: 25, height: 179, weight: 75 },
            statistics: { matches_played: 45, matches_won: 26, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.MID
        },
        {
          player: {
            initials: "JW",
            name: "Joshua White",
            dateJoined: new Date("2023-08-09"),
            level: 4,
            streak: 1,
            profilePicture: "https://example.com/joshua.png",
            position: Position.MID,
            badges: [{ label: "Midfielder", level: 1, icon: "⚡" }],
            skills: { PHY: 74, PAC: 85, PAS: 80, DEF: 65, DRI: 82, SHO: 68 },
            physicalAttributes: { age: 24, height: 175, weight: 72 },
            statistics: { matches_played: 22, matches_won: 12, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.MID
        },
        {
          player: {
            initials: "AH",
            name: "Andrew Harris",
            dateJoined: new Date("2022-12-11"),
            level: 5,
            streak: 3,
            profilePicture: "https://example.com/andrew.png",
            position: Position.MID,
            badges: [{ label: "Midfielder", level: 1, icon: "⚡" }],
            skills: { PHY: 79, PAC: 78, PAS: 85, DEF: 72, DRI: 80, SHO: 75 },
            physicalAttributes: { age: 26, height: 178, weight: 76 },
            statistics: { matches_played: 38, matches_won: 22, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.MID
        },
        {
          player: {
            initials: "JC",
            name: "James Clark",
            dateJoined: new Date("2021-09-25"),
            level: 6,
            streak: 5,
            profilePicture: "https://example.com/jamesc.png",
            position: Position.FWD,
            badges: [{ label: "Top Scorer", level: 2, icon: "⚽" }],
            skills: { PHY: 84, PAC: 87, PAS: 72, DEF: 42, DRI: 83, SHO: 90 },
            physicalAttributes: { age: 28, height: 183, weight: 78 },
            statistics: { matches_played: 72, matches_won: 44, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.FWD
        },
        {
          player: {
            initials: "RL",
            name: "Robert Lewis",
            dateJoined: new Date("2023-04-17"),
            level: 5,
            streak: 2,
            profilePicture: "https://example.com/robert.png",
            position: Position.FWD,
            badges: [{ label: "Striker", level: 1, icon: "🎯" }],
            skills: { PHY: 81, PAC: 86, PAS: 68, DEF: 38, DRI: 79, SHO: 85 },
            physicalAttributes: { age: 25, height: 180, weight: 74 },
            statistics: { matches_played: 35, matches_won: 20, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.FWD
        },
        {
          player: {
            initials: "LW",
            name: "Logan Walker",
            dateJoined: new Date("2024-07-21"),
            level: 4,
            streak: 1,
            profilePicture: "https://example.com/logan.png",
            position: Position.FWD,
            badges: [{ label: "Finisher", level: 1, icon: "🎯" }],
            skills: { PHY: 79, PAC: 83, PAS: 67, DEF: 36, DRI: 77, SHO: 84 },
            physicalAttributes: { age: 24, height: 181, weight: 75 },
            statistics: { matches_played: 20, matches_won: 12, overall: 70 },
            username: "",
            friends: [],
            trend: "up"
          },
          position: Position.FWD
        }
      ]
    }
  ],
};

// Helpers to build formation-specific sample matches with BRAND-NEW players
type Counts = { GK: number; DEF: number; MID: number; FWD: number };

function createPlayer(fullName: string, pos: Position, idx: number) {
  const level = 3 + (idx % 5);
  return {
    player: {
      name: fullName,
      dateJoined: new Date('2024-01-01'),
      level,
      streak: idx % 4,
      profilePicture: `https://example.com/player_${fullName.replace(/\s+/g, '_').toLowerCase()}.png`,
      position: pos,
      badges: [{ label: 'Sample', level: 1, icon: '⭐' }],
      skills: { PHY: 70 + (idx % 20), PAC: 70, PAS: 70, DEF: 70, DRI: 70, SHO: 70 },
      physicalAttributes: { age: 20 + (idx % 12), height: 175 + (idx % 10), weight: 70 + (idx % 10) },
      statistics: { matches_played: 10 * idx, matches_won: 5 * idx }
    },
    position: pos,
  };
}

function generateTeam(teamName: string, color: string, counts: Counts, seed: string) {
  const players: any[] = [];
  let serial = 1;
  const addMany = (n: number, pos: Position, role: string) => {
    for (let i = 0; i < n; i += 1) {
      players.push(createPlayer(`${seed} ${role} ${serial++}`, pos, serial));
    }
  };
  addMany(counts.GK, Position.GK, 'GK');
  addMany(counts.DEF, Position.DEF, 'DEF');
  addMany(counts.MID, Position.MID, 'MID');
  addMany(counts.FWD, Position.FWD, 'FWD');
  return { name: teamName, color, players };
}

function buildSampleMatchForFormation(label: string, counts: Counts): Match {
  const perTeam = counts.GK + counts.DEF + counts.MID + counts.FWD;
  const team1 = generateTeam('Team Alpha', 'Red', counts, `${label} A`);
  const team2 = generateTeam('Team Beta', 'Blue', counts, `${label} B`);
  return {
    name: `Sample ${label}`,
    code: `${label.replace(/\s+/g, '').toUpperCase()}-${Date.now().toString().slice(-4)}`,
    location: 'Sample Arena',
    date: new Date(),
    players_count: perTeam * 2,
    teams: [team1, team2],
  } as Match;
}

// Formation distributions per our field layouts
// 5v5: 1-2-2
export const sampleMatch5v5: Match = buildSampleMatchForFormation('5v5', {
  GK: 1, DEF: 2, MID: 0, FWD: 2,
});

// 6v6: 1-2-1-2
export const sampleMatch6v6: Match = buildSampleMatchForFormation('6v6', {
  GK: 1, DEF: 2, MID: 1, FWD: 2,
});

// 7v7: 1-2-2-2
export const sampleMatch7v7: Match = buildSampleMatchForFormation('7v7', {
  GK: 1, DEF: 2, MID: 2, FWD: 2,
});

// 8v8: 1-3-2-2
export const sampleMatch8v8: Match = buildSampleMatchForFormation('8v8', {
  GK: 1, DEF: 3, MID: 2, FWD: 2,
});

// 9v9: 1-3-2-3
export const sampleMatch9v9: Match = buildSampleMatchForFormation('9v9', {
  GK: 1, DEF: 3, MID: 2, FWD: 3,
});

// 10v10: 1-3-3-3
export const sampleMatch10v10: Match = buildSampleMatchForFormation('10v10', {
  GK: 1, DEF: 3, MID: 3, FWD: 3,
});
