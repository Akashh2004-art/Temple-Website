export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    let cleanPhone = phone.replace(/\D/g, '');
  
    // Remove leading 91 if present
    if (cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.substring(2);
    }
  
    // Check if the number starts with 0
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.substring(1);
    }
  
    // Check if we have a valid 10-digit number
    if (cleanPhone.length !== 10) {
      console.log('Invalid phone number:', cleanPhone);
      throw new Error('Please enter a valid 10-digit number');
    }
  
    // Return just the 10 digit number without any prefix
    return cleanPhone;
  };
  
  // Helper function to validate phone number
  export const isValidPhoneNumber = (phone: string): boolean => {
    try {
      formatPhoneNumber(phone);
      return true;
    } catch (error) {
      return false;
    }
  };