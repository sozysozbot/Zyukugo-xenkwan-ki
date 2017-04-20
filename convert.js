function zihom_to_gendaikana(zihom)
{
	// handle h-
	zihom = zihom
		.replace(/^h/,"")

	// handle -ng
		.replace(/eg$/,"ei")
		.replace(/ag$/,"au")
		.replace(/og$/,"ou")
		.replace(/ug$/,"uu")

	// handle -m
		.replace(/m$/,"n")

	// handle -fu
		.replace(/fu$/,"u")

	//handle kw-, gw-
		.replace(/^kw/,"k")
		.replace(/^gw/,"g")

	//vowel merge
		.replace(/au$/,"ou")
		.replace(/^([bdgkmnprstxz])iu$/,"$1yuu")
		.replace(/^([bdgkmnprstxz])eu$/,"$1you")
		.replace(/^iu$/,"juu")
		.replace(/^eu$/,"jou")

	// v-
		.replace(/^v([eio])/, "$1")
		.replace(/^vy/, "j")

	// final consonant
		.replace(/[ptk]$/, "^")

	// -y-
		.replace(/y/, "iY")

	// di-, du-
	    .replace(/d([iu])/, "z$1");

	return toKana(zihom);	
}

function toKana(zihom)
{
	var pat = /([bdgjkmnprstvxYz]?[aeiou])|(n$)|(\^$)/g;
	var arr = [];
	var tmp;
	while ((tmp = pat.exec(zihom)) !== null) {
	  arr.push(tmp[0]);
	}

	var obj = {
		 a:"あ",  i:"い",  u:"う",  e:"え",  o:"お",
		ba:"ば", bi:"び", bu:"ぶ", be:"べ", bo:"ぼ",
		da:"だ",                  de:"で", do:"ど",
		ga:"が", gi:"ぎ", gu:"ぐ", ge:"げ", go:"ご",
		ja:"や",          ju:"ゆ",         jo:"よ",
		ka:"か", ki:"き", ku:"く", ke:"け", ko:"こ",
		ma:"ま", mi:"み", mu:"む", me:"め", mo:"も",
		na:"な", ni:"に", nu:"ぬ", ne:"ね", no:"の",
		pa:"ぱ", pi:"ぴ", pu:"ぷ", pe:"ぺ", po:"ぽ",
		ra:"ら", ri:"り", ru:"る", re:"れ", ro:"ろ",
		sa:"さ", si:"し", su:"す", se:"せ", so:"そ",
		ta:"た", ti:"ち", tu:"つ", te:"て", to:"と",
		va:"わ", 
		xa:"は", xi:"ひ", xu:"ふ", xe:"へ", xo:"ほ",
		Ya:"ゃ",         Yu:"ゅ",          Yo:"ょ",
		za:"ざ", zi:"じ", zu:"ず", ze:"ぜ", zo:"ぞ",
		"^":"っ", n:"ん"
	}
	
	var res = "";
	for(var i=0; i<arr.length; i++) {
		if(!obj[arr[i]]) throw new Error("oh no!");
		res += obj[arr[i]];
	}
	return res;
}



