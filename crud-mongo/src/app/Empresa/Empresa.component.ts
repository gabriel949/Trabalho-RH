import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

@Component({
  selector: 'empresa',
  templateUrl: './Empresa.component.html',
  styleUrls: ['./Empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  Clients = [];
  isLoading = true;

  Client = {};
  isEditing = false;

  addClientForm: FormGroup;
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  cod = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.get();

    this.addClientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      cod: ['', Validators.required]
    });
  }

  get() {
    this.dataService.get("/empresa").subscribe(
      (data) => {this.Clients = data; console.log(data)},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addClient() {
    this.dataService.add("/empresa",this.addClientForm.value).subscribe(
      res => {
        const newClient = res.json();
        this.Clients.push(newClient);
        this.addClientForm.reset();
        this.toast.setMessage('Empresa Adicionado com Sucesso', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(client) {
    this.isEditing = true;
    this.Client = client;
  }

  cancelEditing() {
    this.isEditing = false;
    this.Client = {};
    this.toast.setMessage('Edição Cancelada.', 'warning');
    // reload the cats to reset the editing
    this.get();
  }

  editClient(client) {
    this.dataService.edit("/empresa",client).subscribe(
      res => {
        this.isEditing = false;
        this.Client = client;
        this.toast.setMessage('Empresa Editado com Sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteClient(client) {
    if (window.confirm('Deseja mesmo deletar esse cliente?')) {
      this.dataService.delete("/empresa",client).subscribe(
        res => {
          const pos = this.Clients.map(elem => { return elem._id; }).indexOf(client._id);
          this.Clients.splice(pos, 1);
          this.toast.setMessage('Empresa deleteado com sucesso.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
