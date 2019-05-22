import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.body.classList.add('hxVertical');
document.body.setAttribute('id', 'top');
document.querySelector('demo-app-root').setAttribute('id', 'app');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
