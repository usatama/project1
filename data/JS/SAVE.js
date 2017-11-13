/**
 * SAVE.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function SAVE(){

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
			kind      : colData[0] ,
			mode      : colData[1]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.SAVE(playList.mode);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.SAVE = function(mode) {

		oFunc["SET"].SET("SCENENM", sSceneNm);
		oFunc["SET"].SET("PLAYCNT", oFunc["play"].getPlayCnt());

		var val="";
		for(var i in oVal){
			//セーブ時特定の変数のみに絞る＠未実装
			val = val + i + "," + oVal[i] + ",";
		}
		val = val + "<END_FILE>"
		//alert(val);
		//alert(val.length);
		//console.log(val);

		if(mode=="LOCAL"){
			localStorage.setItem( sGameNm, val );
			alert("保存しました。");
		}else if(mode=="MAIL"){
			document.location = "mailto:?subject=" + sGameNm + "_savedata&body=" + val;
		}else if(mode=="MAIL"){

		}else{
			prompt("↓全選択＋コピーしてね", val);
		}
	}

	// END -------------------------------------------
}
