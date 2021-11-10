import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, filter, first, map, Observable, of, pluck, tap } from 'rxjs';
import { Facade } from '../../interfaces/common';
import { AssetsService } from '../API/assets.service';

export class MarketDataState {
  public readonly selectedAsset: string = 'FX';
  public readonly assetList: Record<string, string>[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class MarketDataFacadeService {
  private state = new MarketDataState();
  private readonly _store: BehaviorSubject<MarketDataState> = new BehaviorSubject<MarketDataState>(this.state);
  private readonly _state$: Observable<MarketDataState> = this._store.asObservable();

  public readonly selectedAsset$: Observable<string> = this._state$.pipe(map((state: MarketDataState) => state.selectedAsset), filter<string>(Boolean));
  public readonly assetList$: Observable<Record<string, string>[]> = this._state$.pipe(map((state: MarketDataState) => state.assetList), filter< Record<string, string>[]>(Boolean));

  constructor(private assetsService: AssetsService) {}

  public getAssets(): void {
    this.assetsService.getAvailableAssets().pipe(
      tap((assetList: Record<string, string>[]) => this._store.next((this.state = {
        ...this.state,
        assetList,
      }))),
      first(),
      catchError(() => EMPTY)
    ).subscribe();
  }
}
