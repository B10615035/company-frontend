import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  AppService
} from '../app.service';
import {
  InfoDialogComponent
} from '../dialog/info-dialog/info-dialog.component';
import {
  SpinDialogComponent
} from '../dialog/spin-dialog/spin-dialog.component';

@Component({
  selector: 'app-choose-student',
  templateUrl: './choose-student.component.html',
  styleUrls: ['./choose-student.component.scss']
})
export class ChooseStudentComponent implements OnInit {

  constructor(private appService: AppService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.getCompany(spinDialog, '')
  }

  showWilling: boolean
  showChoose: boolean
  willingList: string[] = []

  student_info = [] as any

  getCompany(spinDialog, info) {
    this.student_info = [] as any
    this.appService.getCompany().subscribe(
      next => {
        spinDialog.close()
        if (info)
          this.dialog.open(InfoDialogComponent, {
            data: {
              result: info
            }
          })
        this.willingList = next.info.findCompany.students
        var studentList = next.info.companyInStudent
        if (this.willingList.length == 0) {
          this.showChoose = true
          this.showWilling = false
        } else {
          this.showChoose = false
          this.showWilling = true
        }
        studentList.forEach(student => {
          this.student_info.push({
            student_name: student,
            choose: false
          })
        })
      },
      error => {
        console.log(error)
      }
    )
  }

  choose_student_submit() {
    var studentAmount = this.student_info.filter(student => student.choose === true)
    if (studentAmount > 30)
      this.snackBar.open("最多只能選擇30個學生", 'Close', {
        duration: 1500,
        panelClass: 'warn_snackBar'
      })
    var spinDialog = this.dialog.open(SpinDialogComponent)
    var student_result = {
      students: [] as any
    }
    this.student_info.forEach(item => {
      if (item.choose === true)
        student_result.students.push(item.student_name)
    })
    this.appService.updateCompany(student_result).subscribe(
      next => {
        this.getCompany(spinDialog, next)
      },
      error => {
        console.log(error)
      }
    )
  }

  update_student_submit() {
    this.showChoose = true
  }

}
