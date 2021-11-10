import { Injectable } from '@angular/core';
import { auditTime, BehaviorSubject, catchError, distinctUntilChanged, EMPTY, filter, first, map, Observable, of, pluck, startWith, tap } from 'rxjs';
import { AssetDTO } from '../../interfaces/assets.interfaces';
import { RealTimeMarketTradeByAssetDTO } from '../../interfaces/real-time-market.interfaces';
import { AssetsService } from '../API/assets.service';
import { RealTimePriceService } from '../API/real-time-price.service';

let connectMessage = {
  type: "hello",
  apikey: "F3BEB1F0-20AB-4658-9486-0603902DB30A",
  heartbeat: false,
  subscribe_data_type: ["trade"],
  subscribe_filter_asset_id: ["BTC"]
}

export class MarketDataState {
  public readonly selectedAsset: string = 'BTC';
  public readonly assetList: ReadonlyArray<AssetDTO> = [];
  public readonly realTimeTrade: RealTimeMarketTradeByAssetDTO | null = null;
}

@Injectable({
  providedIn: 'root'
})
export class MarketDataFacadeService {
  private state = new MarketDataState();
  private readonly _store: BehaviorSubject<MarketDataState> = new BehaviorSubject<MarketDataState>(this.state);
  private readonly _state$: Observable<MarketDataState> = this._store.asObservable();

  public readonly selectedAsset$: Observable<string> = this._state$.pipe(map((state: MarketDataState) => state.selectedAsset), filter<string>(Boolean));
  public readonly assetList$: Observable<ReadonlyArray<AssetDTO>> = this._state$.pipe(map((state: MarketDataState) => state.assetList), filter<ReadonlyArray<AssetDTO>>(Boolean));
  public readonly realTimeTrade$: Observable<RealTimeMarketTradeByAssetDTO | null> = this._state$.pipe(map((state: MarketDataState) => state.realTimeTrade), auditTime(1000));
  
  
  private readonly updateRealTimePrice$: Observable<RealTimeMarketTradeByAssetDTO> = this.realTimeMarketService.messages$.pipe(
    tap(console.log),
    filter(({ taker_side }: RealTimeMarketTradeByAssetDTO) => taker_side === 'BUY'),
    tap((realTimeTrade: RealTimeMarketTradeByAssetDTO) =>  this._store.next((this.state = {
      ...this.state,
      realTimeTrade,
    })))
  )

  private readonly updateRealTimeDataSource$ = this.selectedAsset$.pipe(
    filter(Boolean),
    distinctUntilChanged(),
    tap(console.log),
    tap(this.changeRealTimeDataSource.bind(this))
  )
  constructor(
    private assetsService: AssetsService,
    private realTimeMarketService: RealTimePriceService) {
  }

  public selectAsset(selectedAsset: string): void {
    this._store.next((this.state = {
      ...this.state,
      selectedAsset,
    }))
  }

  public getAssets(): void {
    this.assetsService.getAvailableAssets().pipe(
      tap((assetList: ReadonlyArray<AssetDTO>) => this._store.next((this.state = {
        ...this.state,
        assetList,
      }))),
      first(),
      catchError(() => EMPTY)
    ).subscribe();
  }

  public connectToRealMarketData(): void {
    this.realTimeMarketService.connect();
    this.updateRealTimeDataSource$.subscribe();
    this.updateRealTimePrice$.subscribe();
  }

  public releaseResources(): void {
    this.realTimeMarketService.close();
  }

  private changeRealTimeDataSource(assetId: string): void {
    this.realTimeMarketService.sendMessage({
      ...connectMessage,
      subscribe_filter_asset_id: [assetId]
    })
  }
}
