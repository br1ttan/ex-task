import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ExchangeRatesService } from '@features/exchange';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public readonly rates$ = this.exchangeRatesService.rates$;

  constructor(
    private readonly exchangeRatesService: ExchangeRatesService
  ) {}
}
