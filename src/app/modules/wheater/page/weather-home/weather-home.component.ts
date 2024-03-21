import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/wheater.service';
import { WeatherDatas } from 'src/app/models/interfaces/weather.interface';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  initialCity = 'São Paulo';
  weatherDatas!: WeatherDatas;
  faSearch = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCity);
  }

  getWeatherDatas(city: string): void {
    this.weatherService.getWeatherDatas(city)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        data && (this.weatherDatas = data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCity);
    this.initialCity = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
