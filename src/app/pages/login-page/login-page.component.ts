import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/api-routes';
import { routePaths } from 'src/app/app-routing.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  readonly passwordMinLength = 8;
  errorMessage = null;
  constructor(private formBuilder: FormBuilder, 
    private requestService: RequestService, 
    private localStorageService: LocalStorageService, 
    private router: Router
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
    })
  }

  ngOnInit() {
   
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
    const { data, error } = await this.requestService.send<{data: {jwtToken: string}, error: any}>('POST', apiRoutes.loginApi, {
      body: this.loginForm.value
    })

    if (error)  {
      this.errorMessage = error.message;
    }
    
    this.localStorageService.setItem('JWT_TOKEN', data?.jwtToken);
    this.router.navigate([routePaths.questionDetailPage])
    console.log({ jwtToken: data?.jwtToken });
  }

}