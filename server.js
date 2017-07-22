var express=require('express');
var app=express();
var  mysql=require('mysql');

const connection = mysql.createConnection({
  host  : "<hostname>", 
  user     : '<username>',
  password : '<password>',
  database : 'dbstates'
});

connection.connect();

app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/JS'));
app.use(express.static(__dirname + '/images'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res){
res.render('index.html');
});

app.get('/search',function(req,res){
connection.query('SELECT state from tbl_states where state like "'+req.query.key+'%" order by state limit 20', function(err, rows, fields) {
	  if (err) throw err;
    var data=[];
    for(i=0;i<rows.length;i++)
      {

//        console.log(rows[i]);
        data.push(rows[i].state);
      }
      res.end(JSON.stringify(data));
	});
});


var server=app.listen(8080,function(){
  console.log("We have started our server on port 8080");
});
