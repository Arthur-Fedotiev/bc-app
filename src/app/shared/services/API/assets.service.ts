import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UrlConfig, URL_TOKEN } from 'src/app/providers/URL_TOKEN.provider';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(
    @Inject(URL_TOKEN) private readonly urls: UrlConfig,
    private httpClient: HttpClient) { 
      console.log(this.urls);
      
    }
}
