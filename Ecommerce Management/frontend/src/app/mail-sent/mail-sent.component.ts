import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { authService } from '../services/authService.service';

@Component({
  selector: 'app-mail-sent',
  templateUrl: './mail-sent.component.html',
  styleUrls: ['./mail-sent.component.css'],
})
export class MailSentComponent implements OnInit {
  state: boolean | undefined;
  email: string | undefined;
  name: string | undefined;
  constructor(
    private router: Router,
    private location: Location,
    private auth: authService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state?.['state'];
    this.email = this.router.getCurrentNavigation()?.extras.state?.['email'];
    this.name = this.router.getCurrentNavigation()?.extras.state?.['name'];
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      if (!this.state) {
        this.router.navigate(['/signup']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
