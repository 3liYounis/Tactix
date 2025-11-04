import { Match, MatchInfo, Player, Position, PositionsCapacities, Team, TeamPlayer } from "../../../Shared/types"
import {firestoreDB, getRealtimeRef} from "../config/firebase"
import { set, remove, update, get } from "firebase/database";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const generatedCodes = new Set<number>();

export const createMatch = async (match_information: MatchInfo) => {
    const team1: Team = {name: "First", color: "BLUE", players: new Array(match_information.capacity/2).fill({"id": "EMPTY"})}
    const team2: Team = {name: "Second", color: "RED", players: new Array(match_information.capacity/2).fill({"id": "EMPTY"})}
    const code = generateMatchCode()
    const match: Match = {
        name: match_information.name,
        location: match_information.location,
        date: match_information.date,
        capacity: match_information.capacity,
        formation: formationPositionsMap[match_information.capacity],
        code: code.toString(),
        count: 0,
        started: false,
        teams: [team1, team2]
    }
    const matchRef = getRealtimeRef(`MATCH/${code}`)
    await set(matchRef, match)
    return { match_information, status: "created" };
};

export const cancelMatch = async (gameCode: string) => {
    const matchRef = getRealtimeRef(`MATCH/${gameCode}`)
    await remove(matchRef)
    return { gameCode, status: "canceled" };
};

export const startMatch = async (gameCode: string) => {
    const matchRef = getRealtimeRef(`MATCH/${gameCode}`)
    await update(matchRef, {started: true})
    return { gameCode, status: "started" };
};

export const endMatch = (gameCode: string) => {
    // TODO Generate & Send Surveys
    return { gameCode, status: "ended" };
};

export const swap = async (playerId1: string, playerId2: string, gameCode: string) => {
    const teamsRef = getRealtimeRef(`MATCH/${gameCode}/teams`)
    const teamsSnap = (await get(teamsRef)).val() as Team[]

    const team1Player = teamsSnap[0].players.find(p => p.id == playerId1 || p.id == playerId2)
    const team2Player = teamsSnap[1].players.find(p => p.id == playerId1 || p.id == playerId2)
    if (!team1Player || !team2Player)
        return { playerId1, playerId2, status: "Failed To Swap!" };

    teamsSnap[0].players = teamsSnap[0].players.filter(p => p.id != team1Player!.id)
    teamsSnap[1].players = teamsSnap[1].players.filter(p => p.id != team2Player!.id)

    const temp = team1Player.position;
    team1Player.position = team2Player.position
    team2Player.position = temp

    teamsSnap[0].players.push(team2Player)
    teamsSnap[1].players.push(team1Player)

    await set(teamsRef, teamsSnap)
    return { playerId1, playerId2, status: "Swapped" };
}

export const submitSurvey = (gameCode: string, playerId: string, answers: any) => {
    // TODO Update Players Ratings Accordnigly
    return { matchId: gameCode, playerId, answers, status: "submitted" };
};
export const joinMatch = async (gameCode: string, playerId: string) => {
    console.log(gameCode, playerId)
    const matchRef = getRealtimeRef(`MATCH/${gameCode}`)
    const matchSnap = await get(matchRef)

    const playerRef = doc(firestoreDB, "players", playerId)
    const player = await getPlayerById(playerId)
    if (!matchSnap.exists() || !player)
        return { gameCode: gameCode, playerId, status: "Failed To Join: Match/ Player Couldn't Be Found!" };

    const count = matchSnap.child("count").val()
    const capacity = matchSnap.child("capacity").val()

    if (count + 1 > capacity)
        return { gameCode: gameCode, playerId, status: "Failed To Join: No Empty Spot Left!" };

    const newPlayer: TeamPlayer = { id: player.id,
        name: player.name,
        profilePicture: player.profilePicture,
        initials: player.initials,
        overall: player.statistics.overall,
        positions: player.positions,
        position: Position.FWD, // Will Be Overwritten For Sure.
    }

    const teamsRef = getRealtimeRef(`MATCH/${gameCode}/teams`)
    const teams = matchSnap.child("teams").val()

    const formation = matchSnap.child("formation").val()

    const updatedTeams = await updateLineUp(newPlayer, teams, formation)
    await set(teamsRef, updatedTeams)

    const countRef = getRealtimeRef(`MATCH/${gameCode}/count`)
    await set(countRef, count + 1)

    await updateDoc(playerRef,
        {
            matchCode: gameCode
        }
    );

    return { matchId: gameCode, playerId, status: "Joined" };
};
export const leaveMatch = async (gameCode: string, playerId: string) => {
    const matchRef = getRealtimeRef(`MATCH/${gameCode}`)
    const matchSnap = await get(matchRef)

    const playerRef = doc(firestoreDB, "players", playerId)
    const player = await getPlayerById(playerId)

    if (!matchSnap.exists() || !player || player.matchCode == "NONE")
        return { matchId: gameCode, playerId, status: "Failed To Leave: Match/ Player Couldn't Be Found!" };

    const teams = matchSnap.child("teams").val() as Team[]
    teams[0].players = teams[0].players.filter(p => p.id != playerId);
    teams[1].players = teams[1].players.filter(p => p.id != playerId);

    const teamsRef = getRealtimeRef(`MATCH/${gameCode}/teams`)
    await set(teamsRef, teams)

    const countRef = getRealtimeRef(`MATCH/${gameCode}/count`)
    const prevCount = (await get(countRef)).val()
    await set(countRef, prevCount - 1)

    await updateDoc(playerRef,
        {
            matchCode: "NONE"
        }
    );
    return { gameCode: gameCode, playerId, status: "left" };
};

