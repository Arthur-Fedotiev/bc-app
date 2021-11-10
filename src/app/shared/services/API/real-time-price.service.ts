import { EMPTY, Observable, Subject, catchError, delayWhen, retryWhen, switchAll, tap, timer, ReadableStreamLike, ReplaySubject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ENV_TOKEN, EnvironmentConfig } from 'src/environments/ENV_TOKEN';
import { URL_TOKEN, UrlConfig } from 'src/app/providers/URL_TOKEN.provider';

@Injectable({
  providedIn: 'root'
})
export class RealTimePriceService {

  private socket$: WebSocketSubject<unknown> | null = null;
  private messagesSubject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  public messages$: Observable<unknown> = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  constructor(
    @Inject(ENV_TOKEN) private readonly env: EnvironmentConfig,
    @Inject(URL_TOKEN) private readonly urls: UrlConfig,
  ) {
  }

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {   
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      console.log(this.socket$);
      
      const messages = this.socket$.pipe(
        cfg.reconnect ? this.reconnect : o => o,
        tap({ error: error => console.log(error) }),
        catchError(_ => EMPTY))
      //toDO only next an observable if a new subscription was made double-check this
      this.messagesSubject$.next(messages);
    }
  }

  /**
   * Retry a given observable by a time span
   * @param observable the observable to be retried
   */
  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('[Data Service] Try to reconnect', val)),
      delayWhen(_ => timer(2000)))));
  }

  close() {
    this.socket$?.complete();
    this.socket$ = null;
  }

  sendMessage(msg: any) {
    this.socket$?.next(msg);
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewWebSocket(): WebSocketSubject<unknown> {
    return webSocket({
      url: environment.baseSocketUrl,
      openObserver: {
        next: () => {
          console.log('[DataService]: connection ok');
        }
      },
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
          this.socket$ = null;
          this.connect({ reconnect: true });
        }
      },

    });
  }
}
