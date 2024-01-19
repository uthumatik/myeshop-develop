import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router : Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        if(this.keepAfterNavigationChange){
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next({type: 'clear'});
        }
      }
    })
  }

  private refreshPanierSubject = new Subject<void>();
  refreshPanier$ = this.refreshPanierSubject.asObservable();
  refreshPanier() {
    this.refreshPanierSubject.next();
  }

  private refreshCommandesSubject = new Subject<void>();
  refreshCommandes$ = this.refreshCommandesSubject.asObservable();
  refreshCommandes() {
    this.refreshCommandesSubject.next();
  }

  private refreshWelcomeSubject = new Subject<void>();
  refreshWelcome$ = this.refreshWelcomeSubject.asObservable();
  refreshWelcome() {
    this.refreshWelcomeSubject.next();
  }
}
