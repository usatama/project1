/**
 *
 */


hAnime["ANIME/MOVE8"].ANIME_ycolumn = function(ycolumn) {
	var pt = [0,1,2,3,4,5,6,7];
	return pt[Math.floor((oFunc["ANIME"].getCnt()/8)%8)];
}
