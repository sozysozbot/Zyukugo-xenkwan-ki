console.log(zihom.length)

function main(text)
{
	var arr = textToArr(text);

	document.getElementById("res").innerHTML = "";
	for(var i=0; i<arr.length; i++) {
		document.getElementById("res").innerHTML += xenkwanki_segseg(arr[i]);
	}
	return;
}

function xenkwanki_segseg(hanzis)
{
	var res = "";
	for(var i=0; i<hanzis.length; i++) {
		
	}
	console.log(hanzis);
	return res;
}

// "正書法 熟語変換器" -> ["正書法","熟語変換器"]
function textToArr(text)
{
	var kanzi = /([\u4E00-\u9FFF\uF900-\uFAFF])+/g;
	var arr = [];
	var tmp;
	while ((tmp = kanzi.exec(text)) !== null) {
	  arr.push(tmp[0]);
	}
	return arr;
}




