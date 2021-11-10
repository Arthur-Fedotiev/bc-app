import { Component, OnDestroy, OnInit, ɵdetectChanges as detectChanges } from '@angular/core';
import { filter, map, Observable, pluck, startWith, tap } from 'rxjs';
import { AssetDTO } from '../shared/interfaces/assets.interfaces';
import { RealTimeMarketTradeByAssetDTO } from '../shared/interfaces/real-time-market.interfaces';
import { MarketDataFacadeService } from '../shared/services/facades/market-data-facade.service';

@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.scss']
})
export class MarketDataComponent implements OnInit, OnDestroy {

  public readonly assets$: Observable<AssetDTO[]> = this.marketDataFacade.assetList$ as Observable<AssetDTO[]>;
  public readonly selectedAsset$: Observable<string> = this.marketDataFacade.selectedAsset$;
  public readonly realTimeTrade$: Observable<{ time: Date, price: number }> = this.marketDataFacade.realTimeTrade$.pipe(
    filter(Boolean),
    map(({ price, time_exchange: time} : RealTimeMarketTradeByAssetDTO) => ({ time, price }))
  )
  
  constructor(private marketDataFacade: MarketDataFacadeService) {

  }

  public ngOnDestroy(): void {
    this.marketDataFacade.releaseResources();
  }

  public ngOnInit(): void {
   this.marketDataFacade.getAssets();
   this.marketDataFacade.connectToRealMarketData();
  }

  public selectAsset({ value }: { originalEvent: PointerEvent, value: string}): void {
    this.marketDataFacade.selectAsset(value);
  }

  detect(){
    detectChanges(this)
    
  }

}
