import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpInput } from 'src/app/Model/Employee';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent implements OnInit {
  dataarry: any;
  myForm: FormGroup;
  data: EmpInput;
  id: any;

  constructor(private http: HttpClient) {}
  @ViewChild(EmployeeFormComponent) addview!: EmployeeFormComponent;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      pic: new FormControl('', [Validators.required]),
    });
    this.getData();
    // this.getbyId();
  }

  getData() {
    this.http
      .get<any>('https://dummy.restapiexample.com/api/v1/employees')
      .subscribe((res) => {
        console.log(res);
        console.log(res.data);
        this.dataarry = res.data;
        console.log(this.dataarry);
      });
  }
  getbyId() {
    this.http
      .get<any>('https://dummy.restapiexample.com/api/v1/employee/1')
      .subscribe((res) => {
        console.log(res);
        //   console.log(res.data);
        this.dataarry = res.data;
        console.log(this.dataarry.length);
        console.log(this.dataarry);
      });
  }
  PostEmployees() {
    this.data = {
      name: this.myForm.get('name')?.value,
      salary: this.myForm.get('salary')?.value,
      age: this.myForm.get('age')?.value,
    };
    console.log(this.data);
    this.http
      .post<any>('https://dummy.restapiexample.com/api/v1/create', this.data)
      .subscribe((res) => {
        console.log(res);
      });
  }
  delete(row: any) {
    this.http
      .delete('https://dummy.restapiexample.com/api/v1/delete/' + row.id)
      .subscribe((res) => {
        console.log(res);
      });
      this.getData();
  }
  updateEmployee(row: any) {
    console.log(row);
    this.id = row.id;
    this.myForm.controls['name'].setValue(row.employee_name);
    this.myForm.controls['salary'].setValue(row.employee_salary);
    this.myForm.controls['age'].setValue(row.employee_age);
  }
  editEmployee() {
    this.data = {
      name: this.myForm.get('name')?.value,
      salary: this.myForm.get('salary')?.value,
      age: this.myForm.get('age')?.value,
    };
    this.http
      .put<any>(
        'https://dummy.restapiexample.com/api/v1/update/' + this.id,
        this.data
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.getData();
  }
}
