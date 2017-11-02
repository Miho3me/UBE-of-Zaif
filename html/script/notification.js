$(function(){
  if($.cookie("alert_1_2_2") != undefined){
    $.removeCookie("alert_1_2_2");
  }
  //アップデート通知
  $("#header_message").append(`<div id="alert_1_2_3" class="alert alert-success alert-dismissible unread-message" role="alert" style="">
    <button type="button" class="close notifi-hide" data-dismiss="alert" aria-label="Close">
      <span update-notification="true" class="notifi-hide dombutton">×</span>
    </button>
    <div class="pc-alert">
      Notification by <a href="https://chrome.google.com/webstore/detail/zaif-user-blocker/kgdejpebaddomogpemcjnajnmiedjpcf" target="_blank">User-Blocker</a>&<a href="https://chrome.google.com/webstore/detail/zaif-tweaker/ojmmmmbolgbdhhkkdgdclgbekopjlgec" target="_blank">Zaif-Tweaker</a>
      <br>2017/11/2 v1.2.3へアップデートを行いました。update履歴からご確認ください。<br>最近忙しくてバグ修正できませんでした...
    </div>
  </div>`);
  if($.cookie('alert_1_2_3') === 'closed'){
      $('#alert_1_2_3').hide();
      console.log("hide")
  } else {
      $('#alert_1_2_3').show();
      console.log("show")
  };
})
