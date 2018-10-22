const express=require('express');
const hbs = require('hbs');
const fs=require('fs');


var app=express();
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

//filter
hbs.registerHelper('uppsercase',(text)=>{
    return text.toUpperCase();
})


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();
})

// app.use((req,res,next)=>{
//     res.render('offline.hbs')
// })

//Handlebars  & Mustache 
//d:/roxo/node-web-server
//http://localhost:3000/help.html
//static data


app.get('/',(req,res)=>{
    //res.send('<h1>Hello express.js</h1>');
    // res.send({
    //     name: 'roxo',
    //     website: [
    //         'roxo.ir',
    //         'roxo.ir/plus'
    //     ]
    // })
    res.render('home.hbs',{
        pageTitle:'Home Page',
        message:'Welcome To Roxo',
        currentYear: new Date().getFullYear()
    });

});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        error:'unable to fetch data.'
    })
})


app.listen(3000,()=>{
    console.log("Server run on port 3000");
});



// node server.js -e js,hbs