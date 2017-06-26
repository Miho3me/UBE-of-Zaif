let counter = 0;
$(function(){
  $("#edit-btn").click(function(){
    $("#edit-btn").hide();
    for(key in localStorage){
      $("#edit-mode").append(`<div id=${key}>名前:${key} ユーザーID:${localStorage[key]}<button class=delete-button>削除</button></div>`);
      counter++;
    }
    $("#sub-title").show();
    $("#edit-mode").show();
    $("#btn-space").show();
  }),
  $(document).on("click",".delete-button",function(){
    let remove_us = $(this).parent().attr("id");
    localStorage.removeItem(`${remove_us}`)
    $(this).parent().remove();
    $("#popup-message").fadeIn();
  })
})
