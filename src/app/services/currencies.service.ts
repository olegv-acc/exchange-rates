import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';




@Injectable()

export class CurrenciesService {

  selectedCurrency = 'EUR';
  baseCurrencies = ['EUR','USD','GBP','AUD','CAD','JPY'];
  notSelectedCurrencies;
  bankRates;
  ourRates;


  getTodayDate = () => {
    let myDate = new Date();
    return myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate();
  };

  selectedDate = this.getTodayDate();

  constructor (private httpClient: HttpClient) {}

  setSelectedDate(selected) {
    this.selectedDate = selected;
  }

  setBaseCurrency(selected) {
    this.selectedCurrency = selected;
  }

  setUnselectedCurrencies(selected) {
    this.notSelectedCurrencies = this.baseCurrencies.filter( el => el !== selected).join(',');
  }

  getCurrencies() {
    return this.httpClient.get<any>('https://exchangeratesapi.io/api/' + this.selectedDate + '?base=' + this.selectedCurrency + '&symbols=' +  this.notSelectedCurrencies )
      .map( response => response.rates );
  }

  static calcSurcharge( val, percentage, updown ) {
    let num = parseFloat(val);
    if (updown == 'up') {
      return (num - (num * percentage)).toFixed(4);
    }
    if(updown == 'down') {
      return (num + (num * percentage)).toFixed(4);
    }
  }

  getRates() {
    this.getCurrencies().subscribe(resp => { this.bankRates = resp; });
    // for (let key in this.bankRates) {
    //   this.ourRates.name = Object.getOwnPropertyNames(this.bankRates);
    //   this.ourRates.sell = CurrenciesService.calcSurcharge(this.bankRates[key], 5, 'up');
    //   this.ourRates.buy = CurrenciesService.calcSurcharge(this.bankRates[key], 5, 'down');
    // }
    return this.bankRates;
  }


}
