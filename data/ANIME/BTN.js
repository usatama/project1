/**
 *
 */


hAnime["ANIME/BTN"].ANIME_alpha = function(alpha) {
//	if(iTxtMax<iTxtShowMax){
//		return 0;
//	}else{
		return alpha;
//	}
}

hAnime["ANIME/BTN"].ANIME_xcolumn = function(xcolumn) {
	var pt = [1,2,3,4,5,6,7,8];
	return pt[Math.floor(( oFunc["ANIME"].getCnt() /9)%8)];
}

hAnime["ANIME/BTN"].ANIME_ycolumn = function(ycolumn) {

	if(oFunc["auto"].getSkip()){
		return 2;
	}else if(oFunc["auto"].getAuto()){
		return 1;
	}else{
		return 0;
	}
}

