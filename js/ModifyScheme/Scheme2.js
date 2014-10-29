/* requires firstly*/
var fs = require('fs-extra');
var util = require('util');
var cheerio = require('cheerio');
var findit = require('findit');
/* custom requires below*/
var ThePlacementContent = require('../../config/modified_contents.json');
var MethodCollections = require('../MethodCollections');

/**
 * exports.main
 */
exports.main = function(project_path) {
    //项目存放文件夹:projects
    //var project_path = "./projects";
    //项目存放文件夹:project_collection2
    //var project_path = "./project_collection2";
    //console.log("run ");
    /* 针对项目:200, 替换项目json数据*/
    var arr_which_project = ThePlacementContent.project2_200;
    //console.log(arr_which_project);
    /* 需要替换的部分有几处,replace_time*/
    var replace_time = arr_which_project.length;
    //var so_regexp_pattern = arr_which_project[0].replace_regexp_pattern;
    //var so_replacement = arr_which_project[0].replacement;
    /* 获取到需要替换的文件路径并读取*/
    MethodCollections.findIndexFile(project_path, function(filepath) {
        /* find the index file under the sub dir*/
        //console.log(filepath);
        var file_content = fs.readFileSync(filepath).toString();
        //console.log(filepath);
        //console.log(file_content);
        //var after_cont = MethodCollections.replaceRegexpMatchWithStr(file_content, so_regexp_pattern, so_replacement);
        //console.log(after_cont);
        // fs.writeFile(filepath, after_cont, "utf-8", function(err) {
        //     if (err) {
        //         throw err;
        //     } else {
        //         /* 文件转码*/
        //         console.log("i am the filepath:" + filepath);
        //         console.log("write over");
        //         /* 不进行转码*/
        //         //ConvertCharset.main(filepath);
        //         /* 删除元信息 meta*/
        //         //DeleteMeta.main(filepath);
        //     }
        // });
    	/* 从json中读取数据信息替换匹配文本*/
        for (var aj = 0; aj < replace_time; aj++) {
            file_content = MethodCollections.replaceRegexpMatchWithStr(file_content, arr_which_project[aj].replace_regexp_pattern, arr_which_project[aj].replacement);
        }
        /* 去除meta信息*/
        file_content = MethodCollections.removeMetaInfo(file_content);
        /* 操作完成之后将内容重新写入文件*/
        fs.writeFile(filepath, file_content, "utf-8", function(err) {
            if (err) {
                throw err;
            } else {
                /* 文件转码*/
                console.log("i am the filepath:" + filepath);
                console.log("write over");
                /* 不进行转码*/
                //ConvertCharset.main(filepath);
                /* 删除元信息 meta*/
                //DeleteMeta.main(filepath);
            }
        });
        /* 使用页首替换*/
        //var the_head_html = getModifiedPartContent("modified_source");
        //var source = html.match(/<!--.*include.*header.html.*-->/i)[0];

    });
    //console.log("i am scheme1");
    //console.log(ThePlacementContent);


    //MethodCollections.replaceRegexpMatchWithStr();
};
