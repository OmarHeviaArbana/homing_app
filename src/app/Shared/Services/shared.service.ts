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
    if (toastMsg) {
    if (validRequest) {
      toastMsg.className = 'show requestOk';
      toastMsg.textContent = 'Form submitted successfully.';
    } else {
      toastMsg.className = 'show requestKo';

      // Si es un string simple
      if (typeof error === 'string') {
        toastMsg.textContent = error;
      }
      // Si es un error de Laravel
      else if (error && 'errors' in error) {
        const laravelError = error as LaravelError;
        const errorMessages = Object.values(laravelError.errors || {})
          .flat()
          .join(', ');
        toastMsg.textContent = laravelError.message || errorMessages;
      }
      // Si es el error ResponseError original
    await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
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
