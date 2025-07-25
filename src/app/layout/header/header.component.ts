  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })
  export class HeaderComponent implements OnInit {
    username: string = '';

    constructor(private router: Router) {}

    ngOnInit(): void {
      this.username = localStorage.getItem('username') || 'Người dùng';
    }

    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['/auth/login']);
    }
  }