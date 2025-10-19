import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, Unsubscribe, where } from 'firebase/firestore';
import { Player, Position } from '../types/player';
import { db } from './firebaseManager';

export class FirestoreService {
  private static instance: FirestoreService;

  static getInstance(): FirestoreService {
    if (!FirestoreService.instance) {
      FirestoreService.instance = new FirestoreService();
    }
    return FirestoreService.instance;
  }

  async createPlayer(userId: string, email: string, name?: string, playerData?: Partial<Player>): Promise<{ success: boolean; error?: string }> {
    try {
      const defaultPlayerData: Player = {
        name: name || email.split('@')[0],
        username: email.split('@')[0],
        dateJoined: new Date(),
        level: 1,
        streak: 0,
        profilePicture: '',
        position: Position.MID,
        badges: [],
        skills: {
          PHY: 60,
          PAC: 60,
          PAS: 60,
          DEF: 60,
          DRI: 60,
          SHO: 60,
        },
        physicalAttributes: {
          age: 25,
          height: 175,
          weight: 70,
        },
        statistics: {
          matches_played: 0,
          matches_won: 0,
          matches_lost: 0,
          overall: 60,
        },
        initials: this.generateInitials(name || email.split('@')[0]),
        friends: [],
        trend: 'stable' as const,
      };


      const finalPlayerData = { ...defaultPlayerData, ...playerData };

      const playerRef = doc(collection(db, 'players'), userId);
      await setDoc(playerRef, finalPlayerData);

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to create player profile' };
    }
  }
  async getPlayer(userId: string): Promise<{ success: boolean; player?: Player; error?: string }> {
    try {
      const playerRef = doc(collection(db, 'players'), userId);
      const playerSnap = await getDoc(playerRef);

      if (playerSnap.exists()) {
        return { success: true, player: playerSnap.data() as Player };
      } else {
        return { success: false, error: 'Player not found' };
      }
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to get player data' };
    }
  }

