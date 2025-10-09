import axios from "axios";

export const AccessGeolocationAPI = () => {
  return axios.get(
    "http://ip-api.com/json/?fields=status,message,country,city,lat,lon"
  );
};
export default AccessGeolocationAPI;
