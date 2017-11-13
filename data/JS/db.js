/**
 * db.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function db(){

	// 内部変数の宣言 --------------------------------
	var DB_CAN_LS  = true;
	var DB_CAN_CB  = true;
	var DB_CAN_FA  = false;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {

		//WebStorage
		if(!localStorage){
			alert("このブラウザではローカルストレージに対応してないよ");
			DB_CAN_LS=false;
		}

		//WebSQL Database
/*
		//Indexed Database
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;
		if(indexedDB){
			var openReq = indexedDB.open("mydb", 1.0);
			openReq.onupgradeneeded = function(event) {
				// データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
				db = event.target.result;
				var store = db.createObjectStore("mystore", { keyPath: "mykey"});
				// インデックスを作成します。
				store.createIndex("myvalueIndex", "myvalue");
			}
			openReq.onsuccess = function(event) {
				db = event.target.result;
			}
		} else {
			alert("このブラウザではIndexed DataBase APIに対応してないよ");
		}

		//FILE API
		if(!window.File || !window.FileReader){
			alert("このブラウザではFILE APIに対応してないよ");
			DB_CAN_FA=false;
		}
*/		
		//var fileData = document.getElementById("myFile").files[0];
//		var fileData = "";
//		var reader = new FileReader();
//		reader.readAsText(fileData, "utf-8");	// 文字コードをUTF-8として読み込む
		//<input id="myFile" type="file" multiple>

	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		
	}

	// END -------------------------------------------
}
