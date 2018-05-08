import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';


@Injectable()

export class CurrenciesService {

  selectedCurrency = 'EUR';
  baseCurrencies = ['EUR','USD','GBP','AUD','CAD','JPY'];
  notSelectedCurrencies = '';

  bankRates = {};
  ourRates = {};


  getTodayDate = () => {
    let myDate = new Date();
    return myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate();
  };

  selectedDate = this.getTodayDate();

  constructor (private httpClient: HttpClient) {}

  setSelectedDate(selected) {
    selected ? this.selectedDate = selected : '';
  }

  setBaseCurrency(selected) {
    this.selectedCurrency = selected;
  }

  setUnselectedCurrencies(selected) {
    this.notSelectedCurrencies = this.baseCurrencies.filter( el => el !== selected).join(',');
  }

  static calcSurcharge( val, percentage: number, updown: string ): number {

    if (updown == 'up') {
      return Number((val - (val * percentage)).toFixed(4));
    }
    if(updown == 'down') {
      return Number((val + (val * percentage)).toFixed(4));
    }
  }

  static getFormattedObj(obj) {
    return Object.entries(obj).map(([key, value]) => {
      return {
        name: key,
        sell: CurrenciesService.calcSurcharge( value, .05, 'up' ),
        our: value,
        buy: CurrenciesService.calcSurcharge( value, .05, 'down' )
      }
    });
  }

  getJsonCurrencies() {
    return this.httpClient.get('https://exchangeratesapi.io/api/' + this.selectedDate + '?base=' + this.selectedCurrency + '&symbols=' +  this.notSelectedCurrencies )
      .map( response => { return response } )
      .map( response => response['rates'])
      .map( rates => {
        return CurrenciesService.getFormattedObj(rates);
      });
  }


   _mockCurrencies = [
     { name:'USD',sell:'1.1307',buy:'1.2497'},
     { name:'GBP',sell:'0.8361',buy:'0.9241'},
     { name:'AUD',sell:'1.5088',buy:'1.6676'},
     { name:'CAD',sell:'1.4571',buy:'1.6105'}
  ];

}
