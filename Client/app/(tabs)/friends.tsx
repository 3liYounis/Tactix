import PageHeader from '@/components/custom/PageHeader';
import EmptyState from '@/components/friends/EmptyState';
import FriendsFilters from '@/components/friends/FriendsFilters';
import PlayerRow from '@/components/friends/PlayerRow';
import { colors } from '@/constants';
import { useAllPlayers } from '@/hooks/useAllPlayers';
import { useFriends } from '@/hooks/useFriends';
import { usePlayer } from '@/hooks/usePlayer';
import { useTheme } from '@/hooks/useTheme';
import { FirestoreService } from '@/services/firestoreService';
import { useAuth } from '@/context/AuthContext';
import { Player } from '@/types/player';
import { Search } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const FILTERS = [
  { id: 'Friends', label: 'Friends', backgroundColor: colors.ratingGreen, borderColor: colors.ratingGreen, foregroundColor: colors.background },
  { id: 'Invitations', label: 'Invitations', backgroundColor: colors.ratingYellow, borderColor: colors.ratingYellow, foregroundColor: colors.background },
  { id: 'GK', label: 'Goalkeepers', backgroundColor: colors.GKBackgroundColor, borderColor: colors.GKBorderColor, foregroundColor: colors.GKForeground },
  { id: 'DEF', label: 'Defenders', backgroundColor: colors.DEFBackgroundColor, borderColor: colors.DEFBorderColor, foregroundColor: colors.DEFForeground },
  { id: 'MID', label: 'Midfielders', backgroundColor: colors.MIDBackgroundColor, borderColor: colors.MIDBorderColor, foregroundColor: colors.MIDForeground },
  { id: 'FWD', label: 'Forwards', backgroundColor: colors.FWDBackgroundColor, borderColor: colors.FWDBorderColor, foregroundColor: colors.FWDForeground },
]


