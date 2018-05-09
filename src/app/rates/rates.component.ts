import {Component, OnInit} from '@angular/core';
import {CurrenciesService} from '../services/currencies.service';

@Component ({
  selector: 'app-form',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  providers: [CurrenciesService]
})

export class FormComponent implements OnInit {

  selectedCurrency;
  baseCurrencies = {};
  notSelectedCurrencies;
  selectedDate;
  bankRates;


  sortedDirectionDown = false;
  sortedDirectionUp = false;

  constructor (private currenciesService: CurrenciesService) {}

  onChange() {

    this.currenciesService.setBaseCurrency(this.selectedCurrency);

    this.currenciesService.setSelectedDate(this.selectedDate);

    this.currenciesService.setUnselectedCurrencies(this.selectedCurrency);

    this.currenciesService.getJsonCurrencies().subscribe( data => {
      this.bankRates = data;
    });

    this.sortedDirectionDown = false;
    this.sortedDirectionUp = false;

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

  onClick() {
    let d = this.sortedDirectionDown;
    let u = this.sortedDirectionUp;
    if ( !d && !u ) {this.sortedDirectionDown = true}
    if (  d && !u ) {this.sortedDirectionDown = false; this.sortedDirectionUp = true;}
    if (  !d && u ) {this.sortedDirectionDown = true; this.sortedDirectionUp = false;}
  }
}
