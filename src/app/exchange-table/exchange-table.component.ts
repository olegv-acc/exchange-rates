import { Component, OnInit } from '@angular/core';
import {CurrenciesService, Currencies, CustomerSearchCriteria} from '../services/currencies.service';

@Component({
  selector: 'app-exchange-table',
  templateUrl: './exchange-table.component.html',
  styleUrls: ['./exchange-table.component.scss']
})
export class ExchangeTableComponent implements OnInit {

  bankRates = this.currenciesService.getSortedRates({sortColumn: 'id', sortDirection:'asc'});

  constructor (private currenciesService: CurrenciesService) {}

  onChange() {
    this.currenciesService.getSortedRates({sortColumn: 'id', sortDirection:'asc'});
  }

  onSorted($event){
    this.currenciesService.getSortedRates($event);
  }

  ngOnInit(){
    this.currenciesService.getSortedRates({sortColumn: 'id', sortDirection:'asc'});
  }

}
