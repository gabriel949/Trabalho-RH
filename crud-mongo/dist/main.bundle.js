webpackJsonp(["main"],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_gendir lazy recursive";

/***/ }),

/***/ "./src/app/Empresa/Empresa.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Empresa/Empresa.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\" *ngIf=\"isLoading\">\n  <h4 class=\"card-header\">Loading...</h4>\n  <div class=\"card-block text-xs-center\">\n    <i class=\"fa fa-circle-o-notch fa-spin fa-3x\"></i>\n  </div>\n</div>\n \n<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"card\" *ngIf=\"!isLoading\">\n  <h4 class=\"card-header\">Empresas: {{Clients.length}}</h4>\n  <div class=\"card-block\">\n    <table class=\"table table-bordered table-striped\">\n      <thead class=\"thead-default\">\n        <tr>\n          <th>CNPJ</th>\n          <th>Nome</th>\n          <th>E-mail</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody *ngIf=\"Clients.length === 0\">\n        <tr>\n          <td colspan=\"4\">Lista de Empresas vazia. Cadastre um novo.</td>\n        </tr>  \n      </tbody>\n      <tbody *ngIf=\"!isEditing\">\n        <tr *ngFor=\"let client of Clients\">\n          <td>{{client.cod}}</td>\n          <td>{{client.name}}</td>\n          <td>{{client.email}}</td>\n          <td>\n            <button class=\"btn btn-sm btn-warning\" (click)=\"enableEditing(client)\"><i class=\"fa fa-pencil\"></i> Editar</button> <button class=\"btn btn-sm btn-danger\" (click)=\"deleteClient(client)\"><i class=\"fa fa-trash\"></i> Deletar</button>\n          </td>\n        </tr>  \n      </tbody>\n      <tbody *ngIf=\"isEditing\">\n        <tr>\n          <td colspan=\"4\">\n            <form class=\"form-inline\" #form=\"ngForm\" (ngSubmit)=\"editClient(Client)\" style=\"display:inline\">\n              <div class=\"form-group\">\n                  <input class=\"form-control\" type=\"text\" name=\"cod\" [(ngModel)]=\"Client.cod\" placeholder=\"CNPJ\" required>\n              </div>\n              <div class=\"form-group\">\n                <input class=\"form-control\" type=\"text\" name=\"name\" [(ngModel)]=\"Client.name\" placeholder=\"Nome\" required>\n              </div>\n              <div class=\"form-group\">\n                <input class=\"form-control\" type=\"text\" name=\"email\" [(ngModel)]=\"Client.email\" placeholder=\"E-mail\" required>\n              </div>\n              <button class=\"btn btn-sm btn-primary\" type=\"submit\"><i class=\"fa fa-floppy-o\"></i> Salvar</button>\n            </form>\n            <button class=\"btn btn-sm btn-warning\" (click)=\"cancelEditing()\"><i class=\"fa fa-times\"></i> Cancelar</button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n\n<div class=\"card\" *ngIf=\"!isEditing\">\n  <h4 class=\"card-header\">Nova Empresa</h4>\n  <div class=\"card-block\">\n    <form class=\"form-inline\" [formGroup]=\"addClientForm\" (ngSubmit)=\"addClient()\" style=\"text-align:center\">\n      <div class=\"form-group\">\n          <input class=\"form-control\" type=\"text\" name=\"cod\" formControlName=\"cod\" placeholder=\"CNPJ\">\n      </div>\n      <div class=\"form-group\">\n        <input class=\"form-control\" type=\"text\" name=\"name\" formControlName=\"name\" placeholder=\"Nome\">\n      </div>\n       <div class=\"form-group\">\n        <input class=\"form-control\" type=\"email\" name=\"email\" formControlName=\"email\" placeholder=\"E-mail\">\n      </div>\n      <button class=\"btn btn-primary\" type=\"submit\"><i class=\"fa fa-floppy-o\"></i> Add</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/Empresa/Empresa.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var toast_component_1 = __webpack_require__("./src/app/shared/toast/toast.component.ts");
var data_service_1 = __webpack_require__("./src/app/services/data.service.ts");
var EmpresaComponent = (function () {
    function EmpresaComponent(http, dataService, toast, formBuilder) {
        this.http = http;
        this.dataService = dataService;
        this.toast = toast;
        this.formBuilder = formBuilder;
        this.Clients = [];
        this.isLoading = true;
        this.Client = {};
        this.isEditing = false;
        this.name = new forms_1.FormControl('', forms_1.Validators.required);
        this.email = new forms_1.FormControl('', forms_1.Validators.required);
        this.cod = new forms_1.FormControl('', forms_1.Validators.required);
    }
    EmpresaComponent.prototype.ngOnInit = function () {
        this.get();
        this.addClientForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            cod: ['', forms_1.Validators.required]
        });
    };
    EmpresaComponent.prototype.get = function () {
        var _this = this;
        this.dataService.get("/empresa").subscribe(function (data) { _this.Clients = data; console.log(data); }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    EmpresaComponent.prototype.addClient = function () {
        var _this = this;
        this.dataService.add("/empresa", this.addClientForm.value).subscribe(function (res) {
            var newClient = res.json();
            _this.Clients.push(newClient);
            _this.addClientForm.reset();
            _this.toast.setMessage('Empresa Adicionado com Sucesso', 'success');
        }, function (error) { return console.log(error); });
    };
    EmpresaComponent.prototype.enableEditing = function (client) {
        this.isEditing = true;
        this.Client = client;
    };
    EmpresaComponent.prototype.cancelEditing = function () {
        this.isEditing = false;
        this.Client = {};
        this.toast.setMessage('Edição Cancelada.', 'warning');
        // reload the cats to reset the editing
        this.get();
    };
    EmpresaComponent.prototype.editClient = function (client) {
        var _this = this;
        this.dataService.edit("/empresa", client).subscribe(function (res) {
            _this.isEditing = false;
            _this.Client = client;
            _this.toast.setMessage('Empresa Editado com Sucesso.', 'success');
        }, function (error) { return console.log(error); });
    };
    EmpresaComponent.prototype.deleteClient = function (client) {
        var _this = this;
        if (window.confirm('Deseja mesmo deletar esse cliente?')) {
            this.dataService.delete("/empresa", client).subscribe(function (res) {
                var pos = _this.Clients.map(function (elem) { return elem._id; }).indexOf(client._id);
                _this.Clients.splice(pos, 1);
                _this.toast.setMessage('Empresa deleteado com sucesso.', 'success');
            }, function (error) { return console.log(error); });
        }
    };
    EmpresaComponent = __decorate([
        core_1.Component({
            selector: 'empresa',
            template: __webpack_require__("./src/app/Empresa/Empresa.component.html"),
            styles: [__webpack_require__("./src/app/Empresa/Empresa.component.css")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof data_service_1.DataService !== 'undefined' && data_service_1.DataService) === 'function' && _b) || Object, (typeof (_c = typeof toast_component_1.ToastComponent !== 'undefined' && toast_component_1.ToastComponent) === 'function' && _c) || Object, (typeof (_d = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _d) || Object])
    ], EmpresaComponent);
    return EmpresaComponent;
    var _a, _b, _c, _d;
}());
exports.EmpresaComponent = EmpresaComponent;
//# sourceMappingURL=Empresa.component.js.map

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    <nav class=\"navbar navbar-dark bg-primary\">\n        <div class=\"nav navbar-nav\">\n            <a routerLink=\"app/empresa\" class=\"nav-item nav-link\">\n                 Empresa                \n            </a>\n            <a routerLink=\"app/avaliador\" class=\"nav-item nav-link\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact:true}\">                \n                 Avaliador               \n            </a>\n            <a routerLink=\"app/funcionario\" class=\"nav-item nav-link\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact:true}\">                \nProjeto            </a>\n\n        </div>\n    </nav>\n\n    <router-outlet></router-outlet>\n\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.goItems = function () {
        this.router.navigate(['/order-items', '58d2688bf3ee152680dfad4f']);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var Empresa_component_1 = __webpack_require__("./src/app/Empresa/Empresa.component.ts");
