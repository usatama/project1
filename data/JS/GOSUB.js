/**
 * GOSUB.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      label         : CSV内ラベル名
 *  exec : enable
 * 
 */

function GOSUB(){

	// 内部変数の宣言 --------------------------------
	var iCnt = 0;
	var iRetList = new Array();

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
		iCnt = 0;
		iRetLine = new Array();
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0] ,
			label     : colData[1]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.GOSUB(playList.label);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {

	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.GOSUB = function(label) {

		console.log(' read GOSUB LABEL( '+ label +' )');

		iRetList[iCnt]=oFunc["play"].getPlayCnt();

		console.log(' read GOSUB CNT( '+ iRetList[iCnt] +' )');
		iCnt++;


		//SAVE用
		var tmp = ""
		for(var i=0; i<iCnt; i++){
			tmp += iRetList[i] + ":";
		}
		oFunc["SET"].SET("GOSUB_LINE", tmp+":");
		oFunc["SET"].SET("GOSUB_CNT", iCnt);


		if( !isBlk(label) ){
			oFunc["GOTO"].GOTO("",label);
		}
	}

	//------------------------------------------------
	//------------------------------------------------
	this.setCnt = function(cnt) {
		iCnt = cnt;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.setRetList = function(retList) {
		iRetList = retList;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.popRet = function() {
		iCnt--;
		return iRetList[iCnt];
	}

	// END -------------------------------------------
}
