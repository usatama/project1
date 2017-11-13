/**
 * WAIT.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * TOUCH >>> WAIT
 */

function WAIT(){

	// 内部変数の宣言 --------------------------------
	var iWait;
	var fTouch;

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
		iWait = -1;
		fTouch = false;
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0],
			waitTime  : blk(colData[1],-1),
			animPtn   : blk(colData[2],""),
			waitTouch : blk(colData[3],false)
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {

		if(!isBlk(playList.waitTime) ){iWait = parseInt(playList.waitTime);}
		if(!isBlk(playList.animPtn)  ){oFunc["ANIME"].setCnt(parseInt(playList.animPtn));}
		if(!isBlk(playList.waitTouch)){fTouch = playList.waitTouch}
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {

		if(iWait > 0){
			iWait--;
		}

		if(iWait == 0){
			iWait--;
			oFunc["play"].incPlayCnt();
		}

		if( oFunc["auto"].getAuto() == true ){
			iWait = oFunc["auto"].getWait(iWait);
		}

	}

	//------------------------------------------------
	//------------------------------------------------
	this.getWait = function() {
		return iWait;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.setWait = function(wait) {
		iWait=wait;
	}
	//------------------------------------------------
	//------------------------------------------------
	this.getTouch = function() {
		return fTouch;
	}
	// END -------------------------------------------
}
