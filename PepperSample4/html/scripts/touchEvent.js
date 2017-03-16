$(function() {
	// 送信ボタン押下
	$('#send').bind('touchstart', function() {
		timeCheckStart();
	});

	// 取り消しイメージ押下
	$('#cancel').bind('touchstart', function() {
		delNo();
	});
});
