var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter =require('./routes/index');

// /topic으로 시작하는 주소들에 대해 미들웨어 topicRouter 를 제공하겠다.
app.use(express.static('public'));
// public폴더 내에서 static파일을 찾겠다.
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(compression());
app.get('*',function (request, response, next) {
  // * : 모든요청 / 만약 그냥 app.use로 썼다면 post 방식에 대해서도 작동하므로 비효율적임.

  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();


  });

})
app.use('/topic', topicRouter);
app.use('/', indexRouter);


app.use(function(req,res,next){
  res.status(404).send('Sorry cant find that!');
});
app.use(function(err, req,res,next){
  // 4개의 인자를 가진 함수는 express에서 error를 핸들링하는 함수로 약속되어 있음.
  res.status(500).send('Something broke!');
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000');
})