function generateMatchCode(){
    return 284524
    // Delete The Return To Get Back To The Original Behaviour. (TEST)
    const min = Math.ceil(100000);
    const max = Math.floor(999999);
    const rand_value = Math.floor(Math.random() * (max - min + 1)) + min;
    if (generatedCodes.has(rand_value))
        return generateMatchCode()
    generatedCodes.add(rand_value)
    return rand_value
}
// TODO: Find A Better Approach To Enhance Time Complexity!
// INFO: Time Complexity = O(c1 * c2 * (3n * n * c3) *(n - 1)) = O(n^2)
async function updateLineUp(player: TeamPlayer, teams: Team[], positionsCapacities: PositionsCapacities) {
    const positions_priority = Object.entries(player.positions).sort((a, b) => b[1] - a[1]).map(([position, score]) => position)
    for (var position of positions_priority as Position[]){
        for (var team of teams as Team[])
            if (await setPlayerPosition(player, position, team.players, teams, positionsCapacities))
                return teams
    }
    return teams
}
const formationPositionsMap: {[capacity: number]: PositionsCapacities} = {
  10: {
    [Position.GK]: 1,
    [Position.DEF]: 2,
    [Position.MID]: 0,
    [Position.FWD]: 2
  },
  12: {
    [Position.GK]: 1,
    [Position.DEF]: 2,
    [Position.MID]: 1,
    [Position.FWD]: 2
  },
    14: {
    [Position.GK]: 1,
    [Position.DEF]: 3,
    [Position.MID]: 2,
    [Position.FWD]: 1
  },
    16: {
    [Position.GK]: 1,
    [Position.DEF]: 3,
    [Position.MID]: 2,
    [Position.FWD]: 2
  },
    18: {
    [Position.GK]: 1,
    [Position.DEF]: 4,
    [Position.MID]: 2,
    [Position.FWD]: 2
  },
    20: {
    [Position.GK]: 1,
    [Position.DEF]: 4,
    [Position.MID]: 3,
    [Position.FWD]: 2
  },
    22: {
    [Position.GK]: 1,
    [Position.DEF]: 4,
    [Position.MID]: 3,
    [Position.FWD]: 3
  },
};
async function setPlayerPosition(player: TeamPlayer, position: Position, teamPlayers: TeamPlayer[], teams: Team[], positionsCapacities: PositionsCapacities): Promise<boolean>{
    const GK_COUNT = positionsCapacities[Position.GK]
    const GKs = teamPlayers.filter(player => player.position == Position.GK)

    const DEF_COUNT = positionsCapacities[Position.DEF]
    const DEFs = teamPlayers.filter(player => player.position == Position.DEF)

    const MID_COUNT = positionsCapacities[Position.MID]
    const MIDs = teamPlayers.filter(player => player.position == Position.MID)

    const FWD_COUNT = positionsCapacities[Position.FWD]
    const FWDs = teamPlayers.filter(player => player.position == Position.FWD)

    var positionPlayers = []
    var positionCapacity = 0
    switch(position){
        case Position.GK:
            positionPlayers = GKs;
            positionCapacity = GK_COUNT
        break;

        case Position.DEF:
            positionPlayers = DEFs;
            positionCapacity = DEF_COUNT
        break;

        case Position.MID:
            positionPlayers = MIDs;
            positionCapacity = MID_COUNT
        break;

        case Position.FWD:
            positionPlayers = FWDs;
            positionCapacity = FWD_COUNT
        break;
    }
    const newPlayer: TeamPlayer = { id: player.id,
                                    name: player.name,
                                    profilePicture: player.profilePicture,
                                    initials: player.initials,
                                    overall: player.overall,
                                    positions: player.positions,
                                    position: position,
                                    }
    if (positionPlayers.length + 1 <= positionCapacity){
        const emptyIndex = teamPlayers.findIndex(p => p.id === "EMPTY");
        if (emptyIndex !== -1)
            teamPlayers[emptyIndex] = newPlayer
        else
            teamPlayers.push(newPlayer);
        return true;
    }

    const replaceable = teamPlayers.find(p => p.id != "EMPTY" && p.positions[position] < player.positions[position])
    if (!replaceable)
        return false

    teamPlayers = teamPlayers.filter(player => player.id != replaceable.id)
    teamPlayers.push(newPlayer);
    await updateLineUp(replaceable, teams, positionsCapacities)
    return true
}
async function getPlayerById(playerId: string): Promise<Player>{
    const playerDoc = doc(firestoreDB, "players", playerId)
    const playerSnap = await getDoc(playerDoc);
    return playerSnap.data() as Player;
}
