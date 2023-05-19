import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, map, switchMap, of } from 'rxjs';
import { ExchangeRatesApi } from '../api';
import { IRates, IExchangedCurrency, IPair } from '../interfaces';
import { ExchangeRatesAdaptor } from '../adaptors';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
  public rates$ = this.exchangeApi.getExchangeRates().pipe(
    switchMap((data) =>
      this.exchangeRatesAdaptor.adaptToCurrencyInfoArray(
        of({
          uah: data.conversion_rates.UAH,
          usd: data.conversion_rates.USD,
          eur: data.conversion_rates.EUR,
        })
      )
    )
  );

  constructor(
    private readonly exchangeApi: ExchangeRatesApi,
    private readonly exchangeRatesAdaptor: ExchangeRatesAdaptor
  ) {}

  public getExchangeRates(): Observable<IRates> {
    return this.exchangeApi.getExchangeRates();
  }

  public getExchangeRatesByPair(
    pair: IPair,
    amount: string
  ): Observable<IExchangedCurrency> {
    return this.exchangeApi.getExchangeRatesByPair(pair, amount);
  }
}
