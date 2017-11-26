!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

var GLOBAL_INFO = {};


function $(id) { return document.getElementById(id); }

function ready()
{
	$("form").onsubmit=(function(){main(); return false;});
	$("dat").onkeyup = main;
	$("xenkwan").onclick = main;
	$("temsaku_xuheu").onclick = kagsin;
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
			if(zihom[i][0].charAt(0)!="h")	//暫定的にh始まりの字音を弾く
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
			
			//二文字目以降ならば連濁、hについて整形
			if (i!=0) info = ProcessRendaku(ProcessH(info));
			
			if(info.length == 1)
				res += '<div class="kanzi"><ruby><rb>' + k + '</rb><rt id="box_' + index + '">' + zihom_to_gendaikana(info[0]) + '</rt></ruby>'  +'</div>';
			else res += '<div class="kanzi"><ruby><rb>' + k + '</rb><rt id="box_' + index + '"></rt></ruby>'  +'</div>';
			res += '<div class="zihomlist">';
			
			if(info.length == 1) {
				res += '<label class="zihom"><input type="radio" name="radio_' + index + '" class="radio" value="' + info[0] + '" checked><span class="zihomtext">' + info[0] + '</span></label>';
				GLOBAL_INFO["box_" + index] = info[0];
			} else if(info.length > 1) {
				for(var j=0; j<info.length; j++)
					res += '<label class="zihom"><input type="radio" name="radio_' + index + '" class="radio" value="' + info[j] + '" onclick="ev(\'box_' + index + '\', \'' + info[j] + '\')"><span class="zihomtext">' + info[j] + '</span></label>';
			} else {
				res += '(´・ω・`)<br>'
			}
			res += '</div>';
		res += '</div>'
	}
	GLOBAL_INFO['box_'+num+'_length'] = hanzis.length;
	
	res += '</div>';
	return res;
}

//hを挿入
function ProcessH(info)
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

//連濁させたものを追加
function ProcessRendaku(info)
{
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
			if(j == info.length - 1) { info.push(s); break; }
		}
	}
	return info;
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
		+ ($("temsaku_xuheu").checked ? "#temsaku" : "") 
		+ "\n");
		$("res2").innerHTML = str.replace("\n", "<br>");
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