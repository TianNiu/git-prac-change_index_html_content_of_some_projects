/* require firstly*/
var express = require('express');
var app = express();
var path = require('path');
/* custom require below*/
//var index = require('./routes/index');
//var changeContent = require('./js/changeContent');
//var ConvertCharset = require('./js/ConvertCharset');
//var MethodCollections = require('./js/methodCollections');
var Scheme1 = require('./js/ModifyScheme/Scheme1');
var Scheme2 = require('./js/ModifyScheme/Scheme2');
//Scheme1

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
/* routes*/
/*app.get("/", index.main);
app.get("/index", index.main);
app.get('/', function(req, res) {
    res.send('hello world');
});
app.post("/uploadfile", uploadhandler.main);*/

/**
 * Main Area
 */
/**
 * resourceful 路由方式 暂时禁用路由功能
 */
//require('./router').main(app);
//运行方案1,Scheme1
Scheme1.main();
Scheme2.main();
/**
 * node启动执行模块changeContent.main(),停用
 */
//changeContent.main();
//MethodCollections()();


/* run server at 3000*/
app.listen(3000);
