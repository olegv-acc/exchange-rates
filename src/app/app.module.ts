import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {FormComponent} from './form/form.component';

import { CurrenciesService } from './services/currencies.service';

import {SortDirective} from './directives/sort.directive'


@NgModule({

  declarations: [
    AppComponent,
    FormComponent,
    SortDirective
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [CurrenciesService],
  bootstrap: [AppComponent]

})
export class AppModule { }
