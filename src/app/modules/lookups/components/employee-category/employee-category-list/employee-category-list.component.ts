import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotAuthorizedError } from 'src/app/shared/errors/not-authorized-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { EmployeeCategoryComponent } from '../employee-category.component';
import swal from 'sweetalert2';
import { EmployeeCategoriesService } from '../../../services/employee-category.service';
import { EmployeeCategory } from '../../../models/employee-category';
@Component({
  selector: 'app-employee-category-list',
  templateUrl: './employee-category-list.component.html',
  styleUrls: ['./employee-category-list.component.css']
})
export class EmployeeCategoryListComponent implements OnInit {
  langDir: boolean;
  arrLength = 0;
  IsEdit: boolean;
  lang: string = "";

  constructor(private employeeCategoriesService :EmployeeCategoriesService , public employeeCategoryComponent:EmployeeCategoryComponent ) { }

  ngOnInit(): void 
  {
    
    if (localStorage.getItem('lang') == 'ar') {
      this.langDir = true;
    }
    else {
      this.langDir = false;
    }
    this.lang = localStorage.getItem('lang');
    this.employeeCategoriesService.getAll().subscribe(
      res => {
        this.employeeCategoryComponent.EmployeeCategories = res as EmployeeCategory[];
        this.arrLength = this.employeeCategoryComponent.EmployeeCategories.length;
      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to get the Employee Category Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load Employee Category Data");
        } else throw error;
      }
    );
  }
  editItem(item: EmployeeCategory)
  {
  
this.employeeCategoriesService.sendClickEvent(item);
  }
  
  OnDelete(EmployeeCategory) {
    swal.fire({
      title: 'Are you sure you want to delete this Employee Category ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        this.employeeCategoriesService.delete(EmployeeCategory.empCategeoryCode).subscribe(
          (res: any) => {
            if (!res.delete) {
              if (res.checkExist) {
                swal.fire(
                  'Deleted Failed,this Employee Category not found',
                  '',
                  'error'
                )
              }
            }
            if (res.delete) {
              let index = this.employeeCategoryComponent.EmployeeCategories.indexOf(EmployeeCategory);
              this.employeeCategoryComponent.EmployeeCategories.splice(index, 1);
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
              alert("Not Authorized to delete the Employee Category Data");
            } else if (error instanceof NotFoundError) {
              alert("Sorry cannot load Employee Category Data");
            } else throw error;
          }
        );
      }
    })
  }
}
