//読み込んだ時にデフォルトで表示されるチャットの数を検証するためのcount//読み込んだ時にデフォルトで表示されるチャットの数//読み込んだ時にデフォルトで表示されるチャットの数を検証するためのcount
let count = 1;
//無限ループ回避用に変数を使う
let processing = "off";
//通知音
let notification_audio = new Audio("https://github.com/Miho3me/audio-library/raw/master/zaif_notification.wav");

$(function(){
  if($.cookie("alert_1_1_9") != undefined){
    $.removeCookie("alert_1_1_9");
  }
  //アップデート通知
  $("#header_message").append(`<div id="alert_1_2_0" class="alert alert-success alert-dismissible unread-message" role="alert" style="">
    <button type="button" class="close notifi-hide" data-dismiss="alert" aria-label="Close">
      <span update-notification="true" class="notifi-hide dombutton">×</span>
    </button>
    <div class="pc-alert">
      Notification by <a href="https://chrome.google.com/webstore/detail/zaif-user-blocker/kgdejpebaddomogpemcjnajnmiedjpcf" target="_blank">User-Blocker</a>&<a href="https://chrome.google.com/webstore/detail/zaif-tweaker/ojmmmmbolgbdhhkkdgdclgbekopjlgec" target="_blank">Zaif-Tweaker</a>
      <br>それぞれアップデートを行いましたので、各拡張機能のupdate履歴から変更点をご確認ください。
    </div>
  </div>`);
  if($.cookie('alert_1_2_0') === 'closed'){
      $('#alert_1_2_0').hide();
      console.log("hide")
  } else {
      $('#alert_1_2_0').show();
      console.log("show")
  };
  //ここまで
  $("#cc_area").on("DOMNodeInserted",function(){
    if(processing == "off"){
      switch(count){
        case 80:
          chrome.runtime.sendMessage({method: "getLength"}, function(response){
            console.log("NGユーザーに追加している数:"+response.data)
          })
          chrome.runtime.sendMessage({method:"getallItem"},function(response){
            for(key in response.data){
              if($(`[id^=${response.data[key]}]`).length){
                $(`[id^=${response.data[key]}]`).remove();
              }
            }
          })
          console.log("読み込み完了");
          count++;
          processing = "on";
          $("#cc_area .media-heading").append("<button class='user-ng-button'>NG</button>");
          processing = "off";
          break;

        case 81:
          chrome.runtime.sendMessage({method:"getallItem"},function(response){
            for(key in response.data){
              if($(`[id^=${response.data[key]}]`).length){
                let message = $(`[id^=${response.data[key]}]`).find(".content").text()
                $(`[id^=${response.data[key]}]`).remove();
                console.log(`NG対象ユーザー:${key} ID:${response.data[key]}が\n「${message}」と発言しました`);
              }
            }
          })
          if(!($("#cc_area .media-heading").last().find(".user-ng-button").length)){
            processing = "on";
            $("#cc_area .media-heading").last().append("<button class='user-ng-button'>NG</button>");
            processing = "off";
            chrome.storage.local.get(["notification"],function(value){
              if(value.notification == "on"){
                notification_audio.pause();
                notification_audio.currentTime = 0;
                notification_audio.play();
              }
            })
          }
          break;
        default:
        //caseの範囲指定が使えないのでelse状態はcount++する
          count++;
          break;
      }
    }
  }),
  $(document).on("click","button",function(){
    if($(this).hasClass("color_set").length){
      $(this).removeClass("color_set");
      let color_set = "on"
    }else{
      let color_set = "off"
    }
    let mulbtn = $(this).attr("class");
    switch(mulbtn){
      case "user-ng-button":
      $(".list-group").off("click");
        let ng_user_name = $(this).parent().find("span").text();
        ng_user_name = prompt("NGユーザーに追加するユーザーの名前",ng_user_name);

        if(ng_user_name !== null){
          let ng_user_id = $(this).parent().find("span").attr("title");
          ng_user_id = prompt("NGユーザーに追加するユーザーのID",ng_user_id);

          if(ng_user_id !== null || ng_user_id.length === 40){
            let confirm_var = confirm(`名前:${ng_user_name}\nユーザーID:${ng_user_id}\nをNGユーザーに追加しますか？`);

            if(confirm_var === true){
              if(ng_user_name === null || ng_user_id === null){
                alert("nullが発生してるのでおかしいです。開発者までご連絡を。")
              }else{
                chrome.runtime.sendMessage({method: "setItem",key:ng_user_name ,value:ng_user_id });
                $(`[id^=${ng_user_id}]`).remove();
                alert(`名前:${ng_user_name}\nユーザーID:${ng_user_id}を追加しました`);
                chrome.runtime.sendMessage({method: "getLength"}, function(response){
                    console.log("現在のNGユーザー数:"+response.data);
                })
              }
            }
          }else{
            //ユーザーIDが規定の40文字ではない、またはnullの場合
            alert("ユーザーIDが空または不正です")
          }
        }else{
          //名前が空またはnullの場合
          alert("名前が空または不正です");
        }
      if(color_set == "on"){
        $(this).addClass("color_set");
      }
      break;
      case "notifi-hide":
        $.cookie('alert_1_2_0', 'closed', { path: '/', expires: 1800 });
        console.log("cookieにclosedを書き込み")
      break;
    }
  })
})
