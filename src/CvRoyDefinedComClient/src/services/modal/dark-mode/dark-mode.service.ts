import { Injectable, signal } from '@angular/core';
import { DarkModeType } from './darkModeType';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    private readonly _localStorageKey = 'CvRoyDefined.DarkMode';

    // If true, system settings enabled dark mode.
    private _preferColorSchemeDark = false;

    private readonly _currentDarkModeType = signal<DarkModeType>('System');
    public get currentDarkModeType() {
        return this._currentDarkModeType;
    }

    public initialize() {
        const settingsJson = localStorage.getItem(this._localStorageKey);
        if (!settingsJson) {
            this.initializeDarkModeListener();
            this.updateDarkMode();
            return;
        }

        this._currentDarkModeType.set(settingsJson === 'System' ? 'System' : settingsJson === 'Light' ? 'Light' : settingsJson === 'Dark' ? 'Dark' : 'System');
        this.initializeDarkModeListener();
        this.updateDarkMode();
    }

    public setDarkModeType(type: DarkModeType) {
        this._currentDarkModeType.set(type);
        localStorage.setItem(this._localStorageKey, type);

        this.updateDarkMode();
    }

    private initializeDarkModeListener() {
        const preferColorSchemeDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
        this._preferColorSchemeDark = preferColorSchemeDarkMedia.matches;
        this.updateDarkMode();

        preferColorSchemeDarkMedia.addEventListener('change', (event) => {
            this._preferColorSchemeDark = event.matches;
            this.updateDarkMode();
        });
    }

    private updateDarkMode() {
        const darkModeClassAdded = document.documentElement.classList.contains('dark');

        const currentDarkModeType = this._currentDarkModeType();
        const darkModeEnabled = currentDarkModeType === 'Dark' || (currentDarkModeType === 'System' && this._preferColorSchemeDark);

        if (darkModeClassAdded && !darkModeEnabled) {
            document.documentElement.classList.remove('dark');
            return;
        }

        if (!darkModeClassAdded && darkModeEnabled) {
            document.documentElement.classList.add('dark');
            return;
        }
    }
}
