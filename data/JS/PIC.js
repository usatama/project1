/**
 * PIC.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function PIC(){

	// 内部変数の宣言 ----------------------
	var hImage;
	var hImgInf;

	var iCnt    = 0;
	var iLdCnt  = 0;
	var sOpList = new Array();

	//--------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//--------------------------------------
	this.init = function() {
		sOpList[""]="source-over"
		sOpList["Satop"]="source-atop"
		sOpList["Sin"]="source-in"
		sOpList["Sout"]="source-out"
		sOpList["Datop"]="destination-atop"
		sOpList["Din"]="destination-in"
		sOpList["Dout"]="destination-out"
		sOpList["Dover"]="destination-over"
		sOpList["光"]="lighter"
		sOpList["模"]="copy"
		sOpList["排"]="xor"
		sOpList["通"]="normal"
		sOpList["乗"]="multiply"
		sOpList["ス"]="screen"
		sOpList["オ"]="overlay"
		sOpList["暗"]="darken"
		sOpList["明"]="lighten"
		sOpList["覆"]="color-dodge"
		sOpList["焼"]="color-burn"
		sOpList["ハ"]="hard-light"
		sOpList["ソ"]="soft-light"
		sOpList["絶"]="difference"
		sOpList["除"]="exclusion"
		sOpList["色"]="hue"
		sOpList["彩"]="saturation"
		sOpList["カ"]="color"
		sOpList["灰"]="luminosity"
	}
	this.init();

	//--------------------------------------
	// （共通）シーンロード前、再初期化処理
	//--------------------------------------
	this.reset = function() {

		for(var i=0; i<iLdCnt; i++){
			hImage[i] = null
		}
		hImage  = new Array();
		hImgInf = new Array();
		iCnt   = 0;
		iLdCnt = 0;
	}

	//--------------------------------------
	// （共通）ファイル読込時、実行処理
	//--------------------------------------
	this.load = function(colData) {

		//ファイルパス連結
		var path = "./data/";
		if(!isBlk(colData[1])){path = path + colData[1] + "/";};
		path = path + colData[2];

		for(iCnt=0;iCnt<iLdCnt;iCnt++){
			if(hImage[iCnt] == null || (path == hImage[iCnt].path ) ){ break; }
		}
		if(iCnt == iLdCnt && !isBlk(colData[2])){
			try{
				hImage[iLdCnt] = new Image();
				hImage[iLdCnt].onload   = function() {iLdEnd++;};
				hImage[iLdCnt].onerror  = function() {location.reload(true);/*alert("picloaderr: "+path);*/}
				hImage[iLdCnt].src      = path;
				hImage[iLdCnt].path     = path;
				hImage[iLdCnt].charaName= blk(colData[1],"");
				hImage[iLdCnt].picName  = blk(colData[3],"");
				hImage[iLdCnt].hPicNo   = iCnt;
				iLdCnt++;
			}catch(e){
				console.error("load PIC " + e);
				return;
			}
		}
		
		var picName = blk(colData[3],"");
		hImgInf[picName] = new Object();
		hImgInf[picName].charaName= blk(colData[1],"");
		hImgInf[picName].fileName = blk(colData[2],"");
		hImgInf[picName].picName  = blk(colData[3],"");
		hImgInf[picName].hPicNo   = iCnt;
