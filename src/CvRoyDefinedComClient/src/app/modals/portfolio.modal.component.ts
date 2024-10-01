import { Component, computed, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Modal } from '../../services/modal/modal';
import { Portfolio } from '../types/Portfolio';

// FYI the carousel is hardcoded to allow three images.
// I really can't be bothered to support variation in length when Tailwind only generates classes for known peers in the classes.

@Component({
    standalone: true,
    selector: 'app-right',
    templateUrl: './portfolio.modal.component.html',
    imports: [CommonModule, NgOptimizedImage],
})
export class PortfolioModalComponent extends Modal {
    public portfolio = signal<Portfolio | null>(null);
}
