/**
 * LOAD.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function LOAD(){

	// 内部変数の宣言 --------------------------------


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
		
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0],
			mode      : colData[1]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.LOAD(playList.mode);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.LOAD = function(mode) {

		var col;

		if(mode=="LOCAL"){
			col = localStorage.getItem(sGameNm);
		}else if(mode=="FILE"){
			col = oFunc["CSV"]("SAVE/save.txt");
		}else{
			col = prompt("↓ペースト＋OKしてね", "");
		}
		console.log(col);

		if(isBlk(col)){
			alert("中断情報がありません。");
		}else{
			col = col.split(",");
			oVal = new Array;
			for(var i=0;i<col.length;i+=2){
				if(col[i] == "<END_FILE>"){break;}
				oFunc["SET"].SET(col[i], col[i+1]);
			}
			sSceneNm = oFunc["GET"].GET("SCENENM");
			sLabelNm = "";
			iLoadCnt = oFunc["GET"].GET("PLAYCNT");
			sStatus  = "loadScene"
			alert("読み込みします。");
		}
	}

	// END -------------------------------------------
}
