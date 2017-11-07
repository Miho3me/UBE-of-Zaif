$(function(){
  if($.cookie("alert_1_2_3") != undefined){
    $.removeCookie("alert_1_2_3");
  }
  //アップデート通知
  $("#header_message").append(`<div id="alert_1_2_4" class="alert alert-success alert-dismissible unread-message" role="alert" style="">
     <button type="button" class="close notifi-hide" data-dismiss="alert" aria-label="Close">
       <span update-notification="true" class="notifi-hide dombutton">×</span>
    </button>
    <div class="pc-alert">
      Notification by <a href="https://chrome.google.com/webstore/detail/zaif-user-blocker/kgdejpebaddomogpemcjnajnmiedjpcf" target="_blank">User-Blocker</a>&<a href="https://chrome.google.com/webstore/detail/zaif-tweaker/ojmmmmbolgbdhhkkdgdclgbekopjlgec" target="_blank">Zaif-Tweaker</a>
      <br>2017/11/7 この通知が消えない不具合を現verで修正しました(´・ω・｀)ご迷惑をおかけしました。。。
      <br>あ、それと、Zaifで取り扱ってる主要通貨の価格の一覧を表示する拡張機能をつくりましたのでお使いください。→<a href="https://chrome.google.com/webstore/detail/widgetzaif/igoecdicmkohhcfjonhfidhkdjhhcgae">コチラ(別タブで開きます)</a>
      <br>雑に作ったつもりですが、意外と便利ですw
    </div>
  </div>`);
  if($.cookie('alert_1_2_4') === 'closed'){
      $('#alert_1_2_4').hide();
      console.log("hide")
  } else {
      $('#alert_1_2_4').show();
      console.log("show")
  };
})