  subscribeToPlayer(userId: string, callback: (player: Player | null, error?: string) => void): Unsubscribe {
    const playerRef = doc(collection(db, 'players'), userId);

    return onSnapshot(
      playerRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const playerData = snapshot.data() as Player;
          callback(playerData, undefined);
        } else {
          callback(null, 'Player not found');
        }
      },
      (error) => {
        console.error('Player subscription error:', error);
        callback(null, error.message);
      }
    );
  }

  async addFriend(playerId: string, friendId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const playerRef = doc(collection(db, 'players'), playerId);
      const playerSnap = await getDoc(playerRef);

      if (!playerSnap.exists()) {
        return { success: false, error: 'Player not found' };
      }

      const playerData = playerSnap.data() as Player;
      const currentFriends = playerData.friends || [];

      if (currentFriends.includes(friendId)) {
        return { success: false, error: 'Player is already a friend' };
      }

      const updatedFriends = [...currentFriends, friendId];
      await setDoc(playerRef, { friends: updatedFriends }, { merge: true });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to add friend' };
    }
  }

  async removeFriend(playerId: string, friendId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const playerRef = doc(collection(db, 'players'), playerId);
      const friendRef = doc(collection(db, 'players'), friendId);

      const [playerSnap, friendSnap] = await Promise.all([
        getDoc(playerRef),
        getDoc(friendRef)
      ]);

      if (!playerSnap.exists()) {
        return { success: false, error: 'Player not found' };
      }

      if (!friendSnap.exists()) {
        return { success: false, error: 'Friend not found' };
      }

      const playerData = playerSnap.data() as Player;
      const friendData = friendSnap.data() as Player;

      const playerFriends = playerData.friends || [];
      const friendFriends = friendData.friends || [];

      const updatedPlayerFriends = playerFriends.filter(id => id !== friendId);
      const updatedFriendFriends = friendFriends.filter(id => id !== playerId);

      await Promise.all([
        setDoc(playerRef, { friends: updatedPlayerFriends }, { merge: true }),
        setDoc(friendRef, { friends: updatedFriendFriends }, { merge: true })
      ]);

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to remove friend' };
    }
  }

  async getFriends(playerId: string): Promise<{ success: boolean; friends?: Player[]; error?: string }> {
    try {
      const playerRef = doc(collection(db, 'players'), playerId);
      const playerSnap = await getDoc(playerRef);

      if (!playerSnap.exists()) {
        return { success: false, error: 'Player not found' };
      }

      const playerData = playerSnap.data() as Player;
      const friendIds = playerData.friends || [];

      if (friendIds.length === 0) {
        return { success: true, friends: [] };
      }

      const friendsPromises = friendIds.map(async (friendId) => {
        const friendRef = doc(collection(db, 'players'), friendId);
        const friendSnap = await getDoc(friendRef);
        return friendSnap.exists() ? friendSnap.data() as Player : null;
      });

      const friends = (await Promise.all(friendsPromises)).filter(friend => friend !== null) as Player[];

      return { success: true, friends };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to get friends' };
    }
  }

  subscribeToFriends(playerId: string, callback: (friends: (Player & { uid: string })[], error?: string) => void): Unsubscribe {
    const playerRef = doc(collection(db, 'players'), playerId);

    return onSnapshot(
      playerRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const playerData = snapshot.data() as Player;
          const friendIds = playerData.friends || [];

          if (friendIds.length === 0) {
            callback([], undefined);
            return;
          }

          try {
            const friendsPromises = friendIds.map(async (friendId) => {
              const friendRef = doc(collection(db, 'players'), friendId);
              const friendSnap = await getDoc(friendRef);
              return friendSnap.exists() ? { ...friendSnap.data() as Player, uid: friendId } : null;
            });

            const friends = (await Promise.all(friendsPromises)).filter(friend => friend !== null) as (Player & { uid: string })[];
            callback(friends, undefined);
          } catch (error: any) {
            callback([], error?.message ?? 'Failed to fetch friends data');
          }
        } else {
          callback([], 'Player not found');
        }
      },
      (error) => {
        console.error('Friends subscription error:', error);
        callback([], error.message);
      }
    );
  }

  subscribeToAllPlayers(callback: (players: (Player & { uid: string })[], error?: string) => void): Unsubscribe {
    const playersRef = collection(db, 'players');

    return onSnapshot(
      playersRef,
      (snapshot) => {
        const players: (Player & { uid: string })[] = [];
        snapshot.forEach((doc) => {
          if (doc.exists()) {
            players.push({ ...doc.data() as Player, uid: doc.id });
          }
        });
        callback(players, undefined);
      },
      (error) => {
        console.error('All players subscription error:', error);
        callback([], error.message);
      }
    );
  }

  subscribeToPlayersByPosition(position: Position, callback: (players: Player[], error?: string) => void): Unsubscribe {
    const playersRef = collection(db, 'players');
    const q = query(playersRef, where('position', '==', position));

    return onSnapshot(
      q,
      (snapshot) => {
        const players: Player[] = [];
        snapshot.forEach((doc) => {
          if (doc.exists()) {
            players.push(doc.data() as Player);
          }
        });
        callback(players, undefined);
      },
      (error) => {
        console.error('Players by position subscription error:', error);
        callback([], error.message);
      }
    );
  }

  subscribeToPlayersByLevel(minLevel: number, maxLevel: number, callback: (players: Player[], error?: string) => void): Unsubscribe {
    const playersRef = collection(db, 'players');
    const q = query(
      playersRef,
      where('level', '>=', minLevel),
      where('level', '<=', maxLevel)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const players: Player[] = [];
        snapshot.forEach((doc) => {
          if (doc.exists()) {
            players.push(doc.data() as Player);
          }
        });
        callback(players, undefined);
      },
      (error) => {
        console.error('Players by level subscription error:', error);
        callback([], error.message);
      }
    );
  }

  async sendInvitation(senderId: string, recipientId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const invitationRef = doc(collection(db, 'invitations'));
      const invitationData = {
        id: invitationRef.id,
        senderId,
        recipientId,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await setDoc(invitationRef, invitationData);
      return { success: true };
    }
    catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to send invitation' };
    }
  }

  async acceptInvitation(invitationId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const invitationRef = doc(collection(db, 'invitations'), invitationId);
      const invitationSnap = await getDoc(invitationRef);
      if (!invitationSnap.exists())
        return { success: false, error: 'Invitation not found' };

      const invitationData = invitationSnap.data();
      await this.addFriend(invitationData.senderId, invitationData.recipientId);
      await this.addFriend(invitationData.recipientId, invitationData.senderId);
      await deleteDoc(invitationRef);
      return { success: true };
    }
    catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to accept invitation' };
    }
  }

  async declineInvitation(invitationId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const invitationRef = doc(collection(db, 'invitations'), invitationId);
      await deleteDoc(invitationRef);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to decline invitation' };
    }
  }

  async cancelInvitation(invitationId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const invitationRef = doc(collection(db, 'invitations'), invitationId);
      await deleteDoc(invitationRef);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to cancel invitation' };
    }
  }

  async deleteInvitationsBetweenUsers(userId1: string, userId2: string): Promise<{ success: boolean; error?: string }> {
    try {
      const invitationsRef = collection(db, 'invitations');
      const q1 = query(
        invitationsRef,
        where('senderId', '==', userId1),
        where('recipientId', '==', userId2)
      );
      const q2 = query(
        invitationsRef,
        where('senderId', '==', userId2),
        where('recipientId', '==', userId1)
      );
      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2)
      ]);
      const deletePromises: Promise<void>[] = [];
      snapshot1.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });

      snapshot2.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });

      await Promise.all(deletePromises);
      return { success: true };
    }
    catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to delete invitations' };
    }
  }

  subscribeToSentInvitations(userId: string, callback: (invitations: any[], error?: string) => void): Unsubscribe {
    const invitationsRef = collection(db, 'invitations');
    const q = query(
      invitationsRef,
      where('senderId', '==', userId),
      where('status', '==', 'pending')
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const invitations: any[] = [];
        snapshot.forEach((doc) => {
          if (doc.exists()) {
            invitations.push({ id: doc.id, ...doc.data() });
          }
        });
        callback(invitations, undefined);
      },
      (error) => {
        console.error('Sent invitations subscription error:', error);
        callback([], error.message);
      }
    );
  }

  subscribeToReceivedInvitations(userId: string, callback: (invitations: any[], error?: string) => void): Unsubscribe {
    const invitationsRef = collection(db, 'invitations');
    const q = query(
      invitationsRef,
      where('recipientId', '==', userId),
      where('status', '==', 'pending')
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const invitations: any[] = [];
        snapshot.forEach((doc) => {
          if (doc.exists()) {
            invitations.push({ id: doc.id, ...doc.data() });
          }
        });
        callback(invitations, undefined);
      },
      (error) => {
        console.error('Received invitations subscription error:', error);
        callback([], error.message);
      }
    );
  }

  private generateInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }
}
