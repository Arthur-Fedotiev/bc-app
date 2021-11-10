import { Component, OnInit, ɵdetectChanges as detectChanges } from '@angular/core';
import { filter, Observable, startWith, tap } from 'rxjs';
import { AssetDTO } from '../shared/interfaces/assets.interfaces';
import { MarketDataFacadeService } from '../shared/services/facades/market-data-facade.service';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.scss']
})
export class MarketDataComponent implements OnInit {

  public readonly assets$ = this.marketDataFacade.assetList$ as Observable<AssetDTO[]>;
  public readonly selectedAsset$: Observable<string> = this.marketDataFacade.selectedAsset$;

  constructor(private marketDataFacade: MarketDataFacadeService) {

  }
  ngOnInit(): void {
   this.marketDataFacade.getAssets();
    
  }

  detect(){
    detectChanges(this)
    
  }

}
