import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

Projetos = [];
isLoading =  true;

projeto = {};
isEditing = false;

addProjetoForm: FormGroup;
cod = new FormControl('', Validators.required);
client = new FormControl(Validators.required);
gerente = new FormControl(Validators.required);
competencias = new FormControl(Validators.required);


  constructor(private http: Http,
              private dataService:DataService,
              public toast: ToastComponent,
              private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.get();

    this.addProjetoForm = this.FormBuilder.group({
      cod: ['', Validators.required],
      client: ['', Validators.required],
      gerente: ['', Validators.required],
      competencias: ['', Validators.required],
    });
  }

  get(){
    this.dataService.get("/funcionario").subscribe(
      (data)=> {this.Projetos = data; console.log(data)},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProjeto(){
    this.dataService.add("/funcionario", this.addProjetoForm.value).subscribe(
      res => {
        const newProjeto = res.json();
        this.Projetos.push(newProjeto);
        this.addProjetoForm.reset();
        this.toast.setMessage('Projeto Adicionado com Sucesso', 'success');
      },
      error => console.log(error)
    );
  }

enableEditing(projeto){
  this.isEditing = true;
  this.projeto = projeto;
}

cancelEditing(){
  this.isEditing = false;
  this.projeto = {};
  this.toast.setMessage('Edição Cancelada.', 'warning');
  //reload the cats to reset the editing
  this.get();
}

editProjeto(projeto){
  this.dataService.edit("/funcionario", projeto).subscribe(
    res => {
      this.isEditing = false;
      this.projeto = projeto;
      this.toast.setMessage('Projeto Editado com Sucesso', 'success');
    },
    error => console.log(error)
  );
}

deleteProjeto(projeto){
  if(window.confirm('Deseja mesmo deletar esse funcionario?')){
    this.dataService.delete("/funcionario", projeto).subscribe(
      res => {
        const pos = this.Projetos.map(elem => { return elem._id; }).indexOf(projeto._id);
        this.Projetos.splice(pos, 1);
        this.toast.setMessage('Projeto Deletado com Sucesso', 'success');
      },
      error => console.log(error)
    );
  }
}

}





