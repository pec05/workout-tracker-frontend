import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workout-tracker-frontend';

private router = inject(Router);

showNavBar(): boolean {
  const hiddenRoutes = ['/login', '/register'];
  return !hiddenRoutes.includes(this.router.url);
}

}
