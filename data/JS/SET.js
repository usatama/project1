/**
 * SET.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *  load
 *      key : 設定するキー @err
 *      val : 設定する値 @err
 *  read
 *      key <eval>
 *      val <eval>
 *  exec : enable
 * 
 */

function SET(){

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
			key       : colData[1] ,
			val       : colData[2]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.SET(playList.key, 
				 playList.val);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.SET = function(key, val) {

		//key = evalTxt(key);
		//val = evalTxt(val);
		
		if(isFinite(val)){
			oVal[key] = Number(val);
		} else {
			oVal[key] = val;
		}
	}

	// END -------------------------------------------
}
