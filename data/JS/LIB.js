/**
 * LIB.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function LIB(){

	// 内部変数の宣言 --------------------------------
	var oLib  = new Array();
	var sList = new Array();

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

		var path = "LIB/" + colData[1];
		
		oLib[path] = oFunc["CSV"].loadCsv(path);

		var playList = {
			kind      : colData[0] ,
			line      : colData[2] ,
			path      : path
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.LIB(   playList.path,
					playList.line)
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
	}

	//------------------------------------------------
	// シーンファイル切分＆ロード処理
	//------------------------------------------------
	this.LIB = function(path, line) {
		
		line = evalTxt(line);
		
		var colData;
		colData  = oLib[path][0].split(",");
		for(var i=0; i<colData.length; i++){
			sList[i] = colData[i];
			console.log('lib '+ sList[i]);
		}
		
		colData  = oLib[path][line].split(",");
		for(var i=0; i<colData.length; i++){
			oVal[sList[i]] = colData[i];
			console.log('lib '+ oVal[sList[i]]);
		}
	}
	// END -------------------------------------------
}
