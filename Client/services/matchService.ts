import { API_CONFIG } from '@/config/api';
import { Match, MatchInfo } from "@shared/types";

const API_URL = API_CONFIG.baseURL;

export interface CreateMatchResponse {
  success: boolean;
  message: string;
  matchId: string;
  data: any;
}

export const createMatch = async (match_info: MatchInfo): Promise<Match> => {
  try {
    const response = await fetch(`${API_URL}${API_CONFIG.endpoints.createMatch}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "match_info": match_info,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
};
export async function joinMatch(gameCode: string, playerId: string): Promise<Match> {
try {
    const response = await fetch(`${API_URL}${API_CONFIG.endpoints.joinMatch}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "gameCode": gameCode,
        "playerId":playerId
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
}
