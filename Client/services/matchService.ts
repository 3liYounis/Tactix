import { API_CONFIG } from '@/config/api';
import { Match } from "@shared/types";

const API_URL = API_CONFIG.baseURL;

export interface CreateMatchResponse {
  success: boolean;
  message: string;
  matchId: string;
  data: any;
}

export const createMatch = async (matchData: Match): Promise<CreateMatchResponse> => {
  try {
    const response = await fetch(`${API_URL}/match/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...matchData,
        date: matchData.date.toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
};
