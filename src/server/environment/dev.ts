import { IEnv } from '../interface'

export const ENV:IEnv = {
    stage: process.env.ENVIRONMENT,
    port: Number(process.env.EXPRESS_PORT),
    webSocketPort: Number(process.env.WEB_SOCKET_PORT),
    domain: process.env.DOMAIN,
    appKeyBitso: process.env.APP_KEY_BITSO,
    appSignatureBitso: process.env.APP_SIGNATURE_BITSO,
    appNonceBitso: process.env.APP_NONCE_BITSO,
    appKeyCryMkt: process.env.APP_KEY_CRYPMKT,
    appSignatureCryMkt: process.env.APP_SIGNATURE_CRYPMKT,
    appNonceCryMkt: process.env.APP_NONCE_CRYPMKT,
    db:{
        name: process.env.DB_DATABASE!,
        user:process.env.DB_USER!,
        pw: process.env.DB_PW!,
        host: process.env.DB_HOST!,
        account: '@mongo-account',
        uri: `mongodb+srv://${process.env.DB_USER!}:${process.env.DB_PW!}${process.env.DB_HOST!}${process.env.DB_NAME!}?retryWrites=true&w=majority`
    },
}


