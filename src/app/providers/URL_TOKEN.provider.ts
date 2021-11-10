import { InjectionToken, inject } from "@angular/core";
import { ENV_TOKEN } from "src/environments/ENV_TOKEN";

export type UrlConfig = ReturnType<typeof urlTokenFactory>

export const urlTokenFactory = () => {
          const { baseRestUrl, baseSocketUrl} = inject(ENV_TOKEN);

          return {
                    assetsUrl: `${baseRestUrl}/v1/assets`,
                    realTimeMarketUrl: `${baseSocketUrl}/v1/assets`,
          } as const
}

export const URL_TOKEN: InjectionToken<UrlConfig> = new InjectionToken('URL_TOKEN', {
          providedIn: 'root',
          factory: urlTokenFactory,
});
