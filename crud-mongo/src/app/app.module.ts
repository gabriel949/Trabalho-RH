import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmpresaComponent } from './Empresa/Empresa.component';
import { DataService } from './services/data.service';

import { ToastComponent } from './shared/toast/toast.component';
import { AvaliadorComponent } from './avaliador/avaliador.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { OrderItemsComponent } from './order-items/order-items.component';

const routing : Routes = [
    { path: '',      component: EmpresaComponent },
    { path: 'app/empresa', component: EmpresaComponent },
    { path: 'app/avaliador', component: AvaliadorComponent },
    { path: 'app/funcionario', component: FuncionarioComponent },
    { path: 'app/order-items/:orderId', component: OrderItemsComponent}
];

@NgModule({
  declarations: [
    AppComponent,   
    ToastComponent,
    EmpresaComponent,
    AvaliadorComponent,
    FuncionarioComponent,
    OrderItemsComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routing)
  ],
  providers: [
    DataService,
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
