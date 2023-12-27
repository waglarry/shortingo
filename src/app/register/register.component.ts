import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  registerForm = this._builder.group({
    username: this._builder.control('', Validators.required),
    email: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
    confirmPassword: this._builder.control('', Validators.required),
  });

  handleRegister() {
    let formData = this.registerForm.value;
    if (this.registerForm.valid) {
      if (formData.password !== formData.confirmPassword) {
        alert('Password do not match!');
      } else {
        this._authService.register(formData).subscribe({
          next: () => {
            this.router.navigate(['login']);
          },
        });
      }
    } else {
      alert('Invalid Credentials!');
    }
  }
}
