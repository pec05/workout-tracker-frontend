import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private snackbar = inject(MatSnackBar);

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  onUpdateProfile() : void {
    if (this.profileForm.invalid) {
      return;
    }
    this.authService.updateProfile(this.profileForm.value.username!).subscribe({
      next: (user) => {
        this.snackbar.open('Profile updated successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.snackbar.open('Failed to update profile', 'Close', { duration: 3000 });
      }
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) return;
    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;
    this.authService.changePassword(currentPassword!, newPassword!, confirmPassword!)
      .subscribe({
        next: () => {
          this.snackbar.open('Password changed!', 'Close', { duration: 3000 });
          this.passwordForm.reset();
        },
        error: () => this.snackbar.open('Password change failed', 'Close', { duration: 3000 })
      });
  }
}
