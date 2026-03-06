import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Country, CountryRes } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() {
    this.getAllCountries();
  }
  private http = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v2'

  private _allCountries: Country[] = [];
  get allCountries(){ return [...this._allCountries] }

  getAllCountries(){
    this.http.get<CountryRes[]>(`${this.apiUrl}/all?fields=name,flag`)
      .subscribe(res => this._allCountries = res.map(c => ({
        name: c.name,
        flag: c.flag,
      })))
  }

  findOneCountry(country: string): Country | undefined {
    return this._allCountries.find(c => c.name === country);
  }

}