var data_service_1 = __webpack_require__("./src/app/services/data.service.ts");
var toast_component_1 = __webpack_require__("./src/app/shared/toast/toast.component.ts");
var avaliador_component_1 = __webpack_require__("./src/app/avaliador/avaliador.component.ts");
var funcionario_component_1 = __webpack_require__("./src/app/funcionario/funcionario.component.ts");
var routing = [
    { path: '', component: Empresa_component_1.EmpresaComponent },
    { path: 'app/empresa', component: Empresa_component_1.EmpresaComponent },
    { path: 'app/avaliador', component: avaliador_component_1.AvaliadorComponent },
    { path: 'app/funcionario', component: funcionario_component_1.FuncionarioComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                toast_component_1.ToastComponent,
                Empresa_component_1.EmpresaComponent,
                avaliador_component_1.AvaliadorComponent,
                funcionario_component_1.FuncionarioComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(routing)
            ],
            providers: [
                data_service_1.DataService,
                toast_component_1.ToastComponent
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/avaliador/avaliador.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/avaliador/avaliador.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\" *ngIf=\"isLoading\">\n    <h4 class=\"card-header\">Loading...</h4>\n    <div class=\"card-block text-xs-center\">\n        <i class=\"fa fa-circle-o-notch fa-spin fa-3x\"></i>\n    </div>\n</div>\n\n<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"card\" *ngIf=\"!isLoading\">\n    <h4 class=\"card-header\">Avaliadores: {{Avaliadores.length}}</h4>\n    <div class=\"card-block\">\n        <table class=\"table table-bordered table-striped\">\n            <thead class=\"thead-default\">\n                <tr>\n                    <th>Nome</th>\n                    <th>Cargo</th>\n                    <th>Actions</th>\n                </tr>\n            </thead>\n            <tbody *ngIf=\"Avaliadores.length === 0\">\n                <tr>\n                    <td colspan=\"4\">Lista de avaliadores vazia. Cadastre um novo.</td>\n                </tr>\n            </tbody>\n            <tbody *ngIf=\"!isEditing\">\n                <tr *ngFor=\"let avaliador of Avaliadores\">\n                    <td>{{avaliador.ean}}</td>\n                    <td>{{avaliador.name}}</td>\n\n                    <td>\n                        <button class=\"btn btn-sm btn-warning\" (click)=\"enableEditing(avaliador)\"><i class=\"fa fa-pencil\"></i> Editar</button> <button class=\"btn btn-sm btn-danger\" (click)=\"deleteAvaliador(avaliador)\"><i class=\"fa fa-trash\"></i> Deletar</button>\n                    </td>\n                </tr>\n            </tbody>\n            <tbody *ngIf=\"isEditing\">\n                <tr>\n                    <td colspan=\"4\">\n                        <form class=\"form-inline\" #form=\"ngForm\" (ngSubmit)=\"editAvaliador(Avaliador)\" style=\"display:inline\">\n                            <div class=\"form-group\">\n                                <input class=\"form-control\" type=\"text\" name=\"ean\" [(ngModel)]=\"Avaliador.ean\" placeholder=\"Nome\" required>\n                            </div>\n                            <div class=\"form-group\">\n                                <input class=\"form-control\" type=\"text\" name=\"name\" [(ngModel)]=\"Avaliador.name\" placeholder=\"Cargo\" required>\n                            </div>\n                            <button class=\"btn btn-sm btn-primary\" type=\"submit\"><i class=\"fa fa-floppy-o\"></i> Salvar</button>\n                        </form>\n                        <button class=\"btn btn-sm btn-warning\" (click)=\"cancelEditing()\"><i class=\"fa fa-times\"></i> Cancelar</button>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n\n<div class=\"card\" *ngIf=\"!isEditing\">\n    <h4 class=\"card-header\">Novo Avaliador</h4>\n    <div class=\"card-block\">\n        <form class=\"form-inline\" [formGroup]=\"addAvaliadorForm\" (ngSubmit)=\"addAvaliador()\" style=\"text-align:center\">\n            <div class=\"form-group\">\n                <input class=\"form-control\" type=\"text\" name=\"cod\" formControlName=\"ean\" placeholder=\"Nome\">\n            </div>\n            <div class=\"form-group\">\n                <input class=\"form-control\" type=\"text\" name=\"name\" formControlName=\"name\" placeholder=\"Cargo\">\n            </div>\n            <button class=\"btn btn-primary\" type=\"submit\" ><i class=\"fa fa-floppy-o\"></i> Add</button>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/avaliador/avaliador.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var toast_component_1 = __webpack_require__("./src/app/shared/toast/toast.component.ts");
var data_service_1 = __webpack_require__("./src/app/services/data.service.ts");
var AvaliadorComponent = (function () {
    function AvaliadorComponent(http, dataService, toast, FormBuilder) {
        this.http = http;
        this.dataService = dataService;
        this.toast = toast;
        this.FormBuilder = FormBuilder;
        this.Avaliadores = [];
        this.isLoading = true;
        this.Avaliador = {};
        this.isEditing = false;
        this.ean = new forms_1.FormControl('', forms_1.Validators.required);
        this.name = new forms_1.FormControl('', forms_1.Validators.required);
        this.qtde = new forms_1.FormControl(forms_1.Validators.required);
    }
    AvaliadorComponent.prototype.ngOnInit = function () {
        this.get();
        this.addAvaliadorForm = this.FormBuilder.group({
            ean: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            qtde: ['', forms_1.Validators.required]
        });
    };
    AvaliadorComponent.prototype.get = function () {
        var _this = this;
        this.dataService.get("/avaliador").subscribe(function (data) { _this.Avaliadores = data; console.log(data); }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    AvaliadorComponent.prototype.addAvaliador = function () {
        var _this = this;
        this.dataService.add("/avaliador", this.addAvaliadorForm.value).subscribe(function (res) {
            var newProduct = res.json();
            _this.Avaliadores.push(newProduct);
            _this.addAvaliadorForm.reset();
            _this.toast.setMessage('Avaliador Adicionado com Sucesso', 'success');
        }, function (error) { return console.log(error); });
    };
    AvaliadorComponent.prototype.enableEditing = function (avaliador) {
        this.isEditing = true;
        this.Avaliador = avaliador;
    };
    AvaliadorComponent.prototype.cancelEditing = function () {
        this.isEditing = false;
        this.Avaliador = {};
        this.toast.setMessage('Edição Cancelada.', 'warning');
        //reload the cats to reset the editing
        this.get();
    };
    AvaliadorComponent.prototype.editAvaliador = function (avaliador) {
        var _this = this;
        this.dataService.edit("/avaliador", avaliador).subscribe(function (res) {
            _this.isEditing = false;
            _this.Avaliador = avaliador;
            _this.toast.setMessage('Produto Editado com Sucesso', 'success');
        }, function (error) { return console.log(error); });
    };
    AvaliadorComponent.prototype.deleteAvaliador = function (avaliador) {
        var _this = this;
        if (window.confirm('Deseja mesmo deletar esse produto?')) {
            this.dataService.delete("/avaliador", avaliador).subscribe(function (res) {
                var pos = _this.Avaliadores.map(function (elem) { return elem._id; }).indexOf(avaliador._id);
                _this.Avaliadores.splice(pos, 1);
                _this.toast.setMessage('Avaliador Deletado com Sucesso', 'success');
            }, function (error) { return console.log(error); });
        }
    };
    AvaliadorComponent = __decorate([
        core_1.Component({
            selector: 'avaliador',
            template: __webpack_require__("./src/app/avaliador/avaliador.component.html"),
            styles: [__webpack_require__("./src/app/avaliador/avaliador.component.css")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof data_service_1.DataService !== 'undefined' && data_service_1.DataService) === 'function' && _b) || Object, (typeof (_c = typeof toast_component_1.ToastComponent !== 'undefined' && toast_component_1.ToastComponent) === 'function' && _c) || Object, (typeof (_d = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _d) || Object])
    ], AvaliadorComponent);
    return AvaliadorComponent;
    var _a, _b, _c, _d;
}());
exports.AvaliadorComponent = AvaliadorComponent;
//# sourceMappingURL=avaliador.component.js.map

/***/ }),

/***/ "./src/app/funcionario/funcionario.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/funcionario/funcionario.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\" *ngIf=\"isLoading\">\n    <h4 class=\"card-header\">Loading...</h4>\n    <div class=\"card-block text-xs-center\">\n        <i class=\"fa fa-circle-o-notch fa-spin fa-3x\"></i>\n    </div>\n</div>\n\n<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"card\" *ngIf=\"!isLoading\">\n    <h4 class=\"card-header\">Projeto: {{Projetos.length}}</h4>\n    <div class=\"card-block\">\n        <table class=\"table table-bordered table-striped\">\n            <thead class=\"thead-default\">\n                <tr>\n                    <th>Escritório responsável</th>\n                    <th>Nome Projeto</th>\n                    <th>Gerente</th>\n                    <th>Competências</th>\n                    <th>Ações</th>\n                </tr>\n            </thead>\n            <tbody *ngIf=\"projeto.length === 0\">\n                <tr>\n                    <td colspan=\"4\">lista de Projeto vazia. Cadastre um novo.</td>\n                </tr>\n            </tbody>\n            <tbody *ngIf=\"!isEditing\">\n                <tr *ngFor=\"let projeto of Projetos\">\n                    <td>{{projeto.cod}}</td>\n                    <td>{{projeto.client}}</td>\n                    <td>{{projeto.gerente}}</td>\n                    <td>\n                         <select>\n                            <option *ngFor=\"let competencias of projeto.competencias\">{{competencias}}</option>\n                        </select>   </td>\n                    <td>\n                        <button class=\"btn btn-sm btn-warning\" (click)=\"enableEditing(projeto)\"><i class=\"fa fa-pencil\"></i> Editar</button> <button class=\"btn btn-sm btn-danger\" (click)=\"deleteProjeto(projeto)\"><i class=\"fa fa-trash\"></i> Deletar</button>\n                    </td>\n                </tr>\n            </tbody>\n            <tbody *ngIf=\"isEditing\">\n                <tr>\n                    <td colspan=\"4\">\n                        <form class=\"form-inline\" #form=\"ngForm\" (ngSubmit)=\"editProjeto(projeto)\" style=\"display:inline\">\n                            <div class=\"form-group\">\n                                <input class=\"form-control\" type=\"text\" name=\"cod\" [(ngModel)]=\"projeto.cod\" placeholder=\"CPF\" required>\n                            </div>\n                            <div class=\"form-group\">\n                                <input class=\"form-control\" type=\"text\" name=\"client\" [(ngModel)]=\"projeto.client\" placeholder=\"Nome\" required>\n                            </div>\n                            <div class=\"form-group\">\n                                <input class=\"form-control\" type=\"text\" name=\"gerente\" [(ngModel)]=\"projeto.gerente\" placeholder=\"Data admissão\" required>\n                            </div>\n                            <button class=\"btn btn-sm btn-primary\" type=\"submit\"><i class=\"fa fa-floppy-o\"></i> Salvar</button>\n                        </form>\n                        <button class=\"btn btn-sm btn-warning\" (click)=\"cancelEditing()\"><i class=\"fa fa-times\"></i> Cancelar</button>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n\n<div class=\"card\" *ngIf=\"!isEditing\">\n    <h4 class=\"card-header\">Novo Projeto</h4>\n    <div class=\"card-block\">\n        <form class=\"form-inline\" [formGroup]=\"addProjetoForm\" (ngSubmit)=\"addProjeto()\" style=\"text-align:center\">\n      <div class=\"form-group\">\n          <input class=\"form-control\" type=\"text\" name=\"cod\" formControlName=\"cod\" placeholder=\"Escritorio responsável\">\n      </div>\n      <div class=\"form-group\">\n        <input class=\"form-control\" type=\"text\" name=\"name\" formControlName=\"client\" placeholder=\"Nome\">\n      </div>\n       <div class=\"form-group\">\n        <input class=\"form-control\" type=\"text\" name=\"gerente\" formControlName=\"gerente\" placeholder=\"Gerente\">\n      </div>\n      <div class=\"form-group\">\n            <select  class=\"form-control\" name=\"competencias\" id=\"competencias\" formControlName=\"competencias\" multiple>\n        <option value=\"Competência 1\">Competência 1</option>\n        <option value=\"Competência 2\">Competência 2</option>\n        <option value=\"Competência 3\">Competência 3</option>\n        <option value=\"Competência 4\">Competência 4</option>\n        <option value=\"Competência 5\">Competência 5</option>\n        <option value=\"Competência 6\">Competência 6</option>\n        <option value=\"Competência 7\">Competência 7</option>\n        <option value=\"Competência 8\">Competência 8</option>\n        <option value=\"Competência 9\">Competência 9</option>\n        <option value=\"Competência 10\">Competência 10</option>\n      </select>\n    </div>\n      <button class=\"btn btn-primary\" type=\"submit\"><i class=\"fa fa-floppy-o\"></i> Add</button>\n    </form>\n\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/funcionario/funcionario.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var toast_component_1 = __webpack_require__("./src/app/shared/toast/toast.component.ts");
var data_service_1 = __webpack_require__("./src/app/services/data.service.ts");
var FuncionarioComponent = (function () {
    function FuncionarioComponent(http, dataService, toast, FormBuilder) {
        this.http = http;
        this.dataService = dataService;
        this.toast = toast;
        this.FormBuilder = FormBuilder;
        this.Projetos = [];
        this.isLoading = true;
        this.projeto = {};
        this.isEditing = false;
        this.cod = new forms_1.FormControl('', forms_1.Validators.required);
        this.client = new forms_1.FormControl(forms_1.Validators.required);
        this.gerente = new forms_1.FormControl(forms_1.Validators.required);
        this.competencias = new forms_1.FormControl(forms_1.Validators.required);
    }
    FuncionarioComponent.prototype.ngOnInit = function () {
        this.get();
        this.addProjetoForm = this.FormBuilder.group({
            cod: ['', forms_1.Validators.required],
            client: ['', forms_1.Validators.required],
            gerente: ['', forms_1.Validators.required],
            competencias: ['', forms_1.Validators.required],
        });
    };
    FuncionarioComponent.prototype.get = function () {
        var _this = this;
        this.dataService.get("/funcionario").subscribe(function (data) { _this.Projetos = data; console.log(data); }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    FuncionarioComponent.prototype.addProjeto = function () {
        var _this = this;
        this.dataService.add("/funcionario", this.addProjetoForm.value).subscribe(function (res) {
            var newProjeto = res.json();
            _this.Projetos.push(newProjeto);
            _this.addProjetoForm.reset();
            _this.toast.setMessage('Projeto Adicionado com Sucesso', 'success');
        }, function (error) { return console.log(error); });
    };
    FuncionarioComponent.prototype.enableEditing = function (projeto) {
        this.isEditing = true;
        this.projeto = projeto;
    };
    FuncionarioComponent.prototype.cancelEditing = function () {
        this.isEditing = false;
        this.projeto = {};
        this.toast.setMessage('Edição Cancelada.', 'warning');
        //reload the cats to reset the editing
        this.get();
    };
    FuncionarioComponent.prototype.editProjeto = function (projeto) {
        var _this = this;
        this.dataService.edit("/funcionario", projeto).subscribe(function (res) {
            _this.isEditing = false;
            _this.projeto = projeto;
            _this.toast.setMessage('Projeto Editado com Sucesso', 'success');
        }, function (error) { return console.log(error); });
    };
    FuncionarioComponent.prototype.deleteProjeto = function (projeto) {
        var _this = this;
        if (window.confirm('Deseja mesmo deletar esse funcionario?')) {
            this.dataService.delete("/funcionario", projeto).subscribe(function (res) {
                var pos = _this.Projetos.map(function (elem) { return elem._id; }).indexOf(projeto._id);
                _this.Projetos.splice(pos, 1);
                _this.toast.setMessage('Projeto Deletado com Sucesso', 'success');
            }, function (error) { return console.log(error); });
        }
    };
    FuncionarioComponent = __decorate([
        core_1.Component({
            selector: 'funcionario',
            template: __webpack_require__("./src/app/funcionario/funcionario.component.html"),
            styles: [__webpack_require__("./src/app/funcionario/funcionario.component.css")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof data_service_1.DataService !== 'undefined' && data_service_1.DataService) === 'function' && _b) || Object, (typeof (_c = typeof toast_component_1.ToastComponent !== 'undefined' && toast_component_1.ToastComponent) === 'function' && _c) || Object, (typeof (_d = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _d) || Object])
    ], FuncionarioComponent);
    return FuncionarioComponent;
    var _a, _b, _c, _d;
}());
exports.FuncionarioComponent = FuncionarioComponent;
//# sourceMappingURL=funcionario.component.js.map

/***/ }),

/***/ "./src/app/services/data.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    DataService.prototype.get = function (url) {
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    DataService.prototype.add = function (url, obj) {
        return this.http.post(url, JSON.stringify(obj), this.options);
    };
    DataService.prototype.edit = function (url, obj) {
        return this.http.put(url + "/" + obj._id, JSON.stringify(obj), this.options);
    };
    DataService.prototype.delete = function (url, obj) {
        return this.http.delete(url + "/" + obj._id, this.options);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], DataService);
    return DataService;
    var _a;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map

/***/ }),

