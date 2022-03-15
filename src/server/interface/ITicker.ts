export interface ITicker {
    symbol: string,
    high: number,
    low: number,
    volume: number,
    bid: number, // buying price
    ask: number, // selling price
}