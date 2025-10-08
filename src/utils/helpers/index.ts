export const messageError = (error: any, defaultMessage: string) => {
  if (Array.isArray(error.message)) {
    return error.message.join(', ');
  }
  return error.message || defaultMessage;
};
