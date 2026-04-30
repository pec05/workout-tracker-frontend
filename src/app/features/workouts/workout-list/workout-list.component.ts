import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { ExportService } from '../../../core/services/export.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    DatePipe,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatInputModule
],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.scss'
})
export class WorkoutListComponent implements OnInit {

  private workoutService = inject(WorkoutService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private exportService = inject(ExportService);

  workouts = signal<Workout[]>([]);
  displayedColumns = ['name', 'date', 'notes', 'actions'];

  searchTerm = signal('');
  filteredWorkouts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.workouts();
    return this.workouts().filter(w => w.name.toLowerCase().includes(term));
  });

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

  exportToCSV(): void {
    this.exportService.exportToCSV(this.workouts());
  }

  exportToPDF(): void {
    this.exportService.exportToPDF(this.workouts());
  }
}
