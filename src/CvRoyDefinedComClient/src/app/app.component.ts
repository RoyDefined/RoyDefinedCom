import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLeftComponent } from './app-left.component';
import { AppRightComponent } from './app-right.component';
import { NgOptimizedImage } from '@angular/common';
import { DarkModeSystemComponent } from './components/svg/dark-mode-system.component';
import { DarkModeMoonComponent } from './components/svg/dark-mode-moon.component';
import { DarkModeService } from '../services/modal/dark-mode/dark-mode.service';
import { DarkModeSunComponent } from './components/svg/dark-mode-sun.component';
import { NavigationBackToTopComponent } from './components/svg/navigation-back-to-top.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterModule,
        AppLeftComponent,
        AppRightComponent,
        DarkModeSystemComponent,
        DarkModeSunComponent,
        DarkModeMoonComponent,
        NavigationBackToTopComponent,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {
    private readonly _darkModeService = inject(DarkModeService);

    public get darkModeType() {
        return this._darkModeService.currentDarkModeType;
    }

    public scrollToTop() {
        window.scrollTo(0, 0);
    }

    public nextDarkModeType() {
        const currentDarkModeType = this.darkModeType();
        const nextType = currentDarkModeType === 'System' ? 'Light' : currentDarkModeType === 'Light' ? 'Dark' : 'System';
        this._darkModeService.setDarkModeType(nextType);
    }
}
