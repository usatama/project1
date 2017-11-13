/**
 *
 */
hAnime["ANIME/BTN_R"].ANIME_alpha = function(alpha) {

	var showNm = oFunc["GET"].GET("PIC_SHOW_NM");

	if(oFunc["TOUCH"].getMousePush() == true
		&& oFunc["TOUCH"].getTouchAria() == showNm ){
		return 1;
	}
	return 0.5;
}

hAnime["ANIME/BTN_R"].ANIME_xpoint = function(xpoint) {

	var showNm = oFunc["GET"].GET("PIC_SHOW_NM");

	if(oFunc["TOUCH"].getMousePush() == true
		&& oFunc["TOUCH"].getTouchAria() == showNm ){
			return xpoint-70;
	}
	return xpoint;
}

