import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { HttpClient } from '@angular/common/http';
import { EmpInput } from './../../Model/Employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  myForm: FormGroup;
  data: EmpInput;

  constructor(
    private FormBuilder: FormBuilder,
    private EmployeeService: EmployeeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
    });
  }

  get id() {
    return this.myForm.value['id'];
  }
  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('id', form.value.id);
    console.log('Name', form.value.name);
    console.log('Salary', form.value.salary);
    console.log('Age', form.value.age);
  }
  PostEmployees() {
    this.data = {
      "name":this.myForm.get('name')?.value,
      "salary":this.myForm.get('salary')?.value,
      "age":this.myForm.get('age')?.value
    }
    console.log(this.data)
    this.http
      .post<any>('https://dummy.restapiexample.com/api/v1/create', this.data)
      .subscribe((res) => {
        console.log(res);
      });
      
  }
}
