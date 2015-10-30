var express = require('express');
//Pido módulo exportado. "./" pide que no se busque en node_modules.
var fortune = require('./lib/fortune.js');

var app = express();
//Se especifica el layout para todas las views.
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//Se especifica el directorio estático donde se van a servir todos los archivos
//estáticos al cliente. Cuando se referencie un archivo de la carpeta será sin public/.
app.use(express.static(__dirname + '/public'));

/*
"app.get()" sirve para el routing, donde get() es un placeholder para la operación
REST que se desee realizar. Por default no considera todos los querystrings. El status
code por default es 200. "res.end()" se reemplaza por "res.send". "res.writeHead()" se
reemplaza por "res.set()" y "res.status()". "res.type()" se usa para setear el "Content-Type".
Las rutas también pueden usar wildcards para matchear cualquier intento de subpágina. Ej:
'/about*' también matchearía a '/about/contact'. 
*/
/*
app.get('/', function(req, res){
	res.type('text/plain');
	res.send('Meadowlark Travel');
});

app.get('/about', function(req, res){
	res.type('text/plain');
	res.send('About Meadowlark Travel');
});
*/

/*
Por default el sistema de templating retorna contenido text/html, y código 200.
Para el catch handler sí hay que especificar el código de status. 
*/

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/about', function(req, res) {
	res.render('about', {fortune: fortune.getFortune()});
});

/*
Los códigos 404 y 500 se manejan de manera diferente porque hacen uso de un middleware
que atrapa todas las rutas que no matchean. En Express.js es importante en que orden se
definen las rutas y el middleware porque si se define el 404 antes que las rutas, las
rutas dejarian de funcionar.
*/
/*
//custom 404 page
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

//custom 500 page
app.use(function(req, res){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});
*/
// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});