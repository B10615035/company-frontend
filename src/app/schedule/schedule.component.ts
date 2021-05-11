import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  AppService
} from '../app.service';
import {
  SpinDialogComponent
} from '../dialog/spin-dialog/spin-dialog.component';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  Router
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  InfoDialogComponent
} from '../dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private appService: AppService, private dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.appService.getSchedule().subscribe(
      next => {
        this.create_table(next.info)
      }
    )
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.getCompany(spinDialog)

    this.companyName = this.appService.getCompanyInfo()[0]
    this.companyRepresentative = this.appService.getCompanyInfo()[1]
  }

  displayedColumns: string[] = ["Time", "Program", "Remark"]
  dataSource

  displayedColumns_sch: string[] = ["Time", "Student", "ID"]
  dataSource_sch
  table_sch = [] as any
  willing_list = [] as any
  companyName: string
  companyRepresentative: string
  showWilling: boolean
  showChoose: boolean
  resultData
  final_willing_list = [] as any

  getCompany(spinDialog) {
    this.appService.getCompany().subscribe(
      next => {
        spinDialog.close()
        this.resultData = next.info
        if (next.info.findCompany.willing_name.length == 0) {
          this.showChoose = true
          this.showWilling = false
          this.create_schedule()
        } else {
          this.showChoose = false
          this.showWilling = true
          this.show_willing()
        }
      }
    )
  }

  update_willing() {
    this.showChoose = true
    this.showWilling = true
    this.create_schedule()
  }

  show_willing() {
    this.final_willing_list = []
    var data = this.resultData.findCompany
    for (let i in data.willing_name) {
      this.final_willing_list.push({
        name: data.willing_name[i],
        id: data.willing_id[i],
        willing: data.willing_order[i]
      })
    }

    this.final_willing_list = this.final_willing_list.sort((a, b) => {
      if (a.willing < b.willing)
        return -1
      else
        return 0
    })
  }

  create_table(data) {

    data.forEach(item => {
      item.program = item.program.replace(",", "<br>")
      item.remark = item.remark.replace(",", "<br>")
    });
    this.dataSource = new MatTableDataSource(data)
  }

  logout_submit() {
    this.appService.deleteCookie()
    this.router.navigate(["login"])
  }

  create_schedule() {
    this.willing_list = []
    var data = this.resultData
    var start = ["9:40", "10:15", "10:50", "11:25", "13:00", "13:35", "14:10", "14:45"]
    var end = ["10:10", "10:45", "11:20", "11:55", "13:30", "14:05", "14:40", "15:15"]
    var student_id = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ] as any

    for (let i in data.findCompany.stage_one) {
      for (let j in data.findCompany.stage_one[i]) {
        for (let k in data.studentList) {
          if (data.studentList[k].name == data.findCompany.stage_one[i][j]) {
            student_id[i].push(data.studentList[k].id)
            this.willing_list.push({
              start: start[i],
              end: end[i],
              name: data.studentList[k].name,
              id: data.studentList[k].id,
              willing: ""
            })
          }
        }
      }
    }

    // for (let i in data.findCompany.stage_one) {
    //   this.table_sch.push({
    //     start: start[i],
    //     end: end[i],
    //     student: data.findCompany.stage_one[i].toString().replaceAll(",", "<br>"),
    //     id: student_id[i].toString().replaceAll(",", "<br>")
    //   })
    // }

    // this.dataSource_sch = new MatTableDataSource(this.table_sch)
  }

  submit_willing() {
    console.log(this.willing_list)
    var result_data = {
      willing_name: [] as any,
      willing_order: [] as any,
      willing_id: [] as any
    }

    var limit = new Map
    limit["中華電信"] = 5
    limit["台達電子"] = 2
    limit["邑富"] = 1
    limit["利凌企業"] = 4
    limit["英業達"] = 4
    limit["研揚科技"] = 3
    limit["鈊象電子"] = 4
    limit["緯創資通"] = 5

    var one_amount = 0

    this.willing_list.forEach(item => {
      if (Number(item.willing) > 0) {
        result_data.willing_id.push(item.id)
        result_data.willing_name.push(item.name)
        result_data.willing_order.push(Number(item.willing))

        if (Number(item.willing) == 1)
          one_amount += 1
      }
    });

    if (one_amount > limit[this.companyName]) {
      this.snackBar.open(`最多只能有 ${limit[this.companyName]} 個 1`, 'Close', {
        duration: 1000,
        panelClass: 'warn_snackBar'
      })
    } else {
      var spinDialog = this.dialog.open(SpinDialogComponent)
      this.appService.updateWilling(result_data).subscribe(
        next => {
          spinDialog.close()
          this.getCompany(spinDialog)
          // this.dialog.open(InfoDialogComponent, {
          //   data: {
          //     result: next
          //   }
          // })
        }
      )
    }

  }
}
