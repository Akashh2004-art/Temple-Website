export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const validateName = (name: string): boolean => {
  return name.length >= 2
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^01[3-9]\d{8}$/
  return phoneRegex.test(phone)
} 