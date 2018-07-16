import axios from "axios";

const API_KEY_ZOMATO = "{API_KEU_ZOMATO}";
const axiosCustom = axios.create({
  baseURL: "https://developers.zomato.com/api/v2.1/",
  timeout: 5000,
  headers: { "user-key": API_KEY_ZOMATO }
});

export default axiosCustom;
