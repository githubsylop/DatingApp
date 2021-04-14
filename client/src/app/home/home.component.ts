import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  user:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getUser();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUser () {
    this.http.get("https://localhost:5001/api/users").subscribe(respons => this.user=respons);
  }

}
