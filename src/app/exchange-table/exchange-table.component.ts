import { Component, OnInit } from '@angular/core';
import {CurrenciesService} from '../services/currencies.service';

@Component({
  selector: 'app-exchange-table',
  templateUrl: './exchange-table.component.html',
  styleUrls: ['./exchange-table.component.scss']
})
export class ExchangeTableComponent implements OnInit {

  bankRates;
  surchargeRates;

  constructor (private currenciesService: CurrenciesService) {}

  onChange() {
    this.currenciesService.getCurrencies().subscribe(resp => {
      this.bankRates = resp;
    });
    // this.surchargeRates = this.bankRates.map()
  }

  ngOnInit() {
  }

}
