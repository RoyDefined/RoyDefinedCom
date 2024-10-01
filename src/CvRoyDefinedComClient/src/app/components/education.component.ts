import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'comp-education',
    templateUrl: './education.component.html',
    imports: [CommonModule, RouterModule],
})
export class EducationComponent {
    public readonly school = input.required<string>();
    public readonly from = input.required<Date>();
    public readonly to = input.required<Date | null>();
}
