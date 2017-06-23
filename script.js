//読み込んだ時にデフォルトで表示されるチャットの数を検証するためのcount
let count = 0;

$(function(){
  //json追加は上書きになってしまうのでjsonを読み込み追加
  let object = localStorage.getItem('json') ? JSON.parse(localStorage.getItem('json')) : { data: []};

  $(".chat-btn").append("<button class='ng_btn'>NG追加</button>");

  //NG追加ボタンを押したら作動
  $(".ng_btn").click(function(){

    let ng_user_name = window.prompt("NGユーザーに追加するユーザーの名前を入力してください");
    let ng_user_id = window.prompt("NGユーザーに追加するIDを入力してください");
    //ユーザーIDは必ず40文字
    if(ng_user_id.length != 40){
      alert("ユーザーIDが間違っているかもしれません");
    }else{

      let kakunin = confirm(`名前:${ng_user_name}\nユーザーID:${ng_user_id}\nをNGユーザーに追加しますか？`);
      if(kakunin == true){
        object.data.push({name:ng_user_name,user_id:ng_user_id});
        //json形式でdataに送る
        localStorage.setItem('json', JSON.stringify(object));

        //NGユーザー設定を即反映させてconsoleにログを吐く
        $(`[id^=${ng_user_id}]`).remove();
        console.log(`現在のNGユーザー数:${object.data.length}`);

        alert(`名前:${ng_user_name}\nユーザーID:${ng_user_id}を追加しました`);
      }else{
        alert("キャンセルしました");
      }
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
        console.log(`NGユーザーに追加している数:${object.data.length}`);

        let data = localStorage.getItem('json');
        data = JSON.parse(data);
        for (let i = 0; i < object.data.length; i++) {

          //非表示リストdataに入ってるユーザーを非表示
          $(`[id^=${object.data[i].user_id}]`).remove();
        }
        count++;
        console.log("正常に動いてます");

      }
      let data = localStorage.getItem('json');
      data = JSON.parse(data);
      for (let i = 0; i < object.data.length; i++) {
        //エラーログ回避のためNGユーザー数が1人以上であること・cc_areaに存在するNGユーザーが非表示ではない時に発動
        if(localStorage.length != 0 && $(`[id^=${object.data[i].user_id}]`).length){

          //非表示リストdataに入ってるユーザーを非表示
          $(`[id^=${object.data[i].user_id}]`).remove();
          console.log("NG発動");
          //監視用にコンソールで確認できるようにする
          console.log(`名前:${object.data[i].name} ID:${object.data[i].user_id}が発言`);
        }
      }
    })
  })
})
