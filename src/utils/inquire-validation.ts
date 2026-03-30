export type ValidationRule = {
  rule: string;
  value: string | number | boolean;
  error_message?: string;
};

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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
      const regexPattern = new RegExp(String(validationValue));
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
