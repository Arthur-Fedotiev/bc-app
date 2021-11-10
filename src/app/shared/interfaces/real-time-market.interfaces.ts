export interface RealTimeMarketTradeByAssetDTO {
          time_exchange: Date;
          time_coinapi: Date;
          uuid: string;
          price: number;
          size: number;
          taker_side: string;
          symbol_id: string;
          sequence: number;
          type: string;
      }
      