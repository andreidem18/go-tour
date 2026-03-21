require('dotenv').config();
const { mkdirSync, writeFileSync } = require('fs');

const envFileContent = `
export const environment = {
  apiUrl: "${process.env['API_URL']}",
  mapboxToken: "${process.env['MAPBOX_TOKEN']}",
}
`;

mkdirSync('./src/environments/', { recursive: true });

writeFileSync('./src/environments/environment.ts', envFileContent);
writeFileSync('./src/environments/environment.prod.ts', envFileContent);
