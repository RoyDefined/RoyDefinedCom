import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'comp-skillbar',
    templateUrl: './skillbar.component.html',
    imports: [CommonModule, RouterModule],
})
export class SkillbarComponent {
    public readonly skill = input.required<string>();
    public readonly width = input.required<number>();
}
