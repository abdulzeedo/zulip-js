type ConfigI = {
    realm: string,
    username: string,
    apiURL: string,
}

interface Config extends ConfigI {
    password?: string,
    apiKey: string,
}

interface InternalConfig extends ConfigI {
}