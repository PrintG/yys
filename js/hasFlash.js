function flashChecker() {
    var hasFlash = 0;         //�Ƿ�װ��flash
    var isIE = /*@cc_on!@*/0;      //�Ƿ�IE�����

    if (isIE) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            hasFlash = 1;
        }
    }else{
        if(navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) continue;
                }
            }
        }
    }
    return hasFlash;
}