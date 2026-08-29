import "dotenv/config";
import axios from "axios";

export const tmdbClient = axios.create({
  baseURL: process.env.TMDB_API_BASE_URL!,
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
  },
});
