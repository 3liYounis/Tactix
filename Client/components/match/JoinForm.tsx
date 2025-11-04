import CustomButton from '@/components/custom/CustomButton';
import CustomInput from '@/components/custom/CustomInput';
import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { Users, X } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface Props {
  joinForm: {
    gameCode: number;
  };
  onGameCodeChange: (code: number) => void;
  onJoinMatch: () => void;
  onClose: () => void;
}

export default function JoinForm({
  joinForm,
  onGameCodeChange,
  onJoinMatch,
  onClose
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hostFormContainer}>
          <View style={styles.hostFormHeader}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <X size={24} color={colors.foreground} />
            </TouchableOpacity>
            <Text style={[styles.hostFormTitle, { color: colors.foreground }]}>Enter A Match Code</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.hostFormContent}>
            <View style={[styles.iconButton, { backgroundColor: colors.primary }]}>
              <Users size={32} color={colors.primaryForeground} />
            </View>

            <View style={styles.formFields}>
              <CustomInput
                key="join-game-code"
                placeholder="Enter Game Code"
                value={joinForm.gameCode.toString()}
                onChangeText={onGameCodeChange}
                style={styles.input} type={'number'}              />
            </View>
          </View>

          <View style={styles.hostFormFooter}>
            <CustomButton onPress={onJoinMatch} disabled={!joinForm.gameCode}>
              Join Match
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: typography.fontFamily.kalamBold,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  hostFormContainer: {
    flex: 1,
    paddingTop: 60,
  },
  hostFormHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  hostFormTitle: {
    fontSize: 20,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  hostFormContent: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  iconButton: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  formFields: {
    width: '100%',
    gap: 16,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostFormFooter: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
