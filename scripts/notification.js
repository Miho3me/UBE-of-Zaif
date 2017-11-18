$(function(){
  //cleanup
  if($.cookie("alert_1_2_4") != undefined){
    $.removeCookie("alert_1_2_4");
    //alert1.2.5に手を加えてない限り表示
  }else if($.cookie("alert_1.2.5") == undefined){
    //アップデート通知
    $("#header_message").append(`<div id="alert_1.2.5" class="alert alert-success alert-dismissible unread-message" role="alert" style="">
       <button type="button" class="close update_notification" data-dismiss="alert" aria-label="Close">
         <span update-notification="true" class="notifi-hide dombutton">×</span>
      </button>
      <div class="pc-alert">
        Notification by <a href="https://chrome.google.com/webstore/detail/zaif-user-blocker/kgdejpebaddomogpemcjnajnmiedjpcf" target="_blank">User-Blocker</a>&<a href="https://chrome.google.com/webstore/detail/zaif-tweaker/ojmmmmbolgbdhhkkdgdclgbekopjlgec" target="_blank">Zaif-Tweaker</a>
        <br>2017/11/18
        <br>SEO的に弱い名前だったので拡張機能の名前を改名しました。ふざけてないです。
        <br>User blockerのコードを一新し、いいねがついた際にNGボタンが消える問題を修正しました
      </div>
    </div>`);
  }
})
