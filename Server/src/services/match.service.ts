import { Match, MatchInfo } from "../types/match";
import {getRealtimeRef} from "../config/firebase"
import { set, remove, update } from "firebase/database";

const generatedCodes = new Set<number>();

export const createMatch = (hostId: string, match_information: MatchInfo) => {
    const code = generateMatchCode()
    const match: Match = {
        name: match_information.name,
        location: match_information.location,
        date: match_information.date,
        time: match_information.time,
        capacity: 0,
        code: code,
        count: 0,
        started: false,
        teams: [],
    }
    const matchRef = getRealtimeRef(`MATCH/${code}`)
    set(matchRef, match)
    return { hostId, match_information, status: "created" };
};

export const cancelMatch = (matchId: string) => {
    const matchRef = getRealtimeRef(`MATCH/${matchId}`)
    remove(matchRef)
    return { matchId, status: "canceled" };
};

export const startMatch = (matchId: string) => {
    const matchRef = getRealtimeRef(`MATCH/${matchId}`)
    update(matchRef, {started: true})
    return { matchId, status: "started" };
};

export const endMatch = (matchId: string) => {
    // TODO Generate & Send Surveys
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
