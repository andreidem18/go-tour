import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TourItem } from '../interfaces/TourItem';
import { HighlightedTour } from '../interfaces/HighlightedTour';
import { Observable } from 'rxjs';

interface Filters {
  [key: string]: string | string[] | number[]
  // name: string;
  // countries: string[];
  // price: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private http = inject(HttpClient)

  private apiUrl = environment.apiUrl;

  private _toursList: TourItem[] = [];

  private initialFilters: Filters = {
    name: '',
    countries: '',
    price: [],
  }

  private filters: Filters = this.initialFilters;
  private _filtersTouched: boolean = false;

  get toursList(){ return [...this._toursList] }
  get filtersTouched(): boolean { return this._filtersTouched }

  constructor() {
    this.getAllTours();
  }

  getAllTours(): void {
    this.http.get<TourItem[]>(`${this.apiUrl}/tours`)
      .subscribe(res => this._toursList = res);
  }

  getHighlightedTours(): Observable<HighlightedTour[]> {
    return this.http.get<HighlightedTour[]>(`${this.apiUrl}/highlighted-tours`)
  }

  setFilter(name: string, value: string | string[] | number[]): void {
    this.filters[name] = value;
    this.filterTours();
    this._filtersTouched = true;
  }

  filterTours(): void {
    this.http.get<TourItem[]>(`${this.apiUrl}/tours?${this.formatFilters()}`)
      .subscribe(res => {
        this._toursList = res;
      });
  }


  formatFilters(): string {
    const result = [];
    for(const property in this.filters){
      const value = this.filters[property as keyof Filters];
      if(!value || !value.length) continue;
      result.push(`${property}=${value}`)
    }
    return result.join('&')
  }

  clearFilters(): void {
    this.getAllTours();
    this.filters = {...this.initialFilters};
    this._filtersTouched = false;
  }


}
