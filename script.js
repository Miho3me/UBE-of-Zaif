//読み込んだ時にデフォルトで表示されるチャットの数を検証するためのcount//読み込んだ時にデフォルトで表示されるチャットの数//読み込んだ時にデフォルトで表示されるチャットの数を検証するためのcount
let count = 1;
//無限ループ回避用に変数を使う
let processing = "off";
//通知音
let notification_audio = new Audio("https://github.com/Miho3me/audio-library/raw/master/zaif_notification.wav");

$(function(){
  //アップデート通知
  $("#header_message").append(`<div id="alert_114514" class="alert alert-success alert-dismissible unread-message" role="alert" style=""><button type="button" class="close notifi-hide" data-dismiss="alert" aria-label="Close"><span update-notification="true" class="notifi-hide dombutton">×</span></button><div class="pc-alert">ZaifUserBlockerのアップデート通知は現バージョンからこのような形で通知を行います。<br>よろしくおねがいします。<br>あ、あと1.1.7のリリースを行いましたが、新機能追加ではないです。</div></div>`);
  if($.cookie('alert_114514') === 'closed'){
      $('#alert_114514').hide();
      console.log("hide")
  } else {
      $('#alert_114514').show();
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
          $("#cc_area .media-heading").append("<button class='user-ng-button dombutton'>NG</button>");
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
            $("#cc_area .media-heading").last().append("<button class='user-ng-button dombutton'>NG</button>");
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
  $(document).on("click",".dombutton",function(){
    $(this).removeClass("dombutton");
    let mulbtn = $(this).attr("class");
    console.log(mulbtn)
    switch(mulbtn){
      case "user-ng-button":
        let ng_name = $(this).parent().find("span").text();
        let ng_id = $(this).parent().find("span").attr("title");
        let ng_user_name = window.prompt("NGユーザーに追加するユーザーの名前を入力してください", ng_name);
        if(ng_user_name != "" || ng_user_name != "null"){
          let ng_user_id = window.prompt("NGユーザーに追加するIDを入力してください", ng_id);
          if(ng_user_id != "" || ng_user_id != "null" || ng_user_id.length == 40){
            let confirm_var = confirm(`名前:${ng_user_name}\nユーザーID:${ng_user_id}\nをNGユーザーに追加しますか？`);
            if(confirm_var == true){
              if(ng_user_name == null || ng_user_id == null){
                  alert("nullnullしゅる〜〜〜〜wwww");
              }else{
                chrome.runtime.sendMessage({method: "setItem",key:ng_user_name ,value:ng_user_id });
                $(`[id^=${ng_user_id}]`).remove();
                alert(`名前:${ng_user_name}\nユーザーID:${ng_user_id}を追加しました`);
                chrome.runtime.sendMessage({method: "getLength"}, function(response){
                    console.log("現在のNGユーザー数:"+response.data);
                })
              }
            }
          }
        //ユーザー名が空の場合
        }else{
          alert("ユーザー名が空です");
        }
      break;
      case "notifi-hide":
        console.log("閉じたよ");
        $.cookie('alert_114514', 'closed', { path: '/', expires: 1800 });
        console.log("cookieにclosedを書き込み")
      break;
    }
  })
})
