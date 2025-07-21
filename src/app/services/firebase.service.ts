import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getRemoteConfig, RemoteConfig, fetchAndActivate,  getValue } from 'firebase/remote-config';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  private remoteConfig: RemoteConfig;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.remoteConfig = getRemoteConfig(this.app);
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 1000,
      fetchTimeoutMillis: 1000 
    };

  }

   async fetchRemoteConfig() {
     try {
       await fetchAndActivate(this.remoteConfig);

     } catch (error) {
       console.error('Error fetching remote config:', error);

     }
   }

   getFeatureFlag(flagName: string): boolean {
    const value = getValue(this.remoteConfig, flagName);
    return value.asBoolean(); 
  }

}