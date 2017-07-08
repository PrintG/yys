(function(){
    var $flash = $('#bg').find('.flash_bg');
    $flash.find('object').ready(function(){
        //检测是否按装了Flash
        if(flashChecker()){
            setTimeout(function(){
                $flash.animate({"opacity" : "1"});
            },500);
        }
    });
    //移入视角
    var $body = $('body'),
        $warp1 = $('#warp .warp1'),
        $logo = $warp1.find('#logo'),
        $goIndex = $warp1.find('#goIndex'),
        $title = $warp1.find('#title-font'),
        $VedioBtn = $warp1.find('#vedio-btn .Btn-AR'),
        $PlayVedio = $warp1.find('#Play-Vedio'),
        $CloseWarp = $PlayVedio.find('.warp'),
        $close = $CloseWarp.find('.close'),
        $object = $CloseWarp.find('object'),
        $download = $warp1.find('#download');
    //logo出现
    $logo.animate({"opacity" : "1","left" : "0"},2200);
    //goIndex出现
    $goIndex.animate({"opacity" : "1","right" : "0"},2200);
    //title出现
    $title.animate({"opacity" : "1","bottom" : "450"},1500);
    //下载部分出现
    $download.animate({"opacity" : "1","bottom" : "273"},1500);

    var $Ele = '<object data="https://nie.res.netease.com/comm/js/nie/util/video/img/player.swf?v=2017032302" type="application/x-shockwave-flash" id="flash_877338325" width="800" height="450"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"><param name="wmode" value="direct"><param name="bgcolor" value="#000000"><param name="flashvars" value="width=800&amp;height=450&amp;wmode=direct&amp;bgcolor=#000000&amp;host=yys.163.com&amp;movieUrl=https://nie.v.netease.com/nie/2017/0518/a7f3a0546e69013b5d039c988d7c458bqt.mp4&amp;HDmovieUrl=&amp;SHDmovieUrl=&amp;vtype=&amp;&amp;&amp;&amp;volume=0.8&amp;autoPlay=true&amp;&amp;loopTimes=0&amp;&amp;bufferTime=5&amp;videoIndex=0&amp;&amp;allowFullScreen=true&amp;fat="><param name="movie" value="https://nie.res.netease.com/comm/js/nie/util/video/img/player.swf?v=2017032302"><div><h4>页面需要新版Adobe Flash Player.</h4><p><a href="http://www.adobe.com/go/getflashplayer" target="_blank"><img width="112" height="33" alt="获取新版Flash" src="https://nie.res.netease.com/comm/js/util/swfobject/get_flash_player.gif"></a></p></div></object>';

    //点击出现页面
    $VedioBtn.click(function(){
        $PlayVedio.show().addClass('show');
        $body.addClass('showPlay');
        $CloseWarp.append($Ele);
    });
    //关闭播放页面
    $close.click(function(){
        $PlayVedio.hide().removeClass('show');
        $body.removeClass('showPlay');
        $CloseWarp.find('object').remove();
    });
    //播放器自适应居中
    $(window).resize(function(){
        var $_left = $(this).width()/2;
        $CloseWarp.css({"left" : $_left});
    });

})();

