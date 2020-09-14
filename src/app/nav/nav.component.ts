import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('logged in successfully');
    }, error => {
      console.log('FAILED to login');
    })
  }

  loggedIn() {
    const token = localStorage.getItem('meet_up_token')
    return !!token
  }

  logOut() {
    localStorage.removeItem('meet_up_token')
    console.log('Logged out');
  }

}