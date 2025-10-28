import RegisterLayout from "@/components/Layouts/RegisterLayout";
import AgeInput from "@/components/custom/AgeInput";
import CustomButton from "@/components/custom/CustomButton";
import CustomInput from "@/components/custom/CustomInput";
import PositionSelector from "@/components/custom/PositionSelector";
import { typography } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { StaticQuestions } from "@/data/questions";
import { useTheme } from "@/hooks/useTheme";
import { FirestoreService } from "@/services/firestoreService";
import { Form } from "@/types/form";
import { Position } from "@shared/types";
import { Redirect } from "expo-router";
import { Ruler, Target, User, Weight } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function register() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>({
    name: "",
    age: 25,
    height: 0,
    weight: 0,
    position: ""
  })
  if (!user) {
    return <Redirect href="/(auth)/signIn" />;
  }

  function handlePress() {
    setStep(step + 1)
  }

  function handleBack() {
    if (step > 0)
      setStep(step - 1)
  }

  if (step == 5){
    createPlayer(form, user.id, user.email)
    return <Redirect href={"/(tabs)/dashboard"}/>
  }
  const getIcon = () => {
    switch (step) {
      case 0: return User;
      case 1: return User;
      case 2: return Ruler;
      case 3: return Weight;
      case 4: return Target;
      default: return User;
    }
  };

  const questions = StaticQuestions;
  var question = questions[step];
  const IconComponent = getIcon();
  const currentKey = question.key as keyof Form
  const currentValue = form[currentKey]
  const isDisabled = step !== 4
                        ? !currentValue || (typeof currentValue === "number" && currentValue === 0)
                        : !currentValue || currentValue === ""



  return (
    <RegisterLayout
      currentStep={step + 1}
      totalSteps={5}
      onBack={step > 0 ? handleBack : undefined}
    >
      <View style={styles.content}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.primary }]}>
          <IconComponent size={32} color={colors.primaryForeground} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.foreground }]}>
          {question.label}
        </Text>

        <Text style={[styles.description, { color: colors.muted }]}>
          {question.description}
        </Text>

        {step === 1 && (
          <AgeInput
            value={form.age}
            onChangeValue={(value) => setForm(prev => ({ ...prev, age: value }))}
          />
        )}

        {step !== 1 && step !== 4 && (
          <CustomInput
            key={step || 0}
            placeholder={question.placeholder}
            type={question.inputType}
            unit={question.unit}
            value={currentValue?.toString() || ""}
            onChangeText={text => {
              setForm(prev => ({
                ...prev,
                [question.key]:
                  question.inputType === "number" ? Number(text) : text
              }))
            }}
          />
        )}

        {step === 4 && (
          <PositionSelector
            selectedPosition={form.position}
            onPositionSelect={(position) => setForm(prev => ({ ...prev, position }))}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton onPress={handlePress} disabled={isDisabled}>
          {step === 4 ? "Complete Setup" : "Continue"}
        </CustomButton>
      </View>
    </RegisterLayout>
  )
}

async function createPlayer(form: Form, userId: string, email: string) {
  try {
    const firestoreService = FirestoreService.getInstance();
    const positionMap: { [key: string]: Position } = {
      'GK': Position.GK,
      'DEF': Position.DEF,
      'MID': Position.MID,
      'FWD': Position.FWD,
    };

    const playerData = {
      name: form.name,
      favourite_position: positionMap[form.position],
      physicalAttributes: {
        age: form.age,
        height: form.height,
        weight: form.weight,
      },
      initials: form.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2),
    };

    const result = await firestoreService.createPlayer(userId, email, form.name, playerData);
    if (!result.success) {
      console.error('Failed to create player profile:', result.error);
    }
  } catch (error) {
    console.error('Error creating player profile:', error);
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: 20,
  },
  iconButton: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: typography.fontFamily.spaceGrotesk,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
    fontFamily: typography.fontFamily.kalamBold,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
