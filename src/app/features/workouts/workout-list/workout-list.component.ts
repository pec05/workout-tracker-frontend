import { Component, inject, OnInit, signal } from '@angular/core';
import { WorkoutService } from '../../../core/services/workout.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Workout } from '../../../core/models';
import { WorkoutDialogComponent } from '../workout-dialog/workout-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    DatePipe
  ],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.scss'
})
export class WorkoutListComponent implements OnInit {
  private workoutService = inject(WorkoutService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  workouts = signal<Workout[]>([]);
  displayedColumns = ['name', 'date', 'notes', 'actions'];

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.workoutService.getMyWorkouts().subscribe(workouts => {
      this.workouts.set(workouts);
    });
  }

  openDialog(workout?: Workout): void {
    const dialogRef = this.dialog.open(WorkoutDialogComponent, {
      width: '400px',
      data: workout || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadWorkouts();
    });
  }

  viewDetail(id: number): void {
    this.router.navigate(['/workouts', id]);
  }

  delete(id: number): void {
    if (confirm('Delete this workout?')) {
      this.workoutService.delete(id).subscribe(() => {
        this.loadWorkouts();
      });
    }
  }

}
