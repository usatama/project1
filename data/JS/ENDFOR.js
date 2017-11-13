/**
 * ENDFOR.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function ENDFOR(){

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
			kind      : colData[0]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.ENDFOR();
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.ENDFOR = function() {
		
		this.retFor();
		
		var playList = oFunc["play"].getPlayList();
		
		oFunc["UPD"].UPD(playList.key3, playList.ope3, playList.val3);
		
		var flg = oFunc["IF"].judg(playList.key2, playList.ope2, playList.val2);
		
		//判定が成功の場合、次行を実行
		if(flg) return;
		
		oFunc["FOR"].toEndfor();
	}
	
	//------------------------------------------------
	// FORまで戻る
	//------------------------------------------------
	this.retFor = function() {
		
		//判定が失敗の場合、次のFORループを抜ける
		var tmpIndex = 1;
		while( !(tmpIndex == 0
				&& oFunc["play"].getPlayList().kind == "FOR"
		) ){
			
			oFunc["play"].decPlayCnt();
			
			if( oFunc["play"].getPlayCnt() == 0 ){
				alert("FORの開始がないよ");
				break;
			}
			
			if( oFunc["play"].getPlayList().kind == "FOR"){
				tmpIndex -= 1;
			}else if( oFunc["play"].getPlayList().kind == "ENDFOR"){
				tmpIndex += 1;
			}
		}
	}
	// END -------------------------------------------
}
