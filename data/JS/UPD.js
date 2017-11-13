/**
 * UPD.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      key <eval> : 更新するキー @err
 *      ope        : 更新演算子
 *      val <eval> : 更新する値 @err
 *  exec : enable
 * 
 */

function UPD(){

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
			operator  : colData[2] ,
			calcVal   : colData[3]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
			this.UPD(playList.key, 
						playList.operator, 
						playList.calcVal);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.UPD = function(key, ope ,val) {
		
		//key = evalTxt(key);
		//val = evalTxt(val);
		
		var tmpVal1 = Number(oVal[key]);
		var tmpVal2 = Number(val);
		
		switch (ope) {
			case "=":
				tmpVal1 = tmpVal2;
				break;
			case "+=":
				tmpVal1 = tmpVal1 + tmpVal2;
				break;
			case "-=":
				tmpVal1 = tmpVal1 - tmpVal2;
				break;
			case "*=":
				tmpVal1 = tmpVal1 * tmpVal2;
				break;
			case "/=":
				tmpVal1 = tmpVal1 / tmpVal2;
				break;
			case "%=":
				tmpVal1 = tmpVal1 % tmpVal2;
				break;
			default:
				alert("read UPD operatorエラーです:[ "+playList.operator+" ]")
				break;
		}
		oVal[key] = Number(tmpVal1);
		return oVal[key];
	}
	// END -------------------------------------------
}
