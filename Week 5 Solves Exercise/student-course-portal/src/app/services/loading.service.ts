import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  setLoading(loading: boolean): void {
    console.log('⏳ Loading state changed:', loading);
    this.isLoading$.next(loading);
  }

  getLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
