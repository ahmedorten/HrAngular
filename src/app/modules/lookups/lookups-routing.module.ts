import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesFormComponent } from './components/countries-form/countries-form.component';
import { CountriesComponent } from './components/countries/countries.component';
import { EducationLevelsComponent } from './components/education-levels/education-levels.component';
import { EmployeeCategoryComponent } from './components/employee-category/employee-category.component';
import { LanguagesListComponent } from './components/Languages/languages-list/languages-list.component';
import { RelationshipsComponent } from './components/relationships/relationships.component';

const routes: Routes = [
  
  {
    component: CountriesComponent,
    path: 'lookups/countries'
  },
  {
    component: CountriesFormComponent,
    path: 'lookups/countries-form'
  },
  {
    component: EducationLevelsComponent,
    path: 'lookups/education-levels'
  },
  {
    component: RelationshipsComponent,
    path: 'lookups/relationships'
  },
  {
    component: EmployeeCategoryComponent,
    path: 'lookups/employee-category'
  },
  {
    component: LanguagesListComponent,
    path: 'lookups/Languages'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})

export class LookupsRoutingModule { }
