/**
 * SPK.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 !!!!!!!!セーブロード未実装
 */

function SPK(){

	// 内部変数の宣言 --------------------------------
	var oSpeech;
	var voices;
	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		this.oSpeech = new SpeechSynthesisUtterance();
		this.voices = window.speechSynthesis.getVoices();

		// 0   Google US English en-US 
		// 1   Google UK English Male en-GB 
		// 2   Google UK English Female en-GB 
		// 3   Google Español es-ES 
		// 4   Google Français fr-FR 
		// 5   Google Italiano it-IT 
		// 6   Google Deutsch de-DE 
		// 7   Google 日本人 ja-JP 
		// 8   Google 한국의 ko-KR 
		// 9   Google 中国的 zh-CN 
		// 10  Alex en-US 
		// 11  Agnes en-US 
		// 12  Albert en-US 
		// 13  Bad News en-US 
		// 14  Bahh en-US 
		// 15  Bells en-US 
		// 16  Boing en-US 
		// 17  Bruce en-US 
		// 18  Bubbles en-US 
		// 19  Cellos en-US 
		// 20  Deranged en-US 
		// 21  Fred en-US
		// 22  Good News en-US 
		// 23  Hysterical en-US 
		// 24  Junior en-US 
		// 25  Kathy en-US 
		// 26  Pipe Organ en-US 
		// 27  Princess en-US 
		// 28  Ralph en-US 
		// 29  Trinoids en-US 
		// 30  Vicki en-US 
		// 31  Victoria en-US 
		// 32  Whisper en-US 
		// 33  Zarvox en-US
		
		oFunc["SET"].SET("SPK_URI"    , "Google US English");
		oFunc["SET"].SET("SPK_LANG"   , "en-US");  //en-US en-GB ja-JP
		oFunc["SET"].SET("SPK_VOLUME" , "1.0");  // 0.0 - 1.0
		oFunc["SET"].SET("SPK_RATE"   , "1.0");  // 0.1 - 2.0
		oFunc["SET"].SET("SPK_PITCH"  , "2.0");  // 0.0 - 2.0
	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0],
			txt       : colData[1]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.SPK(playList.txt);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}
	
	//------------------------------------------------
	//------------------------------------------------
	this.SPK = function(txt) {
//一度キャンセル
		window.speechSynthesis.cancel();
		this.oSpeech = new SpeechSynthesisUtterance();
//		alert(voices[0].name);
//		alert(voices[1].name);
//		alert(voices[2].name);

		this.oSpeech.voice    = this.voices[oFunc["GET"].GET("SPK_URI")];
//		this.oSpeech.voice    = oFunc["GET"].GET("SPK_URI");
		this.oSpeech.lang     = oFunc["GET"].GET("SPK_LANG");
		this.oSpeech.volume   = oFunc["GET"].GET("SPK_VOLUME");
		this.oSpeech.rate     = oFunc["GET"].GET("SPK_RATE");
		this.oSpeech.pitch    = oFunc["GET"].GET("SPK_PITCH");
//		this.oSpeech.onend = function(e) {};
		this.oSpeech.text = txt;
		window.speechSynthesis.speak(this.oSpeech);
		
//speechSynthesis.speak()
//    セットされた文字列を読み上げる 
//speechSynthesis.pause()
//    再生中の音声を一時停止する 
//speechSynthesis.resume()
//    一時停止された音声を再開する 
//speechSynthesis.cancel()
//    再生中の音声を停止する 
//speechSynthesis.getVoices() 
//音声の種類一覧を取得する 
	}
	// END -------------------------------------------
}
