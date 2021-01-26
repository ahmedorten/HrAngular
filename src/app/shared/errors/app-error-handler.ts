import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    alert('There are problem in the connection to the server Please call the administrator')
    console.log(error);
  }
}
