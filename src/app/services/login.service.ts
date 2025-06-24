// src/app/api/auth.api.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../shared/api.config'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}
    api=`${ApiConfig.baseUrl}`;
    login(payload: { username: string; password: string }): Observable<any> {
        return this.http.post(this.api+'/Authen/login', payload);
    }
}
