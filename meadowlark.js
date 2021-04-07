let express = require('express');
let hdbexpress = require('express-handlebars');
let path = require('path');

//

let app = express();

let handlebars = hdbexpress.create({
    defaultLayout: 'main'
});

// Meadleware

app.set('port', process.env.PORT || 8080);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

// User data

let fortunes = [
    'Все может быть хорошо в субботу',
    'Политите в новые края',
    'Выйграете машину'
];

//
app.get('/', function(req, res) {

    res.render('home');
});

app.get('/about', function(req, res) {

    let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    
    res.render('about', {
        title:'About',
        fortune: randomFortune
    });
});

app.use(function(req, res, next) {

    res.status(404);
    res.render('404');

});

app.use(function(err, req, res, next) {

    console.error(err.stack);
    res.status(500);
    res.render('500');
    
});

app.listen(app.get('port'), function() {
    console.log(
        'Server started on http://localhost:'+ app.get('port')
        );
});