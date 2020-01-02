import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  decodeToken = (jwtToken = '') => {
    if (typeof jwtToken !== 'string') {
      throw new Error('Invalid token specified');
    }

    try {
      const decodedToken = JSON.parse(window.atob(jwtToken.split('.')[1]));

      return decodedToken;
    } catch (e) {
      throw new Error(`Invalid token specified ${e.message}`);
    }
  }

  isTokenExpired = (jwtToken = '') => {
    let isExpired = true;

    if (jwtToken) {
      const jwtObject =  this.decodeToken(jwtToken);
      const currentTimeInUTC = Date.now().valueOf() / 1000;

      isExpired = (jwtObject.exp || 0) < currentTimeInUTC;
      // // TODO: only log in DebugMode
      // if (isExpired) {
      //   console.log(`expired at ${new Date(jwtObject.exp).toISOString()}`);
      // } else {
      //   console.log(`valid until ${new Date(jwtObject.exp).toISOString()}`);
      // }
    }

    return isExpired;
  }

  constructor() {
  }
}
