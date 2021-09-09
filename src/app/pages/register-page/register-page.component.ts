import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/api-routes';
import { routePaths } from 'src/app/app-routing.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registrationForm: FormGroup;
  readonly passwordMinLength = 8;
  readonly minNameLength = 1;
  errorMessage: any;
  constructor(private formBuilder: FormBuilder, private requestService: RequestService, private localStorageService: LocalStorageService, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
    })
  }

  ngOnInit(): void {
  }

  get name(): any {
    return this.registrationForm.controls.name;
  }
  get email(): any {
    return this.registrationForm.controls.email;
  }

  get password(): any {
    return this.registrationForm.controls.password;
  }

  async register() {
    if (this.registrationForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    const { data, error } = await this.requestService.send<{ data: { jwtToken: string }, error: any }>('POST', apiRoutes.registerApi, {
      body: this.registrationForm.value
    })

    if (!!error) {
      this.errorMessage = error.message;
      setTimeout(() => { this.errorMessage = null }, 2000)
      console.error(error)
      return;
    }

    this.localStorageService.setItem('JWT_TOKEN', data?.jwtToken)

    this.router.navigate([routePaths.questionDetailPage])
    console.log({ jwtToken: data?.jwtToken })
  }

}
