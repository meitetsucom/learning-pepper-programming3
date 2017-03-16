$(function() {
	// 送信ボタン押下
	$('#send').bind('touchstart', function() {
		insertName();
	});

	// キャンセルイメージ押下
	$('#cancel').bind('touchstart', function() {
		delName();
	});
});
