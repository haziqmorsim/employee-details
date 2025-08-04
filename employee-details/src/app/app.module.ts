import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { PositionsComponent } from './components/positions/positions.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ModalsComponent } from './components/shared/modals/modals.component';
import { EmployeeModalComponent } from './components/shared/employee-modal/employee-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    PositionsComponent,
    LoginComponent,
    SignupComponent,
    ModalsComponent,
    EmployeeModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
