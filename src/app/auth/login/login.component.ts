import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AuthService, Credentials, User } from '../auth.service'
import { Router } from '@angular/router'
import { Unsubscribe } from 'shared/utils'
import { MatSnackBar } from '@angular/material'
import { SignupValidators } from '../signup/signup.validators'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User
  isLoggedIn = false
  showPassword = false
  passwordInputType = 'password'
  hide = true
  form = new FormGroup({
    email: new FormControl('admin@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('Password10', [
      Validators.required,
      SignupValidators.cannotContainSpace
    ])
  })
  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password')
  }

  _subscriptions: Array<Subscription> = []

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (environment.production) {
      this.form.controls.email.setValue('')
      this.form.controls.password.setValue('')
    }
    this._subscriptions = [
      this.authService.user$.subscribe(user => (this.user = user)),
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      })
    ]
  }

  @Unsubscribe()
  ngOnDestroy() {
    // this._subscriptions.map((s: Subscription) => {
    //   s.unsubscribe()
    // })
  }

  // ---- template handlers --------------------------------------------------------------------------------------------

  toggleShowPassword() {
    this.showPassword = !this.showPassword
    if (this.showPassword) {
      this.passwordInputType = 'text'
    } else {
      this.passwordInputType = 'password'
    }
  }

  submitSocialLogin(provider: string) {
    this.authService.socialLogin(provider).subscribe(
      (_user: any) => {
        if (_user) {
          console.log('Success! Redirecting now...', _user)
          this.routeToRedirect()
        }
      },
      (err: any) => {
        console.log('Error logging in.', err)
      }
    )
  }

  submitLogin() {
    const credentials: Credentials = this.form.value
    this.authService.login(credentials).subscribe(
      (_user: User) => {
        console.log('Login Success! Redirecting now...', _user)
        this.routeToRedirect()
      },
      (err: any) => {
        console.log('Error logging in.', err)
        this.openSnackBar(err.error, 'dismiss')
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  private routeToRedirect() {
    this.router.navigate([this.authService.returnUrl])
  }
}
