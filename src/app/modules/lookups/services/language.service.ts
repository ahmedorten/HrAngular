import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService  extends DataService {

  constructor(http: HttpClient) {
    super(environment.apiUrl +'/Languages', http);
  }
}
