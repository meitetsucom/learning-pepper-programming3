/*
 * 共通の処理、pepperとの通信
 */

// pepperのIPアドレス
var pepperIP = 'xxx.xxx.xxx.xxx';
var session;

// 各画面ロード時実行
function init() {
	// pepper接続
	connect();
}

// Pepper接続
function connect() {
	QiSession(function(_session) {
		session = _session;
		document.getElementById('msg').innerHTML = 'connection';
		document.getElementById('msg').style.color = 'red';
		document.getElementById('byeBtn').style.display = 'block';
	}, null, pepperIP);
}

// バイバイボタン押下時処理
function byeBtn(btnName, btnVal) {
	// JSONにする文字列を作成
	var jsonText = '{"button":"' + btnName + '","say":"' + btnVal + '"}';
	pepperSay(jsonText);
}

// jsonTextデータをPepperに送信
function pepperSay(jsonText) {
	session.service('ALMemory').then(function(ALMemory) {
		ALMemory.raiseEvent('PepperSay/ToPepper', jsonText);
	});
}
