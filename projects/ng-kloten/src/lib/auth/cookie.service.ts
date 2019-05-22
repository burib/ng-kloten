import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  get = (key = '') => {
    function decode (s) {
      return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }

    var jar = {};
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var i = 0;

    for (; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var cookie = parts.slice(1).join('=');

      try {
        var name = decode(parts[0]);
        cookie = decode(cookie);

        jar[name] = cookie;
      } catch (e) {}
    }

    return key ? (jar[key] || null) : null;
  };

  set = (key, value, exdays = 1) => {
    let date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    const expires = "expires="+ date.toUTCString();

    document.cookie = key + "=" + value + ";" + expires + ";path=/";
  };

  remove = (key) => {
    this.set(key, '', -1);
  };

  constructor() { }
}
