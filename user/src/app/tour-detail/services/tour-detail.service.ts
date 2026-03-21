import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tour } from '../interfaces/Tour';
import { generateMap } from 'src/app/shared/helpers/generateMap';
import { Review } from '../interfaces/Review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourDetailService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private _tour: Tour | null = null;
  private _mapImg: string = "";

  public tourId = signal<number>(-1);

  get tour(): Tour | null { return this._tour ? { ...this._tour } : null };
  get mapImg(): string { return this._mapImg };

  tourIdEffect = effect(() => {
    if(this.tourId() === -1) return;
    this.getTourById(this.tourId());
  })

  constructor() { }

  getTourById(id: number): void {
    this._tour = null;
    this.http.get<Tour>(`${this.apiUrl}/tours/${id}`)
      .subscribe(res => {
        const { lat, long } = res.location;
        this._mapImg = generateMap(lat, long);
        this._tour = res;
      });
  }

  getTourReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/tours/${this.tourId()}/reviews`);
  }

  setId(id: number): void {
    this.tourId.set(id);
  }

  getStarsAverage(): number {
    if(!this._tour) return 0;
    let sum = 0;
    this._tour?.reviews.forEach(r => sum += +r.rating);
    const totalReviews = this._tour.reviews.length;
    return sum / totalReviews;
  }

}
