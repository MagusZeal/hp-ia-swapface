
import { Injectable, } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { environment, } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class SwapfaceService {
  url = `${environment.api.url}:${environment.api.port}/${environment.api.root}/v1`;
  constructor(private http: HttpClient) { }

  _post(body: any): Observable<any> {
    const url = `${this.url}/swapface`;
    return this.http.post(`${url}`, body);
  }
}
