import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Workout, PersonalRecordDTO } from '../../../core/models';
import { StatsService } from '../../../core/services/stats.service';
import { WorkoutService } from '../../../core/services/workout.service';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  BarController,
  LineController,
  Legend,
  Tooltip
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  BarController,
  LineController,
  Legend,
  Tooltip
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule ,
    DatePipe,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

   private statsService = inject(StatsService);
  private workoutService = inject(WorkoutService);

  recentWorkouts = signal<Workout[]>([]);
  personalRecords = signal<PersonalRecordDTO[]>([]);
  totalWorkouts = signal<number>(0);
  totalVolume = signal<number>(0);

  volumeChartData = signal<ChartConfiguration<'bar'>['data']>({
  labels: [],
  datasets: [{
    data: [],
    label: 'Volume (kg)',
    backgroundColor: '#3f51b5'
  }]
});

frequencyChartData = signal<ChartConfiguration<'line'>['data']>({
  labels: [],
  datasets: [{
    data: [],
    label: 'Workouts per week',
    borderColor: '#e91e63',
    tension: 0.4
  }]
});

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentWorkouts();
  }

  private loadStats(): void {
  this.statsService.getPersonalRecords().subscribe(prs => {
    this.personalRecords.set(prs);
  });

  this.statsService.getVolumePerWorkout().subscribe(volumes => {
    const total = volumes.reduce((sum, v) => sum + v.totalVolume, 0);
    this.totalVolume.set(total);
    this.totalWorkouts.set(volumes.length);

    this.volumeChartData.set({
      labels: volumes.map(v => v.workoutName),
      datasets: [{
        data: volumes.map(v => v.totalVolume),
        label: 'Volume (kg)',
        backgroundColor: '#3f51b5'
      }]
    });
  });

  this.statsService.getWorkoutFrequency().subscribe(frequency => {
    this.frequencyChartData.set({
      labels: frequency.map(f => f.week),
      datasets: [{
        data: frequency.map(f => f.workoutCount),
        label: 'Workouts per week',
        borderColor: '#e91e63',
        tension: 0.4,
        fill: false
      }]
    });
  });
}

  private loadRecentWorkouts(): void {
    this.workoutService.getMyWorkouts().subscribe(workouts => {
      this.recentWorkouts.set(workouts.slice(0, 5));
    });
  }

}
