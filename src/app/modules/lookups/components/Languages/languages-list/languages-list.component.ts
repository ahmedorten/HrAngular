import { Component, OnInit, Input } from '@angular/core';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotAuthorizedError } from 'src/app/shared/errors/not-authorized-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import swal from 'sweetalert2';
import { Language } from '../../../models/Language';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.css']
})
export class LanguagesListComponent implements OnInit {
  LanguageList: Language[] = [];
  arrLength: number = 0;

  /**
   * Shows or hide the languages modal.
   */
  languagesModalVisibility = false;
  isEdit: boolean = false;
  itemEdit: Language;

  //#region  CTOR
  constructor(private LanguageService: LanguageService) {
    LanguageService.getAll().subscribe(res => {
      this.LanguageList = res as Language[];
      this.arrLength = this.LanguageList.length;
    });
  }
  //#endregion

  //#region  OnInit
  ngOnInit(): void {
  }
  //#endregion


  //#region  editItem
  editItem(item: Language) {
    this.languagesModalVisibility = true;
    this.itemEdit = item;
    this.isEdit = true;
  }
  //#endregion


  //#region  editDelete
  OnDelete(item) {
    let index = this.LanguageList.indexOf(item);
    swal.fire({
      title: 'Are you sure you want to delete this Language ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        this.LanguageService.getPerAction("/DeleteLanguage?LanguageCode=" + item.languageCode).subscribe(res => {
          if (res['delete']) {
            this.LanguageList.splice(index, 1);
            this.arrLength = this.LanguageList.length;
          } else {
            swal.fire(res['mes'], '', 'error');
          }
        })
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
  //#endregion

  //#region  addLanguage
  addLanguage(createdLanaguage: Language) {
    if (createdLanaguage) {
      this.LanguageList = [createdLanaguage, ...this.LanguageList];
      this.arrLength = this.LanguageList.length;
    }
  }
  //#endregion

  //#region  updateLanguage
  updateLanguage(updateLanguage: Language) {
    if (updateLanguage) {
      var index = this.LanguageList.findIndex(c => c.languageCode == updateLanguage.languageCode);
      this.LanguageList[index].languageNameA = updateLanguage.languageNameA;
      this.LanguageList[index].languageNameE = updateLanguage.languageNameE;
      this.isEdit = false;
    }
  }
  //#endregion
}
