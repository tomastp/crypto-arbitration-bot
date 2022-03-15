export interface IEnv {
    stage?: string
    port: number
    webSocketPort: number
    db: IMongoDBCfg
    domain?: string
    appKeyBitso?: string
    appSignatureBitso?: string
    appNonceBitso?: string
    appKeyCryMkt?: string
    appSignatureCryMkt?: string
    appNonceCryMkt?: string
}

export interface IMongoDBCfg {
    name: string
    user: string
    pw: string
    account: string
    host: string,
    uri: string
}