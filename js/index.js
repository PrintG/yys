/*
*
*   #全局变量占用
*       #用于储存数据
*           #$Msg_Data
*           #$Msg_Data_Length
*
*           #$SafeTrip_shishen_Data
*           #$SafeTrip_shishen_Data_Length
*
*           #strategy_data
*           #strategy_data_Length
*
*           #fan_data
*           #fan_data_Length
*
*/

(function(){
    var $main = $('#main');

    //公用轮播
    function Banner($picList, $picWidth, $tab, $delayTime, $time){
        this.$picList = $picList;
        this.$picWidth = $picWidth;
        this.$tab = $tab;
        this.$delayTime = $delayTime || 100;
        this.$time = $time || 300;
        this.$index = 0;
        this.timeOut = null;
    }
    Banner.prototype.exe = function(){
        this.tabHover();
    }
    Banner.prototype.tabHover = function(){
        var $This = this;
        $This.$tab.hover(function(){
            var $this = $(this);
            clearTimeout($This.timeOut);
            $This.timeOut = setTimeout(function(){
                $this.addClass('on').siblings().removeClass('on');
                $This.$index = $this.index();
                $This.$picList.stop().animate({
                    "left" : -$This.$index*$This.$picWidth
                },$This.$time);
            },$This.$delayTime);
        });
    }

    //带自动播放的轮播
    function NewsBanner($picList, $picWidth, $tab, $parent, $delayTime, $time){
        Banner.call(this, $picList, $picWidth, $tab, $delayTime, $time);
        this.length = $tab.length;
        this.timer = null;
        this.$parent = $parent;
    };

    function Fn(){}
    Fn.prototype = Banner.prototype;
    NewsBanner.prototype = new Fn();
    //自动播放
    NewsBanner.prototype.autoPlay = function(){
        var $This = this;
        $This.timer = setInterval(autoPlay,2500);
        function autoPlay(){
            var $tab = $This.$tab,
            $index = $This.$index;
            $index ++;
            $index %= $This.length;
            $tab.eq($index).addClass('on').siblings().removeClass('on');
            $This.$index = $tab.eq($index).index();
            $This.$picList.stop().animate({
                "left" : -$index*$This.$picWidth
            },500);
        }

        $This.$parent.hover(function(){
            clearInterval($This.timer);
        },function(){
            $This.timer = setInterval(autoPlay,2500);
        });
    };
    NewsBanner.prototype.exe = function(){
        this.autoPlay();
        this.tabHover();
    };

    //warp1事件
    (function(){
        var $warp1 = $main.find('.warp1');

        //topBanner事件
        (function(){
            var $topBanner = $warp1.find('.top-Banner'),
                $moreA = $topBanner.find('nav div a.more'),
                $moreSpan = $moreA.find('span'),
                $navMore = $topBanner.find('.nav-more'),
                $moreAll = $navMore.find('.more1,.more2'),
                $index = 0; //当前显示的

            var $fontLogo = $topBanner.find('.font-logo');

            //banner条
            $moreA.hover(function(){
                var $this = $(this);
                $topBanner.removeClass('hide');
                $navMore.stop().animate({"height":"200",},500);
                $moreAll.eq($this.index('.more')).stop().animate({"height":"200",},500);
                $index = $this.index('.more');
                $moreSpan.eq($index).stop().animate({"opacity":"1"});
            },function(){
                $topBanner.addClass('hide');
                $navMore.stop().animate({"height":"0",},500);
                $moreAll.eq($(this).index('.more')).stop().animate({"height":"0",},500);
                $moreSpan.eq($index).stop().animate({"opacity":"0"});
            });
            $navMore.hover(function(){
                $topBanner.removeClass('hide');
                $(this).stop().animate({"height":"200"},500);
                $moreAll.eq($index).stop().animate({"height":"200"},500);
                $moreSpan.eq($index).stop().animate({"opacity":"1"},500);
            },function(){
                $topBanner.addClass('hide');
                $(this).stop().animate({"height":"0"},500);
                $moreAll.eq($index).animate({"height":"0"},500);
                $moreSpan.eq($index).stop().animate({"opacity":"0"});
            });

            //fontLogo显示事件
            (function(){
                $fontLogo.delay(1000).queue(function(){
                    $(this).removeClass('hide');
                });
            })();

            //滚动到一定程度改变topBanner和fontLogo
            $(document).scroll(function(){
                if($(this).scrollTop()){
                    //不为0
                    $topBanner.addClass('scroll').removeClass('hide');
                    $fontLogo.addClass('scaleHide');
                }else{
                    //为0
                    $topBanner.removeClass('scroll').addClass('hide');
                    $fontLogo.removeClass('scaleHide');
                }
            });
        })();

        //mainBanner事件
        (function(){
            var $MainBanner = $warp1.find('.mainBanner'),
                $roleShow = $MainBanner.find('.slider .roleShow .show1,.slider .roleShow .show2'),
                $Btn = $MainBanner.find('.slider .roleShow .btn'),
                $index = 0,
                $isClick = false;

            //一开始就显示第一组人物
            setTimeout(function(){
                $roleShow.eq(0).addClass('show');
            });

            $Btn.click(function(){
                if(!$isClick){
                    $roleShow.eq($index).removeClass('show');
                    $index++;
                    $index%=2;
                    $roleShow.eq($index).addClass('show');
                    $isClick = true;
                    setTimeout(function(){
                        $isClick = false;
                    },1000);
                }
            });

            var $porpWin = $MainBanner.find('.slider .propWin'),
                $frog = $MainBanner.find('.slider .frog img'),
                $closeBtn = $porpWin.find('.mainContent .close');
            $porpWin.hide();
            $frog.click(function(){
                $porpWin.show();
                $porpWin.removeClass('hide');
            });
            $closeBtn.click(function(){
                $porpWin.addClass('hide');
                setTimeout(function(){
                    $porpWin.hide();
                },1000);
            })
        })();

        //gameCalender事件
        (function(){
            var $gameCalendar = $warp1.find('.gameCalendar'),
                $slide = $gameCalendar.find('.slide'),
                $shrink = $slide.find('.shrink'),
                $scanDownload = $slide.find('.scanDownload');

            $shrink.click(function(){
                $slide.addClass('closed');
            });
            $scanDownload.click(function(){
                $slide.removeClass('closed');
            });

            var timer = null;

            //linkList
            var $linkList = $gameCalendar.find('.linkList'),
                $item = $linkList.find('a .effect');

            $item.hover(function(){
                $(this).stop().addClass('height pos');
            },function(){
                $(this).removeClass('height');
                $(this).stop().delay(500).queue(function(){
                    $(this).removeClass('pos');
                });
            });
        })();

        //news_section事件
        (function(){

            var $news_section = $warp1.find('.news_section'),
                $news = $news_section.find('.news').eq(0),
                $picList = $news.find('.picList'),
                $picWidth = $picList.find('a img').width(),
                $tabList = $news.find('.tabList'),
                $tab = $tabList.find('i');
            var $newShuff = new NewsBanner($picList, $picWidth, $tab, $news);
            $newShuff.exe();

            //info
            var $massage = $news_section.find('.massage'),
                $tabList2 = $massage.find('.Msgtab a'),
                $infoList = $massage.find('.Msginfo .infoList');

            //载入data信息到infoList
            for(var i = 0; i < $Msg_Data_Length; i++){
                var $Msg_Data_curLength = $Msg_Data[i].length;
                var $li = $("<li></li>");
                for(var j = 0; j < $Msg_Data_curLength; j++){
                    var $div = $("<div></div>"),
                        $a = $('<a href='+$Msg_Data[i][j].href+' target="_blank">'+$Msg_Data[i][j].content+'</a>'),
                        $span = $("<span>"+$Msg_Data[i][j].time+"</span>");
                    $div.append($a);
                    $div.append($span);
                    $li.append($div);
                }
                $infoList.append($li);

            }


            var $infoWidth = $infoList.find('li').eq(0).width();

            var $infoShuff = new Banner($infoList, $infoWidth, $tabList2);
            $infoShuff.exe();
        })();

        //safeTrip事件
        (function(){
            var $safeTrip = $warp1.find('.safeTrip'),
                $openBtns = $safeTrip.find('.openBtn .btn');
                $tripMain = $safeTrip.find('.tripMain'),
                $shishen = $tripMain.find('.shishen'),
                $zhujue = $tripMain.find('.zhujue'),
                $shishenList_warp = $shishen.find('.shishenList_warp'),
                $tab = $tripMain.find('.shishen .tab span'),
                $btn = $shishenList_warp.find('.btn'),
                $shishenList = $shishenList_warp.find('.shishenList_container .shishenList'),
                $index = 0, //默认index
                $tab_index = 0;  //当前tab的index

            //生成各种式神页面
            (function(){
                var $data = [];    //用于储存式神数据
                //分割内容;两个一组
                for(var i = 0; i < $SafeTrip_shishen_Data_Length; i++){
                    var $arr = [],$value = [],$indexs = 0;
                    for(var j = 0; j < $SafeTrip_shishen_Data[i].length; j++){
                        $value.push($SafeTrip_shishen_Data[i][j]);
                        if(j%2){
                            $arr[$indexs] = $value;
                            $value = [];
                            $indexs++;
                        }
                    }
                    $data.push($arr);
                }
                var $data_length = $data.length;

                //生成全部式神
                allShishen();
                function allShishen(){
                    //填入内容(全部加入)
                    for(i = 0; i < $data_length; i++){
                        var $data_child_length = $data[i].length;
                        for(j = 0; j < $data_child_length; j++){
                            var $newLi = $('<li></li>');
                            for(var k = 0; k < 2; k ++){
                                var newA = $('<a href='+$data[i][j][k].href+' target="_blank" style="background-image:url('+$data[i][j][k].src+');background-color:#fff;"><p class="mask"><span>'+$data[i][j][k].name+'</span></p></a>');
                                if($data[i][j][k].new)newA.append('<i class="new"></i>');
                                $newLi.append(newA);
                            }
                            $shishenList.append($newLi);
                        }
                    }
                    //适应宽度
                    $shishenList.width(($data[0].length+$data[1].length+$data[2].length+$data[3].length)*129);
                }

                //$tab点击事件
                $tab.click(function(){
                    var $This_index = $(this).index();
                    if($tab_index!==$This_index){
                        //初始化
                        $shishenList.html("");
                        $index = 0;
                        $shishenList.css('left',0);
                        $btn.show();
                        if($index === 0)$btn.eq(0).hide();

                        switch($This_index){
                            case 0:
                                allShishen();
                                btnClick(function(){
                                    if($index === 0){$btn.eq(0).hide();}else if($index !== 0){$btn.eq(0).show();}
                                    if($index === 7){$btn.eq(1).hide();}else if($index !== 7){$btn.eq(1).show();}
                                },function(){
                                    if($index === 0){$btn.eq(0).hide();}else if($index !== 0){$btn.eq(0).show();}
                                    if($index === 7){$btn.eq(1).hide();}else if($index !== 7){$btn.eq(1).show();}
                                });
                                break;
                            case 1:
                                change_shishen(0, 1);
                                break;
                            case 2:
                                change_shishen(1, 2);
                                break;
                            case 3:
                                change_shishen(2, 2);
                                break;
                            case 4:
                                change_shishen(3);
                                break;
                        }
                        $tab_index = $This_index;
                        $tab.eq($tab_index).addClass('click').siblings().removeClass('click');
                    }

                    function change_shishen(index, max){
                        var $length = $data[index].length;
                        for(var i = 0; i < $length; i++){
                            var $newLi = $('<li></li>');
                            for(var j = 0; j < 2; j++){
                                var newA = $('<a href='+$data[index][i][j].href+' target="_blank" style="background-image:url('+$data[index][i][j].src+');background-color:#fff;"><p class="mask"><span>'+$data[index][i][j].name+'</span></p></a>');
                                if($data[index][i][j].new)newA.append('<i class="new"></i>');
                                $newLi.append(newA);
                            }
                            $shishenList.append($newLi);
                        }
                        $shishenList.width($length*133.33);
                        if(index === 3){
                            $btn.hide();
                        }else{
                            btnClick(function(){
                                if($index === 0){$btn.eq(0).hide();}else if($index !== 0){$btn.eq(0).show();}
                                if($index === max){$btn.eq(1).hide();}else if($index !== max){$btn.eq(1).show();}
                            },function(){
                                if($index === 0){$btn.eq(0).hide();}else if($index !== 0){$btn.eq(0).show();}
                                if($index === max){$btn.eq(1).hide();}else if($index !== max){$btn.eq(1).show();}
                            });
                        }
                    }
                });
            })();
            //如果为第一张，隐藏左按钮
            if($index === 0)$btn.eq(0).hide();

            //注册切换按钮默认事件
            btnClick(function(){
                if($index === 0){$btn.eq(0).hide();}else if($index !== 0){$btn.eq(0).show();}
                if($index === 7){$btn.eq(1).hide();}else if($index !== 7){$btn.eq(1).show();}
            },function(){
                if($index === 0){$btn.eq(0).hide();}else if($index !== 0){$btn.eq(0).show();}
                if($index === 7){$btn.eq(1).hide();}else if($index !== 7){$btn.eq(1).show();}
            });

            function btnClick(fn1, fn2){
                $btn.off('click');
                var isClick = false;
                $btn.click(function(){
                    if(!isClick){
                        if($(this).index()){
                            $index ++;
                            fn1();
                            $shishenList.stop().animate({
                                "left":-$index*800,
                            },1000);
                        }else{
                            $index --;
                            fn2();
                            $shishenList.stop().animate({
                                "left":-$index*800,
                            },1000);
                        }
                        isClick = true;
                        setTimeout(function(){
                            isClick = false;
                        },1000);
                    }
                });
            }

            //切换页面
            $openBtns.click(function(){
                $this = $(this);
                if($this.index('.btn')-1){
                    //右
                    $shishen.addClass('hide');
                    $zhujue.removeClass('hide');
                    setTimeout(function(){
                        $shishen.hide();
                        $zhujue.show();
                    },200);
                }else{
                    //左
                    $shishen.show();
                    $zhujue.addClass('hide');
                    setTimeout(function(){
                        $shishen.removeClass('hide');
                        $zhujue.hide();
                    },100);
                }
                $this.addClass('active').siblings().removeClass('active');
            });

            //主角页面切换
            (function(){
                var $zhujueMain = $zhujue.find('.zhujueMain'),
                    $tab = $zhujueMain.find('.tab div'),
                    $show = $zhujueMain.find('.zhujueShow > div');

                //默认第一张显示
                $show.eq(0).show();

                $tab.click(function(){
                    var $this = $(this);
                    var $thisElement = $show.eq($this.index());

                    $this.addClass('cur').siblings().removeClass('cur');
                    $thisElement.show().siblings().hide();
                    setTimeout(function(){
                        $thisElement.addClass('show').siblings().removeClass('show');
                    },100);
                });
            })();
        })();
    })();

    //warp2事件
    (function(){
        var $warp2 = $main.find('.warp2');

        //搜索,攻略
        (function(){
            var $strategy_warp = $warp2.find('.strategy_warp'),
                $section = $strategy_warp.find('.section'),
                $search = $section.find('.search'),
                $input = $search.find('input'),
                $btn = $search.find('div');

            //点击按钮跳转搜索
            $btn.click(function(){
                var inner = $input.val();
                if(inner !== ""){
                    window.open("http://so.yys.163.com/search?qs="+inner);
                }else{
                    alert('请输入搜索内容');
                }
            });

            //banner
            var $banner = $section.find('.banner'),
                $picList = $banner.find('.picList'),
                $picWidth = $picList.find('li').width(),
                $tab = $banner.find('.tab i');

            var stratBanner = new NewsBanner($picList, $picWidth, $tab, $banner, 200);
            stratBanner.exe();



            var $strategy = $strategy_warp.find('.strategy'),
                $tab = $strategy.find('.tab a'),
                $banner = $strategy.find('.banner'),
                $picList = $banner.find('.list');

            //往攻略banner里填内容
            for(var i = 0; i < strategy_data_Length; i++){
                var length = strategy_data[i].length;
                var newLi = $('<li></li>');
                for(var j = 0; j < length; j++){
                    var className = "none";
                    if(j%2===0)className="marRight";
                    var newA = $('<a class='+className+' href='+strategy_data[i][j].href+' target="_blank"><p><span class="iconFont"></span><span>'+strategy_data[i][j].content+'</span></p><i>作者：'+strategy_data[i][j].author+'</i></a>');
                    newLi.append(newA);
                };
                $picList.append(newLi);
            }

            var $picWidth = $picList.find('li').eq(0).width();
            var strBanner = new Banner($picList, $picWidth, $tab);
            strBanner.exe();
        })();

        //同人专区
        (function(){
            var $oFan = $warp2.find('.fan_warp .fan'),
                $banner = $oFan.find('.banner'),
                $picList = $banner.find('.picList'),
                $oTab = $oFan.find('.tabList .tab a');

            //往picList里载入内容
            for(var i = 0; i < fan_data_Length; i++){
                var length = fan_data[i].length;
                var $li = $('<li></li>');
                for(var j = 0; j < length; j++){
                    var $div = $('<div></div>');
                    $div.addClass("warp"+(j===0||j===4?" noMar":"")+(j>3?" marTop":""));
                    $div.append("<a href="+fan_data[i][j].href+" target='_blank' title="+fan_data[i][j].content+"><img src="+fan_data[i][j].src+" height='366' width='650'><span><i></i></span></a><p class='omit'>"+fan_data[i][j].content+"</p>");
                    $li.append($div);
                }
                $picList.append($li);
            }

            var $picWidth = $picList.find('li').eq(0).width();
            var fanBanner = new Banner($picList, $picWidth, $oTab, 100, 500);
            fanBanner.exe();
        })();

        //视图
        (function(){
            var $shitu = $warp2.find('.shitu_warp .shitu'),
                $openVedio = $shitu.find('.vedio_Section .vedio'),
                $propWin = $shitu.find('.propWin'),
                $object = $propWin.find('.vedioWarp object'),
                $close = $propWin.find('.vedioWarp .close');

            var $body = $(document.body);

            var vedioSrc = [
                'flash/shitu01.swf',
                'flash/shitu02.swf',
                'flash/shitu03.swf',
            ];

            $openVedio.click(function(){
                var index = $(this).index()-1;
                $object.prop('data', vedioSrc[index]);
                $body.addClass('showPlay');
                $propWin.stop().show().delay(100).queue(function(){
                    $(this).addClass('show');
                });
            });

            //点击关闭
            $close.click(function(){
                $body.removeClass('showPlay');
                $propWin.removeClass('show');
                setTimeout(function(){
                    $propWin.hide();
                },400);
            });
        })();

        //活动专区
        (function(){
            var goTop = $warp2.find('.activity_section .activity_main .bottom_content ul .item5');

            goTop.click(function(){
                $("html,body").animate({
                    scrollTop:"0",
                },500);
            });
        })();


        //foot
        (function(){
            //点击弹出链接
            var $href = [
                'http://res.nie.netease.com/comm/js/nie/util/share/api/index.html?url=https%3A%2F%2Fyys.163.com%2F%3FnieShare%3D23%2Cyys%2C6&title=%E9%AD%91%E9%AD%85%E9%AD%8D%E9%AD%89%EF%BC%8C%E5%92%8C%E9%A3%8E%E5%86%99%E6%84%8F%EF%BC%8C%E4%BB%A5%E9%98%B4%E9%98%B3%E5%B8%88%E4%B9%8B%E5%90%8D%E8%A1%8C%E8%B5%B0%E4%BA%8E%E4%BA%BA%E9%AC%BC%E4%B8%A4%E7%95%8C%E4%B9%8B%E9%97%B4......%E6%9D%A5%E5%90%A7%EF%BC%8C%E4%B8%8E%E6%88%91%E4%BB%AC%E4%B8%80%E5%90%8C%E8%B8%8F%E4%B8%8A%E8%BF%99%E6%AE%B5%E5%94%AF%E7%BE%8E%E5%92%8C%E9%A3%8E%E5%A5%87%E5%B9%BB%E4%B9%8B%E6%97%85%E3%80%82',
                'https://open.yixin.im/login',
                'http://service.weibo.com/share/share.php?c=nie&content=gb2312&source=nie&url=https%3A%2F%2Fyys.163.com%2F%3FnieShare%3D2%2Cyys%2C6&title=%E9%AD%91%E9%AD%85%E9%AD%8D%E9%AD%89%EF%BC%8C%E5%92%8C%E9%A3%8E%E5%86%99%E6%84%8F%EF%BC%8C%E4%BB%A5%E9%98%B4%E9%98%B3%E5%B8%88%E4%B9%8B%E5%90%8D%E8%A1%8C%E8%B5%B0%E4%BA%8E%E4%BA%BA%E9%AC%BC%E4%B8%A4%E7%95%8C%E4%B9%8B%E9%97%B4......%E6%9D%A5%E5%90%A7%EF%BC%8C%E4%B8%8E%E6%88%91%E4%BB%AC%E4%B8%80%E5%90%8C%E8%B8%8F%E4%B8%8A%E8%BF%99%E6%AE%B5%E5%94%AF%E7%BE%8E%E5%92%8C%E9%A3%8E%E5%A5%87%E5%B9%BB%E4%B9%8B%E6%97%85%E3%80%82&pic=https%3A%2F%2Fyys.res.netease.com%2Fpc%2Fgw%2F20160929201016%2Fimg%2Fshare_d524193.jpg#_loginLayer_1498220844519',
                'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https%3A%2F%2Fyys.163.com%2F%3FnieShare%3D1%2Cyys%2C6&title=%E9%AD%91%E9%AD%85%E9%AD%8D%E9%AD%89%EF%BC%8C%E5%92%8C%E9%A3%8E%E5%86%99%E6%84%8F%EF%BC%8C%E4%BB%A5%E9%98%B4%E9%98%B3%E5%B8%88%E4%B9%8B%E5%90%8D%E8%A1%8C%E8%B5%B0%E4%BA%8E%E4%BA%BA%E9%AC%BC%E4%B8%A4%E7%95%8C%E4%B9%8B%E9%97%B4......%E6%9D%A5%E5%90%A7%EF%BC%8C%E4%B8%8E%E6%88%91%E4%BB%AC%E4%B8%80%E5%90%8C%E8%B8%8F%E4%B8%8A%E8%BF%99%E6%AE%B5%E5%94%AF%E7%BE%8E%E5%92%8C%E9%A3%8E%E5%A5%87%E5%B9%BB%E4%B9%8B%E6%97%85%E3%80%82&pics=https%3A%2F%2Fyys.res.netease.com%2Fpc%2Fgw%2F20160929201016%2Fimg%2Fshare_d524193.jpg&desc=%E9%AD%91%E9%AD%85%E9%AD%8D%E9%AD%89%EF%BC%8C%E5%92%8C%E9%A3%8E%E5%86%99%E6%84%8F%EF%BC%8C%E4%BB%A5%E9%98%B4%E9%98%B3%E5%B8%88%E4%B9%8B%E5%90%8D%E8%A1%8C%E8%B5%B0%E4%BA%8E%E4%BA%BA%E9%AC%BC%E4%B8%A4%E7%95%8C%E4%B9%8B%E9%97%B4......%E6%9D%A5%E5%90%A7%EF%BC%8C%E4%B8%8E%E6%88%91%E4%BB%AC%E4%B8%80%E5%90%8C%E8%B8%8F%E4%B8%8A%E8%BF%99%E6%AE%B5%E5%94%AF%E7%BE%8E%E5%92%8C%E9%A3%8E%E5%A5%87%E5%B9%BB%E4%B9%8B%E6%97%85%E3%80%82',
            ];
            var $share = $warp2.find('.foot_warp .public_bottom .public_share ul li');
            $share.click(function(){
                window.open($href[$(this).index()-1],'','width=589,height=666,left=400');
            });

            //到达指定高度才出现title
            var $page = $warp2.find('.foot_warp .page'),
                $title = $page.find('.main_content .title'),
                $font = $page.find('.main_content .container .font'),
                $bar = $page.find('.main_content .container .bar');

            var $height = $page.offset().top;

            $(document).scroll(function(){
                if($(this).scrollTop()+$(window).height()/2>$height){
                    $title.removeClass('hide');
                    $font.removeClass('hide');
                    $bar.removeClass('hide');
                }
            });
        })();
    })();

})();