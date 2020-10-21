var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
  
var app = express()
  
app.use(session({
  secret: 'keyboard cat',
  resave: false,
//   false: session data가 바뀔 때만 저장함.
  saveUninitialized: true
//   true : session 이 필요할 때만 사용함 / false: 항상 사용 -> 서버에 부담 줄 수 있음
}))

app.get('/', function(req,res,next){
    console.log(req.session)
    if(req.session.num === undefined){
        req.session.num = 1;
    }
    else{
        req.session.num = req.session.num +1;

    }
    res.send(`Views : ${req.session.num} `)
})

 
app.listen(3000, function(){
    console.log('3000!');
});