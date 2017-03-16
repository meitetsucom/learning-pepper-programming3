/*
 * 共通の処理、pepperとの通信
 */
// pepperのIPアドレス
var pepperIP = 'xxx.xxx.xxx.xxx';
var session;

// 各画面ロード時実行
function init() {
	// Pepper接続
	connect();
}

// Pepper接続
function connect() {
	QiSession(function(_session) {
		session = _session;
		document.getElementById('msg').innerHTML = 'connection';
		document.getElementById('msg').style.color = 'red';
		
		// 監視を開始
		startSubscribe();
		
	}, null, pepperIP);
}

function userNameView(value) {
	// 取得した値をJSON形式に変換
	var jsonData = JSON.parse(value);
	// JSON形式の値の中から、nameに紐づく値を取得
	var nameText = jsonData.name;
	// 入力された文字をiPadに表示
	document.getElementById('userName').innerHTML = nameText;
}

// ALMemoryイベント監視
function startSubscribe() {
	session.service('ALMemory').then(function(ALMemory) {
		ALMemory.subscriber('userName/ToPepper').then(function(subscriber) {
			// Pepperから受け取った値をuserNameViewに渡す
			subscriber.signal.connect(userNameView);
		});
	});
}
