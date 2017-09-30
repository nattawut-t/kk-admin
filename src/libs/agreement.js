export const data = (raw = {}) => {
  const { isConsent } = raw;
  return {
    isConsent: isConsent || false,
  };
};

export default {
  data,
};
