var ThePlacementContent = require('../config/modified_contents.json');
/**
 * 处理方法集合
 * @return {[type]} [description]
 */
module.exports = function() {
    var _regexp = null;

    function soChange(arr) {
        arr.forEach(function(ele, index) {});
    };

    function loginfo() {
        console.log(ThePlacementContent);
    };
    var methodsCollect = {
        methodA: function() {
            /* 使用页首替换*/
            var the_head_html = getModifiedPartContent("modified_source");
            //var source = html.match(/<!--.*include.*header.html.*-->/i)[0];
            prev_html = prev_html.replace(/<\/head>/i, the_head_html + "</head>");

            _regexp = new RegExp(pattern, i);

            return this;
        },
        methodB: function() {
            /* 使用页脚替换*/
            var the_foot_html = getModifiedPartContent("modified_nav");
            //debugger;
            //var source = html.match(/<!--.*include.*footer.html.*-->/i)[0];
            prev_html = prev_html.replace(/<!--.*include.*virtual.*haibao_header\.html.*-->/i, the_foot_html);
            //$("body").append(the_foot_html);
            //console.log("i am the 2");
            //console.log(prev_html);
            //console.log(source);
            return this;
        },
        methodC: function() {
            /* 加入留言板内容*/
            var the_message_board = getModifiedPartContent("modified_bottom");

            prev_html = prev_html.replace(/<!--.*include.*virtual.*haibao_newfooter\.html.*-->/i, the_message_board);
            //console.log("i am the 3");
            //console.log(prev_html);
            return this;
        },
        methodD: function() {
            /* 加入留言板内容*/
            var the_message_board = getModifiedPartContent("modified_guestbook");

            prev_html = prev_html.replace(/<script>.*document\.write.*decodeURI.*800\.91jmw\.com.*<\/script>/i, the_message_board);

            return this;
        },
        methodE: function() {
            /* 去除utf-8代码*/
            prev_html = prev_html.replace("charset=utf-8", "");

            return prev_html;
        },
        methodF: function() {
            /* 去除meta信息*/
            //prev_html = prev_html.replace("/<meta\s*name=\"Keywords\"\s*content.*>/i", "");
            //prev_html = prev_html.replace("/<meta\s+name\s*=\s*\"\s*Description\s*\"\s+content.*>/i", "");
            var $ = cheerio.load(prev_html, {
                decodeEntities: false
            });
            $("meta[name=Keywords]").remove();
            $("meta[name=Description]").remove();
            //prev_html = prev_html.replace("/\"Description\"/i", "");
            console.log("soso");
            //return prev_html;
            return $.html();
        }
    };
    return function() {
        console.log(ThePlacementContent);
        //console.log("no");
    };
    //return methodsCollect;
};
