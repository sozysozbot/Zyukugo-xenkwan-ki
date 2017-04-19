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

function search(kanzi)
{
	var a = [];
	for(var i=0; i<zihom.length; i++) {
		if(zihom[i][1].indexOf(kanzi)+1) {
			a.push(zihom[i][0]);
		}
	}
	return a;
}

function xenkwanki_segseg(hanzis)
{
	var res = '<div class="outer">';
				
	for(var i=0; i<hanzis.length; i++) {
		var k = hanzis[i];
		res += '<div class="box">';
			res += '<div class="b">' + k +'</div>';
			res += '<div>';
			var id = 'u' + (Math.random() + "").slice(2);
			var info = search(k);
			if(info.length > 1) {
				for(var j=0; j<info.length; j++){
					res += '<input type="radio" name="' + id + '" value="' + info[j] + '">' + info[j] + '<br>';
				}
			} else if(info.length == 1) {
				res += '<input type="radio" name="' + id + '" value="' + info[0] + '" checked="checked">' + info[0] + '<br>';
			} else {
				res += '(´・ω・`)<br>'
			}
			res += '</div>';
		res += '</div>'
	}

	res += '</div>';
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




