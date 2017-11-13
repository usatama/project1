/**
 * back.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 *  exec : enable
 */

function back(){

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
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.back = function() {

		var cntTxt = 0;
		var cntPly = oFunc["play"].getPlayCnt();
		var cntTmp = oFunc["play"].getPlayCnt();

		while(cntPly>0){
			cntPly--;
			oFunc["play"].setPlayCnt(cntPly);
			
			if(oFunc["play"].getPlayList().kind == "LABEL"){
				cntTxt++;
				break;
			}
			if( cntTxt==0
				&& oFunc["play"].getPlayList().kind == "WAIT"
				&& oFunc["play"].getPlayList().waitTime == -1
				&& oFunc["play"].getPlayList().animPtn  == ""){
				cntTxt++;

			}else if( cntTxt==1
				&& oFunc["play"].getPlayList().kind == "WAIT"){
				cntTxt++;
			}
			if(cntTxt==2){
				oFunc["play"].incPlayCnt();
				break;
			}
		}
		if(cntTxt!=2){
			oFunc["play"].setPlayCnt(cntTmp);
		}
	}
	// END -------------------------------------------
}
