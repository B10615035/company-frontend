import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  Observable
} from 'rxjs';
import {
  delay,
  map,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  company_list = ['中華電信', '台達電子', '邑富', '利凌企業', '英業達', '研揚科技', '鈊象電子', '緯創資通']

  companyName: string = ""

  // url = "http://3.113.9.185:8001"
  url = "http://127.0.0.1:8001"

  company_index(name) {
    for (let i = 0; i < this.company_list.length; i++) {
      if (name == this.company_list[i])
        return i
    }
    return
  }

  loginRequest(login_info): Observable < any > {
    var data = {
      name: login_info.value.company_name,
      id: login_info.value.company_representative
    }
    return this.httpClient.post < any > (`${this.url}/company/login`, data, {
      headers: new HttpHeaders,
    }).pipe(delay(500))
  }

  updateWilling(data): Observable < any > {
    return this.httpClient.put < any > (`${this.url}/company/willing/${this.cookieService.get('companyID')}`, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(500))
  }

  updateCompany(data): Observable < any > {
    return this.httpClient.put < any > (`${this.url}/company/${this.cookieService.get('companyID')}`, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(500))
  }

  getCompany(): Observable < any > {
    return this.httpClient.get < any > (`${this.url}/company/${this.cookieService.get('companyID')}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(500))
  }

  getSchedule(): Observable < any > {
    return this.httpClient.get < any > (`${this.url}/company/schedule`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    })
  }

  setCookie(token, login_info) {
    var companyID = this.company_index(login_info.company_name)
    this.cookieService.set("token", token)
    this.cookieService.set("companyID", String(companyID))
    this.cookieService.set("companyName", login_info.company_name)
    this.cookieService.set("representativeName", login_info.company_representative)
  }

  checkTokenInService(): Observable < any > {
    return this.checkToken().pipe(
      map(data => {
        return data.info
      })
    )
  }

  checkToken(): Observable < any > {
    var data = this.getCookie()
    if (!data)
      data = "login"
    return this.httpClient.post < any > (`${this.url}/auth`, {
      token: data
    }, {
      headers: new HttpHeaders(),
    })
  }

  getCookie() {
    return this.cookieService.get('token')
  }

  getCompanyInfo(){
    return [this.cookieService.get("companyName"), this.cookieService.get("representativeName")]
  }

  checkCookie() {
    return this.cookieService.check('token')
  }

  deleteCookie(){
    this.cookieService.deleteAll()
  }
}
