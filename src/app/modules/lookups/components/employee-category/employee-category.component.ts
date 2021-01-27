import { Component, OnInit } from '@angular/core';
import { EmployeeCategory } from '../../models/employee-category';

@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.css']
})
export class EmployeeCategoryComponent implements OnInit {
  public EmployeeCategories:EmployeeCategory[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
