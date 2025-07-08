import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '../../services/modal/modal';

@Component({
    standalone: true,
    selector: 'app-right',
    templateUrl: './alert.modal.component.html',
    imports: [CommonModule],
})
export class AlertModalComponent extends Modal {
    public message = signal<string | null>(null);
}
