import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';
  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  // Método para restablecer la contraseña
  resetPassword() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.email && this.newPassword) {
      this.authService.resetPassword(this.email, this.newPassword).subscribe({
        next: (isReset) => {
          if (isReset) {
            this.successMessage = 'Contraseña restablecida con éxito. Redirigiendo al login...';
            setTimeout(() => {
              this.navCtrl.navigateForward('/login');
            }, 2000);
          } else {
            this.errorMessage = 'Correo no encontrado. Por favor, verifica tu correo.';
          }
        },
        error: () => {
          this.errorMessage = 'Ocurrió un error. Inténtalo nuevamente.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }
}
