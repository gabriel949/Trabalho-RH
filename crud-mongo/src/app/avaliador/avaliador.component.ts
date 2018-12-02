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

Products = [];
isLoading =  true;

Product = {};
isEditing = false;

addProductForm: FormGroup;
ean = new FormControl('', Validators.required);
name = new FormControl('', Validators.required);
qtde = new FormControl(Validators.required);

  constructor(private http: Http,
              private dataService:DataService,
              public toast: ToastComponent,
              private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.get();

    this.addProductForm = this.FormBuilder.group({
      ean: ['', Validators.required],
      name: ['', Validators.required],
      qtde: ['', Validators.required]
    });
  }

  get(){
    this.dataService.get("/avaliador").subscribe(
      (data)=> {this.Products = data; console.log(data)},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProduct(){
    this.dataService.add("/avaliador", this.addProductForm.value).subscribe(
      res => {
        const newProduct = res.json();
        this.Products.push(newProduct);
        this.addProductForm.reset();
        this.toast.setMessage('Avaliador Adicionado com Sucesso', 'success');
      },
      error => console.log(error)
    );
  }

enableEditing(product){
  this.isEditing = true;
  this.Product = product;
}

cancelEditing(){
  this.isEditing = false;
  this.Product = {};
  this.toast.setMessage('Edição Cancelada.', 'warning');
  //reload the cats to reset the editing
  this.get();
}

editProduct(product){
  this.dataService.edit("/avaliador", product).subscribe(
    res => {
      this.isEditing = false;
      this.Product = product;
      this.toast.setMessage('Produto Editado com Sucesso', 'success');
    },
    error => console.log(error)
  );
}

deleteProduct(product){
  if(window.confirm('Deseja mesmo deletar esse produto?')){
    this.dataService.delete("/avaliador", product).subscribe(
      res => {
        const pos = this.Products.map(elem => { return elem._id; }).indexOf(product._id);
        this.Products.splice(pos, 1);
        this.toast.setMessage('Avaliador Deletado com Sucesso', 'success');
      },
      error => console.log(error)
    );
  }
}

}
