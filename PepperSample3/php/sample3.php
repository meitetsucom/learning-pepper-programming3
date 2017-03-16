<?php
/*
 * nameを挿入する
 *
 */
$link = mysqli_connect('localhost', 'testuser', 'testuser', 'sample');
// UTF8設定
mysqli_set_charset($link, 'utf8');

// プリペアドステートメントを作成
$stmt = mysqli_prepare($link, 'INSERT INTO userinfo (name) VALUES (?)');
$obj = json_decode(file_get_contents('php://input'));
// パラメータをバインド
mysqli_stmt_bind_param($stmt, 's', $obj['name']);

// クエリを実行
mysqli_stmt_execute($stmt);
// 結果を格納
$rslt = mysqli_stmt_get_result($stmt);

if ($rslt) { // INSERT に成功した場合
    $result = [
        "result" => "OK"
    ];
    // 結果セットを閉じる
    mysqli_free_result($rslt);
    // ステートメントを閉じる
    mysqli_stmt_close($stmt);
    // 接続を閉じる
    mysqli_close($link);
} else { // INSERT に失敗した場合
    $result = [
        "result" => "NG"
    ];
}

header('Content-Type: application/json; charset=utf-8');
file_put_contents('php://output', json_encode($result));
