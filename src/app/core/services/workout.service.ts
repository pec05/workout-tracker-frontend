import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Workout } from "../models";

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';

  getMyWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrl}/workouts`);
  }

  getById(id: number): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/workouts/${id}`);
  }

  create(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.apiUrl}/workouts`, workout);
  }

  update(id: number, workout: Workout): Observable<Workout> {
    return this.http.put<Workout>(`${this.apiUrl}/workouts/${id}`, workout);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/workouts/${id}`);
  }
}
