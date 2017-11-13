/**
 * VIDEO.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function VIDEO(){

	// 内部変数の宣言 --------------------------------
	var sPlaymp4ogv;
	var hVideo;
	var fVideoPlay = false;
	var iVideoNo   = -1;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {

		hVideo = document.getElementById("VIDEO1");

		//動画再生形式確認
		sPlaymp4ogv = ""
		if(hVideo.canPlayType){
			var canPlayWebm = ("" != hVideo.canPlayType("video/webm"));
			var canPlayMp4  = ("" != hVideo.canPlayType("video/mp4"));
			var canPlayOgg  = ("" != hVideo.canPlayType("video/ogg"));
			if(canPlayWebm){     sPlaymp4ogv = ".webm"; }
			else if(canPlayMp4){ sPlaymp4ogv = ".mp4"; }
			else if(canPlayOgg){ sPlaymp4ogv = ".ogv"; }
			oFunc["SET"].SET("SYS_MOV_PLAY", "ON");
		}
		if(sPlaymp4ogv == ""){
			alert("動画再生できません");
			oFunc["SET"].SET("SYS_MOV_PLAY", "OFF");
		}
		console.log(' init VIDEO sPlaymp4ogv( '+ sPlaymp4ogv +' )');

	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		//初期化処理
		hVidInf    = new Array();
		fVideoPlay = false;
		fLdVideo   = false;
		iVideoNo   = -1;
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		// VIDEO の ON / OFF
		if(oFunc["GET"].GET("SYS_MOV_PLAY") == "OFF"){ return; }

		var playList = {
			kind  : colData[0],
			cmd   : colData[1],
			path  : colData[2]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.VIDEO( playList.cmd,
					playList.path)
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {

		if(fVideoPlay==false){
			return;
		}
		var ct = oFunc["canvas"].getCt();
		ct.drawImage(hVideo, 0, 0, 1136, 640);
	}

	//------------------------------------------------
	// fVideoPlayフラグの返却
	//------------------------------------------------
	this.getVideoPlay = function() {
		return fVideoPlay;
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.VIDEO = function(cmd, path) {

		// VIDEO の ON / OFF
		if(oFunc["GET"].GET("SYS_MOV_PLAY") == "OFF"){ return; }

		switch (cmd) {
			case "RESET":
				if(iVideoNo != -1) hVideo.currentTime = 0;
				break;
			case "START":
				if(iVideoNo != -1) hVideo.pause();
				iVideoNo = 1;
				hVideo.src = "./data/" + path + sPlaymp4ogv;;
				hVideo.load();
				hVideo.play();
				fVideoPlay = true;
				break;
			case "PLAY":
				if(iVideoNo != -1) hVideo.play();
				break;
			case "PAUSE":
				if(iVideoNo != -1) hVideo.pause();
				break;
			case "FORWARD":
				if(iVideoNo != -1) hVideo.currentTime += 30;
				break;
			case "REWIND":
				if(iVideoNo != -1) hVideo.currentTime -= 30;
				break;
			case "END":
				if(iVideoNo != -1) hVideo.pause();
				fVideoPlay = false;
				break;
			default:
				alert("read VIDEO cmdエラーです");
				break;
		}
	}

	// END -------------------------------------------
}
