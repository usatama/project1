/**
 * IF.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      key <eval> : 比較するキー
 *      ope        : 比較演算子
 *      val <eval> : 比較する値
 *  exec : enable
 * 
 */

function IF(){

	// 内部変数の宣言 --------------------------------
	var hEndIf;
	var iCnt       = 0;

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
		hEndIf     = new Array();
		iCnt       = 0;
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
		this.IF( playList.key1,
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
	this.IF = function(key1, ope1, val1, key2, ope2, val2, key3, ope3, val3) {

		iCnt++;
		this.IFEF(key1, ope1, val1, key2, ope2, val2, key3, ope3, val3);
	}

	//------------------------------------------------
	// IF ELSEIF 処理
	//------------------------------------------------
	this.IFEF = function(key1, ope1, val1, key2, ope2, val2, key3, ope3, val3) {

		var flg = this.judg(key1, ope1, val1);
		if( flg && !isBlk(key2)) flg = this.judg(key2, ope2, val2);
		if( flg && !isBlk(key3)) flg = this.judg(key3, ope3, val3);
		hEndIf[iCnt] = flg;
		
		//判定が成功の場合、次行を実行
		if(flg)return;

		this.nextIf();
	}

	//------------------------------------------------
	// IF判定処理
	//------------------------------------------------
	this.judg = function(key, ope, val) {
		
		//key = evalTxt(key);
		//val = evalTxt(val);
		
		var tmpVal1 = oVal[key];
		var tmpVal2 = val;
/*		var tmpVal1 = Number(oVal[key]);
		if(isFinite(val)){
			tmpVal2 = val;
		} else {
			tmpVal2 = Number(oVal[val]);
		}
*/
		//alert(key+": _"+tmpVal1+"_ _"+tmpVal2+"_ = "+(tmpVal1 == tmpVal2));
		var flg = false;
		switch (ope) {
			case "=":
				if(tmpVal1 == tmpVal2) flg = true;
				break;
			case ">":
				if(tmpVal1 >  tmpVal2) flg = true;
				break;
			case ">=":
				if(tmpVal1 >= tmpVal2) flg = true;
				break;
			case "<":
				if(tmpVal1 <  tmpVal2) flg = true;
				break;
			case "<=":
				if(tmpVal1 <= tmpVal2) flg = true;
				break;
			case "!=":
				if(tmpVal1 != tmpVal2) flg = true;
				break;
			default:
				alert("read IF operatorエラーです:[ "+playList.ope+" ]")
				break;
		}
		return flg;
	}

	//------------------------------------------------
	// IF判定処理
	//------------------------------------------------
	this.nextIf = function() {
		//判定が失敗の場合、次の分岐に移動
		var tmpPlayCnt = oFunc["play"].getPlayCnt();
		var tmpIndex = 1;
		while( !(tmpIndex == 0
				&& (   oFunc["play"].getPlayList().kind == "ELSE"
					|| oFunc["play"].getPlayList().kind == "ELSEIF"
					|| oFunc["play"].getPlayList().kind == "ENDIF"
		) ) ){

			oFunc["play"].incPlayCnt();

			if( oFunc["play"].getPlayCnt() == tmpPlayCnt ){
				alert("IFの終了がないよ");
				break;
			}
			
			if( oFunc["play"].getPlayList().kind == "IF"){
				tmpIndex += 1;
			}else if( oFunc["play"].getPlayList().kind == "ELSE"   && tmpIndex == 1 ){
				tmpIndex -= 1;
			}else if( oFunc["play"].getPlayList().kind == "ELSEIF" && tmpIndex == 1 ){
				tmpIndex -= 1;
			}else if( oFunc["play"].getPlayList().kind == "ENDIF"){
				tmpIndex -= 1;
			}
		}
		oFunc["play"].decPlayCnt();
	}

	//------------------------------------------------
	// 
	//------------------------------------------------
	this.decIfCnt = function() {
		iCnt--;
	}
	//------------------------------------------------
	// 
	//------------------------------------------------
	this.getEndIf = function() {
		return hEndIf[iCnt];
	}

	// END -------------------------------------------
}
