export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactMessage;

export type ContactValidationErrors = Partial<Record<ContactField, string>>;

export interface ContactValidationResult {
  isValid: boolean;
  errors: ContactValidationErrors;
  data: ContactMessage;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const trimMessage = (message: ContactMessage): ContactMessage => ({
  name: message.name.trim(),
  email: message.email.trim(),
  message: message.message.trim(),
});

export const validateContactMessage = (
  message: ContactMessage,
): ContactValidationResult => {
  const data = trimMessage(message);
  const errors: ContactValidationErrors = {};

  if (data.name.length < 2) {
    errors.name = 'Ingresa al menos 2 caracteres.';
  }

  if (!emailPattern.test(data.email)) {
    errors.email = 'Ingresa un correo valido.';
  }

  if (data.message.length < 10) {
    errors.message = 'Escribe un mensaje de al menos 10 caracteres.';
  }

  if (data.message.length > 1000) {
    errors.message = 'El mensaje no debe superar 1000 caracteres.';
  }

  return {
    data,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
