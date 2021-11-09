import { InjectionToken } from "@angular/core";
import { environment } from "./environment";

export type EnvironmentConfig = typeof environment;

export const ENV_TOKEN: InjectionToken<EnvironmentConfig> = new InjectionToken('ENVIRONMENT', {
          providedIn: 'root',
          factory: () => environment,
});
