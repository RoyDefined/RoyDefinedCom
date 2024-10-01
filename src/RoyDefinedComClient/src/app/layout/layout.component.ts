import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
    standalone: true,
    selector: 'app-layout',
    template: `
        <div class="flex h-screen flex-col bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <app-header></app-header>
            <router-outlet></router-outlet>
            <app-footer></app-footer>
        </div>
    `,
    imports: [RouterModule, HeaderComponent, FooterComponent],
})
export class LayoutComponent {}
