import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[LoginService]
})
export class NavbarComponent implements OnInit {

  constructor(public login:LoginService) { }

  ngOnInit() {
  }

}
