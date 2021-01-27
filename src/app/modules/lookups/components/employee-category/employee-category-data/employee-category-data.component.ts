import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotAuthorizedError } from 'src/app/shared/errors/not-authorized-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import swal from 'sweetalert2';
import { EmployeeCategoriesService } from '../../../services/employee-category.service';
import { EmployeeCategoryComponent } from '../employee-category.component';
import { EmployeeCategory } from '../../../models/employee-category';
@Component({
  selector: 'app-employee-category-data',
  templateUrl: './employee-category-data.component.html',
  styleUrls: ['./employee-category-data.component.css']
})
export class EmployeeCategoryDataComponent implements OnInit {
  closeResult: string;
  langDir: boolean;
  arrLength = 0;
  clickEventsubscription:Subscription;
  IsEdit: boolean;
  lang: string = "";

  Index: number;
  //@Output() myEvent = new EventEmitter();
  EnglishPattern: any;
  ArabicPattern: any;
  formData = new FormGroup({
    empCategeoryCode: new FormControl(),
    empCategeoryNameA: new FormControl("", [Validators.required]),
    empCategeoryNameE: new FormControl("", [Validators.required])
  });

  get empCategeoryCode() {
    return this.formData.get('empCategeoryCode');
  }
  get empCategeoryNameA() {
    return this.formData.get('empCategeoryNameA');
  }
  get empCategeoryNameE() {
    return this.formData.get('empCategeoryNameE');
  }
  constructor(private modalService: NgbModal, private employeeCategoriesService :EmployeeCategoriesService , public employeeCategoryComponent:EmployeeCategoryComponent) 
  { 
    this.clickEventsubscription=this.employeeCategoriesService.getClickEvent().subscribe(()=>{

      this.editItem(this.employeeCategoriesService.EmployeeCategories);})
  }

  ngOnInit(): void 
  {
  }
  onSubmit() {
    if (this.IsEdit) {
      this.onEditData();
    } else {
      this.AddItem();
    }
  }

  AddItem() {
    this.IsEdit = false;
    var EmployeeCategory: EmployeeCategory = {
      empCategeoryCode: 0,
      empCategeoryNameA: this.empCategeoryNameA.value,
      empCategeoryNameE: this.empCategeoryNameE.value
    }

    this.employeeCategoriesService.create(EmployeeCategory).subscribe(
      (res: any) => {
        if (!res.save) {
          if (res.checkExist) {
            swal.fire("Save Failed, this Employee Category Is saved before", '', 'error');
          }
        }
        if (res.save) {
          console.log(res.dto)
          this.employeeCategoryComponent.EmployeeCategories.push(res.dto as EmployeeCategory);
          this.arrLength=this.employeeCategoryComponent.EmployeeCategories.length;
          swal.fire("Save Successfully.", '', 'success');
          this.resetModal();
        }

      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to Save the Employee Category Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load Employee Category Data");
        } else throw error;
      }
    );
  }

  onEditData() {
    var EmployeeCategory: EmployeeCategory = {
      empCategeoryCode: parseInt(this.empCategeoryCode.value),
      empCategeoryNameA: this.empCategeoryNameA.value,
      empCategeoryNameE: this.empCategeoryNameE.value
    }
    this.employeeCategoriesService.update(EmployeeCategory.empCategeoryCode, EmployeeCategory).subscribe(
      (res: any) => {
        if (!res.update) {
          if (res.checkExist) {
            swal.fire("Update Failed, this Employee Category not found", '', 'error');
          }
          if (res.checkDuplicate) {
            swal.fire("Update Failed, this name is found before", '', 'error');
          }
        }
        if (res.update) {
          swal.fire("Update Successfully.", '', 'success');
          this.IsEdit = false;
          this.employeeCategoryComponent.EmployeeCategories[this.Index] = { ...res.dto };
          this.resetModal();
        }

      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to Update the Employee Category Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load Employee Category Data");
        } else throw error;
      }
    );
  }
edit()
{
  let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
  element.click();
  
}
editcontent(content)
{
  this.OpenModal(content);
}
   public editItem(EmployeeCategory: EmployeeCategory) {
  
    this.IsEdit = true;
    this.Index = this.employeeCategoryComponent.EmployeeCategories.indexOf(EmployeeCategory);
    this.formData.setValue(EmployeeCategory);
   this.edit();
  }

  OpenModal(content) {
    this.modalService.open(content, { size: "lg" }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  resetModal() {
    this.IsEdit = false;
    this.modalService.dismissAll();
    this.formData.reset();
  }
}
