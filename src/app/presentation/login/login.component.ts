import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder , private authService: AuthService , private router: Router) {
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      username: this.formBuilder.control(null , Validators.required),
      password: this.formBuilder.control(null , Validators.required)
    })
  }

  handleLogin() {
   this.authService.login(this.formGroup.value).subscribe({
     next: (data) => {
       console.log(data);
       this.router.navigateByUrl("/home");
     },
     error: (error) => {
       console.error(error);
     }
   });
  }
}
