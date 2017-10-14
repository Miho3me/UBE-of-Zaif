$(function(){
  if($.cookie("alert_1_2_1") != undefined){
    $.removeCookie("alert_1_2_1");
  }
  //アップデート通知
  $("#header_message").append(`<div id="alert_1_2_2" class="alert alert-success alert-dismissible unread-message" role="alert" style="">
    <button type="button" class="close notifi-hide" data-dismiss="alert" aria-label="Close">
      <span update-notification="true" class="notifi-hide dombutton">×</span>
    </button>
    <div class="pc-alert">
      Notification by <a href="https://chrome.google.com/webstore/detail/zaif-user-blocker/kgdejpebaddomogpemcjnajnmiedjpcf" target="_blank">User-Blocker</a>&<a href="https://chrome.google.com/webstore/detail/zaif-tweaker/ojmmmmbolgbdhhkkdgdclgbekopjlgec" target="_blank">Zaif-Tweaker</a>
      <br>2017/10/14 v1.2.2へアップデートを行いました。update履歴からご確認ください。<br>価格一覧を表示するウィジェット的な拡張機能を製作中です。<span style="font-size:xx-small">寄付してくださるとモチベーションになります。。。(小声)</span>
    </div>
  </div>`);
  if($.cookie('alert_1_2_2') === 'closed'){
      $('#alert_1_2_2').hide();
      console.log("hide")
  } else {
      $('#alert_1_2_2').show();
      console.log("show")
  };
})
