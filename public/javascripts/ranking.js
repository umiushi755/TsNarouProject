$(document).on('change', '.category_tab', function(){
  let stringValue = this.value;
  let string="";
  if(stringValue == 0){
    string="総合";
  }else if(stringValue == 1){
    string="恋愛";
  }else if(stringValue == 2){
    string="ファンタジー";
  }else if(stringValue == 3){
    string="文芸";
  }else if(stringValue == 4){
    string="SF";
  }else if(stringValue == 99){
    string="その他";
  }else if(stringValue == 98){
    string="ノンジャンル";
  }
  window.location.href = '/ranking/cotegry/'+string;
  return;
});
$(document).on('change', '.genre_tab', function(){
  let stringValue = this.value;
  let string="";
  if(stringValue == 0){string="総合";
  }else if(stringValue==101){string = "異世界〔恋愛〕";
  }else if(stringValue==102){string = "現実世界〔恋愛〕";
  }else if(stringValue==201){string = "ハイファンタジー〔ファンタジー〕"
  }else if(stringValue==202){string = "ローファンタジー〔ファンタジー〕";
  }else if(stringValue==301){string = "純文学〔文芸〕";
  }else if(stringValue==302){string = "ヒューマンドラマ〔文芸〕";
  }else if(stringValue==303){string = "歴史〔文芸〕";
  }else if(stringValue==304){string = "推理〔文芸〕";
  }else if(stringValue==305){string = "ホラー〔文芸〕";
  }else if(stringValue==306){string = "アクション〔文芸〕";
  }else if(stringValue==307){string = "コメディー〔文芸〕";
  }else if(stringValue==401){string = "VRゲーム〔SF〕";
  }else if(stringValue==402){string = "宇宙〔SF〕";
  }else if(stringValue==403){string = "空想科学〔SF〕";
  }else if(stringValue==404){string = "パニック〔SF〕";
  }else if(stringValue==9901){string = "童話〔その他〕";
  }else if(stringValue==9902){string = "詩〔その他〕";
  }else if(stringValue==9903){string = "エッセイ〔その他〕";
  }else if(stringValue==9904){string = "リプレイ〔その他〕";
  }else if(stringValue==9999){string = "その他〔その他〕";
  }else if(stringValue==9801){string = "ノンジャンル〔ノンジャンル〕";
  }
  window.location.href = '/ranking/genre/'+string;
  return;
});