import AnimatedScreen from '@/components/animated/AnimatedScreen';
import JoinForm from '@/components/match/JoinForm';
import { useTheme } from '@/hooks/useTheme';
import PageHeader from '../custom/PageHeader';

interface Props {
  joinForm: {
    gameCode: string;
  };
  onJoinCodeChange: (text: string) => void;
  onJoinMatch: () => void;
  onClose: () => void;
}

export default function JoinMatchScreen({
  joinForm,
  onJoinCodeChange,
  onJoinMatch,
  onClose
}: Props) {
  const { colors } = useTheme();
  return (
    <AnimatedScreen style={{ flex: 1, backgroundColor: colors.background }}>
      <PageHeader title="Match" subtitle="Join an existing match" imageSource={require('@/assets/images/tactics.png')}/>
      <JoinForm
        joinForm={joinForm}
        onGameCodeChange={onJoinCodeChange}
        onJoinMatch={onJoinMatch}
        onClose={onClose}
      />
    </AnimatedScreen>
  );
}
