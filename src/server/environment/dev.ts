import { IEnv } from '../interface/IEnv'

export const ENV:IEnv = {
    stage: process.env.ENVIRONMENT,
    port: Number(process.env.API_PORT),
    webSocketPort: Number(process.env.WEB_SOCKET_PORT),
    domain: process.env.DOMAIN,
    apiPath: process.env.API_PATH,
    staticPath: process.env.STATIC_PATH,
    appKeyBitso: process.env.APP_KEY_BITSO,
    appSignatureBitso: process.env.APP_SIGNATURE_BITSO,
    appNonceBitso: process.env.APP_NONCE_BITSO,
    appKeyCryMkt: process.env.APP_KEY_CRYPMKT,
    appSignatureCryMkt: process.env.APP_SIGNATURE_CRYPMKT,
    appNonceCryMkt: process.env.APP_NONCE_CRYPMKT,
    db:{
        name: 'COLLECTION_NAME',
        user:'',
        pw: '',
        account: '@mongo-account',
        uri: (user: string, pw :string, name :string, account: string) => {
            return `mongodb+srv://${user}:${pw}${account}.gcp.mongodb.net/${name}?retryWrites=true&w=majority`
        }
    },
}


