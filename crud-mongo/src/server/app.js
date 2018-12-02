var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://gabriel949:nopass949@ds123434.mlab.com:23434/trabalho-rh');
var db = mongoose.connection;
console.log("dsfdf");
console.log(db);
mongoose.Promise = global.Promise;

// Models
var Empresa = require('./empresa.model.js');
var Avaliador = require('./avaliador.model.js');
var Funcionario = require('./funcionario.model.js');
var OrderItem = require('./order-item.model.js');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    /*CLIENT*/
        // select all
        app.get('/empresa', function(req, res) {
            Empresa.find({}, function(err, docs) {
                if (err) return console.error(err);
                res.json(docs);
            });
        });

        // count all
        app.get('/empresa/count', function(req, res) {
            Empresa.count(function(err, count) {
                if (err) return console.error(err);
                res.json(count);
            });
        });

        // create
        app.post('/empresa', function(req, res) {

            var obj = new Empresa(req.body);
            console.log("obj", obj);
            obj.save(function(err, obj) {
                if (err) return console.error(err);
                res.status(200).json(obj);
            });
        });

        // find by id
        app.get('/empresa/:id', function(req, res) {
            Empresa.findOne({ _id: req.params.id }, function(err, obj) {
                if (err) return console.error(err);
                res.json(obj);
            });
        });

        // update by id
        app.put('/empresa/:id', function(req, res) {
            Empresa.findOneAndUpdate({ _id: req.params.id }, req.body, function(err) {
                if (err) return console.error(err);
                res.sendStatus(200);
            });
        });

        // delete by id
        app.delete('/empresa/:id', function(req, res) {
            Empresa.findOneAndRemove({ _id: req.params.id }, function(err) {
                if (err) return console.error(err);
                res.sendStatus(200);
            });
        });
    /*Empresa*/

    /*PRODUCT*/
         //APIs
        //select all
        app.get('/avaliador', function(req, res) {
            Avaliador.find({}, function(err, docs) {
                if (err) return console.error(err);
                res.json(docs);
            });
        });

        //count all
        app.get('/avaliador/count', function(req, res) {
            Avaliador.count(function(err, count) {
                if (err) return console.error(err);
                res.json(count);
            });
        });

        //create
        app.post('/avaliador', function(req, res) {

            var obj = new Avaliador(req.body);
            console.log("obj", obj);
            obj.save(function(err, obj) {
                if (err) return console.error(err);
                res.status(200).json(obj);
            });
        });

        //find by id
        app.get('/avaliador/:id', function(req, res) {
            Avaliador.findOne({ _id: req.params.id }, function(err, obj) {
                if (err) return console.error(err);
                res.json(obj);
            });
        });

        //update by id
        app.put('/avaliador/:id', function(req, res) {
            Avaliador.findOneAndUpdate({ _id: req.params.id }, req.body, function(err) {
                if (err) return console.error(err);
                res.sendStatus(200);
            });
        });

        //delete by id
        app.delete('/avaliador/:id', function(req, res) {
            Avaliador.findByIdAndRemove({ _id: req.params.id }, function(err) {
                if (err) return console.error(err);
                res.sendStatus(200);
            });
        });
    /*PRODUCT*/

    /*PEDIDO*/
         //APIs
        //select all
        app.get('/funcionario', function(req, res) {
            Funcionario.find({}, function(err, docs) {
                if (err) return console.error(err);
                res.json(docs);
            });
        });

        //count all
        app.get('/pedidos/count', function(req, res) {
            Funcionario.count(function(err, count) {
                if (err) return console.error(err);
                res.json(count);
            });
        });

        //create
        app.post('/funcionario', function(req, res) {

            var obj = new Funcionario(req.body);
            console.log("obj", obj);
            obj.save(function(err, obj) {
                if (err) return console.error(err);
                res.status(200).json(obj);
            });
        });

        //find by id
        app.get('/funcionario/:id', function(req, res) {
            Funcionario.findOne({ _id: req.params.id }, function(err, obj) {
                if (err) return console.error(err);
                res.json(obj);
            });
        });

        //update by id
        app.put('/funcionario/:id', function(req, res) {
            Funcionario.findOneAndUpdate({ _id: req.params.id }, req.body, function(err) {
                if (err) return console.error(err);
                res.sendStatus(200);
            });
        });

        //delete by id
        app.delete('/funcionario/:id', function(req, res) {
            Funcionario.findByIdAndRemove({ _id: req.params.id }, function(err) {
                if (err) return console.error(err);
                res.sendStatus(200);
            });
        });
/*PEDIDO*/


    /* Order Itens (Itens de pedidos) */
    /* Recupera itens de acordo com o pedido */
    app.get('/orderItems/:orderId', function(req, res) {
        Avaliador.findOne({ orderId: req.params.orderId }, function(err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        });
    });

    /* Adiciona um item de pedido */
    app.post('/orderItems', function(req, res) {

        var obj = new OrderItem(req.body);
        console.log("obj", obj);
        obj.save(function(err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    /* Pesquisa produto */
    app.get('/avaliador/search/:query', function(req, res){
        Avaliador.find({name: new RegExp(req.params.query, "ig")}, function(err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        });
    });

    /* itens do pedido*/
    app.get('/order/:id/items', function(req, res){
        console.log(req.params.id);
        OrderItem.find({orderId: req.params.id}, function(err, docs) {
            if (err) return console.error(err);
            let filled = 0;
            for(let i in docs)
                Avaliador.find({_id: docs[i].productId}, function(err, product){
                    docs[i].product = product;
                    console.log(product);
                    
                    if(++filled == docs.length)
                    res.json(docs);
                });
            
            console.log('returned');
            
        });
    });

    // delete by id
    app.delete('/orderItems/:id', function(req, res) {
        console.warn('ID => '+ req.params.id);
        OrderItem.findOneAndRemove({ _id: req.params.id }, function(err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });

    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../../dist/index.html'));
    });

    app.listen(app.get('port'), function() {
        console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
    });


   
});

module.exports = app;