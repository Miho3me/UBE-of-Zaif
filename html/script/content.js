let count,developer_id,userid,username,message,procesing,click

count = 1
processing = "off"
developer_id = "3be265a8a31ae64ccca66339b284f45b8e6e9300"

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
          USER_HIDE(userid);
          if(!($("#cc_area .media-heading").last().find(".ng-button").length)){
            ADD_BUTTON("last");
          }
          break;
        default:
          count++;
          break;
      }
      processing = "on"
      userid = $("#cc_area .media-heading").last().find("span").attr("title")
      developer(userid)
      processing = "off"
    }
  }),
  $(document).on("click","button",function(){
    click = $(this).attr("class")
    if(click == "ng-button"){
      userid = $(this).parent().find("span").attr("title")
      username = $(this).parent().find("span").text()
      NG_INPUT(username,userid)
    }else if(click == "Notification-Ex"){
      //ヘッダーの通知
      $.cookie('alert_1_2_1', 'closed', { path: '/', expires: 1800 });
    }
  })
})
