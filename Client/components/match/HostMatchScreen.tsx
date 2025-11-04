import AnimatedScreen from '@/components/animated/AnimatedScreen';
import HostForm from '@/components/match/HostForm';
import { useTheme } from '@/hooks/useTheme';
import PageHeader from '../custom/PageHeader';
import { MatchInfo } from '@shared/types';

interface Props {
  hostForm: MatchInfo,
  onNameChange: (text: string) => void;
  onLocationChange: (text: string) => void;
  onTimeChange: (date: Date) => void;
  onFormationChange: (value: number) => void;
  onCreateMatch: () => void;
  onClose: () => void;
}

export default function HostMatchScreen({
  hostForm,
  onNameChange,
  onLocationChange,
  onTimeChange,
  onFormationChange,
  onCreateMatch,
  onClose
}: Props) {
  const { colors } = useTheme();

  return (
    <AnimatedScreen style={{ flex: 1, backgroundColor: colors.background }}>
      <PageHeader title="Host Match" subtitle="Create a new match" imageSource={require('@/assets/images/tactics.png')} />
      <HostForm
        hostForm={hostForm}
        onNameChange={onNameChange}
        onLocationChange={onLocationChange}
        onTimeChange={onTimeChange}
        onFormationChange={onFormationChange}
        onCreateMatch={onCreateMatch}
        onClose={onClose}
      />
    </AnimatedScreen>
  );
}
