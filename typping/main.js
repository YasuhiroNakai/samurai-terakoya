// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let miss = 0;
let percent = 0;
let totle = 0;

// 必要なHTMLの取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const scorefield = document.getElementById('score')
const missfield = document.getElementById('miss')

// 複数のテキストを格納する配列
const textLists =[
  'Get ready!!',
  'Hello World',
  'This is my App',
  'How are you?',
  'Thank you',
  'You welcome',
  'Are you ready?',
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
]

// ランダムなテキストを表示
const createText = () => {
  typed = '';
  typedfield.textContent = typed;

  // 配列のランダムな番号を取得
  let random = Math.floor(Math.random() * textLists.length);

  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    totle++;
  // 誤タイプの場合
  if(e.key !== untyped.substring(0,1)){
    miss++;
    missfield.textContent = 'Miss:' + miss;
    // 間違い背景を表示する
    wrap.classList.add('mistyped')
    // 一定時間が経過したら間違い背景を消去する
    setTimeout(() => {
      wrap.classList.remove('mistyped')
    }, 300)
      percent = Math.round(score / totle * 100)
      scorefield.textContent = 'Success:' + score + '(' + percent + '%)';
      return;
  }

  // 正タイプの場合
  // スコアの加算
  score++;
  percent = Math.round(score / totle * 100)
  scorefield.textContent = 'Success:' + score + '(' + percent + '%)';
  // 間違い背景を削除する
  wrap.classList.remove(('mistyped'))
  // 色なしから色ありに一文字移動する
  typed += untyped.substring(0,1);
  untyped = untyped.substring(1)
  typedfield.textContent=typed;
  untypedfield.textContent = untyped

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};
 
// タイピングスキルのランクを判定
const rankCheck = score => {
  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    let AnsRank = ranktext(score)
    text = 'あなたのランクは' + AnsRank + 'です。\n' + atherText(AnsRank,score)
  }

  return `${score}文字打てました！！\n` + text;

};

const atherText = (ansrank,score) => {
  switch(ansrank){
    case 'C':
      return `Bランクまであと${100 - score}文字です。`;
      break;
    case 'B':
      var text = `Aランクまであと${200 - score}文字です。`;
      break;
    case 'A':
      var text = `Sランクまであと${300 - score}文字です。`; 
      break;
    case 'S':
      var text = 'おめでとうございます！！';
      break;
  }
  return text
};

const ranktext = score => {
  if(score < 10){
      text = 'C';
    } else if(score < 20){
      text = 'B';
    } else if(score < 30){
      text = 'A';
    } else if(score >= 30){
      text = 'S';
    }
    return text
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);
  confirm(rankCheck(score));
  
};

// カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0 ){
      gameOver(id);
    }
  }, 1000)
};

start.addEventListener('click',() => {

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // ランダムなテキストを表示する
  createText();

  // タイマーを動かす
  timer();

  // キーボードのイベント処理（イベントとイベントリスナーの紐づけ）
  document.addEventListener('keypress',keyPress);

});

untypedfield.textContent = 'スタートボタンで開始';

