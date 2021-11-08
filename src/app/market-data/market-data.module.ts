import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketDataComponent } from './market-data.component';



@NgModule({
  declarations: [
    MarketDataComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MarketDataComponent,
  ]
})
export class MarketDataModule { }
