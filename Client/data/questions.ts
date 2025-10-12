import { Question } from "@/types/form";

export const StaticQuestions: Question[]= [
  {
    label: "What's Your Name?",
    description: "Your full name to display it.",
    placeholder: "Jhon Doe",
    icon: "NONE",
    inputType: "text",
    unit: "",
    key: "name",
  },
  {
    label: "What's Your Age?",
    description: "This helps us match you with players in your age group for fair and competitive games.",
    placeholder: "18",
    icon: "NONE",
    inputType: "number",
    unit: "Years",
    key: "age",
  },
  {
    label: "How Tall Are You?",
    description: "Height helps us balance teams by creating a mix of physical attributes for strategic gameplay.",
    placeholder: "175",
    icon: "NONE",
    inputType: "number",
    unit: "CM",
    key: "height",
  },
  {
    label: "What's Your Weight?",
    description: "Weight is another factor we use to ensure balanced teams with diverse physical strengths.",
    placeholder: "75",
    icon: "NONE",
    inputType: "number",
    unit: "KG",
    key: "weight",
  },
  {
    label: "What's Your Favourite Position?",
    description: "Choose the position where you feel most comfortable and effective on the field.",
    placeholder: "",
    icon: "NONE",
    inputType: "text",
    unit: "",
    key: "position",
  },
]
