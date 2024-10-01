import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'comp-experience',
    templateUrl: './experience.component.html',
    imports: [CommonModule, RouterModule],
})
export class ExperienceComponent {
    public readonly job = input.required<string>();
    public readonly company = input.required<string | null>();
    public readonly from = input.required<Date>();
    public readonly to = input.required<Date | null>();
}
