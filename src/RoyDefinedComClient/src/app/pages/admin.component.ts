import { Component, model, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    templateUrl: './admin.component.html',
    imports: [FormsModule],
})
export class AdminComponent {
    public content: string = '';
}
