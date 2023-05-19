export interface IExchangedCurrency {
    readonly result: string
    readonly documentation: string
    readonly terms_of_use: string
    readonly time_last_update_unix: number
    readonly time_last_update_utc: string
    readonly time_next_update_unix: number
    readonly time_next_update_utc: string
    readonly base_code: string
    readonly target_code: string
    readonly conversion_rate: number
    readonly conversion_result: number
}
