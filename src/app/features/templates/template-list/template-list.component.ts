import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { WorkoutTemplateService } from '../../../core/services/workout-template.service';
import { WorkoutService } from '../../../core/services/workout.service';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.scss'
})
export class TemplateListComponent implements OnInit {

  private templateService = inject(WorkoutTemplateService);
  private workoutService = inject(WorkoutService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  templates = signal<any[]>([]);

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.templateService.getMyTemplates().subscribe(t => {
      this.templates.set(t);
    });
  }

  useTemplate(templateId: number): void {
    this.templateService.useTemplate(templateId).subscribe({
      next: (workout) => {
        this.snackBar.open('Workout created from template! ✅', 'Close', { duration: 3000 });
        this.router.navigate(['/workouts', workout.id]);
      },
      error: () => this.snackBar.open('Failed to use template', 'Close', { duration: 3000 })
    });
  }

  delete(templateId: number): void {
    if (confirm('Delete this template?')) {
      this.templateService.delete(templateId).subscribe(() => {
        this.snackBar.open('Template deleted', 'Close', { duration: 3000 });
        this.loadTemplates();
      });
    }
  }
}
