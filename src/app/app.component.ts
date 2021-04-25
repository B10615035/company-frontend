import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}

  route_mainPage() {
    this.router.navigate(['choose_company'])
  }
}
