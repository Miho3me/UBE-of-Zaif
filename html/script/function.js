//========================================NG関連=============================================//
function ADD_BUTTON(e){
  processing = "on"
  if(e == "default"){
    $("#cc_area .media-heading").append('<button class="ng-button">NG</button>');
  }else if(e == "last"){
    $("#cc_area .media-heading").last().append("<button class='ng-button'>NG</button>");
  }
  processing = "off"
}

function ALL_HIDE(){
  chrome.runtime.sendMessage({method:"getallItem"} ,function(response){
    for(key in response.data){
      if($(`[id^=${response.data[key]}]`).length){
        $(`[id^=${response.data[key]}]`).remove();
      }
    }
  })
}

function USER_HIDE(){
  chrome.runtime.sendMessage({method:"getallItem"},function(response){
    for(key in response.data){
      if($(`[id^=${response.data[key]}]`).length){
        let message = $(`[id^=${response.data[key]}]`).find(".content").text()
        $(`[id^=${response.data[key]}]`).remove();
        console.log(`NG対象ユーザー:${key} ID:${response.data[key]}が\n「${message}」と発言しました`);
      }
    }
  })
}

function NG_INPUT(username,userid){
  username = prompt("NGユーザーに追加するユーザーの名前",username);
  userid = prompt("NGユーザーに追加するユーザーのID",userid);
  let confirm_var = confirm(`名前:${username}\nユーザーID:${userid}\nをNGユーザーに追加しますか？`);
  if(confirm_var != false){
    if(username.length != 0 && userid.length == 40){
      chrome.runtime.sendMessage({method: "setItem",key:username ,value:userid });
      $(`[id^=${userid}]`).remove();
      alert(`名前:${username}\nユーザーID:${userid}を追加しました`);
      chrome.runtime.sendMessage({method: "getLength"}, function(response){
          console.log("現在のNGユーザー数:"+response.data);
      })
    }
  }
}

//========================================NG関連=============================================//
//===開発者===//

function developer(){
  processing = "on"
  userid = $("#cc_area .media-heading").last().find("span").attr("title")
  if(userid === developer_id && !($(`[id^=${developer_id}]`).last().hasClass("developer"))){
    $(`[id^=${developer_id}]`).last().addClass("developer own");
    $(`[id^=${developer_id}]`).last().find(".nickname").append("<span style='color:red'>[NG開発者]</span>")
  }
  processing = "off"
}
//===開発者===//
