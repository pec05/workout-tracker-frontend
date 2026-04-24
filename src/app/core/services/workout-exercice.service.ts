import { Observable } from "rxjs/internal/Observable";
import { WorkoutExercise } from "../models";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WorkoutExerciseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/workout-exercises';

  addExerciseToWorkout(dto: WorkoutExercise): Observable<WorkoutExercise> {
    return this.http.post<WorkoutExercise>(this.apiUrl, dto);
  }

  getByWorkoutId(workoutId: number): Observable<WorkoutExercise[]> {
    return this.http.get<WorkoutExercise[]>(`${this.apiUrl}/workout/${workoutId}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
