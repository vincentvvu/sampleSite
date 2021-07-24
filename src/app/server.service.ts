
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  host: string;

  getHost(code: any) {
    let host: string = '';
    if (code === 0) {
      host = 'http://localhost:4000/api';
    } else if (code === 1) {
      host = 'http://13.211.179.41/test.php/api';
    }
    return host;
  }

  constructor() {
    this.host = this.getHost(1);
  }
}