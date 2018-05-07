import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';




@Injectable()

export class CurrenciesService {

  selectedCurrency = 'EUR';
  baseCurrencies = ['EUR','USD','GBP','AUD','CAD','JPY'];
  notSelectedCurrencies;
  bankRates = {};
  ourRates = [];


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

  static calcSurcharge( val, percentage: number, updown: string ) {
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

    this.ourRates = [];
    for ( let key in this.bankRates ) {
      this.ourRates.push({
        name: key,
        sell: CurrenciesService.calcSurcharge(this.bankRates[key], .05, 'up'),
        buy: CurrenciesService.calcSurcharge(this.bankRates[key], .05, 'down')
      });
    }
    let str_json_values = JSON.stringify(this.ourRates);
    return  JSON.parse(str_json_values);
  }

  getSortedRates( criteria: CustomerSearchCriteria ): Currencies[] {
    return this.getRates().sort((a,b) => {
      if(criteria.sortDirection === 'desc'){
        return a[criteria.sortColumn] - b[criteria.sortColumn];
      }
      else {
        return a[criteria.sortColumn] - b[criteria.sortColumn];
      }
    });
  }

   _mockCurrencies = [
     { name:'USD',sell:'1.1307',buy:'1.2497'},
     { name:'GBP',sell:'0.8361',buy:'0.9241'},
     { name:'AUD',sell:'1.5088',buy:'1.6676'},
     { name:'CAD',sell:'1.4571',buy:'1.6105'}
  ];

}

export class Currencies {
  name: string;
  sell: string;
  buy: string;
}

export class CustomerSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}
