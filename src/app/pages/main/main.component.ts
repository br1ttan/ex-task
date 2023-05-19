import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  ICurrencyInfo,
  ExchangeRatesService,
  IExchangedCurrency,
  IPair,
} from '@features/exchange';
import { PairEnum } from '@features/exchange/enums';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

enum LastTouchedField {
  From = 'from',
  To = 'to',
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnDestroy {
  public rates$: Observable<ICurrencyInfo[]> = this.exchangeRatesService.rates$;
  public lastTouchedField = LastTouchedField;
  public fromCurrency: PairEnum = PairEnum.UAH;
  public toCurrency: PairEnum = PairEnum.USD;
  public valueFromInput = '';
  public valueToInput = '';
  public isButtonDisabled = false;
  public lastTouched: LastTouchedField = LastTouchedField.From;

  private destroy$ = new Subject<void>();

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private changeDetector: ChangeDetectorRef
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleExchangeClick(valueFrom: string, valueTo: string): void {
    this.isButtonDisabled = true;

    if (this.lastTouched === LastTouchedField.From) {
      this.exchangeCurrencyDefault(
        this.fromCurrency,
        this.toCurrency,
        valueFrom
      );
    } else {
      this.exchangeCurrencyAround(this.toCurrency, this.fromCurrency, valueTo);
    }
  }

  public setLastTouchedField(field: LastTouchedField): void {
    this.lastTouched = field;
  }

  private exchangeCurrencyDefault(
    from: PairEnum,
    to: PairEnum,
    value: string
  ): void {
    this.exchangeRatesService
      .getExchangeRatesByPair({ from, to }, value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.valueToInput = `${data.conversion_result}`;
        this.isButtonDisabled = false;

        this.changeDetector.detectChanges();
      });
  }

  private exchangeCurrencyAround(
    from: PairEnum,
    to: PairEnum,
    value: string
  ): void {
    this.exchangeRatesService
      .getExchangeRatesByPair({ from, to }, value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.valueFromInput = `${data.conversion_result}`;
        this.isButtonDisabled = false;

        this.changeDetector.detectChanges();
      });
  }
}
