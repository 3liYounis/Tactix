import { Player, Position } from "@shared/types";

export const player: Player = {
    name: "Lionel Messi",
    username: "messi10",
    initials: "LM",
    dateJoined: new Date("2021-08-10"),
    level: 99,
    streak: 15,
    profilePicture: "https://img.a.transfermarkt.technology/portrait/big/28003-1740766555.jpg?lm=1",
    position: Position.FWD,
    badges: [
      { label: "Top Scorer", level: 5, icon: "trophy.png" },
      { label: "Playmaker", level: 4, icon: "assist.png" },
    ],
    skills: {
      PHY: 75,
      PAC: 85,
      PAS: 92,
      DEF: 40,
      DRI: 96,
      SHO: 95,
    },
    physicalAttributes: {
      age: 37,
      height: 170,
      weight: 72,
    },
    statistics: {
      matches_played: 1000,
      matches_won: 750,
      matches_lost: 250,
      overall: 85,
    },
  }
