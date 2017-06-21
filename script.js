let data = [];
let count = 0;

$(function(){
    //
  $(".chat-btn").append("<button class='ng_btn'>NG追加</button>");
  $(".chat-btn").append("<button class='ng_view'>ON/OFF</button>");

  $(".ng_btn").click(function(){
    let ng_user_name = window.prompt("NGユーザーに追加するユーザーの名前を入力してください");
    let ng_user_id = window.prompt("NGユーザーに追加するIDを入力してください");
    //ユーザーIDは必ず40文字
    if(ng_user_id.length != 40){
      alert("ユーザーIDが間違っているかもしれません");
    }else{
      let kakunin = confirm("名前:"+ng_user_name+"\nユーザーID:"+ng_user_id+"\nをNGユーザーに追加しますか？");
      if(kakunin == true){
        data.push({name:ng_user_name,user_id:ng_user_id});
        //json形式でdataに送る
        localStorage.setItem('json', JSON.stringify(data));
        alert("名前:"+ng_user_name+"\nユーザーID:"+ng_user_id+"を追加しました");
      }else{
        alert("キャンセルしました");
      }
    }
  }),
  //コピペコードごめんなさい><
  $(".ng_view").click(function(){
    var data = localStorage.getItem('json');
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].user_id);
    }
  }),
  //チャットボックスが変更されたら実行
  $("document").ready(function(){
    $("#cc_area").on("DOMSubtreeModified propertychange",function(){
      count++;
      //チャットボックスはデフォルトで80個のチャットを表示するから重くならないために
      if(count <= 79){
        //重スギィ！
        console.log(count);
      }else if(count == 80){
        var data = localStorage.getItem('json');
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
          //非表示リストdataに入ってるユーザーを非表示
          $(`[id^=${data[i].user_id}]`).hide();
        }
      }else{
        var data = localStorage.getItem('json');
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
          //非表示リストdataに入ってるユーザーを非表示
          $(`[id^=${data[i].user_id}]`).hide();
          //監視用にコンソールで確認できるようにする
          console.log(`名前:${data[i].name} ID:${data[i].user_id}が発言`);
        }
      }
    })
  })
})
