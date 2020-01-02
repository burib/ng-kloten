import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  get = (key = '') => {
    function decode (s) {
      return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }

    const jar = {};
    const cookies = document.cookie ? document.cookie.split('; ') : [];

    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split('=');
      let cookie = parts.slice(1).join('=');

      try {
        const name = decode(parts[0]);
        cookie = decode(cookie);

        jar[name] = cookie;
      } catch (e) {}
    }

    return key ? (jar[key] || null) : null;
  }

  set = (key, value, exdays = 1) => {
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();

    document.cookie = key + '=' + value + ';' + expires + ';path=/';
  }

  remove = (key) => {
    this.set(key, '', -1);
  }

  constructor() { }
}
