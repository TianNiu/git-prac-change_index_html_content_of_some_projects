/* requires firstly*/
var findit = require('findit');
var fs = require('fs-extra');
var util = require('util');
var cheerio = require('cheerio');

/* custom requires below*/

/**
 * 找到项目文件夹中的index.html文件，交给下一步
 * @param  {[type]}   project_path [description]
 * @param  {Function} next         [description]
 * @return {[type]}                [description]
 */
exports.findIndexFile = function(project_path, next) {
    var finder = findit(project_path);
    finder.on('file', function(file, stat) {
        /* 匹配所有路径下的index.html 有效*/
        // if (/(\\|\/)index.htm.?/gi.test(file)) {
        //     //console.log(file);
        //     next(file);
        //     //console.log("");
        // }
        //console.log(project_path.slice(2));
        //console.log(project_path);
        //console.log(file);
        var file_regexp=new RegExp(project_path.slice(2)+"(\\\\|\\/)[0-9a-zA-Z-_\\.]*(\\\\|\\/)index\.html?$");
        //console.log(file_regexp);
        /* 文件匹配条件*/
        //var soso="project_collection2\zzhxcj\index.html";
        if (file_regexp.test(file)) {
            next(file);
            //console.log("match");
        }
    });
};
/**
 * 使用提供的目的字串替换正则匹配的内容
 * @return {[type]} [description]
 */
exports.replaceRegexpMatchWithStr = function(file_content, so_regexp_pattern, so_replacement) {
    var the_replace_regexp = new RegExp(so_replacement, "i");
    /* 如果replacement在文件内容中不存在*/
    if (!the_replace_regexp.test(file_content)) {
        /* create the regexp*/
        var so_regexp = new RegExp(so_regexp_pattern, "i");
        file_content = file_content.replace(so_regexp, so_replacement);
    }
    return file_content;
};

/**
 * 去除meta信息
 * @return {[type]} [description]
 */
exports.removeMetaInfo = function(file_content) {
    /* 获取并转换*/
    var $ = cheerio.load(file_content, {
        decodeEntities: false
    });
    $("meta[name=Keywords]").remove();
    $("meta[name=Description]").remove();
    //prev_html = prev_html.replace("/\"Description\"/i", "");
    //console.log("soso");
    //return prev_html;
    return $.html();
};
/**
 * 去除meta中utf-8
 * @param  {[type]} file_content [description]
 * @return {[type]}              [description]
 */
exports.removeCharsetUtf8 = function(file_content) {
    file_content = file_content.replace("charset=utf-8", "");
    return file_content;
};


