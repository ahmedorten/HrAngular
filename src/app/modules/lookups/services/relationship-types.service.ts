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
export class RelationshipsService extends DataService {
  InvokeFunction= new EventEmitter();
  item:Subscription;
 // public invokeFirstComponentFunction = new EventEmitter();    
 // subsVar: Subscription; 
  constructor(http: HttpClient ,  public http1:HttpClient) {
    super(environment.apiUrl +'/Relationships', http);
  }
 /* public onFirstComponentButtonClick(variable :any) {    
    this.invokeFirstComponentFunction.emit(variable);    
  } */
public Relationships:any;
  private subject = new Subject<any>();
  sendClickEvent(item) {
    this.Relationships=item;
    this.subject.next();
  }
  getClickEvent(): Observable<any>{ 

    return this.subject.asObservable();
  }
}
