import { BehaviorSubject, Observable } from "rxjs";

export interface Facade<T> {
          readonly _store: BehaviorSubject<T>;
          readonly _state: Observable<T>;
}