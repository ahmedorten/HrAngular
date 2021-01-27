import { LookupsRoutingModule } from './lookups-routing.module';
import { NgModule } from '@angular/core';
import { CountriesFormComponent } from './components/countries-form/countries-form.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountriesService } from './services/countries.service';
import { EducationLevelsComponent } from './components/education-levels/education-levels.component';
import { TranslateModule } from '@ngx-translate/core';
import { EducationLevelsListComponent } from './components/education-levels/education-levels-list/education-levels-list.component';
import { EducationLevelsDataComponent } from './components/education-levels/education-levels-data/education-levels-data.component';
import { LanguagesListComponent } from './components/Languages/languages-list/languages-list.component';
import { LanguagesModelComponent } from './components/Languages/languages-model/languages-model.component';
import { EmployeeCategoryComponent } from './components/employee-category/employee-category.component';
import { EmployeeCategoryListComponent } from './components/employee-category/employee-category-list/employee-category-list.component';
import { EmployeeCategoryDataComponent } from './components/employee-category/employee-category-data/employee-category-data.component';
import { RelationshipsComponent } from './components/relationships/relationships.component';
import { RelationshipListComponent } from './components/relationships/relationship-list/relationship-list.component';
import { RelationshipDataComponent } from './components/relationships/relationship-data/relationship-data.component';
import { LevingReasonComponent } from './components/leving-reason/leving-reason.component';
import { LeavingReasonListComponent } from './components/leving-reason/leaving-reason-list/leaving-reason-list.component';
import { LeavingReasonDataComponent } from './components/leving-reason/leaving-reason-data/leaving-reason-data.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsListComponent } from './components/documents/documents-list/documents-list.component';
import { DocumentsDataComponent } from './components/documents/documents-data/documents-data.component';
import { ComputerToolsComponent } from './components/computer-tools/computer-tools.component';
import { ComputerToolsListComponent } from './components/computer-tools/computer-tools-list/computer-tools-list.component';
import { ComputerToolsDataComponent } from './components/computer-tools/computer-tools-data/computer-tools-data.component';
import { RelationshipsService } from './services/relationship-types.service';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CountriesFormComponent,
    CountriesComponent,
    EducationLevelsComponent,
    CountriesFormComponent,
    EducationLevelsListComponent,
    EducationLevelsDataComponent,
    EmployeeCategoryComponent,
    EmployeeCategoryListComponent,
    EmployeeCategoryDataComponent,
    RelationshipsComponent,
    RelationshipListComponent,
    RelationshipDataComponent,
    LevingReasonComponent,
    LeavingReasonListComponent,
    LeavingReasonDataComponent,
    DocumentsComponent,
    DocumentsListComponent,
    DocumentsDataComponent,
    ComputerToolsComponent,
    ComputerToolsListComponent,
    ComputerToolsDataComponent,
    LanguagesListComponent,
    LanguagesModelComponent
  ],
  imports: [
    SharedModule,
    TranslateModule,
    LookupsRoutingModule
  ],
  providers: [
    CountriesService,
    RelationshipsService
  ],
  exports: []
})
export class LookupsModule { }
