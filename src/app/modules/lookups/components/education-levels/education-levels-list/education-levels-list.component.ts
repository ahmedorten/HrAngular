import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotAuthorizedError } from 'src/app/shared/errors/not-authorized-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import swal from 'sweetalert2';
import { EducationLevels } from '../../../models/education-levels';
import { EducationLevelsService } from '../../../services/education-levels.service';
import { EducationLevelsDataComponent } from '../education-levels-data/education-levels-data.component';
import { EducationLevelsComponent } from '../education-levels.component';
@Component({
  selector: 'app-education-levels-list',
  templateUrl: './education-levels-list.component.html',
  styleUrls: ['./education-levels-list.component.css']
})
export class EducationLevelsListComponent implements OnInit {


  constructor(private EducationLevelService: EducationLevelsService, public educationLevelsComponent: EducationLevelsComponent) { }
  langDir: boolean;
  arrLength = 0;
  IsEdit: boolean;
  lang: string = "";

  ngOnInit(): void {
    if (localStorage.getItem('lang') == 'ar') {
      this.langDir = true;
    }
    else {
      this.langDir = false;
    }
    this.lang = localStorage.getItem('lang');
    this.EducationLevelService.getAll().subscribe(
      res => {
        this.educationLevelsComponent.EducationLevels = res as EducationLevels[];
        this.arrLength = this.educationLevelsComponent.EducationLevels.length;
        console.log(this.arrLength);
      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to get the Education Levels Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load Education Levels Data");
        } else throw error;
      }
    );
  }

  editItem(item: EducationLevels) {
    this.EducationLevelService.sendClickEvent(item);
  }

  OnDelete(EducationLevel) {
    swal.fire({
      title: 'Are you sure you want to delete this Education Level ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        this.EducationLevelService.delete(EducationLevel.educationLevelCode).subscribe(
          (res: any) => {
            if (!res.delete) {
              if (res.checkExist) {
                swal.fire(
                  'Deleted Failed,this education level not found',
                  '',
                  'error'
                )
              }
            }
            if (res.delete) {
              let index = this.educationLevelsComponent.EducationLevels.indexOf(EducationLevel);
              this.educationLevelsComponent.EducationLevels.splice(index, 1);
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
              alert("Not Authorized to delete the Education Levels Data");
            } else if (error instanceof NotFoundError) {
              alert("Sorry cannot load Education Levels Data");
            } else throw error;
          }
        );
      }
    })
  }
}
