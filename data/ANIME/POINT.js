/**
 *
 */

hAnime["ANIME/POINT"].ANIME_alpha = function(alpha) {
	if(oFunc["TOUCH"].getMousePush() == true){
		return alpha;
	}
	return 0;
}
hAnime["ANIME/POINT"].ANIME_xpoint = function(xpoint) {
	return oFunc["TOUCH"].getMouseX();
}

hAnime["ANIME/POINT"].ANIME_ypoint = function(ypoint) {
	return oFunc["TOUCH"].getMouseY();
}

hAnime["ANIME/POINT"].ANIME_xcolumn = function(xcolumn) {
	var pt = [0,1,2,3,4,5,6,7];
	return pt[Math.floor((oFunc["ANIME"].getCnt()+1)%8)];
}
