let counter = 0;
$(function(){
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
  $("#add-btn").click(function(){
    $("#multi-btn").hide();
    $("#add-mode").show();
  })/*,
  //各種設定
  $(document).ready(function(){
    $(".chat-notification").change(function(){
      if($(this).is(":checked")){
        chrome.runtime.sendMessage({method: "alert"});
      }
    })
  })*/
})
