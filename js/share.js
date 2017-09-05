// SNSの各種カウントを実装するためのjavascript。
// jqueryとgoogleアナリティクスのロード完了が前提のコードなので注意。
/**
 * SNSシェアボタンを指定された要素の下に埋め込む
 * @param shareUrl シェアするUrl。og:shareUrlの値と一緒にすることをオススメ
 * @param description ツイート本文などに埋め込む文言
 */
//function setSnsShare(shareUrl, description) {
//    // 都合に合わせてセレクタは変えてね！
//    setTwitterLink(".twitter_back a", shareUrl, description);
//    setFacebookLink(".facebook_back a", "http://www.ashinaga.org", "親をなくした子どもに進学を");
//    setGooglePlusLink(".google_back a", shareUrl, description);
//    setHatebuLink(".hatena_back a", shareUrl, description);
//    setLineLink(".line_back a", shareUrl, description);
//}
//
//
//function setTwitterLink(shareSelector, shareUrl, description) {
//    $(shareSelector).attr("href", "https://twitter.com/share?shareUrl=" + shareUrl + "&text=" + encodeURIComponent(description));
//    setShareEvent(shareSelector, 'Twitter', shareUrl);
//}
//
//function setFacebookLink(shareSelector, shareUrl, description) {
//    $(shareSelector).attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl + "&t=" + encodeURIComponent(description));
//    setShareEvent(shareSelector, 'Facebook', shareUrl);
//}
//
//function setGooglePlusLink(shareSelector, shareUrl, description) {
//    $(shareSelector).attr("href", "https://plus.google.com/share?shareUrl=" + shareUrl);
//    setShareEvent(shareSelector, 'Google+', shareUrl);
//}
//
//function setHatebuLink(shareSelector, shareUrl, description) {
//    $(shareSelector).attr("href", "https://b.hatena.ne.jp/add?mode=confirm&shareUrl=" + shareUrl + "&description=" + encodeURIComponent(description));
//    setShareEvent(shareSelector, 'Hatena Bookmark', shareUrl);
//}
//
//function setLineLink(shareSelector, shareUrl, description) {
//    $(shareSelector).attr("href", "http://line.me/R/msg/text/?" + encodeURIComponent(description + " " + shareUrl));
//    setShareEvent(shareSelector, 'LINE', shareUrl);
//}

/**
 *  シェアボタン押下時にGoogleアナリティクスへイベントを送信する
 *  @param selector イベントを付与するセレクタ
 *  @param snsName SNSの名前（Googleアナリティクス上の表示に使われる）
 *  @param shareUrl シェア対象のURL（Googleアナリティクス上の表示に使われる）
 */
////function setShareEvent(selector, snsName, shareUrl) {
//    $(selector).on('click', function (e) {
//        var current = this;
//        //　*** Googleアナリティクスにイベント送らないなら、以下のコードは不要 ***
//        // 'share'の文字列は任意に変えてもよい（Googleアナリティクス上の表示文字列として使われる）
//        // 'nonInteraction' : 1にしないと、直帰率がおかしくなる（イベント発行したユーザーは直帰扱いでなくなる）ので注意
//        ga('send', 'social', snsName, 'share', shareUrl, {
//            'nonInteraction': 1
//        });
//        // *** Googleアナリティクス送信ここまで ****
//
//        // このあたりは適当に書き換えて下さい
//        window.open(current.href, '_blank', 'width=600, height=600, menubar=no, toolbar=no, scrollbars=yes');
//        e.preventDefault();
//    });
//}
$(function(){
var shareTitle = encodeURI($('title').html());
var shareUrl = encodeURI(document.URL);
$('.sns-fb a').attr("href", "http://www.facebook.com/sharer.php?u="+ shareUrl +"&t=" + shareTitle + "sharevol");
$('.sns-tw a').attr("href", "http://twitter.com/share?url="+ shareUrl + "&text=" + shareTitle + "&hashtags=sharevol");
$('.sns-gp a').attr("href", "https://plus.google.com/share?url=" + shareUrl);
//$('.sns-hatena a').attr("href", "http://b.hatena.ne.jp/add?mode=confirm&url=" + shareUrl + "&title=" + shareTitle);
$('.sns-line a').attr("href", "http://line.me/R/msg/text#sharevol/?" + shareUrl)
//("href", "https://b.hatena.ne.jp/add?mode=confirm&shareUrl=" + shareUrl + "&description=" + encodeURIComponent(description))
$('.sns a').click(function(){
window.open(this.href, "social_window","width=600,height=600,resizable=yes,scrollbars=yes,toolbar=yes");
return false;
});
});

$(function() {
    var winWidth = $('body').outerWidth(true);
    var footer = $('#footer');
    var slide = $('#slide');
    //画面下位置を取得
    var bottomPos = $(document).height() - $(window).height() -500;
    var showFlug = false;
 
    // ウィンドウより小さかったら開く
    panelOpen();
    //slideを画面右外へ配置
    $('#slide').css('margin-left', winWidth+'px');
    $(window).scroll(function () {
        panelOpen();
    });
    //閉じるボタン
    $('#close').click(function(){
        footer.hide();
    });
    //ウィンドウリサイズしたらwidth変更
    $(window).resize(function(){
        winWidth = $('body').outerWidth(true);
        bottomPos = $(document).height() - $(window).height() - 500;
    });
 
    function panelOpen() {
        if ($(this).scrollTop() >= bottomPos) {
            if (showFlug == false) {
                showFlug = true;
                slide.stop().animate({'marginLeft' : '0px'}, 200);
            }
        } else {
            if (showFlug) {
                showFlug = false;
                slide.stop().animate({'marginLeft' : winWidth+'px'}, 200);
            }
        }
    }
});