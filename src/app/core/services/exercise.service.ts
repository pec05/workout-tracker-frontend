import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Exercise } from "../models";

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/exercises';

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }

  create(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiUrl, exercise);
  }

  update(id: number, exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/${id}`, exercise);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
