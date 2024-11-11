import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  message: string | null = null;
  messageColor: string = 'success';

  constructor(private http: HttpClient) {}

  sendForm(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.http.post('https://formspree.io/f/meoqeydp', formData, {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    }).subscribe({
      next: () => {
        this.message = 'Mensaje enviado con éxito.';
        this.messageColor = 'success';
        form.reset(); // Vacía el formulario después de enviarlo
      },
      error: () => {
        this.message = 'Ocurrió un error al enviar el mensaje. Intenta de nuevo.';
        this.messageColor = 'danger';
      }
    });
  }
}
