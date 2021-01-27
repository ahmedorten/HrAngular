import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotAuthorizedError } from 'src/app/shared/errors/not-authorized-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import swal from 'sweetalert2';
import { EducationLevels } from '../../../models/education-levels';
import { EducationLevelsService } from '../../../services/education-levels.service';
import { EducationLevelsComponent } from '../education-levels.component';
@Component({
  selector: 'app-education-levels-data',
  templateUrl: './education-levels-data.component.html',
  styleUrls: ['./education-levels-data.component.css']
})
export class EducationLevelsDataComponent implements OnInit {
  closeResult: string;
  langDir: boolean;
  arrLength = 0;
  clickEventsubscription:Subscription;
  IsEdit: boolean;
  lang: string = "";
  EducationLevels: EducationLevels[] = [];
  EducationLevel: EducationLevels;
  Index: number;
  @Output() myEvent = new EventEmitter();
  EnglishPattern: any;
  ArabicPattern: any;
  formData = new FormGroup({
    educationLevelCode: new FormControl(),
    educationLevelNameA: new FormControl("", [Validators.required]),
    educationLevelNameE: new FormControl("", [Validators.required])
  });

  get educationLevelCode() {
    return this.formData.get('educationLevelCode');
  }
  get educationLevelNameA() {
    return this.formData.get('educationLevelNameA');
  }
  get educationLevelNameE() {
    return this.formData.get('educationLevelNameE');
  }

  constructor( private modalService: NgbModal, private EducationLevelService: EducationLevelsService , private educationLevelsComponent:EducationLevelsComponent)
   { 
    this.clickEventsubscription=this.EducationLevelService.getClickEvent().subscribe(()=>{

      this.editItem(this.EducationLevelService.educationLevel);})
   }

  ngOnInit(): void {
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
    var _EducationLevel: EducationLevels = {
      educationLevelCode: 0,
      educationLevelNameA: this.educationLevelNameA.value,
      educationLevelNameE: this.educationLevelNameE.value
    }

    this.EducationLevelService.create(_EducationLevel).subscribe(
      (res: any) => {
        if (!res.save) {
          if (res.checkExist) {
            swal.fire("Save Failed, this education level saved before", '', 'error');
          }
        }
        if (res.save) {
          this.EducationLevels.push(res.dto);
          this.educationLevelsComponent.EducationLevels.push(res.dto as EducationLevels);
          this.arrLength=this.EducationLevels.length;
          swal.fire("Save Successfully.", '', 'success');
          this.resetModal();
        }

      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to Save the Education Levels Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load Education Levels Data");
        } else throw error;
      }
    );
  }

  onEditData() {
    var _EducationLevel: EducationLevels = {
      educationLevelCode: parseInt(this.educationLevelCode.value),
      educationLevelNameA: this.educationLevelNameA.value,
      educationLevelNameE: this.educationLevelNameE.value
    }
    this.EducationLevelService.update(_EducationLevel.educationLevelCode, _EducationLevel).subscribe(
      (res: any) => {
        if (!res.update) {
          if (res.checkExist) {
            swal.fire("Update Failed, this education level not found", '', 'error');
          }
          if (res.checkDuplicate) {
            swal.fire("Update Failed, this name is found before", '', 'error');
          }
        }
        if (res.update) {
          swal.fire("Update Successfully.", '', 'success');
          this.IsEdit = false;
          this.educationLevelsComponent.EducationLevels[this.Index] = { ...res.dto };
          this.resetModal();
        }

      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to Update the Education Levels Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load Education Levels Data");
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
   public editItem(EducationLevel: EducationLevels) {
    console.log(EducationLevel)
    this.IsEdit = true;
    this.Index = this.educationLevelsComponent.EducationLevels.indexOf(EducationLevel);
    this.formData.setValue(EducationLevel);
   // this.OpenModal(content);
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
