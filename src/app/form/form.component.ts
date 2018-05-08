import {Component, OnInit} from '@angular/core';
import {CurrenciesService} from '../services/currencies.service';

@Component ({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [CurrenciesService]
})


export class FormComponent implements OnInit {


  selectedCurrency;

  baseCurrencies = {};
  notSelectedCurrencies;
  selectedDate;

  bankRates;

  constructor (private currenciesService: CurrenciesService) {}


  onChange() {

    this.currenciesService.setBaseCurrency(this.selectedCurrency);

    this.currenciesService.setSelectedDate(this.selectedDate);

    this.currenciesService.setUnselectedCurrencies(this.selectedCurrency);

    this.currenciesService.getJsonCurrencies().subscribe( data => {
      this.bankRates = data;
    });

  }

  ngOnInit() {

    this.selectedCurrency = this.currenciesService.selectedCurrency;

    this.currenciesService.setUnselectedCurrencies(this.selectedCurrency);

    this.notSelectedCurrencies = this.currenciesService.notSelectedCurrencies;

    this.baseCurrencies = this.currenciesService.baseCurrencies;

    this.selectedDate = this.currenciesService.selectedDate;

    this.currenciesService.getJsonCurrencies().subscribe( data => {
      this.bankRates = data;
    });

  }

}
