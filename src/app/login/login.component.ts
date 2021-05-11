import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Router
} from '@angular/router';
import {
  AppService
} from '../app.service';
import { SpinDialogComponent } from '../dialog/spin-dialog/spin-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private router: Router, private appService: AppService, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.appService.deleteCookie()
    this.company_list = this.appService.company_list
  }

  company_list: string[] =[]

  login_info = new FormGroup({
    company_name: new FormControl('', Validators.required),
    company_representative: new FormControl('', Validators.required)
  })

  login_submit() {
    if (this.login_info.value.company_representative == '' || this.login_info.value.company_name == '') {
      this.snackBar.open('內容不能為空', 'Close', {
        duration: 1500,
        panelClass: 'warn_snackBar'
      })
    } else {
      var spinDialog = this.dialog.open(SpinDialogComponent)
      this.appService.loginRequest(this.login_info).subscribe(
        next => {
          this.appService.setCookie(next.info, this.login_info.value)
          this.router.navigate(['schedule'])
          spinDialog.close()
        },
        error => {
          this.snackBar.open(error.error.info, 'Close', {
            duration: 1500,
            panelClass: 'warn_snackBar'
          })
          spinDialog.close()
        }
      )
    }
  }
}
