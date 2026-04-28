import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'workout-tracker-frontend';

private router = inject(Router);
private themeService = inject(ThemeService);

ngOnInit(): void {
    this.themeService.initTheme();
  }

showNavBar(): boolean {
  const hiddenRoutes = ['/login', '/register'];
  return !hiddenRoutes.includes(this.router.url);
}

}

