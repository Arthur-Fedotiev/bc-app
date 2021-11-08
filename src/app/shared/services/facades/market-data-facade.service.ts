import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MarketDataState } from 'src/app/market-data/utils/interfaces/market-data';
import { Facade } from '../../interfaces/common';

@Injectable({
  providedIn: 'root'
})
export class MarketDataFacadeService implements Facade<MarketDataState>{
  private readonly _store: BehaviorSubject<MarketDataState> = new BehaviorSubject<MarketDataState>({} as MarketDataState);
  private readonly _state: Observable<MarketDataState> = this._store.asObservable();

  constructor() {
  }
}
