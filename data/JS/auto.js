/**
 * auto.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 *  exec : enable
 */

function auto(){

	// 内部変数の宣言 --------------------------------
	var fAuto;
	var iWaitSkip;

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
		fAuto = false;
		iWaitSkip = 0;
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.auto = function(skip) {

		if( fAuto == true ){
			fAuto = false;
		}else{
			fAuto = true;
		}

		if( skip == "SKIP" ){
			iWaitSkip = 0;
		}else{
			iWaitSkip = 90;
		}
	}

	//------------------------------------------------
	// 強制的にauto/skipの解除
	//------------------------------------------------
	this.stopAuto = function() {
		fAuto = false;
	}
	
	//------------------------------------------------
	// autoの返却
	//------------------------------------------------
	this.getAuto = function() {
		return fAuto;
	}
	
	//------------------------------------------------
	// skipの返却
	//------------------------------------------------
	this.getSkip = function() {
		return (iWaitSkip == 0) && fAuto;
	}
	
	//------------------------------------------------
	// waitの返却
	//------------------------------------------------
	this.getWait = function(wait) {
		if(wait < 0){
			return iWaitSkip;
		}else{
			return wait;
		}
	}

	// END -------------------------------------------
}
