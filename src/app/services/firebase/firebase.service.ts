import { Injectable } from '@angular/core';
import { getAnalytics, logEvent, type Analytics } from 'firebase/analytics';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { initializePerformance, type FirebasePerformance } from 'firebase/performance';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public app?: FirebaseApp;
  public analytics?: Analytics;
  public performance?: FirebasePerformance;
  constructor() { }

  init() {
    this.app = initializeApp({
      apiKey: 'AIzaSyCaoHdvBkCD1TkIvOJpa0T3IfIINstjPbg',
      authDomain: 'digigoat-2bcb3.firebaseapp.com',
      projectId: 'digigoat-2bcb3',
      storageBucket: 'digigoat-2bcb3.firebasestorage.app',
      messagingSenderId: '744703825436',
      appId: '1:744703825436:web:380305505eefd4f4e971d9',
      measurementId: 'G-2JKCQE2HLY'
    });
    this.analytics = getAnalytics(this.app);
    this.performance = initializePerformance(this.app);
  }

  logEvent(eventName: string, params: Record<string, unknown>) {
    if (this.analytics) {
      logEvent(this.analytics, eventName, params);
    }
  }
}
