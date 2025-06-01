import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

export interface LaravelError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}


@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  async managementToast(
  element: string,
  validRequest: boolean,
  error?: ResponseError | LaravelError | string
): Promise<void> {
  const toastMsg = document.getElementById(element);
  if (!toastMsg) return;

  // Primero limpia clases y texto para reiniciar animación
  toastMsg.classList.remove('show', 'requestOk', 'requestKo');
  toastMsg.textContent = '';

  // Forzar reflow para reiniciar animación CSS
  void toastMsg.offsetWidth;

  if (validRequest) {
    toastMsg.textContent = 'Form submitted successfully.';
    toastMsg.classList.add('show', 'requestOk');
  } else {
    toastMsg.classList.add('show', 'requestKo');

    if (typeof error === 'string') {
      toastMsg.textContent = error;
    } else if (error && 'errors' in error) {
      const laravelError = error as LaravelError;
      const errorMessages = Object.values(laravelError.errors || {})
        .flat()
        .join(', ');
      toastMsg.textContent = laravelError.message || errorMessages;
    } else if (error && 'message' in error) {
      // Asumimos que error es ResponseError u otro tipo con message
      toastMsg.textContent = (error as any).message || 'Ha ocurrido un error';
    } else {
      toastMsg.textContent = 'Ha ocurrido un error desconocido.';
    }
  }

  // Espera el tiempo total de la animación (fadein 0.5s + fadeout 0.5s + visible 2.5s = 3.5s)
  await this.wait(3500);

  // Luego oculta el toast para que pueda volver a mostrarse correctamente
  toastMsg.classList.remove('show', 'requestOk', 'requestKo');
  toastMsg.textContent = '';
}


  errorLog(error: ResponseError): void {
    console.error('path:', error.path);
    console.error('timestamp:', error.timestamp);
    console.error('message:', error.message);
    console.error('messageDetail:', error.messageDetail);
    console.error('statusCode:', error.statusCode);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
