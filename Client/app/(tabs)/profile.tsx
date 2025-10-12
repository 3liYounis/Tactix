import KPIGrid from '@/components/Profile/KPIGrid';
import PlayerCard from '@/components/Profile/PlayerCard';
import SectionCard from '@/components/Profile/SectionCard';
import SkillRatings from '@/components/Profile/SkillRatings';
import AnimatedScreen from '@/components/animated/AnimatedScreen';
import Error from '@/components/animated/Error';
import Loading from '@/components/animated/Loading';
import CustomButton from '@/components/custom/CustomButton';
import PageHeader from '@/components/custom/PageHeader';
import { typography } from '@/constants/typography';
import { useAuth } from '@/hooks/useAuth';
import { usePlayer } from '@/hooks/usePlayer';
import { useTheme } from '@/hooks/useTheme';
import { Position } from '@/types/player';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const positionRatings: Record<Position, Record<string, number>> = {
  GK: { PAC: 45, SHO: 20, PAS: 68, DRI: 42, DEF: 88, PHY: 78 },
  DEF: { PAC: 72, SHO: 35, PAS: 75, DRI: 65, DEF: 85, PHY: 82 },
  MID: { PAC: 78, SHO: 68, PAS: 88, DRI: 82, DEF: 65, PHY: 75 },
  FWD: { PAC: 88, SHO: 85, PAS: 72, DRI: 86, DEF: 45, PHY: 78 },
}

export default function Profile() {
  const { signOut } = useAuth();
  const { player, isLoading, error } = usePlayer();
  const { colors, typography } = useTheme();
  const [view, setView] = useState<'card' | 'stats'>('card');

  if (isLoading) {
    return (
      <AnimatedScreen style={[styles.root, { backgroundColor: colors.background }]}>
        <PageHeader title="Profile" subtitle="Loading your profile..." imageSource={require('@/assets/images/trophy.png')} />
        <Loading message="Loading your profile . . ."/>
      </AnimatedScreen>
    );
  }
  if (!isLoading && (error || !player)) {
    return (
      <AnimatedScreen style={[styles.root, { backgroundColor: colors.background }]}>
        <PageHeader title="Profile" subtitle="Profile not found" imageSource={require('@/assets/images/trophy.png')} />
        <Error message={error || 'Player profile not found!'}/>
      </AnimatedScreen>
    );
  }
  else if (player) {
    const user = player!;
    const screenW = Dimensions.get('window').width;
    const barMax = Math.min(screenW - 150, 240);

    return (
      <AnimatedScreen style={[styles.root, { backgroundColor: colors.background }]}>
        <PageHeader title="Profile" subtitle="Your player card and statistics" imageSource={require('@/assets/images/trophy.png')} />
        <View style={[styles.toggleWrap, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.toggleBtn, { borderRightColor: colors.border }, view === 'card' && { backgroundColor: colors.primary }]}
            onPress={() => setView('card')}
          >
            <Text style={[styles.toggleBtnText, view === 'card' ? { color: colors.primaryForeground } : { color: colors.foreground }]}>Player Card </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, view === 'stats' && { backgroundColor: colors.primary }]}
            onPress={() => setView('stats')}
          >
            <Text style={[styles.toggleBtnText, view === 'stats' ? { color: colors.primaryForeground } : { color: colors.foreground }]}>Statistics</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
        >
          {view === 'card' ? (
            <PlayerCard player={user}/>
          ) : (
            <View style={styles.StatsContainer}>
              <SectionCard title="Performance Overview">
                <KPIGrid
                  data={[
                    { value: user.statistics.matches_played, label: 'Total Matches', color: colors.primary },
                    { value: user.statistics.matches_won, label: 'Wins', color: colors.ratingGreen },
                    // { value: user.statistics.goals, label: 'Goals', color: colors.ratingYellow },
                    // { value: user.statistics.assists, label: 'Assists', color: colors.primary },
                  ]}
                />
              </SectionCard>

              <SectionCard title="Skill Ratings">
                <SkillRatings skills={player?.skills} barMax={barMax} />
              </SectionCard>

              <SectionCard title="Physical Attributes">
                <KPIGrid
                  data={[
                    { value: user.physicalAttributes.age, label: 'Years', color: colors.foreground },
                    { value: user.physicalAttributes.height, label: 'CM', color: colors.foreground },
                    { value: user.physicalAttributes.weight, label: 'KG', color: colors.foreground },
                  ]}
                />
              </SectionCard>
            </View>
          )}
          <CustomButton onPress={() => signOut()} >Sign Out</CustomButton>
        </ScrollView>
      </AnimatedScreen>
    );
  }
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  toggleWrap: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  cardContainer: {
    padding: 10,
  },
  toggleBtnText:{
    fontFamily: typography.fontFamily.spaceGroteskBold,
    fontSize: 16,
    letterSpacing: 0.5
  },
  StatsContainer: {
    gap: 12,
    marginBottom:80
  }
})
