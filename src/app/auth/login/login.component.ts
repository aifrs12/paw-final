import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

// tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

// tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
