/**
 *
 */


hAnime["ANIME/PATA"].ANIME_ycolumn = function(ycolumn) {
	var pt = [0,1,0,1];
	return pt[Math.floor((oFunc["ANIME"].getCnt()/10)%4)];
}
