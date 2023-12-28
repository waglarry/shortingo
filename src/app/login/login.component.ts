import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  brandImageUrl: string = 'assets/images/Shortingo.svg';
  loginIllusion: string = 'assets/images/loginIllusion.svg';

  loginForm = this._builder.group({
    email: this._builder.control('', [Validators.required, Validators.email]),
    password: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
  });

  userData: any;

  handleLogin() {
    let formData = this.loginForm.value;
    let username = formData.email?.trim().toLowerCase();

    if (this.loginForm.valid) {
      this._authService.getByCode(username).subscribe({
        next: (response: any) => {
          response?.map((data: Object) => {
            this.userData = data;
          });

          if (this.userData?.password === formData.password) {
            sessionStorage.setItem('username', this.userData.id);
            this.router.navigate(['dashboard']);
          } else {
            alert('Email or Password is wrong!');
          }
        },
      });
    } else {
      alert('Invalid Credentials!');
    }
  }
}
