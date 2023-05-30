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
  question_type: string;
  question_key: string;
  required: boolean;
  options: Option[];
  validations: ValidationRule[];
  error_message: string;
  data_type: string;
};

export type FormPage = {
  title: string;
  description: string;
  page_key: string;
  questions: Question[];
};

export type FormDataType = {
  pages: FormPage[];
};

export function validateForm(formData: FormDataType): boolean {
  // Iterate over the form pages
  for (const page of formData.pages) {
    // Iterate over the questions in each page
    for (const question of page.questions) {
      // Perform your validation logic here for each question
      // Access the properties using dot notation
      console.log(question.title);
      console.log(question.question_type);
      console.log(question.required);
      // ...
    }
  }

  return true; // Replace this with your actual validation logic
}

export function getFormData(): FormData {
  const jsonData = require("./form.json");
  return jsonData as FormData;
}

export function getFormPages(): FormPage[] {
  const jsonData = require("./form.json");
  return jsonData.pages as FormPage[];
}
