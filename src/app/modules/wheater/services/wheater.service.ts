import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WheaterService {
  private apiKey = environment.API_KEY;
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getWeatherDatas(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&units=metric&mode=json&appid=${this.apiKey}`);
  }
}
