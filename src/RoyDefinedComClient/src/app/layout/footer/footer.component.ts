import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    imports: [CommonModule, RouterModule, NgOptimizedImage],
})
export class FooterComponent {}
