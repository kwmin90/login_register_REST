import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    });
  }

  register() {
    const val = this.form.value;
    const user: User = {
      firstName:val.firstName,
      lastName: val.lastName,
      email: val.email,
      password: val.password
    }
    if (val.email && val.password) {
      this.userService.register(user);
      this.router.navigate(['/login']);
    }
  }

}
