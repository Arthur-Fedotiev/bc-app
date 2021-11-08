export interface MarketDataState {
          selectedSymbol: string;
          realTimePrice: RealTimePrice;
          historyData: unknown;
}

export interface RealTimePrice {
          price: number;
          time: string;
}