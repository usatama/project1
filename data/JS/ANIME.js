/**
 * ANIME.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      jsNm        : JSファイル名（拡張子抜き）
 *  exec : disable
 * 
 */
var hAnime;

function ANIME(){

	// 内部変数の宣言 --------------------------------
	var iCnt;
	var iMaxCnt;

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

		hAnime  = new Array();

		iCnt    = 0;
		iMaxCnt = 60;
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0] ,
			jsNm      : colData[1]
		}
		oFunc["play"].setPlayList(playList);
	}

	this.loadJsNm = function(jsNm) {

		var jsPath = "./data/" + jsNm + ".js";	
		if(typeof hAnime[jsNm] == "undefined"){
			hAnime[jsNm] = new Object();
			
			//読み込み+実行
			evalJs( oFunc["xml"].loadXml(jsPath) );
		}
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {

		//パタパタアニメーション用カウント
		if(iCnt < iMaxCnt){
			iCnt++;
		} else {
			iCnt = 0;
		}

	}
	//------------------------------------------------
	// アニメーション読み込み
	//------------------------------------------------
	this.getAnimeJs = function(jsNm,func,arg) {
		if(typeof hAnime[jsNm] != "undefined" 
			&& typeof hAnime[jsNm][func] != "undefined" ){
			return hAnime[jsNm][func](arg);
		}
		return arg;
	}
	//------------------------------------------------
	//------------------------------------------------
	this.getCnt = function() {
		return iCnt;
	}
	//------------------------------------------------
	//------------------------------------------------
	this.setCnt = function(cnt) {
		iCnt=cnt;
	}
	// END -------------------------------------------
}
