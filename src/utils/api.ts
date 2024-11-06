export const getOneClickEnvsOrthrow = () => {
  const apiKey = process.env.ONE_CLICK_API_KEY;
  const apiURL = process.env.ONE_CLICK_API_URL;
  if (!apiKey || !apiURL) throw new Error('ONE_CLICK envs not set');

  return { apiKey, apiURL };
};
