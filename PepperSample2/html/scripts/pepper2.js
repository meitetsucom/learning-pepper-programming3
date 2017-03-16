var session;

// QiSessionオブジェクトの作成
function qisession() {
	QiSession(function(_session) {
		session = _session;
	}, null);
}

// 50音キーボード
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
			// 文字列が空の場合はボタンを生成しない
			if (arr[i][j] != '') {
				// 文字ボタンの生成
				var element = document.createElement('BUTTON');
				element.id = count;
				element.className = 'moji';
				element.innerHTML = arr[i][j];
				element.value = arr[i][j];

				// ボタンをdiv内に追加していく
				var objBody = document.getElementsByTagName('div').item(0);
				objBody.appendChild(element);
				count++;
			}
		}
	document.getElementById('keyboard').innerHTML += '<br />';
	}
	qisession();
	kanaBtn();
}

// タッチイベント処理の生成
function kanaBtn() {
	for (i=0; i<46; i++) {
		$('#' + i).bind('touchstart', function() {
		onKana(this.value);
		});
	}
}

function toTab() {
// 文字数チェック
	var len = document.getElementById('name').innerHTML.length;

	if(len == 0) {
		alert('名前を入力してください。');
	} else {
		// ボタンの非表示
		document.getElementById('cancel').style.display = 'none';

		// JSONにする文字列を作成
		var jsonText = '{"name":"' + document.getElementById('name').innerHTML + '"}';
		// 作成したJSON文字列をiPadに送信
		session.service('ALMemory').then(function(ALMemory) {
			ALMemory.raiseEvent('userName/ToPepper', jsonText);
		});

		// 値の初期化
		document.getElementById('name').innerHTML = '';
	}
}

// 50音押下処理
function onKana(val) {
	// 取り消しボタンの表示
	document.getElementById('cancel').style.display = 'block';

	// 文字数チェック
	var len = document.getElementById('name').innerHTML.length;

	if(len >= 5) { // 既に5桁以上入力
		alert('５文字までしか入力できません。');
	} else { // 5桁以内入力
		document.getElementById('name').innerHTML += val;
	}
}

// 取り消し処理
function delName() {
	// ボタンの非表示
	document.getElementById('cancel').style.display = 'none';

	// 値の初期化
	document.getElementById('name').innerHTML = '';
}
