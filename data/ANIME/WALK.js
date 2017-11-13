/**
 *
 */


hAnime["ANIME/WALK"].ANIME_xcolumn = function(xcolumn) {
	var pt = [0,1,2,1];
	return pt[Math.floor((oFunc["ANIME"].getCnt()/10)%4)];
}
