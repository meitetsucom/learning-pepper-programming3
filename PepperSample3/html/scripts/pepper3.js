var session;

// 50音キーボードの生成
function init() {
	var arr = [
		['あ', 'い', 'う', 'え', 'お'],
		['か', 'き', 'く', 'け', 'こ'],
		['さ', 'し', 'す', 'せ', 'そ'],
		['た', 'ち', 'つ', 'て', 'と'],
		['な', 'に', 'ぬ', 'ね', 'の'],
		['は', 'ひ', 'ふ', 'へ', 'ほ'],
		['ま', 'み', 'む', 'め', 'も'],
		['や', 'ゆ', 'よ', '', ''],
		['ら', 'り', 'る', 'れ', 'ろ'],
		['わ', 'を', 'ん', '', '']
	];
	var count = 0;
	for (i=0; i<10; i++) {
		for (j=0; j<5; j++) {
			if (arr[i][j] != '') {
				var element = document.createElement('BUTTON');
				element.id = count;
				element.className = 'moji';
				element.innerHTML = arr[i][j];
				element.value = arr[i][j];

				var objBody = document.getElementsByTagName('div').item(0);
				objBody.appendChild(element);
				count++;
			}
		}
	document.getElementById('keyboard').innerHTML += '<br />';
	}
	startSubscribe();
	kanaBtn();
}

// 監視を開始
function startSubscribe() {
	QiSession(function(_session) {
		session = _session;
		session.service('ALMemory').then(function (ALMemory) {
			// 名前の送信をキャッチ
			ALMemory.subscriber('Sample3/result').then(function(subscriber) {
				subscriber.signal.connect(resultShow);
			});
		});
	}, null);
}

// タッチイベント処理
function kanaBtn() {
	for (i=0; i<46; i++) {
		$('#' + i).bind('touchstart', function() {
			onKana(this.value);
		});
	}
}

// 50音押下処理
function onKana(val) {
	// 取り消しボタンの表示
	document.getElementById('cancel').style.display = 'block';

	// 文字数チェック
	var len = document.getElementById('name').innerHTML.length;

	if (len >= 5) { // 既に5桁以上入力
		alert('５文字までしか入力できません。');
	} else { // 5桁以内入力
		document.getElementById('name').innerHTML += val;
	}
}

// 名前をPepper側へ引き渡す
function insertName() {
	// 文字数チェック
	var len = document.getElementById('name').innerHTML.length;

	if (len == 0) {
		alert('名前を入力してください。');
	} else {
		// 入力した名前をセット
		var name = document.getElementById('name').innerHTML;

		// ボタンの非表示
		document.getElementById('cancel').style.display = 'none';

		// 値の初期化
		document.getElementById('name').innerHTML = '';

		// Pepper側に名前を渡す
		session.service('ALMemory').then(function (ALMemory) {
			ALMemory.raiseEvent('Sample3/insertName', name);
		});
	}
}

// 挿入結果を表示する
function resultShow(val) {
	if (val == 'OK') {
		alert('挿入が成功しました！');
	} else {
		alert('挿入に失敗しました...');
	}
}

// 番号取り消し処理
function delName() {
	// ボタンの非表示
	document.getElementById('cancel').style.display = 'none';

	// 値の初期化
	document.getElementById('name').innerHTML = '';
}
