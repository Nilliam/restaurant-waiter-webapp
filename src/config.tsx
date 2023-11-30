const isProduction = import.meta.env.MODE === "production";
const url = import.meta.env.VITE_APP_URL;
const originUrl = window.location.origin;

const envUrl = () => {
  if (isProduction) {
    return `${originUrl}/api`;
  }
  return url;
};

export default envUrl;
