!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

var GLOBAL_INFO = {};


function $(id) { return document.getElementById(id); }

function ready()
{
	$("form").onsubmit=(function(){main(); return false;});
	$("dat").onkeyup = main;
	$("xenkwan").onclick = main;
	$("temsaku").onclick = kagsin;
	main();
}

function main()
{
	var arr = textToArr($("dat").value);

	$("res").innerHTML = "";
	GLOBAL_INFO = {};

	for(var i=0; i<arr.length; i++)
		$("res").innerHTML += xenkwanki_segseg(i,arr[i]);
	
	GLOBAL_INFO.box_length = arr.length;
	GLOBAL_INFO.orig_strs = arr;
	
	kagsin();
	
	return;
}

function search(kanzi)
{
	var a = [];
	for(var i=0; i<zihom.length; i++)
		if(zihom[i][1].indexOf(kanzi)+1)
			a.push(zihom[i][0]);
	
	return a;
}

function xenkwanki_segseg(num,hanzis)
{
	var res = '<div class="outer" id="outer_'+num+'">';
	
	for(var i=0; i<hanzis.length; i++) {
		var k = hanzis[i];
		res += '<div class="box">';
			var index = num + '_' + i;
			var info = search(k);
			
			//二文字目以降ならばhについて整形
			if (i!=0) info = processH(info);
			//連濁のみの配列を取得
			var rendakuInfo = [];
			if(i!=0) rendakuInfo = getRendaku(info);
			
			if(info.length == 1)
				res += '<div class="ruby" id="box_' + index + '">' + zihom_to_gendaikana(info[0]) + '</div><div class="kanzi">' + k + '</div>';
			else res += '<div class="ruby" id="box_' + index + '"></div><div class="kanzi">' + k + '</div>';
			res += '<div class="zihomlist">';
			
			if(info.length == 1) {
				res += '<label class="zihom"><input type="radio" name="radio_' + index + '" class="radio" value="' + info[0] + '" onclick="ev(\'box_' + index + '\', \'' + info[0] + '\')" checked><span class="zihomtext">' + info[0] + '</span></label>';
				GLOBAL_INFO["box_" + index] = info[0];
			} else if(info.length > 1) {
				for(var j=0; j<info.length; j++)
					res += '<label class="zihom"><input type="radio" name="radio_' + index + '" class="radio" value="' + info[j] + '" onclick="ev(\'box_' + index + '\', \'' + info[j] + '\')"><span class="zihomtext">' + info[j] + '</span></label>';
			} else {
				res += '<span style="white-space: nowrap; font-size: 80%">(´・ω・`)</span><br>'
			}
			res += '</div>';
			
			
			if(0 < rendakuInfo.length) {
				res += '<div class="rendaku_container"><div class="rendaku_zihomlist" id="rendaku_' + index + '" style="display: none;">';
				for(var j=0; j<rendakuInfo.length; j++)
					res += '<label class="zihom"><input type="radio" name="radio_' + index + '" class="radio" value="' + rendakuInfo[j] + '" onclick="ev(\'box_' + index + '\', \'' + rendakuInfo[j] + '\')"><span class="zihomtext">' + rendakuInfo[j] + '</span></label>';
				res += '</div><label><input type="checkbox" onchange="rendakuOpenClose($(' + "'rendaku_" + index + "'" + '), this.checked)" class="rendaku_check" /><span></span></label></div>';
			}
		res += '</div>';
	}
	GLOBAL_INFO['box_'+num+'_length'] = hanzis.length;
	
	res += '</div>';
	return res;
}

function rendakuOpenClose(div, flag)
{
	if(flag) div.style.display = "block";
	else div.style.display = "none";
}

//hを挿入
function processH(info)
{
	for(var i=0; i<info.length; i++) {
		info[i] = info[i]
			.replace(/^a/, "ha")
			.replace(/^e/, "he")
			.replace(/^i/, "hi")
			.replace(/^o/, "ho")
			.replace(/^u/, "hu");
	}
	return info;
}

//連濁させたもののみの配列を作成
function getRendaku(info)
{
	var a = [];
	for(var i=0; i<info.length; i++) {
		//最初の子音を濁らせた文字列を用意
		var s = info[i]
			.replace(/^k/, "g")
			.replace(/^s/, "z")
			.replace(/^t/, "d")
			.replace(/^x/, "b")
			.replace(/^x/, "p");
		//同じものが既になければ追加する
		for(var j=0; j<info.length; j++) {
			if(s == info[j]) break;
			if(j == info.length - 1) { a.push(s); break; }
		}
	}
	return a;
}

// "正書法 熟語変換器" -> ["正書法","熟語変換器"]
function textToArr(text)
{
	var kanzi = /([\u4E00-\u9FFF\uF900-\uFAFF])+/g;
	var arr = [];
	var tmp;
	while ((tmp = kanzi.exec(text)) !== null)
		arr.push(tmp[0]);
	
	return arr;
}


function ev(id, zihom)
{
	$(id).innerHTML = zihom_to_gendaikana(zihom);
	GLOBAL_INFO[id] = zihom;

	kagsin();
}

function kagsin()
{
	var str = generate_str();
	if(str){
		removeShareButton();
		createShareButton(str
		+ "#segsyoxafu " 
		+ ($("temsaku").checked ? "#temsaku" : "") 
		+ "\n");
		$("res2").innerHTML = str.replace(/\n/g, "<br>");
	} else {
		removeShareButton();
		$("res2").innerHTML = "";
	}
}

function createShareButton(text){
	$('tweet').innerHTML = "";
	twttr.widgets.createShareButton(
	'https://sozysozbot.github.io/Zyukugo-xenkwan-ki/index.html',
	$('tweet'),
	{ text: text });
}

function removeShareButton(){$('tweet').innerHTML=""}

function generate_str(){
	var res = "";
	
	var enable = false;
	
	for(var i=0; i<GLOBAL_INFO.box_length;i++){
		res += GLOBAL_INFO.orig_strs[i] + " "
		for(var j=0;j<GLOBAL_INFO["box_"+i+"_length"];j++){
			if(! GLOBAL_INFO["box_"+i+"_"+j]){
				return null;
			} else {
				res += GLOBAL_INFO["box_"+i+"_"+j];
				enable = true;
			}
		}
		res += "\n"
	}
	
	if(!enable) return null;
	
	return res;
}