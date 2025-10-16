import axios from "axios";

export const AccessGeolocationAPI = async () => {
  const data = await axios.get(`https://ipwho.is/`);
  const info = {
    city: data.data.city,
    country: data.data.country,
    lat: data.data.latitude,
    long: data.data.longitude,
  };
  return info;
};
export default AccessGeolocationAPI;
