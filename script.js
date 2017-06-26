//読み込んだ時にデフォルトで表示されるチャットの数を検証するためのcount
let count = 0;

$(function(){

  $(".chat-btn").append("<button class='ng_btn'>NG追加</button>");

  $(".ng_btn").click(function(){

    let ng_user_name = window.prompt("NGユーザーに追加するユーザーの名前を入力してください");
    let ng_user_id = window.prompt("NGユーザーに追加するIDを入力してください");
    //ユーザーIDは必ず40文字
    if(ng_user_id.length != 40){
      alert("ユーザーIDが間違っているかもしれません");
    }else{
      let confirm_var = confirm(`名前:${ng_user_name}\nユーザーID:${ng_user_id}\nをNGユーザーに追加しますか？`);
      if(confirm_var == true){
        chrome.runtime.sendMessage({method: "setItem",key:ng_user_name ,value:ng_user_id });//background.jsにレスポンスを要求

        $(`[id^=${ng_user_id}]`).remove();
        alert(`名前:${ng_user_name}\nユーザーID:${ng_user_id}を追加しました`);

        chrome.runtime.sendMessage({method: "getLength"}, function(response){
            console.log("現在のNGユーザー数:"+response.data);
        })
      }else{
        alert("キャンセルしました");
      }
    }
  }),
  //チャットボックスが変更されたら実行
  $("document").ready(function(){
    $("#cc_area").on("DOMSubtreeModified propertychange",function(){
      //79で寸止め
      if(count <= 79){
        count++;
        //チャットボックスはデフォルトで80個のチャットを表示するから重くならないために
        if(count == 80){
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
          count++;
          console.log("正常に読み込みました");
        }
      }else if(count == 81){
        chrome.runtime.sendMessage({method:"getallItem"},function(response){
          for(key in response.data){
            if($(`[id^=${response.data[key]}]`).length){
              $(`[id^=${response.data[key]}]`).remove();
              console.log(`NG発動\n対象ユーザー:${key} ID:${response.data[key]}が発言しました`);
            }
          }
        })
      }
    })
  })
})