//弹窗部分
(function(){
    var $warp2 = $('#warp').find('.warp2'),
        $popWin = $warp2.find('.popWindow'),
        $content = $popWin.find('.winWarp ul li .content'),
        $showLi = $popWin.find('.winWarp ul li');

    $showLi.addClass('show');

    $content.each(function(){
        var $this = $(this),
            $inner = $this.find('.txt'),
            $Scroll = $this.find('.scroll'),
            $Slider = $Scroll.find('i');


        var $cont_H = $this.innerHeight();

        //滑块适应高度
        var $Slid_H = $cont_H / $inner.outerHeight() * $cont_H;
        $Slider.height($Slid_H);
        //最 大/小 限度
        var $Slider_Max = $Scroll.height()-$Slid_H,
            $Slider_Min = 0;

        //滑块滚动
        $Slider.mousedown(function(e){
            var $y = e.clientY - $Slider.position().top;
            $(document).mousemove(function(e){
                var $top = e.clientY - $y;
                //限制
                $top = Math.max($top, $Slider_Min);
                $top = Math.min($top, $Slider_Max);

                $Slider.css({"top":$top});

                //内容跟着动
                var $prop = ($top/$Slider_Max)*($inner.outerHeight() - $cont_H);
                $inner.css('top',-$prop)

                return false;
            }).mouseup(function(){
                $(this).off('mouseup');
                $(this).off('mousemove');
            });
        });
        //鼠标滚轮滚动
        $this.mousewheel(function(e, n){
            var $val = $Slider.position().top;
            n > 0?$val -= 10:$val += 10;
            $val = Math.max($val, $Slider_Min);
            $val = Math.min($val, $Slider_Max);
            $Slider.css({"top":$val});

            var $prop = ($val/$Slider_Max)*($inner.outerHeight() - $cont_H);
                $inner.css('top',-$prop);
            return false;
        });
    });

    //显示切换弹窗
    (function(){
            var $popWin = $warp2.find('.popWindow'),
                $showLi = $popWin.find('.winWarp ul li'),
                $li = $warp2.find('.main ul li'),
                $close = $warp2.find('.popWindow .winWarp .close'),
                $change = $popWin.find('.winWarp .BtnLib div');
                $index = 0;

            $popWin.hide();
            $showLi.removeClass('show');


            $li.click(function(){
                var $li_index = $(this).index();
                $popWin.show();
                $popWin.css('opacity','1');
                $(document.body).addClass('showPlay');
                $showLi.eq($li_index).addClass('show');
                $index = $li_index;
            });

            $close.click(function(){
                $popWin.hide();
                $(document.body).removeClass('showPlay');
                $showLi.eq($index).removeClass('show');
            });

            //切换
            $change.click(function(){
                if($(this).index()){
                    //右x
                    $index ++;
                    $index %= 6;
                }else{
                    //左
                    $index --;
                    if($index<0)$index=5;
                }
                $showLi.eq($index).addClass('show').siblings().removeClass('show');

            });
    })();

    //懒加载
    (function(){
        var $warp2 = $('#warp').find('.warp2'),
            $newInf_title = $warp2.find('.title'),
            //$newInf_title_height = $newInf_title.offset().top,
            $newInf_main = $warp2.find('.main'),
            $newInf_main_li = $newInf_main.find('ul li'),
            //$newInf_li_height = $newInf_main_li.eq(0).offset().top,
            $newInf_li_length = $newInf_main_li.length;


        var $warp3 = $('#warp').find('.warp3'),
            $warp3_title = $warp3.find('.title'),
            //$warp3_title_height = $warp3_title.offset().top,
            $warp3_main = $warp3.find('.main'),
            $warp3_main_height = $warp3_main.offset().top;

        var $warp4 = $('#warp').find('.warp4');

        //需要懒加载的元素集合
        var $element = [
            $newInf_title,
            $newInf_main_li,
            $warp3_title,
            $warp3_main,
            $warp4,
        ];
        var $ele_length = $element.length;

        //高度集合
        var $ele_height = [
            $newInf_title.offset().top,
            $newInf_main_li.eq(0).offset().top,
            $warp3_title.offset().top,
            $warp3_main.offset().top,
            $warp4.offset().top,
        ];

        //到达高度执行的函数集合
        var $func = [
            function(){
                $element[0].removeClass('hide');
            },
            function(){
                for(var i = 0; i < $newInf_li_length; i++){
                    (function(i){
                        var $index = $element[1].eq(i).index();
                        setTimeout(function(){
                            $element[1].eq(i).removeClass('hide');
                        },$index*200);
                    })(i);
                }
            },
            function(){
                $element[2].removeClass('hide');
            },
            function(){
                $element[3].removeClass('hide');
            },
            function(){
                $element[4].removeClass('hide');
            },
        ];

        $(document).scroll(function(){
            var $height = $(document).scrollTop() + $(window).height();
            for(var i = 0; i < $ele_length; i++){
                if($height >= $ele_height[i])$func[i]();
            }
        });
    })();

    //3d轮播切换
    (function(){
        var $warp3 = $('#warp').find('.warp3'),
            $main = $warp3.find('.main'),
            $li = $main.find('.show-list li'),
            $btn = $main.find('.btn'),
            $length = $li.length,
            $index = 0;

            //点击切换
        $li.click(function(){
            var $this = $(this);
            if(!$this.hasClass('middle')){
                $index = $this.index();
                change();
            }
        });

        //左右按钮切换
        $btn.click(function(){
            var $this = $(this);
            if($this.index('.btn')){
                //右
                $index ++;
                $index %= $length;
            }else{
                //左
                $index --;
                if($index < 0)$index=$length - 1;
            }
            change();
        });

        //自动轮播
        var timer = setInterval(autoPlay,3000);

        //移入移出暂停/播放轮播
        $main.mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(autoPlay,3000);
        });

        function autoPlay(){
            $index ++;
            $index %= $length;
            change();
        }

        function change(){
            var $next = $index - 1,
                $prev = $index + 1;
            if($next < 0)$next = $length - 1;
            if($prev >= $length)$prev = 0;
            $li.removeClass('middle left right');
            $li.eq($index).addClass('middle');
            $li.eq($next).addClass('left');
            $li.eq($prev).addClass('right');
        }
    })();

    //更多分享栏
    (function(){
        var $more = $('#warp').find('.warp4 .share ul li.more'),
            $sect = $more.find('.sect1');

        var timer = null;

        $sect.show();
        var val = $sect.offset().left+$sect.width();
        $sect.hide();

        $more.hover(function(){
            clearTimeout(timer);
            $sect.show();
            $sect.stop().animate({"opacity":"1"},1000);
            if($(window).width()<val){
                $sect.css('right','0');
            }else{
                $sect.css('right','-210px');
            }
        },function(){
            $sect.stop().animate({"opacity":"0"},1000);
            clearTimeout(timer);
            timer = setTimeout(function(){$sect.hide();},1000);
        });
    })();
})();