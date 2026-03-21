import { Injectable, inject } from '@angular/core';
import { Review } from '../interfaces/Review';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { ReviewBody } from '../interfaces/ReviewBody';
import { ReviewCreated } from '../interfaces/ReviewCreated';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private _reviews: Review[] = [];
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = environment.apiUrl;

  get reviews() { return [...this._reviews] }


  constructor() {
    this.getAllReviews().subscribe();
  }


  getAllReviews(): Observable<Review[]> {
    const userId = this.authService.loggedUser()?.id;
    return this.http.get<Review[]>(`${this.apiUrl}/reviews?userId=${userId}`)
      .pipe(
        tap(res => this._reviews = res),
      )
  }

  createReview(body: ReviewBody): Observable<Review> {
    return this.http.post<ReviewCreated>(`${this.apiUrl}/reviews`, body)
      .pipe(
        switchMap(res => {
          return this.http.get<Review>(`${this.apiUrl}/reviews/${res.id}`)
        }),
        tap(review => this._reviews.unshift(review)),
      )
  }

  deleteReview(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/reviews/${id}`)
      .pipe(tap(() => this._reviews = this._reviews.filter(r => r.id !== id)))
  }

  updateReview(id: number, body: ReviewBody): Observable<Review> {
    return this.http.put<ReviewCreated>(`${this.apiUrl}/reviews/${id}`, body)
      .pipe(
        switchMap(res => {
          return this.http.get<Review>(`${this.apiUrl}/reviews/${res.id}`)
        }),
        tap(review => {
          const index = this._reviews.findIndex(r => r.id === id);
          this._reviews[index] = review;
        }),
      )
  }
}
