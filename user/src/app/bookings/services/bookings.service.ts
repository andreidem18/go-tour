import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Booking } from '../interfaces/Booking';
import { Observable, switchMap, tap } from 'rxjs';
import { NewBooking } from '../interfaces/NewBooking';
import { CreatedBooking } from '../interfaces/CreatedBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = environment.apiUrl;
  private _bookings: Booking[] = [];

  get bookings() { return this._bookings }

  constructor() {
    this.getBookings().subscribe();
  }

  getBookings(): Observable<Booking[]>{
    const userId = this.authService.loggedUser()?.id;
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings?userId=${userId}`)
      .pipe(tap(res => this._bookings = res))
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${id}`);
  }

  createBooking(booking: NewBooking){
    return this.http.post<CreatedBooking>(`${this.apiUrl}/bookings`, booking)
      .pipe(
        switchMap(res => this.getBookingById(res.id)),
        tap(res => this._bookings.push(res)),
      )
  }

}
