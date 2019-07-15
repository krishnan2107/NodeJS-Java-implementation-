//implementation from :http://techslides.com/client-side-javascript-to-node-js


// Load the http module to create an http server.
var http = require('http'); 

// Create a function to handle every HTTP request
function handler(req, res){

  var form = '';

  if(req.method == "GET"){ 
    
    form = '<!doctype html> \
<html lang="en"> \
<head> \
    <meta charset="UTF-8">  \
    <title>Form Calculator Add Example</title> \
</head> \
<body> \
  <form name="myForm" action="/" method="post">\
      <input type="text" name="A"> + \
      <input type="text" name="B"> = \
      <span id="result"></span> \
      <br> \
      <input type="submit" value="Submit"> \
  </form> \
</body> \
</html>';

  //respond
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end(form);
  
  } else if(req.method == 'POST'){

    //read form data
    req.on('data', function(chunk) {

      //grab form data as string
      var formdata = chunk.toString();

      //grab A and B values
      var a = eval(formdata.split("&")[0]);
      var b = eval(formdata.split("&")[1])

      // var result = calc(a,b);
      var result = calcJAVA(a,b);

      //console.log(chunk.toString());
      //console.log(a);
      //console.log(b);
      //console.log(result);

      //fill in the result and form values
    form = '<!doctype html> \
<html lang="en"> \
<head> \
    <meta charset="UTF-8">  \
    <title>Form Calculator Add Example</title> \
</head> \
<body> \
  <form name="myForm" action="/" method="post">\
      <input type="text" name="A" value="'+a+'"> + \
      <input type="text" name="B" value="'+b+'"> = \
      <span id="result">'+result+'</span> \
      <br> \
      <input type="submit" value="Submit"> \
  </form> \
</body> \
</html>';

    //respond
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(form);

    });

  } else {
    res.writeHead(200);
    res.end();
  };

};

//js functions running only in Node.JS
function calc(a,b){
  return  Number(a)+Number(b);
}

// Create a server that invokes the `handler` function upon receiving a request
http.createServer(handler).listen(8000,'192.168.32.134',function(err){
  if(err){
    console.log('Error starting http server');
  } else {
    console.log("Server running at http://192.168.32.134:8000/ or http://localhost:8000/");
  };
});

function calcJAVA(a,b) {
  var net  = require('net');
  var mess = a+','+b;

  var client = net.createConnection(7777, '192.168.32.134', () => {
    console.log("Client Connected!");
    client.write(mess);
    client.end();
  });

  client.on('data', (data) => {
    console.log("Received:"+data.toString().trimRight());
    client.end();
  
  });

  client.on('end',()=>{
    console.log("Server connection closed");
  });


  return Number(a)+Number(b);
}