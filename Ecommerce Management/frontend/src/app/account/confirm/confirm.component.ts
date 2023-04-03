import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: ServicesService
  ) {}

  token: string | undefined;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.token = params?.['token'];
      console.log(this.token);
      this.service.accountConfirm(this.token).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
