/**
 * screen.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function screen(){

	// 内部変数の宣言 --------------------------------
	var iZoom;
	var fDeg;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {

		var zoom
		var wt
		var wi
		var wo
		var wc
		var ht
		var hi
		var ho
		var hc

		wi = window.innerWidth
		wo = window.outerWidth
		wc = document.body.clientWidth

		hi = window.innerHeight
		ho = window.outerHeight
		hc = document.body.clientHeight

		if( (wi != 0)&&((wi <= wo)||(wo == 0)) ){wt = wi}
		if( (wo != 0)&&((wi >= wo)||(wi == 0)) ){wt = wo}
		if( (wo == 0)&&(wi == 0) ){wt = wc}

		if( (hi != 0)&&((hi <= ho)||(ho == 0)) ){ht = hi}
		if( (ho != 0)&&((hi >= ho)||(hi == 0)) ){ht = ho}
		if( (ho == 0)&&(hi == 0) ){ht = hc}

		if((wt/1136) <= (ht/640)){
			zoom = wt / wc;
			if(wt == wc){zoom = wt / 1136.0}
		}else{
			zoom = ht / hc;
			if(ht == hc){zoom = ht / 640.0}
		}

		document.body.style.transform       ='scale('+zoom+') rotate( 0deg ) translate('+((document.body.clientWidth-window.innerWidth)/zoom/-2)+'px,'+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px)';
		document.body.style.webkitTransform ='scale('+zoom+') rotate( 0deg ) translate('+((document.body.clientWidth-window.innerWidth)/zoom/-2)+'px,'+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px)';
		document.body.style.MozTransform    ='scale('+zoom+') rotate( 0deg ) translate('+((document.body.clientWidth-window.innerWidth)/zoom/-2)+'px,'+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px)';
		document.body.style.msTransform     ='scale('+zoom+') rotate( 0deg ) translate('+((document.body.clientWidth-window.innerWidth)/zoom/-2)+'px,'+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px)';
		document.body.style.OTransform      ='scale('+zoom+') rotate( 0deg ) translate('+((document.body.clientWidth-window.innerWidth)/zoom/-2)+'px,'+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px)';
		iZoom = 1.0/zoom
		fDeg=false;

//		if(wt >= ht){
/*		}else{
			zoom = ht / hc;
			if(ht == hc){zoom = ht / 1136.0}
			document.body.style.transform       ='scale('+zoom+') rotate( 90deg ) translate('+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px,'+((document.body.clientWidth-window.innerWidth)/zoom/2)+'px)';
			document.body.style.webkitTransform ='scale('+zoom+') rotate( 90deg ) translate('+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px,'+((document.body.clientWidth-window.innerWidth)/zoom/2)+'px)';
			document.body.style.MozTransform    ='scale('+zoom+') rotate( 90deg ) translate('+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px,'+((document.body.clientWidth-window.innerWidth)/zoom/2)+'px)';
			document.body.style.msTransform     ='scale('+zoom+') rotate( 90deg ) translate('+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px,'+((document.body.clientWidth-window.innerWidth)/zoom/2)+'px)';
			document.body.style.OTransform      ='scale('+zoom+') rotate( 90deg ) translate('+((document.body.clientHeight-window.innerHeight)/zoom/-2)+'px,'+((document.body.clientWidth-window.innerWidth)/zoom/2)+'px)';
			iZoom = 1.0/zoom
			fDeg=true;
		}
*/
	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		
	}

	//------------------------------------------------
	//------------------------------------------------
	this.getZoom = function() {
		return iZoom;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.getDeg = function() {
		return fDeg;
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.screen = function() {
		this.init();
	}
	// END -------------------------------------------
}
