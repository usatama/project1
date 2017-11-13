/**
 * ELSEIF.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      key <eval>    : 比較するキー
 *      ope           : 比較演算子
 *      val <eval>    : 比較する値
 *  exec : disable
 * 
 */

function ELSEIF(){

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
			key1      : colData[1] ,
			ope1      : colData[2] ,
			val1      : colData[3] ,
			key2      : colData[4] ,
			ope2      : colData[5] ,
			val2      : colData[6] ,
			key3      : colData[7] ,
			ope3      : colData[8] ,
			val3      : colData[9]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.ELSEIF( playList.key1,
					 playList.ope1,
					 playList.val1,
					 playList.key2,
					 playList.ope2,
					 playList.val2,
					 playList.key3,
					 playList.ope3,
					 playList.val3);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.ELSEIF = function(key1, ope1, val1, key2, ope2, val2, key3, ope3, val3) {

		if(!oFunc["IF"].getEndIf()){
			oFunc["IF"].IFEF(key1, ope1, val1, key2, ope2, val2, key3, ope3, val3);
		}else{
			oFunc["IF"].nextIf();
		}
	}

	// END -------------------------------------------
}
