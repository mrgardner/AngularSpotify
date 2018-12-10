import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  wrongCredentials: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      'email': ['', [
        Validators.required
      ]],
      'password': ['', [
        Validators.required
      ]]
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).then(() => {
      this.wrongCredentials = false;
      this.router.navigate(['']);
    })
    .catch(() => this.wrongCredentials = true);
  }
}
