/**
 * REC.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *			Released under the MIT license
 !!!!!!!!セーブロード未実装
 */

var oRec;
var fNowRec = 0;
function REC(){

	// 内部変数の宣言 --------------------------------

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		try{
			window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
			oRec = new webkitSpeechRecognition();
		}catch(e){
			//alert('Web Speech API には未対応です.');
			return;
		}
		oRec.continuous = true;
		oRec.interimResults = true;

		if(isBlk(oFunc["GET"].GET("REC_LANG"))){
			oFunc["SET"].SET("REC_LANG" , "en-US");  //en-US en-GB ja-JP
		}
		oRec.lang = oFunc["GET"].GET("REC_LANG");

		oRec.onresult = function (e) {
			var finalText = '';
			var interimText = '';
			for (var i = 0; i < e.results.length; i++) {
				if (e.results[i].isFinal) {
					finalText += e.results[i][0].transcript;
				} else {
					interimText += e.results[i][0].transcript;
				}
			}
			oFunc["SET"].SET("REC_TXT_FIX" , finalText);
			oFunc["SET"].SET("REC_TXT_TMP" , interimText);
		};
		
		
//		oRec.onstart = function () {
//			alert("[onstart]");
//		};
//		oRec.onaudiostart = function () {
//			alert("[onaudiostart]");
//		}
//		oRec.onsoundstart = function () {
//			alert("[onsoundstart]");
//		}
//		oRec.onspeechstart = function () {
//			alert("[onspeechstart]");
//		}
//		oRec.onspeechend = function () {
//			alert("[onspeechend]");
//		}
	//	oRec.onsoundend = function () {
	//		alert("[onsoundend]");
	//		oFunc["REC"].init();
	//	}
//		oRec.onaudioend = function () {
//			alert("[audioend]");
//		}
//		oRec.onnomatch = function () {
//			alert("[onnomatch]");
//		}
	//	oRec.onerror = function () {
	//		alert("[onerror]");
	//		if(fNowRec == 0)
	//			oFunc["REC"].init();
	//	}
		oRec.onstart = function () {
			//alert("[onstart]");
			fNowRec = 1;
			oFunc["SET"].SET("REC_NOW" , fNowRec);
		}
		oRec.onend = function () {
			//alert("[onend]");
			fNowRec = 0;
			oFunc["SET"].SET("REC_NOW" , fNowRec);
		}
		
		//fNowRec = 0;
		oRec.start();
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
			kind	  : colData[0],
			mode	  : colData[1]
		}
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.REC(playList.mode);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {

	}

	//------------------------------------------------
	//------------------------------------------------
	this.REC = function(mode) {
		if(mode == "START"){
			oFunc["REC"].init();
		} else {
			oRec.stop();
		}
	}

	// END -------------------------------------------
}
