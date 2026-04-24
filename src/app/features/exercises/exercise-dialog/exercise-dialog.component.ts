import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Exercise } from '../../../core/models';
import { ExerciseService } from '../../../core/services/exercise.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";


@Component({
  selector: 'app-exercise-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatError
],
  templateUrl: './exercise-dialog.component.html',
  styleUrl: './exercise-dialog.component.scss'
})
export class ExerciseDialogComponent {
   private exerciseService = inject(ExerciseService);
  private dialogRef = inject(MatDialogRef<ExerciseDialogComponent>);
  private data = inject<Exercise>(MAT_DIALOG_DATA);

  isEdit = !!this.data;

  form = new FormGroup({
    name: new FormControl(this.data?.name || '', [Validators.required]),
    muscleGroup: new FormControl(this.data?.muscleGroup || '', [Validators.required]),
    description: new FormControl(this.data?.description || '')
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    const exercise = this.form.value as Exercise;

    if (this.isEdit) {
      this.exerciseService.update(this.data.id, exercise).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.exerciseService.create(exercise).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
