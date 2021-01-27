import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import swal from 'sweetalert2';
import { Language } from '../../../models/Language';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-languages-model',
  templateUrl: './languages-model.component.html',
  styleUrls: ['./languages-model.component.css']
})
export class LanguagesModelComponent implements OnInit {
  // @Output() newItemEvent = new EventEmitter<string>();
  @Input() item: string;
  lang: string = "";
  langDir: boolean;
  isEdit: boolean;
  itemEdit: Language;
  isShown: boolean = false;
  //#region  CTRTR

  /**
   * Sets the visibility of this component modal.
   *
   * Handles visibility change in two-data-binding approach.
   */



  @Input() set Edit(isEdit: boolean) {
    // console.log(isEdit);
    this.isEdit = isEdit;
  }

  @Input() set ItemEdit(itemEdit: Language) {
    this.itemEdit = itemEdit;

  }


  @Input() set visible(IsShown: boolean) {
    this.isShown = IsShown;
    if (this.isShown && this.modalRef) {
      this.resetModal();
      this.openModal(this.modalRef);
    } else {
      this.closeModal();
    }

    this.visibleChange.emit(this.isShown);
  }


  /**
   * Outputs a value that indicates whether the modal is shown or not.
   *
   * Handles visibility change in two-data-binding approach.
   */
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() createdLanguage = new EventEmitter<Language>();
  @Output() updateLanguage = new EventEmitter<Language>();

  /**
   * The ngb-modal reference to use it when modal needed to be closed.
   */
  modal: NgbModalRef;

  /**
   * The modal template reference.
   */
  @ViewChild('modalRef') modalRef: ElementRef<any>;

  constructor(private modalService: NgbModal, private LanguageService: LanguageService) {

    //this.newItemEvent.emit('');
    if (localStorage.getItem('lang') == 'ar') {
      this.langDir = true;
    }
    else {
      this.langDir = false;
    }
    this.lang = localStorage.getItem('lang');
  }
  //#endregion

  //#region  OnInit
  ngOnInit(): void {
  }
  //#endregion

  //#region  formData
  formData = new FormGroup({
    languageNameA: new FormControl("", [Validators.required]),
    languageNameE: new FormControl("", [Validators.required])
  });

  get LanguageNameA() {
    return this.formData.get('languageNameA');
  }
  get LanguageNameE() {
    return this.formData.get('languageNameE');
  }
  //#endregion

  //#region  onSubmit()
  onSubmit() {
    if (this.formData.invalid) {
      return this.formData.markAllAsTouched();
    }
    var dataDto = { ...this.formData.value as Language };

    if (!this.isEdit) {
      // Add New Langauge 
      this.LanguageService.postPerAction("/PostLanguage", dataDto).subscribe(res => {
        if (res['save']) {
          dataDto = res['dto'] as Language;
          this.createdLanguage.emit(dataDto);
          swal.fire("Save Successfully.", '', 'success');
          this.closeModal();
        } else {
          swal.fire(res['mes'], '', 'error');
        }
      });
    } else {
      // Update Langauge
      dataDto.languageCode = this.itemEdit.languageCode;
      this.LanguageService.postPerAction("/EditLanguage", dataDto).subscribe(res => {
        if (res['update']) {
          this.updateLanguage.emit(dataDto);
          swal.fire("Update Successfully.", '', 'success');
          this.closeModal();
        } else {
          swal.fire(res['mes'], '', 'error');
        }
      });
    }
  }
  //#endregion
  //#region  resetModal
  resetModal() {
    this.formData.reset();
  }
  //#endregion

  /**
   * Opens the modal of the given templateRef.
   * @param modalRef The modal templateRef to be opened.
   */
  openModal(modalRef) {
    /**
     * Open the modal & listen for user press ESC key.
     */
    if (this.isEdit) {
      this.LanguageNameA.setValue(this.itemEdit.languageNameA);
      this.LanguageNameE.setValue(this.itemEdit.languageNameE);
    }
    this.modal = this.modalService.open(modalRef, { size: 'lg' });
    this.modal.result.then(null, () => this.closeModal());
  }

  /**
   * Closes the currently opened modal.
   */
  closeModal() {
    this.modal?.dismiss();
    this.visibleChange.emit(false);
  }

}
