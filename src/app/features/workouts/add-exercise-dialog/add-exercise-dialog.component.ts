 import { Component, inject, OnInit, signal } from '@angular/core';
import { ExerciseService } from '../../../core/services/exercise.service';
import { WorkoutExerciseService } from '../../../core/services/workout-exercice.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Exercise, WorkoutExercise, WorkoutSet } from '../../../core/models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-exercise-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './add-exercise-dialog.component.html',
  styleUrl: './add-exercise-dialog.component.scss'
})
export class AddExerciseDialogComponent implements OnInit {

  private exerciseService = inject(ExerciseService);
  private workoutExerciseService = inject(WorkoutExerciseService);
  private dialogRef = inject(MatDialogRef<AddExerciseDialogComponent>);
  private data = inject<{workoutId: number, orderIndex: number}>(MAT_DIALOG_DATA);

  exercises = signal<Exercise[]>([]);
  sets = signal<WorkoutSet[]>([{ setNumber: 1, reps: 0, weight: 0 }]);

  form = new FormGroup({
    exerciseId: new FormControl<number | null>(null, [Validators.required])
  });

  ngOnInit(): void {
    this.exerciseService.getAll().subscribe(e => this.exercises.set(e));
  }

  addSet(): void {
    this.sets.update(sets => [
      ...sets,
      { setNumber: sets.length + 1, reps: 0, weight: 0 }
    ]);
  }

  removeSet(index: number): void {
    this.sets.update(sets => sets.filter((_, i) => i !== index));
  }

  updateSet(index: number, field: 'reps' | 'weight', value: number): void {
    this.sets.update(sets => sets.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    ));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const payload: WorkoutExercise = {
      workoutId: this.data.workoutId,
      exerciseId: this.form.value.exerciseId!,
      orderIndex: this.data.orderIndex,
      sets: this.sets()
    };
    this.workoutExerciseService.addExerciseToWorkout(payload).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
