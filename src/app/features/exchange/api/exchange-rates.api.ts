import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IExchangedCurrency, IRates, IPair } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesApi {
  private readonly apiUrl =
    'https://v6.exchangerate-api.com/v6/a5dc1e27c2d85985fa45b49d/latest/UAH';
  private readonly pairApiUrl =
    'https://v6.exchangerate-api.com/v6/a5dc1e27c2d85985fa45b49d/pair';

  constructor(private readonly http: HttpClient) {}

  public getExchangeRates(): Observable<IRates> {
    return this.http.get<IRates>(this.apiUrl);
  }

  public getExchangeRatesByPair(
    pair: IPair,
    amount: string
  ): Observable<IExchangedCurrency> {
    return this.http.get<any>(
      `${this.pairApiUrl}/${pair.from}/${pair.to}/${amount}`
    );
  }
}
