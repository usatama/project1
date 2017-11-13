/**
 * CHARA.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function CHARA(){

	// 内部変数の宣言 --------------------------------
	var sLine  = new Array();
	var sChara = new Array();
	var sChaNm = "";

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		sLine["F普通"] =0;			//キャラFACE　普通
		sLine["F笑顔"] =1;			//キャラFACE　笑顔
		sLine["F怒り"] =2;			//キャラFACE　怒り
		sLine["F驚く"] =3;			//キャラFACE　驚く
		sLine["F困る"] =4;			//キャラFACE　困る
		sLine["F照れ"] =5;			//キャラFACE　照れ
		sLine["F特１"] =6;			//キャラFACE　悲哀　ショック
		sLine["F特２"] =7;			//キャラFACE　恐れ　憎しみ
		sLine["F裏１"] =8;			//キャラFACE　
		sLine["F裏２"] =9;			//キャラFACE　
		sLine["B立ち"] =20;			//キャラBODY　立ち
		sLine["B歩く"] =21;			//キャラBODY　歩く
		sLine["B攻撃"] =22;			//キャラBODY　攻撃
		sLine["Bダメ"] =23;			//キャラBODY　ダメ
		sLine["B使用"] =24;			//キャラBODY　使用
		sLine["B投げ"] =25;			//キャラBODY　投げ
		sLine["B魔法"] =26;			//キャラBODY　魔法
		sLine["B技１"] =27;			//キャラBODY　技１
		sLine["B技２"] =28;			//キャラBODY　技２
		sLine["B技３"] =29;			//キャラBODY　技３
		sChara["フェリオ_F1普"]="C0000";	//キャラ
		sChara["フェリオ_F1照"]="C0001";	//キャラ
		sChara["フェリオ_F1裸"]="C0002";	//キャラ
		sChara["フェリオ_F2普"]="C0003";	//キャラ
		sChara["フェリオ_F2照"]="C0004";	//キャラ
		sChara["フェリオ_F2裸"]="C0005";	//キャラ
		sChara["フェリオ_B1普"]="C0010";	//キャラ
		sChara["フェリオ_B2普"]="C0011";	//キャラ
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

		//@@@@@多重読み込みしているため改善が必要！！！
		//CHARA
		var chara = "";
		if(typeof sChara[colData[1]] != "undefined"){
			chara = "CHARA/" + sChara[colData[1]];
		}else{
			console.warn('  warn CHARA chara: ' + line );
		}
		
		this.CHARA( oFunc["CSV"].loadCsv(chara) , colData[2] );

		var playList = {
			kind      : colData[0] ,
			chaNm     : colData[1]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		sChaNm = playList.chaNm;
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
	}

	//------------------------------------------------
	// シーンファイル切分＆ロード処理
	//------------------------------------------------
	this.CHARA = function(rowData, line) {

		//LINE
		var i = 0;
		if(typeof line == "number"){
			i = parseInt(line);
		}else if(typeof sLine[line] != "undefined"){
			i = sLine[line];
		}else{
			console.warn('  warn CHARA line: ' + line );
		}

		var colData  = rowData[i].split(",");
		try{
			oFunc[ colData[0] ].load(colData);
		}catch(e){
			console.warn('  warn CHARA colData: '+ colData + '\n  warn '+e.message);
		}

	}
	// END -------------------------------------------
}
