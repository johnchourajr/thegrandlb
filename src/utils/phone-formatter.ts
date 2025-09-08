// function to format phone number from 555-555-5555 to (555) 555-5555
export const formatPhoneForDatabase = (phoneNumberString: string) => {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return (
      "(" +
      match[1] +
      (match[1] && match[2] ? ") " : "") +
      match[2] +
      (match[2] && match[3] ? "-" : "") +
      match[3]
    );
  }
  return phoneNumberString;
};

export const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return (
      match[1] +
      (match[1] && match[2] ? "-" : "") +
      match[2] +
      (match[2] && match[3] ? "-" : "") +
      match[3]
    );
  }
  return phoneNumberString;
};
