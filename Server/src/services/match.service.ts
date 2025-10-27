import { Match, MatchInfo } from "../types/match";
import {getRealtimeRef} from "../config/firebase"
import { push } from "firebase/database";

const matchesRef = getRealtimeRef("MATCH");
const generatedCodes = new Set<number>();

export const createMatch = (hostId: string, match_information: MatchInfo) => {
    const code = generateMatchCode().toString()
    const match: Match = {
        match_information: match_information,
        code: code,
        players_count: 0,
        started: false,
        teams: [],
    }
    console.log(match)
    push(matchesRef, match)
    return { hostId, match_information, status: "created" };
};

export const cancelMatch = (matchId: string) => {

    return { matchId, status: "canceled" };
};

export const startMatch = (matchId: string) => {

    return { matchId, status: "started" };
};

export const endMatch = (matchId: string) => {

    return { matchId, status: "ended" };
};

export const joinMatch = (matchId: string, playerId: string) => {

    return { matchId, playerId, status: "joined" };
};

export const leaveMatch = (matchId: string, playerId: string) => {

    return { matchId, playerId, status: "left" };
};

export const submitSurvey = (matchId: string, playerId: string, answers: any) => {

    return { matchId, playerId, answers, status: "submitted" };
};

function generateMatchCode(){
    const min = Math.ceil(100000);
    const max = Math.floor(999999);
    const rand_value = Math.floor(Math.random() * (max - min + 1)) + min;
    if (generatedCodes.has(rand_value))
        return generateMatchCode()
    generatedCodes.add(rand_value)
    return rand_value
}
