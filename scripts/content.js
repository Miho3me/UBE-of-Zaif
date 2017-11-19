const developer_id = "3be265a8a31ae64ccca66339b284f45b8e6e9300"

$(function(){
  let count;
  //指定ノードの動きを検知するためのMutationObserver
  let initial_setting = "false";
  let target = document.getElementById("cc_area");
  let observer = new MutationObserver(function(e){
    //初期設定が終わった場合
    if(initial_setting == "true"){

      if(e[0].removedNodes.length == 0){
        $("#cc_area .media-heading").last().append("<button class='ng_button'>NG</button>");
        chrome.runtime.sendMessage({method:"getallItem"},function(response){

          for(key in response.data){
            if($(`[id^=${response.data[key]}]`).length){
              let message = $(`[id^=${response.data[key]}]`).find(".content").text()
              $(`[id^=${response.data[key]}]`).remove();
              console.log(`NG対象ユーザー:${key} ID:${response.data[key]}が\n「${message}」と発言しました`);
            }
          }
        })
        //投稿にいいねが押された時、消えたNGボタンをつけ直す
      }else if(!(e[0].removedNodes.length == 0)){
        let like_message_id = e[0].removedNodes["0"]["id"]
        $(`#${like_message_id} .media-heading`).append('<button class="ng_button">NG</button>');
      }
    //チャットメッセージの初期数は80なので、80で初期設定を行う
    }else if($(".list-group-item").length == 80){
      $("#cc_area .media-heading").append('<button class="ng_button">NG</button>');
      chrome.runtime.sendMessage({method:"getallItem"} ,function(response){
        $("#cc_area .media-heading").last().find("span").attr("title")
        
        for(key in response.data){
          if($(`[id^=${response.data[key]}]`).length){
            $(`[id^=${response.data[key]}]`).remove();
          }
        }
      })
      //初期設定終了
      initial_setting = "true";
    }
  })
  let config = {attributes: true, childList: true, characterData: true};
  observer.observe(target,config);
  //ここまでMutationObserverの設定

  //ここから拡張機能が追加したボタンをクリックした時
  $(document).on("click","button",function(){
    click_button_class = $(this).attr("class")

    if(click_button_class == "ng_button"){
      let userid = $(this).parent().find("span").attr("title")
      let username = $(this).parent().find("span").text()
      username = prompt("NGユーザーに追加するユーザーの名前",username);
      userid = prompt("NGユーザーに追加するユーザーのID",userid);
      let confirm_result = confirm(`名前:${username}\nユーザーID:${userid}\nをNGユーザーに追加しますか？`);

      if(confirm_result != false){
        if(username.length != 0 && userid.length == 40){
          chrome.runtime.sendMessage({method: "setItem",key:username ,value:userid });
          $(`[id^=${userid}]`).remove();
          alert(`名前:${username}\nユーザーID:${userid}を追加しました`);
        }
      }
    }else if(click_button_class == "close update_notification"){
      $.cookie('alert_1.2.5', 'closed', { path: '/', expires: 1800 });
    }
  })
  //ここまで追加ボタンの処理
})
