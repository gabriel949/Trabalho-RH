import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'avaliador',
  templateUrl: './avaliador.component.html',
  styleUrls: ['./avaliador.component.css']
})
export class AvaliadorComponent implements OnInit {

Avaliadores = [];
isLoading =  true;

Avaliador = {};
isEditing = false;

addAvaliadorForm: FormGroup;
ean = new FormControl('', Validators.required);
name = new FormControl('', Validators.required);
qtde = new FormControl(Validators.required);

  constructor(private http: Http,
              private dataService:DataService,
              public toast: ToastComponent,
              private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.get();

    this.addAvaliadorForm = this.FormBuilder.group({
      ean: ['', Validators.required],
      name: ['', Validators.required],
      qtde: ['', Validators.required]
    });
  }

  get(){
    this.dataService.get("/avaliador").subscribe(
      (data)=> {this.Avaliadores = data; console.log(data)},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addAvaliador(){
    this.dataService.add("/avaliador", this.addAvaliadorForm.value).subscribe(
      res => {
        const newProduct = res.json();
        this.Avaliadores.push(newProduct);
        this.addAvaliadorForm.reset();
        this.toast.setMessage('Avaliador Adicionado com Sucesso', 'success');
      },
      error => console.log(error)
    );
  }

enableEditing(avaliador){
  this.isEditing = true;
  this.Avaliador = avaliador;
}

cancelEditing(){
  this.isEditing = false;
  this.Avaliador = {};
  this.toast.setMessage('Edição Cancelada.', 'warning');
  //reload the cats to reset the editing
  this.get();
}

editAvaliador(avaliador){
  this.dataService.edit("/avaliador", avaliador).subscribe(
    res => {
      this.isEditing = false;
      this.Avaliador = avaliador;
      this.toast.setMessage('Produto Editado com Sucesso', 'success');
    },
    error => console.log(error)
  );
}

deleteAvaliador(avaliador){
  if(window.confirm('Deseja mesmo deletar esse produto?')){
    this.dataService.delete("/avaliador", avaliador).subscribe(
      res => {
        const pos = this.Avaliadores.map(elem => { return elem._id; }).indexOf(avaliador._id);
        this.Avaliadores.splice(pos, 1);
        this.toast.setMessage('Avaliador Deletado com Sucesso', 'success');
      },
      error => console.log(error)
    );
  }
}

}
