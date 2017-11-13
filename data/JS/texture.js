/**
 * texture.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function texture(){

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
	this.texture = function(hCt, hImg, px0, py0, px1, py1, px2, py2, px3, py3) {

		var w = hImg.width;
		var h = hImg.height;

		hCt.save();
		hCt.beginPath();
		hCt.moveTo(px0, py0);
		hCt.lineTo(px1, py1);
		hCt.lineTo(px3, py3);
		hCt.lineTo(px2, py2);
		hCt.closePath();
		hCt.clip();

		var t1=(px1-px0)/w;
		var t2=(py1-py0)/w;
		var t3=(px2-px0)/h;
		var t4=(py2-py0)/h;
		var t5=px0;
		var t6=py0;
		hCt.setTransform(t1,t2,t3,t4,t5,t6);
		hCt.drawImage(hImg, 0, 0);
		hCt.restore();

		hCt.save();
		hCt.beginPath();
		hCt.moveTo(px1, py1);
		hCt.lineTo(px2, py2);
		hCt.lineTo(px3, py3);
		hCt.closePath();
		hCt.clip();

		var t1=(px3-px2)/w;
		var t2=(py3-py2)/w;
		var t3=(px3-px1)/h;
		var t4=(py3-py1)/h;
		var t5=px2;
		var t6=py2;
		hCt.setTransform(t1,t2,t3,t4,t5,t6);
		hCt.drawImage(hImg, 0, 0-h);
		hCt.restore();

	}

	// END -------------------------------------------
}
