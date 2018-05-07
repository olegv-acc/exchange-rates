import {Component, OnInit} from '@angular/core';
import {CurrenciesService} from '../services/currencies.service';

@Component ({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [CurrenciesService]
})


export class FormComponent implements OnInit {

  baseCurrencies = [];
  selectedCurrency;
  notSelectedCurrencies;
  selectedDate;

  constructor (private currenciesService: CurrenciesService) {}

  onChange() {
    this.currenciesService.setBaseCurrency(this.selectedCurrency);
    this.currenciesService.setUnselectedCurrencies(this.selectedCurrency);
    this.currenciesService.setSelectedDate(this.selectedDate);
   console.log('my:',this.currenciesService.getRates());
  }

  ngOnInit() {

    this.baseCurrencies = this.currenciesService.baseCurrencies;
    this.selectedCurrency = this.currenciesService.selectedCurrency;
    this.selectedDate = this.currenciesService.selectedDate;

    this.currenciesService.setUnselectedCurrencies(this.selectedCurrency);
    this.notSelectedCurrencies = this.currenciesService.notSelectedCurrencies;

    this.currenciesService.getRates()
  }
}
