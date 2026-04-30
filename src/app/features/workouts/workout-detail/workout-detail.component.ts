import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { WorkoutService } from '../../../core/services/workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutExerciseService } from '../../../core/services/workout-exercice.service';
import { Workout, WorkoutExercise } from '../../../core/models';
import { AddExerciseDialogComponent } from '../add-exercise-dialog/add-exercise-dialog.component';
import { WorkoutTemplateService } from '../../../core/services/workout-template.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    DatePipe
  ],
  templateUrl: './workout-detail.component.html',
  styleUrl: './workout-detail.component.scss'
})
export class WorkoutDetailComponent implements OnInit {
  private workoutService = inject(WorkoutService);
  private workoutExerciseService = inject(WorkoutExerciseService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private templateService = inject(WorkoutTemplateService);
  private snackbar = inject(MatSnackBar);

  workout = signal<Workout | null>(null);
  workoutExercises = signal<WorkoutExercise[]>([]);
  workoutId!: number;

  ngOnInit(): void {
    this.workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadWorkout();
    this.loadExercises();
  }

  loadWorkout(): void {
    this.workoutService.getById(this.workoutId).subscribe(w => {
      this.workout.set(w);
    });
  }

  loadExercises(): void {
    this.workoutExerciseService.getByWorkoutId(this.workoutId).subscribe(exercises => {
      this.workoutExercises.set(exercises);
    });
  }

  openAddExerciseDialog(): void {
    const dialogRef = this.dialog.open(AddExerciseDialogComponent, {
      width: '500px',
      data: { workoutId: this.workoutId, orderIndex: this.workoutExercises().length + 1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadExercises();
    });
  }

  deleteExercise(id: number): void {
    if (confirm('Remove this exercise?')) {
      this.workoutExerciseService.delete(id).subscribe(() => {
        this.loadExercises();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/workouts']);
  }

  saveAsTemplate(): void {
  this.templateService.saveAsTemplate(this.workoutId).subscribe({
    next: () => this.snackbar.open('Saved as template! ✅', 'Close', { duration: 3000 }),
    error: () => this.snackbar.open('Failed to save template', 'Close', { duration: 3000 })
    });
  }
}
