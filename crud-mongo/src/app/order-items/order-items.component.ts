import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  Items = [];
  isLoading = true;
  searchQuery: String = '';
  Order = {};
  isEditing = false;
  Item: any;
  addItemForm: FormGroup;
  product = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  private sub: any;
  private orderId: String;
  private productsSearchResult: any;
  private productId: String;

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder, 
              private route: ActivatedRoute){ 
              
  }

  ngOnInit() {
    //Recupera o parâmetro da rota
    this.sub = this.route.params.subscribe(params => {
      this.orderId =  params['orderId'];  
      this.getOrderData();
    });
    
    //Inicializa o formulário
    this.addItemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      amount: ['', Validators.required],
      orderId: [this.orderId, Validators.required],
      productName: []
    });

    //Items previamente cadastrados
    this.getItems();
  }

  getOrderData(){
    this.dataService.get('/pedidos/'+ this.orderId).subscribe(
       (data) => { console.log(data);this.Order = data; this.isLoading = false; }
    );
  }
  /*Adiciona um novo item de pedido*/
  addItem(){

    let result = this.Items.filter( (item) => {
      return item.productId == this.productId;
    });

    if(result.length > 0){
      this.toast.setMessage('Produto já adicionado. Por favor, edite o registro.', 'warning');
      return;
    }

    this.dataService.add("/orderItems", this.addItemForm.value).subscribe(
      res => {
        const newItem = res.json();
        this.Items.unshift(newItem);
        this.addItemForm.reset();
        this.addItemForm.patchValue({
          orderId: this.orderId
        });
        this.productsSearchResult = [];
        this.toast.setMessage('Item de pedido adicionado com Sucesso', 'success');
      },
      error => console.log(error)
    );
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  
  search(event: any){
    console.warn(event);
    this.dataService.get('/products/search/'+ event.target.value).subscribe(
      (data) => { this.productsSearchResult = data; console.log(data)},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  setProduct(product: any){
    this.addItemForm.patchValue({
      productId: product._id
    });
    this.addItemForm.patchValue({
      productName: product.name
    });
    
    this.productId = product._id;
    this.productsSearchResult = [];
  }

  getItems(){
    this.dataService.get('/order/'+ this.orderId + '/items').subscribe(
      (data) => { this.Items = data; console.log(data)},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteItem(item){
    
    if (window.confirm('Deseja mesmo deletar esse item?')) {
      this.dataService.delete("/orderItems", item ).subscribe(
        res => {
          const pos = this.Items.map(elem => { return elem._id; }).indexOf(item._id);
          this.Items.splice(pos, 1);
          this.toast.setMessage('Item deleteado com sucesso.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  enableEditing(item) {
    this.isEditing = true;
    this.Item = item;
  }

  editItem(item) {
    this.dataService.edit("/empresa",item).subscribe(
      res => {
        this.isEditing = false;
        this.Item = item;
        this.toast.setMessage('Item Editado com Sucesso.', 'success');
      },
      error => console.log(error)
    );
  }

}
