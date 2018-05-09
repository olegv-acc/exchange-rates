import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {FormComponent} from './rates/rates.component';

import { CurrenciesService } from './services/currencies.service';

import {SortDirective} from './directives/sort.directive'

import { MatInputModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from "@angular/material";

@NgModule({

  declarations: [
    AppComponent,
    FormComponent,
    SortDirective
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],

  providers: [CurrenciesService],
  bootstrap: [AppComponent]

})
export class AppModule { }
