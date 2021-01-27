import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Observable ,Subject, Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import { textChangeRangeIsUnchanged } from 'typescript';
import { EducationLevels } from '../models/education-levels';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCategoriesService extends DataService {
  InvokeFunction= new EventEmitter();
  item:Subscription;
  constructor(http: HttpClient ,  public http1:HttpClient) {
    super(environment.apiUrl +'/EmployeeCategories', http);
  }
public EmployeeCategories:any;
  private subject = new Subject<any>();
  sendClickEvent(item) {
    this.EmployeeCategories=item;
    this.subject.next();
  }
  getClickEvent(): Observable<any>{ 

    return this.subject.asObservable();
  }
}
