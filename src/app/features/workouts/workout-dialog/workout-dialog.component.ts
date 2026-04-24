import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkoutService } from '../../../core/services/workout.service';
import { Workout } from '../../../core/models';

@Component({
  selector: 'app-workout-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './workout-dialog.component.html',
  styleUrl: './workout-dialog.component.scss'
})
export class WorkoutDialogComponent {
  private workoutService = inject(WorkoutService);
  private dialogRef = inject(MatDialogRef<WorkoutDialogComponent>)
  private data = inject(MAT_DIALOG_DATA);;


  isEdit = !!this.data;

  form = new FormGroup({
    name: new FormControl(this.data?.name || '', [Validators.required]),
    date: new FormControl(this.data?.date || new Date().toISOString().slice(0, 16), [Validators.required]),
    notes: new FormControl(this.data?.notes || '')
  });

 onSubmit(): void {
    if (this.form.invalid) return;
    const workout = this.form.value as Workout;

    if (this.isEdit) {
      this.workoutService.update(this.data.id!, workout).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.workoutService.create(workout).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}


