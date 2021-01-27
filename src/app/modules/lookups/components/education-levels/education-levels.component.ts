import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotAuthorizedError } from 'src/app/shared/errors/not-authorized-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { EducationLevels } from '../../models/education-levels';
import { EducationLevelsService } from '../../services/education-levels.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-education-levels',
  templateUrl: './education-levels.component.html',
  styleUrls: ['./education-levels.component.css']
})
export class EducationLevelsComponent implements OnInit {


  constructor() { }
  public EducationLevels: EducationLevels[] = [];
  ngOnInit(): void {

  }



}
