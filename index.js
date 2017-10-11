const express =require('express');
const hbs=require('hbs');
const fs=require('fs');
const port= process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname +'/public'));

app.set('view engine','hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log= `${now} :${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err)=>{
        if (err){
            console.log('some error occured');
        }

    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintain.hbs',{
//         maintainmsg:'Error 404'
//     });
// });


app.get('/',(req,res)=>{
    res.render('home.hbs', {
        welcome:'welcome to homepage',
        pagetitle: 'home page',
        //currentdate: new Date().getFullYear()
    });
});


hbs.registerHelper('currentdate',()=>{
    return new Date().getFullYear();
    
})

hbs.registerHelper('screemit', (text) => {
    return text.toUpperCase();

})

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pagetitle:'about page',
    });
});


app.get('/bad', (req, res) => {
  res.send({ error: 'unable to load page'
       });

});
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
});