/**
 *
 */


hAnime["ANIME/MOVE9"].ANIME_xcolumn = function(xcolumn) {
	var pt = [0,1,2,3,4,5,6,7,8,9];
	return pt[Math.floor((oFunc["ANIME"].getCnt()/6)%10)];
}
