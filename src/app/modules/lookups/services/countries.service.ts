import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends DataService{

  constructor(http: HttpClient, private route: Router) {
    super(environment.apiUrl + '/Countries', http);
  }
}
