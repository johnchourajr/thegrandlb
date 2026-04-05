export type ValidationRule = {
  rule: string;
  value: string | number | boolean;
  error_message?: string;
};

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/;
const MIN_LENGTH_1_REGEX = /^.{1,}$/;
const MIN_LENGTH_2_REGEX = /^.{2,}$/;
const MIN_LENGTH_3_ANY_CHAR_REGEX = /^[\s\S]{3,}$/;
const MAX_LENGTH_500_REGEX = /^.{0,500}$/;

const SAFE_REGEX_PATTERNS: Record<string, RegExp> = {
  "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$": EMAIL_REGEX,
  "^\\d{3}-\\d{3}-\\d{4}$": PHONE_REGEX,
  "^.{1,}$": MIN_LENGTH_1_REGEX,
  "^.{2,}$": MIN_LENGTH_2_REGEX,
  "^[\\s\\S]{3,}$": MIN_LENGTH_3_ANY_CHAR_REGEX,
  "^.{0,500}$": MAX_LENGTH_500_REGEX,
};

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const validateValueWithRule = (
  value: string | number,
  validations?: ValidationRule | null
): boolean => {
  if (!validations) return true;

  const { rule, value: validationValue } = validations;

  switch (rule) {
    case "regex": {
      if (typeof validationValue !== "string") {
        return false;
      }

      const regexPattern = SAFE_REGEX_PATTERNS[validationValue];
      if (!regexPattern) {
        return false;
      }

      return regexPattern.test(String(value));
    }
    case "min_value": {
      const numericValue = Number(value);
      const minValue = Number(validationValue);
      if (!Number.isFinite(numericValue) || !Number.isFinite(minValue)) {
        return false;
      }
      return numericValue >= minValue;
    }
    case "max_length":
      return String(value).length <= Number(validationValue);
    default:
      return true;
  }
};
