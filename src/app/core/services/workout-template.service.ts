import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WorkoutTemplateService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/templates';

  constructor() { }

  saveAsTemplate(workoutId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/from-workout/${workoutId}`, {});
  }

  getMyTemplates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  useTemplate(templateId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${templateId}/use`, {});
  }

  delete(templateId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${templateId}`);
  }
}
