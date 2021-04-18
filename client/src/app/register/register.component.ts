import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  @Input()
  userFromHome:any;

  constructor(private accountService: AccountService,private toast:ToastrService) { }

  ngOnInit(): void {
    console.log(this.userFromHome);
  }

  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
      this.toast.error(error.error);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
