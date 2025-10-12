import { useCallback, useEffect, useRef, useState } from 'react';
import { FirestoreService } from '../services/firestoreService';
import { Player, Position } from '../types/player';

export const useAllPlayers = () => {
  const [players, setPlayers] = useState<(Player & { uid: string })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const refreshPlayers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const firestoreService = FirestoreService.getInstance();
      setIsLoading(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch players data');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const firestoreService = FirestoreService.getInstance();

    const unsubscribe = firestoreService.subscribeToAllPlayers(
      (playersData, error) => {
        if (error) {
          setError(error);
          setPlayers([]);
        } else {
          setPlayers(playersData);
          setError(null);
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
  }, []);

  return {
    players,
    isLoading,
    error,
    refreshPlayers,
  };
};

export const usePlayersByPosition = (position: Position) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!position) {
      setPlayers([]);
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

    const unsubscribe = firestoreService.subscribeToPlayersByPosition(
      position,
      (playersData, error) => {
        if (error) {
          setError(error);
          setPlayers([]);
        } else {
          setPlayers(playersData);
          setError(null);
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
  }, [position]);

  return {
    players,
    isLoading,
    error,
  };
};

export const usePlayersByLevel = (minLevel: number, maxLevel: number) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (minLevel < 0 || maxLevel < minLevel) {
      setPlayers([]);
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

    const unsubscribe = firestoreService.subscribeToPlayersByLevel(
      minLevel,
      maxLevel,
      (playersData, error) => {
        if (error) {
          setError(error);
          setPlayers([]);
        } else {
          setPlayers(playersData);
          setError(null);
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
  }, [minLevel, maxLevel]);

  return {
    players,
    isLoading,
    error,
  };
};
