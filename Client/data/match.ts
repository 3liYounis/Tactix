import { Match, TeamPlayer, Team, Position, PositionsMap } from "@shared/types";

function pmap(gk: number, def: number, mid: number, fwd: number): PositionsMap {
  return {
    [Position.GK]: gk,
    [Position.DEF]: def,
    [Position.MID]: mid,
    [Position.FWD]: fwd,
  };
}

function player(
  id: string,
  name: string,
  initials: string,
  position: Position,
  overall: number,
  picture: string,
  positions: PositionsMap
): TeamPlayer {
  return {
    id,
    name,
    initials,
    profilePicture: picture,
    overall,
    positions,
    position,
  };
}

export const sampleMatch14: Match = {
  name: "Friendly 7v7",
  location: "Community Arena",
  date: new Date(),
  time: "18:00",
  capacity: 14,
  formation: "7v7",
  code: 777014,
  count: 14,
  started: false,

  teams: [
    // ------------------
    // ✅ TEAM 1 — RED
    // ------------------
    {
      name: "Red Warriors",
      color: "Red",
      players: [
        player("r1", "Raed Masoud 1", "RM", Position.GK, 78, "https://picsum.photos/200?1", pmap(90, 40, 20, 10)),
        player("r2", "Samer Abo 2", "AS", Position.DEF, 74, "https://picsum.photos/200?2", pmap(5, 88, 30, 12)),
        player("r3", "Yazan Mokh 3", "YM", Position.DEF, 72, "https://picsum.photos/200?3", pmap(5, 85, 32, 18)),
        player("r4", "Abed Kablawi 4", "AK", Position.DEF, 76, "https://picsum.photos/200?4", pmap(5, 50, 90, 44)),
        player("r5", "Ali Younis 5", "AY", Position.MID, 75, "https://picsum.photos/200?5", pmap(5, 45, 88, 40)),
        player("r6", "Basel Masarwa 6", "BM", Position.FWD, 80, "https://picsum.photos/200?6", pmap(5, 20, 35, 92)),
        player("r7", "Amro Yahia 7", "AY", Position.FWD, 83, "https://picsum.photos/200?7", pmap(5, 15, 30, 95)),
      ],
    },

    // ------------------
    // ✅ TEAM 2 — BLUE
    // ------------------
    {
      name: "Blue Titans",
      color: "Blue",
      players: [
        player("b1", "Ahmad Asali 1", "AA", Position.GK, 79, "https://picsum.photos/200?8", pmap(92, 45, 25, 12)),
        player("b2", "Haitham Masarwa 2", "HM", Position.DEF, 73, "https://picsum.photos/200?9", pmap(5, 86, 30, 18)),
        player("b3", "Majd Masalha 3", "MM", Position.DEF, 74, "https://picsum.photos/200?10", pmap(5, 89, 28, 15)),
        player("b4", "Faisal Younis 4", "FY", Position.DEF, 77, "https://picsum.photos/200?11", pmap(5, 35, 92, 40)),
        player("b5", "Aboud Midlej 5", "AM", Position.MID, 74, "https://picsum.photos/200?12", pmap(5, 40, 88, 36)),
        player("b6", "Awad Zarka 6", "AZ", Position.FWD, 82, "https://picsum.photos/200?13", pmap(5, 15, 30, 96)),
        player("b7", "Adel Saabni 7", "AS", Position.FWD, 79, "https://picsum.photos/200?14", pmap(5, 18, 28, 93)),
      ],
    },
  ],
};
``
