/**
 * FOR.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      key1 <eval> : 初期化するキー
 *      ope1        : 初期化演算子
 *      val1 <eval> : 初期化する値
 *      key2 <eval> : 比較するキー
 *      ope2        : 比較演算子
 *      val2 <eval> : 比較する値
 *      key3 <eval> : 更新するキー
 *      ope3        : 更新演算子
 *      val3 <eval> : 更新する値
 *  exec : enable
 * 
 */

function FOR(){

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
		this.FOR(playList.key1,
				 playList.ope1,
				 playList.val1,
				 playList.key2,
				 playList.ope2,
				 playList.val2);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.FOR = function(key1, ope1, val1, key2, ope2, val2) {
		
		oFunc["UPD"].UPD(key1, ope1, val1);
		
		var flg = oFunc["IF"].judg(key2, ope2, val2);
		
		//判定が成功の場合、次行を実行
		if(flg) return;
		
		this.toEndfor();
	}
	
	//------------------------------------------------
	// ENDFORまで進む
	//------------------------------------------------
	this.toEndfor = function() {
		
		//判定が失敗の場合、次のFORループを抜ける
		var tmpPlayCnt = oFunc["play"].getPlayCnt();
		var tmpIndex = 1;
		while( !(tmpIndex == 0
				&& oFunc["play"].getPlayList().kind == "ENDFOR"
		) ){
			
			oFunc["play"].incPlayCnt();
			
			if( oFunc["play"].getPlayCnt() == tmpPlayCnt ){
				alert("FORの終了がないよ");
				break;
			}
			
			if( oFunc["play"].getPlayList().kind == "FOR"){
				tmpIndex += 1;
			}else if( oFunc["play"].getPlayList().kind == "ENDFOR"){
				tmpIndex -= 1;
			}
		}
	}
	
	// END -------------------------------------------
}
