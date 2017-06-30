let counter = 0;

$(function(){
  chrome.storage.local.get(["notification"],function(value){
    if(value.notification == "on"){
      $(".chat-notification").prop("checked",true);
    }
  }),
  $("#edit-btn").click(function(){
    $("#multi-btn").hide();
    for(key in localStorage){
      $("#edit-mode").append(`<div id=${key}>名前:${key} ユーザーID:${localStorage[key]}<button class=delete-button>削除</button></div>`);
      counter++;
    }
    $("#edtmd").show();
    $("#edit-mode").show();
    $("#btn-space").show();
    if(localStorage.length == 0){
      $("#not-found").show();
    }
  }),
  $(document).on("click",".delete-button",function(){
    let remove_us = $(this).parent().attr("id");
    localStorage.removeItem(`${remove_us}`)
    $(this).parent().remove();
    $("#popup-message").fadeIn();

  }),
  $("#his-btn").click(function(){
    $("#multi-btn").hide();
    $("#update-history").show();
  }),
  $("#add-btn").click(function(){
    $("#multi-btn").hide();
    $("#add-mode").show();

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
