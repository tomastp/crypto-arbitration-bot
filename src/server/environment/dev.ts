import { IEnv } from '../interface/IEnv'

export const ENV:IEnv = {
    stage: process.env.ENVIRONMENT,
    port: Number(process.env.API_PORT),
    webSocketPort: Number(process.env.WEB_SOCKET_PORT),
    domain: process.env.DOMAIN,
    apiPath: process.env.API_PATH,
    staticPath: process.env.STATIC_PATH,
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


