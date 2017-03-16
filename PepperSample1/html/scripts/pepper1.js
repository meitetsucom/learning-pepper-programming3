/* Pepperのタブレット表示用js */

var session;

// ALMemoryイベント監視
function startSubscribe() {
	QiSession(function(_session) {
		session = _session;
		session.service('ALMemory').then(function(ALMemory) {
			// iPadで「バイバイ」ボタン押下時
			ALMemory.subscriber('PepperSay/ToPepper').then(function(subscriber) {
				// Pepperから受け取った値をpepperSayTextViewに渡す
				subscriber.signal.connect(pepperSayTextView);
			});
		});
	}, null);
}

// Pepperのディスプレイ表示
function pepperSayTextView(value) {
	/*
	 * value（文字列）: {"button":"bye","say":"バイバイ"}
	 */
	// 取得した値をJSON形式に変換
	var jsonData = JSON.parse(value);

	// JSON形式の値の中から、sayに紐づく値を取得
	var sayText = jsonData.say;

	// Pepperのディスプレイに話す言葉を表示
	document.getElementById('sayTextId').innerHTML = sayText;
}
