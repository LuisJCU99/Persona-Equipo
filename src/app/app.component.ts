import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile} from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {}
  
  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    (!this.isLoggedIn ? this.keycloak.login() : this.userProfile = await this.keycloak.loadUserProfile());
  }
}
