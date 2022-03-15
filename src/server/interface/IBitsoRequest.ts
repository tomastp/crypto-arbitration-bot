export interface IBitsoRequest {
    headers: {
        key: string
        signature: string
        nonce: string
    }
    body: {
        book: string
        side: string
        type: string
        major: number
        originId: number
    }
}
