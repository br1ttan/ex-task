import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICurrency } from '../interfaces/currency.interface';
import { ICurrencyInfo } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesAdaptor {
  public adaptToCurrencyInfoArray(
    data: Observable<ICurrency>
  ): Observable<ICurrencyInfo[]> {
    return data.pipe(
      map((data) => [
        {
          currency: 'UAH',
          symbol: '₴',
          cost: data.uah,
        },
        {
          currency: 'USD',
          symbol: '$',
          cost: data.usd,
        },
        {
          currency: 'EUR',
          symbol: '€',
          cost: data.eur,
        },
      ])
    );
  }
}
