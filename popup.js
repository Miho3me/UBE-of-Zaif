let counter = 0;

$(function(){
  //通知がonなら予めcheckを入れる
  chrome.storage.local.get(["notification"],function(value){
    if(value.notification == "on"){
      $(".chat-notification").prop("checked",true);
    }
  }),
  //switch文で成形
  $(".menu-button").click(function(){
    $("#multi-btn").hide();
    let click_id = $(this).attr("id");
    switch (click_id){
      case "edit-btn":
        //NGリストを描画
        for(key in localStorage){
          $("#edit-mode").append(`<div id=${key}>名前:${key}\nユーザーID:${localStorage[key]}<button class=delete-button>削除</button></div>`);
          counter++;
        }
        $("#edtmd").show();
        if(localStorage.length == 0){
          //NGユーザーはいません
          $("#not-found").show();
        }
        break;
      case "his-btn":
        $("#update-history").show();
        break;
      case "add-btn":
        $("#add-mode").show();
    }
  }),
  //NGリスト横の削除ボタンで発動
  $(document).on("click",".delete-button",function(){
    let remove_us = $(this).parent().attr("id");
    localStorage.removeItem(`${remove_us}`)
    $(this).parent().remove();
    $("#popup-message").fadeIn();
  }),
  //各種設定
  $(document).ready(function(){
    $(".chat-notification").click(function(){
      if($(this).is(":checked")){
        chrome.storage.local.set({'notification': "on"},function(){
        })
      }else{
        chrome.storage.local.set({'notification': "off"},function(){
        })
      }
    })
  })
})
