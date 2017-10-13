$(function(){
  $("#menu-button button").click(function(){
    $("#menu-button").hide();
    let click_id = $(this).attr("id");
    switch (click_id){
      case "NG-List":
        //NGリストを描画
        for(key in localStorage){
          $("#NG-List-tab").append(`<div id=${key} class="border">名前:${key} <button class=delete-button>削除</button><br>ユーザーID:${localStorage[key]}</div>`);
        }
        $("#NG-List-tab").show();
        if(localStorage.length == 0){
          //NGユーザーはいません
          $("#NG-List-tab").append("<div>NGユーザーはいません</div>")
        }
        break;
      case "donate":
        $("#donate-tab").show();
        break;
      case "update":
        $("#update-tab").show();
      default:
        break;
    }
  }),
  //NGリスト横の削除ボタンで発動
  $(document).on("click",".delete-button",function(){
    let remove_us = $(this).parent().attr("id");
    localStorage.removeItem(`${remove_us}`);
    $(this).parent().remove();
    $("#NG-List-tab").append("<div>削除後はページ更新を行わないと削除結果が反映されません</div>");
  })
})
