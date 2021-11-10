import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConfig, URL_TOKEN } from 'src/app/providers/URL_TOKEN.provider';
import { EnvironmentConfig, ENV_TOKEN } from 'src/environments/ENV_TOKEN';
import { AssetDTO } from '../../interfaces/assets.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(
    @Inject(ENV_TOKEN) private readonly env: EnvironmentConfig,
    @Inject(URL_TOKEN) private readonly urls: UrlConfig,
    private httpClient: HttpClient) { }

  public getAvailableAssets(): Observable<ReadonlyArray<AssetDTO>> {
    const headers = new HttpHeaders().set('X-CoinAPI-Key', this.env.apiKey);

    return this.httpClient.get<ReadonlyArray<AssetDTO>>(this.urls.assetsUrl, { headers });
  }
}
