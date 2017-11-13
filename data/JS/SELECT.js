/**
 * SELECT.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function XXX(){

	// 内部変数の宣言 --------------------------------
	var cnt    = 0;
	var cntMax = 10;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		
	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		cnt = 0;
		for(var i=0; i<cntMax; i++){
			oFunc["DEL"].DEL("SELECT_M"+i);
			oFunc["DEL"].DEL("SELECT_E"+i);
			oFunc["DEL"].DEL("SELECT_L"+i);
			oFunc["DEL"].DEL("SELECT_P"+i);
		}
		cntMax = 0;
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0] ,
			ope       : colData[1] ,
			msg       : colData[2] ,
			exe       : colData[3] ,
			lock      : nvl(colData[4], 0) ,
			pop       : nvl(colData[5],"")
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		switch (playList.ope) {
			case "RESET":
				this.rest();
				break;
			case "SET":
				if(cnt=>cntMax){ return }
				oFunc["SET"].SET("SELECT_M"+cnt, playList.msg);
				oFunc["SET"].SET("SELECT_E"+cnt, playList.exe);
				oFunc["SET"].SET("SELECT_L"+cnt, playList.lock);
				oFunc["SET"].SET("SELECT_P"+cnt, playList.pop);
				cnt++;
				break;
			case "EXE":
				break;
			default:
				alert("read SELECT opeエラーです:[ "+playList.ope+" ]")
				break;
		}
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	// END -------------------------------------------
}
