export const formatPhoneNumber = (phone: string): string => {
    if (!phone.startsWith('+')) {
      return `+${phone}`;
    }
    return phone;
  };
  