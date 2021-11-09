import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketDataComponent } from './market-data.component';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MarketDataComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
  ],
  exports: [
    MarketDataComponent,
  ]
})
export class MarketDataModule { }
