/**
 * EXEJ.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      prog <eval>  : JS文字列
 *  exec : enable
 * 
 */

function EXEJ(){

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

		var prog = "";
		for(var i=1; i< colData.length; i++){
			if(i == 1){ prog = colData[i]; continue;}
			if(!isBlk(colData[i])){ prog = prog + "," + blk(colData[i],"");}
		}

		var playList = {
			kind      : colData[0] ,
			prog      : prog
		}
		
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.EXEJ(playList.prog);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}


	//------------------------------------------------
	// EXEJによる呼び出し処理
	//------------------------------------------------
	this.EXEJ = function(txt) {

		//console.debug(' EXEJ ' + func + ' stt ( ' + txt + ' )');
		//alert(txt);
		var rtn = evalJs(txt);
		//console.debug(' EXEJ ' + func + ' end ( ' + rtn + ' )');
		//alert(rtn);
		return rtn;
	}
	// END -------------------------------------------
}
