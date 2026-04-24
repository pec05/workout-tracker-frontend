import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { VolumeDTO, PersonalRecordDTO, ProgressionDTO, WorkoutFrequencyDTO } from "../models";

@Injectable({ providedIn: 'root' })
export class StatsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/stats';

  getVolumePerWorkout(): Observable<VolumeDTO[]> {
    return this.http.get<VolumeDTO[]>(`${this.apiUrl}/volume`);
  }

  getPersonalRecords(): Observable<PersonalRecordDTO[]> {
    return this.http.get<PersonalRecordDTO[]>(`${this.apiUrl}/personal-records`);
  }

  getProgression(exerciseName: string): Observable<ProgressionDTO[]> {
    return this.http.get<ProgressionDTO[]>(`${this.apiUrl}/progression/${exerciseName}`);
  }

  getWorkoutFrequency(): Observable<WorkoutFrequencyDTO[]> {
    return this.http.get<WorkoutFrequencyDTO[]>(`${this.apiUrl}/frequency`);
  }
}
