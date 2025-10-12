import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FirestoreService } from '../services/firestoreService';
import { Player } from '../types/player';

export const usePlayer = () => {
  const { user, isLoggedIn } = useAuth();
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const refreshPlayer = useCallback(async () => {
    if (!user?.id || !isLoggedIn) {
      setPlayer(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const firestoreService = FirestoreService.getInstance();
      const result = await firestoreService.getPlayer(user.id);

      if (result.success && result.player) {
        setPlayer(result.player);
      } else {
        setError(result.error || 'Player not found');
        setPlayer(null);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch player data');
      setPlayer(null);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, isLoggedIn]);
  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      setPlayer(null);
      setError(null);
      setIsLoading(false);
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    const firestoreService = FirestoreService.getInstance();
    const unsubscribe = firestoreService.subscribeToPlayer(
      user.id,
      (playerData, error) => {
        if (error) {
          setError(error);
          setPlayer(null);
        } else if (playerData) {
          setPlayer(playerData);
          setError(null);
        } else {
          setError('Player not found');
          setPlayer(null);
        }

        setIsLoading(false);
      }
    );

    unsubscribeRef.current = unsubscribe;

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [isLoggedIn, user?.id]);

  return {
    player,
    isLoading,
    error,
    refreshPlayer,
  };
};
