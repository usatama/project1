/**
 * AUDIO.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      cmd         : 実行コマンド(BGM BGS SE STOP STOP_ALL STOP_BGS RELOAD)
 *      path        : ogg mp3ファイルパス（拡張子抜き）
 *  exec : enable
 * 
 */

function AUDIO(){

	// 内部変数の宣言 --------------------------------
	var sPlayOggMp3;
	var hAudio     = new Array();
	var iCnt       = 0;
	var iLdCnt     = 0;
	var fLdAudio   = false;
	var iPlayBgmNo = -1;
	var iPlayBgsNo = -1;
	
	//------------------------------------------------
	//------------------------------------------------
	this.getCnt = function(path) {
		for(var i=0; i<iLdCnt; i++){
			if(hAudio[i].path == path){
				return i;
			}
		}
		return -1
	}

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		//音楽再生形式確認
		var audio = new Audio("");
		sPlayOggMp3 = ""
		if(audio.canPlayType){
			var canPlayOgg = ("" != audio.canPlayType("audio/ogg"));
			var canPlayMp3 = ("" != audio.canPlayType("audio/mpeg"));
			if(canPlayOgg){ sPlayOggMp3 = ".ogg"; }
			else if(canPlayMp3){ sPlayOggMp3 = ".mp3"; }
			oFunc["SET"].SET("SYS_BGM_PLAY", "ON");	//＠仮沖
			oFunc["SET"].SET("SYS_SE_PLAY", "ON");	//＠仮沖
		}
		if(sPlayOggMp3 == ""){
			alert("音楽再生できません");
			oFunc["SET"].SET("SYS_BGM_PLAY", "OFF");
			oFunc["SET"].SET("SYS_SE_PLAY", "OFF");
		}
		console.log(' init AUDIO sPlayOggMp3( '+ sPlayOggMp3 +' )');
	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {

		//とりあえず全部とめる
		for(iCnt=0;iCnt<iLdCnt;iCnt++){
			hAudio[iCnt].pause();
			hAudio[iCnt]=null;
		}

		//初期化処理
		hAudio = new Array();
		iCnt       = 0;
		iLdCnt     = 0;
		fLdAudio   = false;
		iPlayBgmNo = -1;
		iPlayBgsNo = -1;

	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	// 
	//  以下の警告は、設定だけして、ロードしなかったため表示される(firefox)
	// 「URI が正しくありません。メディア を読み込めませんでした。」
	//------------------------------------------------
	this.load = function(colData) {

		var path ;

		// BGM or BGS or SE の停止
		if(colData[1] == "STOP"
			|| colData[1] == "STOP_BGS"
			|| colData[1] == "STOP_ALL"){
			var playList = {
				kind      : colData[0] ,
				cmd       : colData[1] 
			}
			oFunc["play"].setPlayList(playList);
			return;
		}


		// BGM or BGS の ON / OFF
		if((colData[1] == "BGM" || colData[1] == "BGS")
			&& oFunc["GET"].GET("SYS_BGM_PLAY") == "OFF"){ return; }

		// SE の ON / OFF
		if(colData[1] == "SE" && oFunc["GET"].GET("SYS_SE_PLAY") == "OFF"){ return; }

		//音声ファイルの読み込み
		path = "./data/" + colData[2] + sPlayOggMp3;
		for(iCnt=0;iCnt<iLdCnt;iCnt++){
			if(path == hAudio[iCnt].path){ break; }
		}
		if(iCnt == iLdCnt){
			hAudio[iLdCnt] = new Audio(path);
			hAudio[iLdCnt].path   = path;
			hAudio[iLdCnt].volume = blk(colData[3],1);
			hAudio[iLdCnt].seek   = blk(colData[4],0);
			if(colData[1] != "SE"){
				hAudio[iLdCnt].loop = true;
			}
			iLdCnt++;
		}
		var playList = {
			kind       : colData[0] ,
			cmd        : colData[1] ,
			path       : path ,
			valume     : colData[3] ,
			seek       : colData[4]
		}
		oFunc["play"].setPlayList(playList);	
	}

	//////////////////////////////////////////////////
	// プリロード処理
	//////////////////////////////////////////////////
	this.preLoad = function() {
		if(fLdAudio==true || sStatus != "loadEnd"){return}

		for(iCnt=0;iCnt<iLdCnt;iCnt++){
			hAudio[iCnt].addEventListener("canplay", function(){iLdEnd++;} ,true);
			hAudio[iCnt].muted = true;
	//		hAudio[iCnt].currentTime = hAudio[iCnt].duration;
			hAudio[iCnt].load();
			hAudio[iCnt].play();
			hAudio[iCnt].pause();
			hAudio[iCnt].currentTime = hAudio[iCnt].seek;
			hAudio[iCnt].muted = false;
			console.log(' preLoad AUDIO path( '+ hAudio[iCnt].path +' )');
		}
		fLdAudio=true;
	}
	//------------------------------------------------
	// fLdAudioの返却
	//------------------------------------------------
	this.getLdAudio = function() {
		return fLdAudio;
	}
	//------------------------------------------------
	//------------------------------------------------
	this.setPlayBgmNo = function(bgm) {
		iPlayBgmNo = bgm;
	}
	//------------------------------------------------
	//------------------------------------------------
	this.setPlayBgsNo = function(bgs) {
		iPlayBgsNo = bgs;
	}

	//------------------------------------------------
	// ロード件数の返却
	//------------------------------------------------
	this.getLdCnt = function() {
		return iLdCnt;
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {

		switch (playList.cmd) {
			case "BGM":
				if(oFunc["GET"].GET("SYS_BGM_PLAY") == "OFF"){ break; }
				if(iPlayBgmNo != -1) hAudio[iPlayBgmNo].pause();
				iPlayBgmNo = this.getCnt(playList.path);
				hAudio[iPlayBgmNo].currentTime = 0;
				hAudio[iPlayBgmNo].play();
				break;
			case "BGS":
				if(oFunc["GET"].GET("SYS_BGM_PLAY") == "OFF"){ break; }
				if(iPlayBgsNo != -1) hAudio[iPlayBgsNo].pause();
				iPlayBgsNo = this.getCnt(playList.path);
				hAudio[iPlayBgsNo].currentTime = 0;
				hAudio[iPlayBgsNo].play();
				break;
			case "SE":
				if(oFunc["GET"].GET("SYS_SE_PLAY") == "OFF"){ break; }
				hAudio[this.getCnt(playList.path)].play();
				break;
			case "STOP":
				if(iPlayBgmNo != -1) hAudio[iPlayBgmNo].pause();
				iPlayBgmNo = -1
				break;
			case "STOP_BGS":
				if(iPlayBgsNo != -1) hAudio[iPlayBgsNo].pause();
				iPlayBgsNo = -1
				break;
			case "STOP_ALL":
				for(var i=0; i<iLdCnt; i++){
					hAudio[i].pause();
				}
				iPlayBgmNo = -1
				iPlayBgsNo = -1
				break;
			case "RELOAD":
				if(oFunc["GET"].GET("SYS_BGM_PLAY") == "OFF"){ break; }
				if(iPlayBgmNo != -1) hAudio[iPlayBgmNo].play();
				if(iPlayBgsNo != -1) hAudio[iPlayBgsNo].play();
				break;
			default:
				alert("read AUDIO cmdエラーです");
				break;
		}
		//SAVE用
		oFunc["SET"].SET("SYS_BGM_NO", iPlayBgmNo);
		oFunc["SET"].SET("SYS_BGS_NO", iPlayBgsNo);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理（※プリロードはしておくこと）
	//------------------------------------------------
	this.AUDIO = function(cmd,path) {
		var playList = {
			kind       : "AUDIO" ,
			cmd        : cmd ,
			path       : "./data/" + path + sPlayOggMp3
		}
		this.read(playList);
	}

	// END -------------------------------------------
}