/*		hImgInf[picName].xslice   = blk(colData[4],1);
		hImgInf[picName].yslice   = blk(colData[5],1);
		hImgInf[picName].xslicemag= blk(colData[6],1);
		hImgInf[picName].yslicemag= blk(colData[7],1);
		hImgInf[picName].xcolumn  = blk(colData[8],0);
		hImgInf[picName].ycolumn  = blk(colData[9],0);
		hImgInf[picName].place    = blk(colData[10],1);//↑123 456 789↓
		hImgInf[picName].xplace   = 0;
		hImgInf[picName].yplace   = 0;
		hImgInf[picName].xpoint   = blk(colData[11],0);
		hImgInf[picName].ypoint   = blk(colData[12],0);
		hImgInf[picName].xscale   = blk(colData[13],1);
		hImgInf[picName].yscale   = blk(colData[14],1);
		hImgInf[picName].rotate   = blk(colData[15],0);
		hImgInf[picName].alpha    = blk(colData[16],1);
		hImgInf[picName].operation= blk(colData[17],"");
		hImgInf[picName].anime    = blk(colData[18],"ANIME/COM");
*/

		//＠＠＠そのうち修正
		var playList = {
			kind      : colData[0],
			hPicNo    : iCnt,
			charaName : blk(colData[1],""),
			fileName  : blk(colData[2],""),
			picName   : blk(colData[3],""),
			xslice    : blk(colData[4],""),
			yslice    : blk(colData[5],""),
			xslicemag : blk(colData[6],""),
			yslicemag : blk(colData[7],""),
			xcolumn   : blk(colData[8],""),
			ycolumn   : blk(colData[9],""),
			place     : blk(colData[10],""),
			xpoint    : blk(colData[11],""),
			ypoint    : blk(colData[12],""),
			xscale    : blk(colData[13],""),
			yscale    : blk(colData[14],""),
			rotate    : blk(colData[15],""),
			alpha     : blk(colData[16],""),
			operation : blk(colData[17],""),
			anime     : blk(colData[18],"")};
		oFunc["play"].setPlayList(playList);

		oFunc["ANIME"].loadJsNm(blk(colData[18],"ANIME/COM"));
	}

	//--------------------------------------
	// （共通）カーソル通過時、実行処理
	//--------------------------------------
	this.read = function(playList) {
		var lTgtPicNo;
		var lTgtPicNm;
		for(var i=0; i<oFunc["SHOW"].getShowList().length; i++){
			if(oFunc["SHOW"].getShowList()[i].picName == playList.picName){
				lTgtPicNo = parseInt(playList.hPicNo);
				lTgtPicNm = playList.picName;
				console.log(' read PIC ( '+ lTgtPicNm + '[' + lTgtPicNo +'] : '+ hImgInf[lTgtPicNm].charaName +'/'+ hImgInf[lTgtPicNm].fileName +' )');
				oFunc["SHOW"].getShowList()[i].hPicNo = lTgtPicNo;
				oFunc["SHOW"].saveShow();
				if(!isBlk(playList.charaName) ){hImgInf[lTgtPicNm].charaName = playList.charaName;}
				if(!isBlk(playList.xslice)    ){hImgInf[lTgtPicNm].xslice    = parseInt(playList.xslice);}
				if(!isBlk(playList.yslice)    ){hImgInf[lTgtPicNm].yslice    = parseInt(playList.yslice);}
				if(!isBlk(playList.xslicemag) ){hImgInf[lTgtPicNm].xslicemag = parseInt(playList.xslicemag);}
				if(!isBlk(playList.yslicemag) ){hImgInf[lTgtPicNm].yslicemag = parseInt(playList.yslicemag);}
				if(!isBlk(playList.place)     ){hImgInf[lTgtPicNm].place     = parseInt(playList.place);}
				if(!isBlk(playList.xpoint)    ){hImgInf[lTgtPicNm].xpoint    = parseInt(playList.xpoint);}
				if(!isBlk(playList.ypoint)    ){hImgInf[lTgtPicNm].ypoint    = parseInt(playList.ypoint);}
				if(!isBlk(playList.xscale)    ){hImgInf[lTgtPicNm].xscale    = playList.xscale;}
				if(!isBlk(playList.yscale)    ){hImgInf[lTgtPicNm].yscale    = playList.yscale;}
				hImgInf[lTgtPicNm].xplace	= parseInt(Math.floor((hImgInf[lTgtPicNm].place-1)%3)
												 * hImage[lTgtPicNo].width 
												 * hImgInf[lTgtPicNm].xscale
												 / hImgInf[lTgtPicNm].xslice
												 * hImgInf[lTgtPicNm].xslicemag
												 / -2);
				hImgInf[lTgtPicNm].yplace	= parseInt(Math.floor((hImgInf[lTgtPicNm].place-1)/3)
												 * hImage[lTgtPicNo].height
												 * hImgInf[lTgtPicNm].yscale
												 / hImgInf[lTgtPicNm].yslice
												 * hImgInf[lTgtPicNm].yslicemag
												 / -2);
				if(!isBlk(playList.rotate)    ){hImgInf[lTgtPicNm].rotate    = parseInt(playList.rotate);}
				if(!isBlk(playList.alpha)     ){hImgInf[lTgtPicNm].alpha     = playList.alpha;}
				if(!isBlk(playList.operation) ){hImgInf[lTgtPicNm].operation = playList.operation;}
				if(!isBlk(playList.xcolumn)   ){hImgInf[lTgtPicNm].xcolumn   = parseInt(playList.xcolumn);}
				if(!isBlk(playList.ycolumn)   ){hImgInf[lTgtPicNm].ycolumn   = parseInt(playList.ycolumn);}
				if(!isBlk(playList.anime)     ){hImgInf[lTgtPicNm].anime     = playList.anime;}	//＠直接呼び出す場合は読み込み処理が行われないため注意

				//SAVE用
				var tmp = ""
				tmp += hImgInf[lTgtPicNm].charaName + ":";
				tmp += hImgInf[lTgtPicNm].fileName  + ":";
				tmp += hImgInf[lTgtPicNm].picName   + ":";
				tmp += hImgInf[lTgtPicNm].hPicNo    + ":";
				tmp += hImgInf[lTgtPicNm].xslice    + ":";
				tmp += hImgInf[lTgtPicNm].yslice    + ":";
				tmp += hImgInf[lTgtPicNm].place     + ":";
				tmp += hImgInf[lTgtPicNm].xplace    + ":";
				tmp += hImgInf[lTgtPicNm].yplace    + ":";
				tmp += hImgInf[lTgtPicNm].xpoint    + ":";
				tmp += hImgInf[lTgtPicNm].ypoint    + ":";
				tmp += hImgInf[lTgtPicNm].xscale    + ":";
				tmp += hImgInf[lTgtPicNm].yscale    + ":";
				tmp += hImgInf[lTgtPicNm].rotate    + ":";
				tmp += hImgInf[lTgtPicNm].alpha     + ":";
				tmp += hImgInf[lTgtPicNm].operation + ":";
				tmp += hImgInf[lTgtPicNm].xcolumn   + ":";
				tmp += hImgInf[lTgtPicNm].ycolumn   + ":";
				tmp += hImgInf[lTgtPicNm].anime     + ":";
				tmp += hImgInf[lTgtPicNm].xslicemag + ":";
				tmp += hImgInf[lTgtPicNm].yslicemag + ":";
				oFunc["SET"].SET("PIC_P_"+lTgtPicNm, tmp);
				break;
			}
		}
	}
	//--------------------------------------
	// （共通）メインループ終了時、実行処理
	//--------------------------------------
	this.exe = function() {

	//	ct.save();
	//	ct.fillStyle = oFunc.GET("PIC_FILL");
	//	ct.fillRect(0, 0, hCanvas.width, hCanvas.height);//仮置き
	//	ct.restore();
		
		var ct = oFunc["canvas"].getCt();
		var j;
		var k;
		for(var i=0;i<oFunc["SHOW"].getShowList().length;i++){
			if(oFunc["SHOW"].getShowList()[i].hPicNo != -1){
				j=oFunc["SHOW"].getShowList()[i].hPicNo;
				k=oFunc["SHOW"].getShowList()[i].picName;
				oFunc["SET"].SET("PIC_SHOW_NM", k);

				ct.save();
				ct.globalAlpha = oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_alpha",hImgInf[k].alpha);	//＠そのうちJS＞CSV修正
				ct.globalCompositeOperation = sOpList[hImgInf[k].operation];

				xpoint = oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_xpoint",hImgInf[k].xpoint);
				ypoint = oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_ypoint",hImgInf[k].ypoint);
				xscale = oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_xscale",hImgInf[k].xscale);
				yscale = oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_yscale",hImgInf[k].yscale);
				xwidth = hImage[j].width 
							/ oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_xslice",hImgInf[k].xslice)
							* oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_xslicemag",hImgInf[k].xslicemag);
				yhight = hImage[j].height
							/ oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_yslice",hImgInf[k].yslice)
							* oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_yslicemag",hImgInf[k].yslicemag);

				hImgInf[k].xtouch = xpoint + hImgInf[k].xplace;
				hImgInf[k].ytouch = ypoint + hImgInf[k].yplace;
				hImgInf[k].wtouch = xwidth * xscale;
				hImgInf[k].htouch = yhight * yscale;

				ct.translate(xpoint + hImgInf[k].xplace + (xwidth * xscale / 2),
							 ypoint + hImgInf[k].yplace + (yhight * yscale / 2));
				ct.rotate(oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_rotate",hImgInf[k].rotate) * Math.PI / 180 );
				ct.scale(xscale, yscale);

				//ct.transform(1, 0, 0, 1, 0, 0);	//＠歪みを用いる場合ここを変更できるようにする
													//＠画面全体を揺らすとうここを指定するようにする

				try{
					ct.drawImage(hImage[j], 
								xwidth * oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_xcolumn",hImgInf[k].xcolumn) / hImgInf[k].xslicemag,
								yhight * oFunc["ANIME"].getAnimeJs(hImgInf[k].anime,"ANIME_ycolumn",hImgInf[k].ycolumn) / hImgInf[k].yslicemag,
								xwidth , yhight,
								- xwidth / 2,
								- yhight / 2,
								xwidth , yhight );
				}catch(e){
					console.error(hImgInf[k].picName+"\n"+e);
				}

				ct.restore();
			}
		}
	}

	//------------------------------------------------
	// PICロード件数の返却
	//------------------------------------------------
	this.PIC = function(
		colData_0,
		colData_1,
		colData_2,
		colData_3,
		colData_4,
		colData_5,
		colData_6,
		colData_7,
		colData_8,
		colData_9,
		colData_10,
		colData_11,
		colData_12,
		colData_13,
		colData_14,
		colData_15,
		colData_16,
		colData_17,
		colData_18
	) {
		//ファイルパス連結
		var path = "./data/";
		if(!isBlk(colData_1)){path = path + colData_1 + "/";};
		path = path + colData_2;

		for(iCnt=0;iCnt<iLdCnt;iCnt++){
			if(hImage[iCnt] == null || (path == hImage[iCnt].path ) ){ break; }
		}
		if(iCnt == iLdCnt && !isBlk(colData_2)){
				console.error("load PIC " + e);
				return;
		}
		var playList = {
			kind      : colData_0,
			hPicNo    : iCnt,
			charaName : blk(colData_1,""),
			fileName  : blk(colData_2,""),
			picName   : blk(colData_3,""),
			xslice    : blk(colData_4,""),
			yslice    : blk(colData_5,""),
			xslicemag : blk(colData_6,""),
			yslicemag : blk(colData_7,""),
			xcolumn   : blk(colData_8,""),
			ycolumn   : blk(colData_9,""),
			place     : blk(colData_10,""),
			xpoint    : blk(colData_11,""),
			ypoint    : blk(colData_12,""),
			xscale    : blk(colData_13,""),
			yscale    : blk(colData_14,""),
			rotate    : blk(colData_15,""),
			alpha     : blk(colData_16,""),
			operation : blk(colData_17,""),
			anime     : blk(colData_18,"")};
		oFunc["play"].setPlayList(playList);

		this.read(playList);
	}
	//------------------------------------------------
	// PICロード件数の返却
	//------------------------------------------------
	this.getLdCnt = function() {
		return iLdCnt;
	}

	//------------------------------------------------
	// PIC情報の返却
	//------------------------------------------------
	this.setHImgInf = function(picName, imgInf) {
		hImgInf[picName] = new Object();
		hImgInf[picName] = imgInf;
	}
	//------------------------------------------------
	// PIC情報の返却
	//------------------------------------------------
	this.getHImgInf = function(picName) {
		return hImgInf[picName];
	}

	//------------------------------------------------
	// PICハンドルの返却
	//------------------------------------------------
	this.getHImage = function(picName) {
		return hImage[hImgInf[picName].hPicNo];
	}

	//------------------------------------------------
	// TXT情報の更新
	//------------------------------------------------
	this.resTxtInf = function(hTxtCv) {
		try{
			hImage[hImgInf["TXT"].hPicNo].onload   = function() {hImgInf["TXT"].alpha = 1};
			hImage[hImgInf["TXT"].hPicNo].src = hTxtCv;
			hImgInf["TXT"].alpha = 0;
		}catch(e){
			console.error("PIC resTxtInf"+"\n"+e);
		}
	}

	//------------------------------------------------
	// MAP情報の更新
	//------------------------------------------------
	this.resMapInf = function(hMapCv) {
		try{
			hImage[hImgInf["MAP"].hPicNo].onload   = function() {hImgInf["MAP"].alpha = 1};
			hImage[hImgInf["MAP"].hPicNo].src = hMapCv;
			hImgInf["MAP"].alpha = 0;
		}catch(e){
			console.error("PIC resMapInf"+"\n"+e);
		}
	}

	// END ---------------------------------
}
