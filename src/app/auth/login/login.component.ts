// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NzModalService } from 'ng-zorro-antd/modal';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modal: NzModalService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loginService
      .login({
        username: this.form.value.username,
        password: this.form.value.password,
      })
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username || '');
          localStorage.setItem('role', res.role || '');
          localStorage.setItem('fullName', res.fullName || '');
          localStorage.setItem('userId', String(res.userId || ''));
          localStorage.setItem('email', res.email || '');

          // Convert employeeId to string if it's a number
          if (res.employeeId !== undefined && res.employeeId !== null) {
            localStorage.setItem('employeeId', String(res.employeeId));
          } else {
            console.warn('Không có employeeId trong phản hồi API.');
          }
          this.modal.success({
            nzTitle: 'Đăng nhập thành công!!',
          });

          const redirect = localStorage.getItem('redirectUrl') || '/index';
          localStorage.removeItem('redirectUrl');

          this.router.navigateByUrl(redirect);
        },
        error: (err) => {
          this.modal.error({
            nzTitle: 'Đăng nhập thất bại!!',
          });
        },
      });
  }
}
