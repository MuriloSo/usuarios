const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://@localhost/usuarios');
const Schema = mongoose.Schema;
const userDataSchema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    apelido: {type: String, required: true},
    senha: {type: String, required: true}
}, {collection: 'usuarios'});
const Usuarios = mongoose.model('UserData', userDataSchema);
app.use(express.static('public'));
app.set('view engine', 'pug');

app.post('/cadastrar', function (req, res) {

    var usuario = {
        nome: req.params('nomeUser'),
        email: req.params('email'),
        apelido: req.params('apelido'),
        senha: req.params('senha')
    };
    new Usuarios(usuario).save();
    res.end();
});
app.get('/listar', function (req, res) {
    Usuarios.find().then(function (usuario) {
        res.render('listar', {nomes: [usuario[0].nome]});
        res.end();
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
});

function htmlHead(res) {
    return res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
}