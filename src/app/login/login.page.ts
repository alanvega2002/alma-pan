import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async login() {
    // Limpiar mensajes anteriores
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Mostrar indicador de carga
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    // Llamada a authService.login, ahora devuelve un Observable
    this.authService.login(this.username, this.password).subscribe(
      async (isLoggedIn) => {
        // Cerrar indicador de carga
        await loading.dismiss();
        
        if (isLoggedIn) {
          // Si el inicio de sesión es exitoso
          this.successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
          this.showToast(this.successMessage, 'success');
          setTimeout(() => {
            this.navCtrl.navigateForward('/home');
          }, 2000);
        } else {
          // Si las credenciales son incorrectas
          this.showLoginError();
        }
      },
      async () => {
        // Manejo de errores en caso de falla en la autenticación
        await loading.dismiss();
        this.showLoginError();
      }
    );

    this.isLoading = false;
  }

  // Mostrar mensaje de error si las credenciales son incorrectas
  showLoginError() {
    this.errorMessage = 'Nombre de usuario o contraseña incorrecta. Inténtalo de nuevo.';
    this.showToast(this.errorMessage, 'danger');
  }

  // Método para mostrar un mensaje tipo toast
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  // Navegar a la página de registro
  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  // Navegar a la página de restablecimiento de contraseña
  navigateToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }
}
