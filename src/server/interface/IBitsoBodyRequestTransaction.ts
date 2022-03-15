export interface IBitsoBodyRequestTransaction {
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
        origin_id: number
    }
}
