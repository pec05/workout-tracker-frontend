import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDark = signal(false);

  toggleTheme(): void {
    this.isDark.update(v => !v);
    if (this.isDark()) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  initTheme(): void {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDark.set(true);
      document.body.classList.add('dark-mode');
    }
  }

  isDarkMode(): boolean {
    return this.isDark();
  }
}
