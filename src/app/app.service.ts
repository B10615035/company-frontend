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
    }
    return this.httpClient.post < any > (`http://127.0.0.1:8001/company/login`, data, {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }

  updateCompany(data): Observable < any > {
    return this.httpClient.put < any > (`http://127.0.0.1:8001/company/${this.cookieService.get('company')}`, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(1500))
  }

  getCompany(): Observable < any > {
    return this.httpClient.get < any > (`http://127.0.0.1:8001/company/${this.cookieService.get('company')}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(1500))
  }

  setCookie(token) {
    var companyID = this.company_index(this.companyName)
    this.cookieService.set("token", token)
    this.cookieService.set("company", String(companyID))
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
    return this.httpClient.post < any > (`http://127.0.0.1:8001/auth`, {
      token: data
    }, {
      headers: new HttpHeaders(),
    })
  }

  getCookie() {
    return this.cookieService.get('token')
  }

  checkCookie() {
    return this.cookieService.check('token')
  }

  deleteCookie(){
    this.cookieService.deleteAll()
  }
}
