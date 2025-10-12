export interface Form {
  name: string;
  age: number;
  height: number;
  weight: number;
  position: string;
}

export interface Question {
  label: string;
  description: string;
  placeholder: string;
  icon: string;
  inputType: "number" | "text" | "password" | "email";
  unit: string;
  key: string;
}

export interface SelectionBox {
  option: string;
  value: string;
  description: string;
}
