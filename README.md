# Crypto Arbitration Bot :robot:

A project made to arbitrate a cryptocurrency on two different exchanges, **Bitso** and **CryptoMarket** :rocket:. 

The arbitration criterion is %5

```
git clone https://github.com/tomastp/crypto-arbitration-bot.git
cd  crypto-arbitration-bot
```

After that, you need to generate a .env file in the root directory with this variables :ghost: :
```
ENVIRONMENT=dev
EXPRESS_PORT=8000
WEB_SOCKET_PORT=8001
DOMAIN=http://127.0.0.1
APP_KEY_BITSO=yourAppKeyBitso
APP_SIGNATURE_BITSO=yourAppSignatureBitso
APP_NONCE_BITSO=yourNonceBitso
APP_KEY_CRYPMKT=youtKeyCryptoMarket
APP_SIGNATURE_CRYPMKT=yourSignatureCryptoMarket
APP_NONCE_CRYPMKT=yourNonceCryptoMarket
MONGO_DB_USER=DBUSER
MONGO_DB_PW=SECRETPASSWORD
MONGO_DB_HOST=HOST
MONGO_DB_DATABASE=MYDATABASE
```

To get started locally run:
```
npm install
npm run build-server
npm run dev-concurrently
```
Now you should see the client bot at http://127.0.0.1:8000  :raised_hands:

You can also connect [Postman](https://www.postman.com) or your preferred client to consume the websocket :wink:

Events:

```
**update-prices**      | *Get all prices updated every minute*
**update-arbitration** | *Get all new arbitrations made by the bot*
```
