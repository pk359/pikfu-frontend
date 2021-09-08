import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { apiRoutes } from 'src/app/api-routes';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  readonly passwordMinLength = 8;
  constructor(private formBuilder: FormBuilder, private requestService: RequestService, private localStorageService: LocalStorageService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
    })
  }


  get email(): any {
    return this.loginForm.controls.email;
  }

  get password(): any {
    return this.loginForm.controls.password;
  }

  async login() {
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    const { data } = await this.requestService.send<{data: {jwtToken: string}}>('POST', apiRoutes.loginApi, {
      body: this.loginForm.value
    })

    this.localStorageService.setItem('JWT_TOKEN', data?.jwtToken);
    console.log({ jwtToken: data?.jwtToken });
  }

}
