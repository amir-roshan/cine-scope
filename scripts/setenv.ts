const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config(); // Load variables from .env

const targetPath = './src/environments/environment.development.ts';
const envConfigFile = `export const environment = {
  production: true,
  API_KEY: "${process.env['API_KEY']}",
  BASE_URL:"${process.env['BASE_URL']}",
  GENRE_URL: "${process.env['GENRE_URL']}",
  SELECT_GENRE: "${process.env['SELECT_GENRE']}",
};`;

fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log(`Environment file generated at: ${targetPath}`);
