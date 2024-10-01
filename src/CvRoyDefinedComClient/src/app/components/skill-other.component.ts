import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'comp-skill-other',
    templateUrl: './skill-other.component.html',
    imports: [CommonModule, RouterModule],
})
export class SkillOtherComponent {
    public readonly skill = input.required<string>();
}
