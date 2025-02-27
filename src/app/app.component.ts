import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-header />
      <main class="container mx-auto px-4 py-8">
        <router-outlet />
      </main>
    </div>
  `
})
export class AppComponent {}