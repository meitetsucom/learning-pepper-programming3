var session;

// 初期化
function init() {
	startSubscribe();
	createBtn();
}

// 監視を開始
function startSubscribe() {
	QiSession(function(_session) {
		session = _session;
		session.service('ALMemory').then(function(ALMemory) {
			// 名前の送信をキャッチ
			ALMemory.subscriber('Sample4/nameData').then(function(subscriber) {
				subscriber.signal.connect(setData);
			});
		});
	}, null);
}

// 名前をPepperのディスプレイに表示
function setData(setData) {
	// 名前をセット
	document.getElementById('name').innerHTML = setData[0];

	// 残高をセット
	document.getElementById('cash').innerHTML = setData[1];
}

// 番号をPepper本体に引き渡す
function timeCheckStart() {
	// 文字数チェック
	var len = document.getElementById('selectNo').innerHTML.length;

	if (len == 0) {
		alert('値を入力してください。');
	} else{
		// 入力した番号をセット
		var no = document.getElementById('selectNo').innerHTML;

		// キャンセルボタンの非表示
		document.getElementById('cancel').style.display = 'none';

		// 値の初期化
		document.getElementById('selectNo').innerHTML = '';

		// Pepper側に番号を渡す
		session.service('ALMemory').then(function (ALMemory) {
			ALMemory.raiseEvent('Sample4/selectNo', no);
		});
	}
}

// ボタンの生成
function createBtn() {
	// HTMLに表示する文字列格納用
	var output = ' ';

	// ボタンの生成
	for (i = 1; i < 10; i++) {
		// HTML要素作成
		output += '<input type=\'button\' class=\'numBotton\' id=\''
				+ i
				+ '\''
				+ ' value='
				+ i
				+ '>';

		// 3個ごとに改行
		if ((i % 3) == 0){
			output += '<br>';
			// 9まで生成したら0ボタンを追加
			if (i == 9) {
				output += '<input type=\'button\' class=\'numBotton\' id=\''
					+ 0
					+ '\''
					+ ' value='
					+ 0
					+ '>';
			}
		}
	}
	// HTMLページに表示
	document.getElementById('num').innerHTML = output;

	// 各ボタンのタッチイベント検知開始
	for (i = 0; i < 10; i++) {
		$('#' + i).bind('touchstart', function() {
			setNo(this.id);
		});
	}
}

// 番号の選択
function setNo(id){
	// キャンセルボタンの表示
	document.getElementById('cancel').style.display = 'block';

	// 文字数チェック
	var len = document.getElementById('selectNo').innerHTML.length;

	if (len >= 3) { // 既に3桁以上入力
		alert('３桁までしか入力できません。');
	} else if (len == 0 && id == 0) { // 最初に0を入力
		// キャンセルボタンの非表示
		document.getElementById('cancel').style.display = 'none';
		alert('最初の文字に「０」は使用できません。');
	} else{ // 3桁以内入力
		document.getElementById('selectNo').innerHTML += id;
	}
}

// 取り消し処理
function delNo() {
	// キャンセルボタンの非表示
	document.getElementById('cancel').style.display = 'none';

	// 値の初期化
	document.getElementById('selectNo').innerHTML = '';
}
