import CustomButton from '@/components/custom/CustomButton';
import CustomInput from '@/components/custom/CustomInput';
import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, Target, X } from 'lucide-react-native';
import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AgeInput from '../custom/NumericInput';
import { MatchInfo } from '@shared/types';

interface Props {
  hostForm: MatchInfo;
  onNameChange: (text: string) => void;
  onLocationChange: (text: string) => void;
  onTimeChange: (date: Date) => void;
  onFormationChange: (value: number) => void;
  onCreateMatch: () => void;
  onClose: () => void;
}

export default function HostForm({
  hostForm,
  onNameChange,
  onLocationChange,
  onTimeChange,
  onFormationChange,
  onCreateMatch,
  onClose,
}: Props) {
  const { colors } = useTheme();

  const [showDateTimePicker, setShowDateTimePicker] = useState<
    boolean | 'date' | 'time'
  >(false);
  const [pendingDate, setPendingDate] = useState<Date | null>(null);

  // Open the picker
  const openDateTimePicker = () => {
    if (Platform.OS === 'ios') {
      setShowDateTimePicker(true);
    } else {
      setShowDateTimePicker('date');
    }
  };

  // iOS handler
  const handleIOSChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) onTimeChange(selectedDate);
  };

  // Android date handler
  const handleAndroidDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowDateTimePicker(false);
      return;
    }
    if (selectedDate) {
      setPendingDate(selectedDate);
      setShowDateTimePicker('time');
    }
  };

  // Android time handler
  const handleAndroidTimeChange = (event: any, selectedTime?: Date) => {
    setShowDateTimePicker(false);
    if (selectedTime && pendingDate) {
      const combined = new Date(pendingDate);
      combined.setHours(selectedTime.getHours());
      combined.setMinutes(selectedTime.getMinutes());
      combined.setSeconds(selectedTime.getSeconds());
      onTimeChange(combined);
    }
    setPendingDate(null);
  };

  const isFormValid =
    hostForm.name.trim() &&
    hostForm.location.trim() &&
    hostForm.date &&
    hostForm.capacity;

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

            <Text style={[styles.hostFormTitle, { color: colors.foreground }]}>
              Enter Match Details
            </Text>

            <View style={{ width: 24 }} />
          </View>

          <View style={styles.hostFormContent}>
            <View style={[styles.iconButton, { backgroundColor: colors.primary }]}>
              <Target size={32} color={colors.primaryForeground} />
            </View>

            <View style={styles.formFields}>
              <CustomInput
                placeholder="Match Name"
                type="text"
                value={hostForm.name}
                onChangeText={onNameChange}
                style={styles.input}
              />

              <CustomInput
                placeholder="Location"
                type="text"
                value={hostForm.location}
                onChangeText={onLocationChange}
                style={styles.input}
              />

              {/* Unified Date + Time Picker */}
              <TouchableOpacity
                style={[
                  styles.dateTimeButton,
                  { backgroundColor: colors.accent, borderColor: colors.border },
                ]}
                onPress={openDateTimePicker}
              >
                <Calendar size={20} color={colors.muted} />
                <Text style={[styles.dateTimeText, { color: colors.foreground }]}>
                  {hostForm.date
                    ? `${hostForm.date.toLocaleDateString()} | ${hostForm.date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    : 'Select Date & Time'}
                </Text>
              </TouchableOpacity>

              <AgeInput
                value={hostForm.capacity}
                placeHolder="Range"
                unit="Players"
                min={10}
                max={22}
                step={2}
                onChangeValue={onFormationChange}
              />
            </View>
          </View>

          <View style={styles.hostFormFooter}>
            <CustomButton onPress={onCreateMatch} disabled={!isFormValid}>
              Create Match
            </CustomButton>
          </View>
        </View>
      </ScrollView>

      {/* Pickers */}
      {Platform.OS === 'ios' && showDateTimePicker && (
        <DateTimePicker
          value={hostForm.date || new Date()}
          mode="datetime"
          display="default"
          onChange={handleIOSChange}
        />
      )}

      {Platform.OS === 'android' && showDateTimePicker === 'date' && (
        <DateTimePicker
          value={pendingDate || hostForm.date || new Date()}
          mode="date"
          display="default"
          onChange={handleAndroidDateChange}
        />
      )}

      {Platform.OS === 'android' && showDateTimePicker === 'time' && (
        <DateTimePicker
          value={hostForm.date || new Date()}
          mode="time"
          display="default"
          onChange={handleAndroidTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 120 },
  hostFormContainer: { flex: 1, paddingTop: 60 },
  hostFormHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: { padding: 8 },
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
  formFields: { width: '100%', gap: 16 },
  input: { width: '100%' },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    gap: 12,
    height: 56,
    borderRadius: 10,
  },
  dateTimeText: { fontSize: 16, flex: 1 },
  hostFormFooter: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
});