export default function PlayersDirectory() {
  const { player } = usePlayer();
  const { user } = useAuth();
  const { friends, isLoading: friendsLoading, addFriend, removeFriend } = useFriends();
  const { players: allPlayers, isLoading: allPlayersLoading } = useAllPlayers();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('Friends');
  const [sentInvitations, setSentInvitations] = useState<any[]>([]);
  const [receivedInvitations, setReceivedInvitations] = useState<any[]>([]);
  const firestoreService = FirestoreService.getInstance();

  React.useEffect(() => {
    if (!user?.id) return;

    // Cleanup old invitations when component mounts
    // firestoreService.cleanupOldInvitations().then(result => {
    //   if (result.success) {
    //     console.log('Cleaned up old invitations');
    //   } else {
    //     console.error('Failed to cleanup old invitations:', result.error);
    //   }
    // });

    const unsubscribeSent = firestoreService.subscribeToSentInvitations(
      user.id,
      (invitations) => setSentInvitations(invitations)
    );

    const unsubscribeReceived = firestoreService.subscribeToReceivedInvitations(
      user.id,
      (invitations) => setReceivedInvitations(invitations)
    );

    return () => {
      unsubscribeSent();
      unsubscribeReceived();
    };
  }, [user?.id]);

  const friendsAsPlayers: (Player & { uid: string; color: string; status: 'online' | 'away' | 'offline' | string })[] = useMemo(() => {
    return friends.map(friend => ({
      ...friend,
      color: getPositionColor(friend.position),
      status: 'online' as const,
    }));
  }, [friends]);

  const allPlayersAsPlayers: (Player & { uid: string; color: string; status: 'online' | 'away' | 'offline' | string })[] = useMemo(() => {
    return allPlayers.map(player => ({
      ...player,
      color: getPositionColor(player.position),
      status: 'online' as const,
    }));
  }, [allPlayers]);

  const playersToShow = useMemo(() => {
    if (filter === 'Friends') {
      return friendsAsPlayers;
    } else if (filter === 'Invitations') {
      const invitationPlayerIds = [
        ...sentInvitations.map(inv => inv.recipientId),
        ...receivedInvitations.map(inv => inv.senderId)
      ];
      const friendUsernames = friendsAsPlayers.map(friend => friend.username);
      return allPlayersAsPlayers.filter(p =>
        invitationPlayerIds.includes(p.uid) &&
        !friendUsernames.includes(p.username)
      );
    }
    else
      return friendsAsPlayers.filter(p => p.position === filter);
  }, [filter, friendsAsPlayers, allPlayersAsPlayers, sentInvitations, receivedInvitations]);


  const playersWithSearch = useMemo(() => {
    if (search.trim()) {
      if (filter === 'Friends') {
        const searchResults = allPlayersAsPlayers.filter(p => p.username !== player?.username);
        return searchResults;
      }
      else
        return playersToShow;
    }
    return playersToShow;
  }, [search, filter, playersToShow, allPlayersAsPlayers, player?.username]);

  const players = useFilteredPlayers(search, filter, playersWithSearch);

  const handleAddFriend = async (friendId: string) => {
    const result = await addFriend(friendId);
    if (result.success) {
      const playerToRemove = allPlayers.find(p => p.uid === friendId);
      if (playerToRemove) {
        setSentInvitations(prev => prev.filter(username => username !== playerToRemove.username));
        setReceivedInvitations(prev => prev.filter(username => username !== playerToRemove.username));
      }
    }
    else {
      console.error('Failed to add friend:', result.error);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    if (!user?.id) return;

    const result = await removeFriend(friendId);
    if (result.success) {
      const deleteInvitationsResult = await firestoreService.deleteInvitationsBetweenUsers(user.id, friendId);
      if (deleteInvitationsResult.success) {
        console.log('Successfully removed friend and deleted invitations');
      } else {
        console.error('Failed to delete invitations:', deleteInvitationsResult.error);
      }
    } else {
      console.error('Failed to remove friend:', result.error);
    }
  };

  const handleSendInvitation = async (playerUsername: string) => {
    if (!user?.id) return;

    const targetPlayer = allPlayers.find(p => p.username === playerUsername);
    if (!targetPlayer) return;

    const result = await firestoreService.sendInvitation(user.id, targetPlayer.uid);
    // if (result.success) {
    //   console.log('Invitation sent to:', playerUsername);
    // } else {
    //   console.error('Failed to send invitation:', result.error);
    // }
  };

  const handleAcceptInvitation = async (playerUsername: string) => {
    const invitation = receivedInvitations.find(inv => {
      const senderPlayer = allPlayers.find(p => p.uid === inv.senderId);
      return senderPlayer?.username === playerUsername;
    });

    if (!invitation) return;

    const result = await firestoreService.acceptInvitation(invitation.id);
    // if (result.success) {
    //   console.log('Accepted invitation from:', playerUsername);
    // } else {
    //   console.error('Failed to accept invitation:', result.error);
    // }
  };

  const handleDeclineInvitation = async (playerUsername: string) => {
    const invitation = receivedInvitations.find(inv => {
      const senderPlayer = allPlayers.find(p => p.uid === inv.senderId);
      return senderPlayer?.username === playerUsername;
    });

    if (!invitation) return;

    const result = await firestoreService.declineInvitation(invitation.id);
    if (result.success) {
      console.log('Declined invitation from:', playerUsername);
    } else {
      console.error('Failed to decline invitation:', result.error);
    }
  };

  const handleCancelInvitation = async (playerUsername: string) => {
    const invitation = sentInvitations.find(inv => {
      const recipientPlayer = allPlayers.find(p => p.uid === inv.recipientId);
      return recipientPlayer?.username === playerUsername;
    });

    if (!invitation) return;

    const result = await firestoreService.cancelInvitation(invitation.id);
    if (result.success) {
      console.log('Cancelled invitation to:', playerUsername);
    } else {
      console.error('Failed to cancel invitation:', result.error);
    }
  };

  const isLoading = friendsLoading || allPlayersLoading;

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <PageHeader title="Friends" subtitle="Connect with other players" imageSource={require('@/assets/images/goal.png')} />
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.muted }]}>Loading players...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PageHeader title="Friends" subtitle="Connect with other players" imageSource={require('@/assets/images/goal.png')} />

      <View style={[styles.searchContainer, { borderBottomColor: colors.border }]}>
        <View style={[styles.searchInput, { backgroundColor: colors.backgroundLight }]}>
          <Search size={16} color={colors.muted} />
          <TextInput
            style={[styles.searchTextInput, { color: colors.foreground }]}
            placeholder={
              filter === 'Friends' ? "Search all players . . ." :
              filter === 'Invitations' ? "Search Invitations . . ." :
              `Search ${filter}s . . .`
            }
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FriendsFilters filters={FILTERS} activeId={filter} onChange={setFilter} />

      {players.length === 0 ? (
        <EmptyState
          title={
            filter === 'Friends' ? (search.trim() ? "No players found :(" : "No friends were found :(") :
            filter === 'Invitations' ? "No invitations found :(" :
            `No ${filter}s found :(`
          }
          subtitle={
            filter === 'Friends' ? (search.trim() ? "Try adjusting your search to find new players" : "Try adjusting your search or add new friends") :
            filter === 'Invitations' ? "No pending invitations at the moment" :
            `Try adjusting your search or add new ${filter.toLowerCase()}s`
          }
        />
      )
      :
      (
        <FlatList
          data={players}
          keyExtractor={(item) => item.uid}
          renderItem={({ item, index }) => {
            const isFriend = friends.some(friend => friend.uid === item.uid);
            const invitationStatus = sentInvitations.some(inv => {
              const recipientPlayer = allPlayers.find(p => p.uid === inv.recipientId);
              return recipientPlayer?.username === item.username;
            }) ? 'sent' : receivedInvitations.some(inv => {
              const senderPlayer = allPlayers.find(p => p.uid === inv.senderId);
              return senderPlayer?.username === item.username;
            }) ? 'received' : 'none';

            return (
              <PlayerRow
                index={index}
                player={item}
                onAddFriend={() => handleAddFriend(item.uid)}
                onRemoveFriend={() => handleRemoveFriend(item.uid)}
                onSendInvitation={() => handleSendInvitation(item.username)}
                onAcceptInvitation={() => handleAcceptInvitation(item.username)}
                onDeclineInvitation={() => handleDeclineInvitation(item.username)}
                onCancelInvitation={() => handleCancelInvitation(item.username)}
                isFriend={isFriend}
                invitationStatus={invitationStatus}
              />
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

    </View>
  );
}

const getPositionColor = (position: string): string => {
  switch (position) {
    case 'GK': return colors.GKForeground;
    case 'DEF': return colors.DEFForeground;
    case 'MID': return colors.MIDForeground;
    case 'FWD': return colors.FWDForeground;
    default: return colors.foreground;
  }
};

function useFilteredPlayers(search: string, filter: string, players: (Player & { uid: string; color: string; status: 'online' | 'away' | 'offline' | string })[]) {
  return useMemo(() => {
    const s = search.trim().toLowerCase()
    return players.filter((p) => {
      const bySearch = !s || p.name.toLowerCase().includes(s) || p.username.toLowerCase().includes(s)
      return bySearch
    })
  }, [search, filter, players])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    width: '100%',
  },
  searchTextInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  addButton: {
    padding: 9,
    borderRadius: 20,
    marginLeft: 10,
  },
  listContent: {
    padding: 18,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
  }
});
