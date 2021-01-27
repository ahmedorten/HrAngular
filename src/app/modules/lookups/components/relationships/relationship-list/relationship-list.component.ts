import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotAuthorizedError } from 'src/app/shared/errors/not-authorized-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { RelationshipsComponent } from '../relationships.component';
import swal from 'sweetalert2';
import { RelationshipsService } from '../../../services/relationship-types.service';
import { Relationships } from '../../../models/relationship-types';
@Component({
  selector: 'app-relationship-list',
  templateUrl: './relationship-list.component.html',
  styleUrls: ['./relationship-list.component.css']
})
export class RelationshipListComponent implements OnInit {
  langDir: boolean;
  arrLength = 0;
  IsEdit: boolean;
  lang: string = "";
  
  constructor(private relationshipsService :RelationshipsService , public relationshipsComponent:RelationshipsComponent) { }

  ngOnInit(): void 
  {
    if (localStorage.getItem('lang') == 'ar') {
      this.langDir = true;
    }
    else {
      this.langDir = false;
    }
    this.lang = localStorage.getItem('lang');
    this.relationshipsService.getAll().subscribe(
      res => {
        this.relationshipsComponent.RelationshipsList = res as Relationships[];
        this.arrLength = this.relationshipsComponent.RelationshipsList.length;
      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to get the RelationShip Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load RelationShip Data");
        } else throw error;
      }
    );
  }
  editItem(item: Relationships)
  {
  
this.relationshipsService.sendClickEvent(item);

  }
  
  OnDelete(EmployeeCategory) {
    swal.fire({
      title: 'Are you sure you want to delete this Relationship Type ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        this.relationshipsService.delete(EmployeeCategory.empCategeoryCode).subscribe(
          (res: any) => {
            if (!res.delete) {
              if (res.checkExist) {
                swal.fire(
                  'Deleted Failed,this Relationship Type not found',
                  '',
                  'error'
                )
              }
            }
            if (res.delete) {
              let index = this.relationshipsComponent.RelationshipsList.indexOf(EmployeeCategory);
              this.relationshipsComponent.RelationshipsList.splice(index, 1);
              swal.fire(
                'Deleted Success',
                '',
                'success'
              )
            }

          },
          (error: AppError) => {
            console.log("error obj", error);
            if (error instanceof NotAuthorizedError) {
              alert("Not Authorized to delete the RelationShip Data");
            } else if (error instanceof NotFoundError) {
              alert("Sorry cannot load RelationShip Data");
            } else throw error;
          }
        );
      }
    })
  }
}
