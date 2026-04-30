import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Exercise } from '../../../core/models';
import { ExerciseService } from '../../../core/services/exercise.service';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component';
import { ExportService } from '../../../core/services/export.service';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss'
})
export class ExerciseListComponent {
  private exerciseService = inject(ExerciseService);
  private dialog = inject(MatDialog);
  private exportService = inject(ExportService);

  exercises = signal<Exercise[]>([]);
  displayedColumns = ['name', 'muscleGroup', 'description', 'actions'];

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.exerciseService.getAll().subscribe(exercises => {
      this.exercises.set(exercises);
    });
  }

  openDialog(exercise?: Exercise): void {
    const dialogRef = this.dialog.open(ExerciseDialogComponent, {
      width: '400px',
      data: exercise || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadExercises();
    });
  }

  delete(id: number): void {
    if (confirm('Delete this exercise?')) {
      this.exerciseService.delete(id).subscribe(() => {
        this.loadExercises();
      });
    }
  }

}
