import CustomButton from '@/components/custom/CustomButton';
import CustomInput from '@/components/custom/CustomInput';
import CustomSelect from '@/components/custom/CustomSelect';
import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, Target, X } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface Props {
  hostForm: {
    name: string;
    location: string;
    time: string;
    players_count: number;
    maxPlayers: number;
  };
  onNameChange: (text: string) => void;
  onLocationChange: (text: string) => void;
  onTimeChange: (text: string) => void;
  onFormationChange: (value: string) => void;
  onCreateMatch: () => void;
  onClose: () => void;
}

// Component
export default function HostForm({
  hostForm,
  onNameChange,
  onLocationChange,
  onTimeChange,
  onFormationChange,
  onCreateMatch,
  onClose
}: Props) {
  const { colors } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  // Helper functions
  const formatDate = (date: Date) => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${weekday} - ${dd}/${mm}/${yyyy}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const combinedDateTime = `${formatDate(selectedDate)} | ${formatTime(selectedTime)}`;
      onTimeChange(combinedDateTime);
      if (Platform.OS === 'android') {
        setTimeout(() => setShowTimePicker(true), 100);
      }
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setSelectedTime(selectedTime);
      const combinedDateTime = `${formatDate(selectedDate)} | ${formatTime(selectedTime)}`;
      onTimeChange(combinedDateTime);
    }
  };

  const isFormValid = hostForm.name.trim() && hostForm.location.trim() && hostForm.time.trim() && hostForm.players_count;

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
            <Text style={[styles.hostFormTitle, { color: colors.foreground }]}>Enter Match Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.hostFormContent}>
            <View style={[styles.iconButton, { backgroundColor: colors.primary }]}>
              <Target size={32} color={colors.primaryForeground} />
            </View>

            <View style={styles.formFields}>
              <CustomInput
                key="match-name"
                placeholder="Match Name"
                type="text"
                value={hostForm.name}
                onChangeText={onNameChange}
                style={styles.input}
              />
              <CustomInput
                key="match-location"
                placeholder="Location"
                type="text"
                value={hostForm.location}
                onChangeText={onLocationChange}
                style={styles.input}
              />
              <TouchableOpacity
                style={[styles.dateTimeButton, {
                  backgroundColor: colors.accent,
                  borderColor: colors.border,
                }]}
                onPress={() => setShowDatePicker(true)}
              >
                <Calendar size={20} color={colors.muted} />
                <Text style={[styles.dateTimeText, { color: colors.foreground }]}>
                  {hostForm.time || 'Select Date & Time'}
                </Text>
              </TouchableOpacity>
              <CustomSelect
                key="match-formation"
                placeholder="Select Formation"
                values={[
                  { label: '5v5', value: '5' },
                  { label: '6v6', value: '6' },
                  { label: '7v7', value: '7' },
                  { label: '8v8', value: '8' },
                  { label: '9v9', value: '9' },
                  { label: '10v10', value: '10' },
                  { label: '11v11', value: '11' },
                ]}
                onValueChange={onFormationChange}
                selectedValue={hostForm.players_count ? hostForm.players_count.toString() : undefined}
                style={styles.input}
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

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120, // Extra padding for tab bar
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
  },
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
  dateTimeText: {
    fontSize: 16,
    flex: 1,
  },
  hostFormFooter: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
});
