import { MatchInfo } from "../types/match";


export const createMatch = (hostId: string, matchSettings: MatchInfo) => {

    return { hostId, matchSettings, status: "created" };
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