/***/ "./src/app/shared/toast/toast.component.css":
/***/ (function(module, exports) {

module.exports = ".alert {\n\tz-index: 999;\n\tposition: fixed;\n\tbottom: 15px;\n\tleft: 25%;\n\twidth: 50%;\n\topacity: 0.9;\n}"

/***/ }),

/***/ "./src/app/shared/toast/toast.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message.body\" class=\"alert alert-{{message.type}} alert-dismissible\" role=\"alert\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <strong>Message:</strong> {{message.body}}\n</div>"

/***/ }),

/***/ "./src/app/shared/toast/toast.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ToastComponent = (function () {
    function ToastComponent() {
        this.message = { body: '', type: '' };
    }
    ToastComponent.prototype.setMessage = function (body, type, time) {
        var _this = this;
        if (time === void 0) { time = 3000; }
        this.message.body = body;
        this.message.type = type;
        setTimeout(function () { _this.message.body = ''; }, time);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToastComponent.prototype, "message", void 0);
    ToastComponent = __decorate([
        core_1.Component({
            selector: 'app-toast',
            template: __webpack_require__("./src/app/shared/toast/toast.component.html"),
            styles: [__webpack_require__("./src/app/shared/toast/toast.component.css")]
        }), 
        __metadata('design:paramtypes', [])
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=toast.component.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

exports.environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/index.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map