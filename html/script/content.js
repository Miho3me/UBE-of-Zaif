let count,developer_last,userid,username,message,procesing,click

count = 1
processing = "off"
const developer_id = "3be265a8a31ae64ccca66339b284f45b8e6e9300"

$(function(){
  $("#cc_area").on("DOMNodeInserted",function(){
    if(processing == "off"){
      switch(count){
        case 80:
          ALL_HIDE();
          ADD_BUTTON("default");
          count++;
          break;
        case 81:
          userid = $("#cc_area .media-heading").last().find("span").attr("title")
          USER_HIDE();
          if(!($("#cc_area .media-heading").last().find(".ng-button").length)){
            ADD_BUTTON("last");
          }
          break;
        default:
          count++;
          break;
      }
      developer()
    }
  }),
  $(document).on("click","button",function(){
    click = $(this).attr("class")
    console.log(click)
    if(click == "ng-button"){
      userid = $(this).parent().find("span").attr("title")
      username = $(this).parent().find("span").text()
      NG_INPUT(username,userid)
    }else if(click == "close notifi-hide"){
      //ヘッダーの通知
      console.log("hide")
      $.cookie('alert_1_2_4', 'closed', { path: '/', expires: 1800 });
    }
  })
})
