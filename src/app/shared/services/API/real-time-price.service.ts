import { EMPTY, Observable, Subject, catchError, delayWhen, retryWhen, switchAll, tap, timer, ReadableStreamLike } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RealTimePriceService {

  private socket$: WebSocketSubject<unknown> | null = null;
  private messagesSubject$: Subject<any> = new Subject<any>();
  public messages$: Observable<unknown> = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  constructor() {
  }

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();

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
      url: environment.apiKey,
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
