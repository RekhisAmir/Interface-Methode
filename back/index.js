const path = require('path');
const fs = require('fs')
const mysql = require('mysql')
const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')

//Import PythonShell module.
const {PythonShell} =require('python-shell');


const port = 5000
const app = express()



// default options
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload({createParentPath:true}));

app.use(express.urlencoded({extended: true}))

const connection = mysql.createConnection({
    host:"localhost",
    database:"db_etc",
    user:"root",
    password:""
})

connection.connect(err=>{err?console.log(err): console.log("Connection to database OK")})

app.get('/ofs',(req,res)=>{
    connection.query('SELECT * FROM ofs', (err,result)=>{
        err?res.send(err):res.send(result)
    })
})

app.get('/', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
    let file;
    let uploadPath;
    let {of, client, model} = req.body
    console.log(req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  file = req.files.file;
  let extension = path.extname(file.name);

  of = req.body.of
  client = req.body.client
  model = req.body.model
  console.log(file.name);


//   uploadPath = __dirname + '\\uploads\\' + file.name;
  uploadPath = path.join(__dirname, 'etc', `${of}_${client}_${model}${extension}`);
  console.log(uploadPath);
 
  if (fs.existsSync(uploadPath) || of =='' || client =='' || model =='' || file.name =='' ) {
    res.send('File already exist or incorrect informations')
    console.log('File already exist or incorrect informations')
  }

  else{
    file.mv(uploadPath, function(err) {
        if (err) {
              return res.status(500).send(err);
            }
        
        });
        res.send('File uploaded to ' + uploadPath);

  let options = {
       scriptPath: 'C:\\Users\\AmirRekhis\\chakra\\back\\etc', //If you are having python_test.py script in same folder, then it's optional.
  
};      

  PythonShell.run('gamme_sap.py', options,(err,res)=>{
       err?console.log(err):console.log('gamme script running succefully')
 });     

 PythonShell.run('of_sap.py', options,(err,res)=>{
  err?console.log(err):console.log('of script running successfully')
});
  }


});



app.listen(port,err=>{err?console.log(err):console.log(`server running on port ${port}`)})