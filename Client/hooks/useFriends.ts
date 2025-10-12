import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FirestoreService } from '../services/firestoreService';
import { Player } from '../types/player';

export const useFriends = () => {
  const { user, isLoggedIn } = useAuth();
  const [friends, setFriends] = useState<(Player & { uid: string })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const fetchFriends = useCallback(async () => {
    if (!user?.id || !isLoggedIn) {
      setFriends([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const firestoreService = FirestoreService.getInstance();
      const result = await firestoreService.getFriends(user.id);

      if (result.success && result.friends) {
        const friendsWithUid = result.friends.map((friend, index) => ({ ...friend, uid: `friend_${index}` }));
        setFriends(friendsWithUid);
      } else {
        setError(result.error || 'Failed to fetch friends');
        setFriends([]);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch friends');
      setFriends([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, isLoggedIn]);

  const addFriend = useCallback(async (friendId: string) => {
    if (!user?.id) return { success: false, error: 'User not logged in' };

    try {
      const firestoreService = FirestoreService.getInstance();
      const result = await firestoreService.addFriend(user.id, friendId);
      return result;
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to add friend' };
    }
  }, [user?.id]);

  const removeFriend = useCallback(async (friendId: string) => {
    if (!user?.id) return { success: false, error: 'User not logged in' };

    try {
      const firestoreService = FirestoreService.getInstance();
      const result = await firestoreService.removeFriend(user.id, friendId);
      return result;
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to remove friend' };
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      setFriends([]);
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

    const unsubscribe = firestoreService.subscribeToFriends(
      user.id,
      (friendsData, error) => {
        if (error) {
          setError(error);
          setFriends([]);
        } else {
          setFriends(friendsData);
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
  }, [isLoggedIn, user?.id]);

  return {
    friends,
    isLoading,
    error,
    addFriend,
    removeFriend,
    refreshFriends: fetchFriends,
  };
};
