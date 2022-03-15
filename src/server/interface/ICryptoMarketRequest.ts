export interface ICryptoMarketRequest {
    headers: {
        key: string
        signature: string
        nonce: string
    }
    body: {
        symbol: string
        side: string
        type: string
        major: number
        origin_id: number
    }
}
