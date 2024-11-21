import { config } from './config';

interface Environment {
  API_KEY: string;
  BASE_URL: string;
  GENRE_URL: string;
  SELECT_GENRE: string;
}

export const environment: Environment = {
  API_KEY: config.API_KEY,
  BASE_URL: config.BASE_URL,
  GENRE_URL: config.GENRE_URL,
  SELECT_GENRE: config.SELECT_GENRE,
};
