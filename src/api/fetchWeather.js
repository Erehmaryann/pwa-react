import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "c8dce89ed63ef03ef2d9fbdb142c55e5";

// query name of the town we want to get.
export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: "metric",
            APPID: API_KEY,
        }
    });

    return data;
};