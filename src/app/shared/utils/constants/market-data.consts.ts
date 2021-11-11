export const defaultMessageType = 'hello';

export const getMarketDataMessage = (dataType: string | string[], asetId: string | string[], apikey: string) => ({
          type: defaultMessageType,
          heartbeat: false,
          apikey,
          subscribe_data_type: Array.isArray(dataType) ? dataType : [dataType],
          subscribe_filter_asset_id:  Array.isArray(asetId) ? asetId : [asetId],
});

export type MarketDataMessage = ReturnType<typeof getMarketDataMessage>;
