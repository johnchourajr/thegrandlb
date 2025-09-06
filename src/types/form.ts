/**
 * Form Component Types
 *
 * Type definitions for form handling and validation.
 */

// Form field types
export type FieldTypes =
  | "first_name"
  | "last_name"
  | "email"
  | "phone"
  | "event_type"
  | "event_date"
  | "guest_count"
  | "budget"
  | "additional_details"
  | "preferred_contact";

// Form state structure
export interface FormStateType {
  [key: string]: FieldTypes;
}

// Individual field value with validation
export interface FieldValue {
  value: string | number | boolean;
  isValid?: boolean;
  page_key?: string;
}

// Complete form state
export interface FormState {
  [fieldName: string]: FieldValue;
}

// Form input component props
export interface InputProps {
  name: FieldTypes;
  page_key: string;
  onBlur: () => void;
  placeholder: string;
  handleFormChange: (
    fieldName: FieldTypes,
    value: string | number | boolean,
    pageKey: string,
    validations?: ValidationRules
  ) => void;
  validations: ValidationRules;
  value: string | number | boolean;
  options: string[];
  className?: string;
}

// Validation rules
export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
}

// Form submission data
export interface FormSubmissionData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  guest_count?: number;
  budget?: string;
  additional_details?: string;
  preferred_contact?: string;
}
