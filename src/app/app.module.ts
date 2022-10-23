import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeFormComponent } from './ReactiveForms/employee-form/employee-form.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeService } from './employee.service';
import { EmployeeTableComponent } from './ReactiveForms/employee-table/employee-table.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeTableComponent },
  // { path: 'employee', component: EmployeeFormComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
