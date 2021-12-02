import { promises as fsPromises } from 'fs';
import { parse } from 'ini';

async function parseConfigFile(filename: string) {
  const data = await fsPromises.readFile(filename, 'utf8');
  const parsedConfig = parse(data);
  const config = {
    realm: parsedConfig.api.site,
    username: parsedConfig.api.email,
    apiKey: parsedConfig.api.key,
    apiURL: `${parsedConfig.api.site}/api/v1`
  };
  return config;
}

export default parseConfigFile;
