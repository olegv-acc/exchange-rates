import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {FormComponent} from './form/form.component';
import { SortableColumnComponent } from './sortable-table/sortable-column.component';
import { ExchangeTableComponent } from './exchange-table/exchange-table.component';

import { SortableTableDirective } from './sortable-table/sortable-table.directive';

import { CurrenciesService } from './services/currencies.service';
import { SortService } from './services/sort.service';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SortableColumnComponent,
    SortableTableDirective,
    ExchangeTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CurrenciesService, SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
