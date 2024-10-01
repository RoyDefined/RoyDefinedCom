import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode/darkMode.service';

@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
    public get darkModeType() {
        return this._darkModeService.darkModeType;
    }

    constructor(private readonly _darkModeService: DarkModeService) {}

    /**
     * Toggles dark mode to the next option.
     */
    public toggleDarkMode() {
        const current = this._darkModeService.darkModeType;
        this._darkModeService.darkModeType = current === 'System' ? 'Light' : this._darkModeService.darkModeType === 'Light' ? 'Dark' : 'System';
    }
}
