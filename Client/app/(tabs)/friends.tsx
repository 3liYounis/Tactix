import PageHeader from '@/components/custom/PageHeader';
import EmptyState from '@/components/friends/EmptyState';
import FriendsFilters from '@/components/friends/FriendsFilters';
import PlayerRow from '@/components/friends/PlayerRow';
import { colors } from '@/constants';
import { useAllPlayers } from '@/hooks/useAllPlayers';
import { useFriends } from '@/hooks/useFriends';
import { usePlayer } from '@/hooks/usePlayer';
import { useTheme } from '@/hooks/useTheme';
import { Player } from '@/types/player';
import { Search } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  onAddPlayer?: () => void
}

const FILTERS = [
  { id: 'All', label: 'All Players', backgroundColor: colors.foreground, borderColor: colors.border, foregroundColor: colors.background },
  { id: 'GK', label: 'Goalkeepers', backgroundColor: colors.GKBackgroundColor, borderColor: colors.GKBorderColor, foregroundColor: colors.GKForeground },
  { id: 'DEF', label: 'Defenders', backgroundColor: colors.DEFBackgroundColor, borderColor: colors.DEFBorderColor, foregroundColor: colors.DEFForeground },
  { id: 'MID', label: 'Midfielders', backgroundColor: colors.MIDBackgroundColor, borderColor: colors.MIDBorderColor, foregroundColor: colors.MIDForeground },
  { id: 'FWD', label: 'Forwards', backgroundColor: colors.FWDBackgroundColor, borderColor: colors.FWDBorderColor, foregroundColor: colors.FWDForeground },
]


export default function PlayersDirectory({ onAddPlayer }: Props) {
  const { player } = usePlayer();
  const { friends, isLoading: friendsLoading, addFriend, removeFriend } = useFriends();
  const { players: allPlayers, isLoading: allPlayersLoading } = useAllPlayers();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const friendsAsPlayers: (Player & { uid: string; color: string; status: 'online' | 'away' | 'offline' | string })[] = useMemo(() => {
    return friends.map(friend => ({
      ...friend,
      color: getPositionColor(friend.position),
      status: 'online' as const,
    }));
  }, [friends]);

  // Convert all players to Player format for discovery
  // const allPlayersAsPlayers: (Player & { uid: string; color: string; status: 'online' | 'away' | 'offline' | string })[] = useMemo(() => {
  //   return allPlayers.map(player => ({
  //     ...player,
  //     color: getPositionColor(player.position),
  //     status: 'online' as const,
  //   }));
  // }, [allPlayers]);
  const playersToShow = useMemo(() => {
    if (filter === 'All') {
      const allPlayersExcludingSelf = friendsAsPlayers.filter(player => player.username !== player?.username);

      const combinedPlayers = [...allPlayersExcludingSelf];

      friendsAsPlayers.forEach(friend => {
        if (!combinedPlayers.some(player => player.username === friend.username)) {
          combinedPlayers.push(friend);
        }
      });

      return combinedPlayers;
    } else {
      return friendsAsPlayers;
    }
  }, [filter, friendsAsPlayers, player?.username]);
// }, [filter, allPlayersAsPlayers, friendsAsPlayers, player?.username]);

  const players = useFilteredPlayers(search, filter, playersToShow);

  const handleAddFriend = async (friendId: string) => {
    const result = await addFriend(friendId);
    if (!result.success) {
      console.error('Failed to add friend:', result.error);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    const result = await removeFriend(friendId);
    if (!result.success) {
      console.error('Failed to remove friend:', result.error);
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
            placeholder={filter === 'All' ? "Search Players . . ." : "Search Friends . . ."}
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
          {/* <TouchableOpacity onPress={onAddPlayer} style={[styles.addButton, { backgroundColor: colors.backgroundLight }]}>
          <UserPlus size={20} color={colors.foreground} />
          </TouchableOpacity> */}
      </View>

      <FriendsFilters filters={FILTERS} activeId={filter} onChange={setFilter} />

      {players.length === 0 ? (
        <EmptyState
          title={filter === 'All' ? "No players found :(" : "No friends were found :("}
          subtitle={filter === 'All' ? "Try adjusting your search or discover new players" : "Try adjusting your search or add new friends"}
        />
      )
      :
      (
        <FlatList
          data={players}
          keyExtractor={(item) => item.uid}
          renderItem={({ item, index }) => (
            <PlayerRow
              index={index}
              player={item}
              onAddFriend={() => handleAddFriend(item.uid)}
              onRemoveFriend={() => handleRemoveFriend(item.uid)}
              isFriend={friends.some(friend => friend.uid === item.uid)}
            />
          )}
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
      const bySearch = !s || p.name.toLowerCase().includes(s)
      const byFilter = filter === 'All' || p.position === filter
      return bySearch && byFilter
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
