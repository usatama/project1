■
　ブラウザをフルスクリーンで開始してくd債

■画面操作
　中央及び下部　：文字おくり
　上部　　　　　：バックログ
　上部左　　　　：セーブ
　上部右　　　　：ロード
　右部上　　　　：スキップ
　右部下　　　　：自動文字おくり
（以下はデバック用）
　左部上　　　　：ファイルの最初から
　左部下　　　　：次のラベルに移動

■対応ブラウザ
　firefoxでは動作確認済み
　Chromeは引数を渡すことで動作可能
　　例："C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files
　IEは現在対応中

■作成中個所
　テキストの最適化は途中まで
　　　CHARA.jsは使用しないため放置(ロード回数が間違ってる)
　　　SELECTは修正中
　　　画像のストリーミング呼び出し　画像のLOAD後から差し替え
　　　xml読み込みをネット対応する
　　　ドラッグ＆ドロップ
　済　文字の折り返し
　　　開業を折り返し文字と判定＋終了文字
　　　FORループ
　済　GOSUB RETURN
　済　IF ENDIF ELSE IF

以上
文字にバグあり