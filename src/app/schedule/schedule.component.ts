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
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private appService: AppService, private dialog: MatDialog,private router:Router) {}

  ngOnInit(): void {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.getSchedule().subscribe(
      next => {
        this.create_table(next.info)
      }
    )

    this.appService.getCompany().subscribe(
      next => {
        spinDialog.close()
        this.create_schedule(next.info)
      }
    )
    this.companyName = this.appService.getCompanyInfo()[0]
    this.companyRepresentative = this.appService.getCompanyInfo()[1]
  }

  displayedColumns: string[] = ["Time", "Program", "Remark"]
  dataSource

  displayedColumns_sch: string[] = ["Time", "Student", "ID"]
  dataSource_sch
  table_sch = [] as any
  willing_list = [] as any
  companyName
  companyRepresentative

  create_table(data) {

    data.forEach(item => {
      item.program = item.program.replace(",", "<br>")
      item.remark = item.remark.replace(",", "<br>")
    });
    this.dataSource = new MatTableDataSource(data)
  }

  logout_submit(){
    this.appService.deleteCookie()
    this.router.navigate(["login"])
  }

  create_schedule(data) {
    console.log(data)
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
          if (data.studentList[k].name == data.findCompany.stage_one[i][j]){
            student_id[i].push(data.studentList[k].id)
            this.willing_list.push({
              start: start[i],
              end: end[i],
              name: data.studentList[k].name,
              id: data.studentList[k].id,
              willing: null
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
}
