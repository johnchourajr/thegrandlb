export type Option = {
  title: string;
  value: string;
};

export type ValidationRule = {
  rule: string;
  value: any;
  error_message: string;
};

export type Question = {
  title: string;
  placeholder: string;
  question_type: "dropdown" | "number" | "text" | "date_picker" | "text_area";
  question_key: string;
  required: boolean;
  options: Option[];
  validations: ValidationRule;
  error_message: string;
  data_type: string;
};

export type FormPage = {
  title: string;
  description: string;
  page_key: string;
  questions: Question[];
};

export function validateForm(formData: FormPage[]): boolean {
  // Iterate over the form pages
  for (const page of formData) {
    // Iterate over the questions in each page
    for (const question of page.questions) {
      // Perform your validation logic here for each question
      // Access the properties using dot notation
      // console.log(question.title);
      // console.log(question.question_type);
      // console.log(question.required);
      // ...
    }
  }

  return true; // Replace this with your actual validation logic
}

export function getFormData(): FormPage[] {
  const jsonData = require("./form.json");
  return jsonData as FormPage[];
}

export const fieldTypes = {
  event_name: "",
  event_type: "",
  desired_date: "",
  desired_time: "",
  head_count: "",
  desired_space: "",
  full_name: "",
  email: "",
  phone: "",
  additional_details: "",
};

export type FieldTypeValues =
  | "event_name"
  | "event_type"
  | "desired_date"
  | "desired_time"
  | "head_count"
  | "desired_space"
  | "full_name"
  | "email"
  | "phone"
  | "additional_details";

export type FieldTypes = {
  [K in keyof typeof fieldTypes]: string | number;
};

export interface FormStateType {
  [key: string]: FieldTypes;
}

export interface FieldValue {
  value: any;
  isValid?: boolean;
  page_key?: string;
}

export interface FormState {
  [fieldName: string]: FieldValue;
}

export interface InputProps {
  name: FieldTypes;
  page_key: string;
  onBlur: () => void;
  placeholder: string;
  handleFormChange: (
    fieldName: FieldTypes,
    value: any,
    pageKey: string,
    validations?: any
  ) => void;
  validations: any;
  value: any;
  options: string[]; // Update with the appropriate type for options
  className?: string;
}
