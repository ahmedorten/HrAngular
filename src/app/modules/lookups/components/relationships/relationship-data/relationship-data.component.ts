import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotAuthorizedError } from 'src/app/shared/errors/not-authorized-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { RelationshipsComponent } from '../relationships.component';
import swal from 'sweetalert2';
import { RelationshipsService } from '../../../services/relationship-types.service';
import { Relationships } from '../../../models/relationship-types';
@Component({
  selector: 'app-relationship-data',
  templateUrl: './relationship-data.component.html',
  styleUrls: ['./relationship-data.component.css']
})
export class RelationshipDataComponent implements OnInit {
  closeResult: string;
  langDir: boolean;
  arrLength = 0;
  clickEventsubscription:Subscription;
  IsEdit: boolean;
  lang: string = "";
 
  Index: number;
 // @Output() myEvent = new EventEmitter();
  EnglishPattern: any;
  ArabicPattern: any;
  formData = new FormGroup({
    relationshipTypeCode: new FormControl(),
    relationshipTypeName: new FormControl("", [Validators.required]),
    relationshipTypeNameL: new FormControl("", [Validators.required]),
    relationshipTypeSerial:new FormControl()
  });

  get relationshipTypeCode() {
    return this.formData.get('relationshipTypeCode');
  }
  get relationshipTypeName() {
    return this.formData.get('relationshipTypeName');
  }
  get relationshipTypeNameL() {
    return this.formData.get('relationshipTypeNameL');
  }
  get relationshipTypeSerial() {
    return this.formData.get('relationshipTypeSerial');
  }
  constructor(private relationshipsService:RelationshipsService,private modalService: NgbModal , public relationshipsComponent :RelationshipsComponent) 
  { 
    this.clickEventsubscription=this.relationshipsService.getClickEvent().subscribe(()=>{

      this.editItem(this.relationshipsService.Relationships);})
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
    var EmployeeCategory: Relationships = {
      relationshipTypeCode: 0,
      relationshipTypeName: this.relationshipTypeName.value,
      relationshipTypeNameL: this.relationshipTypeNameL.value,
      relationshipTypeSerial:this.relationshipTypeSerial.value
    }

    this.relationshipsService.create(EmployeeCategory).subscribe(
      (res: any) => {
        if (!res.save) {
          if (res.checkExist) {
            swal.fire("Save Failed, this Relationship Is saved before", '', 'error');
          }
        }
        if (res.save) {
          console.log(res.dto)
          this.relationshipsComponent.RelationshipsList.push(res.dto as Relationships);
          this.arrLength=this.relationshipsComponent.RelationshipsList.length;
          swal.fire("Save Successfully.", '', 'success');
          this.resetModal();
        }

      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to Save the Relationship Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load Relationship Data");
        } else throw error;
      }
    );
  }
  onEditData() {
    var EmployeeCategory: Relationships = {
      relationshipTypeCode: parseInt(this.relationshipTypeCode.value),
      relationshipTypeName: this.relationshipTypeName.value,
      relationshipTypeNameL: this.relationshipTypeNameL.value,
      relationshipTypeSerial:parseInt(this.relationshipTypeSerial.value)
    }
    this.relationshipsService.update(EmployeeCategory.relationshipTypeCode, EmployeeCategory).subscribe(
      (res: any) => {
        if (!res.update) {
          if (res.checkExist) {
            swal.fire("Update Failed, this Relationship not found", '', 'error');
          }
          if (res.checkDuplicate) {
            swal.fire("Update Failed, this name is found before", '', 'error');
          }
        }
        if (res.update) {
          swal.fire("Update Successfully.", '', 'success');
          this.IsEdit = false;
          this.relationshipsComponent.RelationshipsList[this.Index] = { ...res.dto };
          this.resetModal();
        }

      },
      (error: AppError) => {
        console.log("error obj", error);
        if (error instanceof NotAuthorizedError) {
          alert("Not Authorized to Update the Relatinships Data");
        } else if (error instanceof NotFoundError) {
          alert("Sorry cannot load Relatinships Data");
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
   public editItem(EmployeeCategory: Relationships) {
  
    this.IsEdit = true;
    this.Index = this.relationshipsComponent.RelationshipsList.indexOf(EmployeeCategory);
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
