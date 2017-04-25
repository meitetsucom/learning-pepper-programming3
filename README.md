# learning-pepper-programming3
## 概要
「Pepperサンプルプログラム」は、PepperとiPadとの通信やPepperとDB（サーバ）との通信を行う方法をまとめたプログラムです。

このサンプルプログラムは書籍「Pepper最新事例に学ぶロボアプリ開発 ～「ウェイティングボード」アプリに学ぶHTTP・WebSocketを使った外部デバイス連携編～」の付録として公開しております。
## 説明
### PepperSample1
PepperとiPadが通信を行い、iPadで押したボタンに応じてPepperが反応するサンプルプログラムです。
### PepperSample2
PepperとiPadが通信を行い、Pepperで入力した文字をiPadに表示するサンプルプログラムです。
### PepperSample3
PepperとDB(サーバ)が通信を行い、Pepperで入力した文字をDBへ登録するサンプルプログラムです。
### PepperSample4
PepperとDB(サーバ)が通信を行い、DBの内容が変更された時に、自動的にPepperにも反映されるサンプルプログラムです。
## インストール
### Pepper側プログラムについて
Choregraphe(Pepper開発用SDK)から、プログラムファイル（*.pml）を読み込んでPepperにインストールをしてください。
### サーバ側プログラムについて
PepperSample3 および PepperSample4 については、webサーバのドキュメントルート直下にPepperSample3(PepperSample4)フォルダを作成し、その中にそれぞれのphpフォルダを配置してください。
## 使用
使用方法の詳細については、書籍「Pepper最新事例に学ぶロボアプリ開発 ～「ウェイティングボード」アプリに学ぶHTTP・WebSocketを使った外部デバイス連携編～」を参照してください。
## ライセンス
Apache License Version 2.0
