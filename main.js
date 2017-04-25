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

function get_id()
{
	return (Math.random() + "").slice(2);
}

function xenkwanki_segseg(hanzis)
{
	var res = '<div class="outer">';
				
	for(var i=0; i<hanzis.length; i++) {
		var k = hanzis[i];
		res += '<div class="box">';
			var id = 'u' + get_id();
			res += '<div class="b"><ruby><rb>' + k + '</rb><rt id="'+ id + '"></rt></ruby>'  +'</div>';
			res += '<div>';
			var info = search(k);
			if(info.length >= 1) {
				for(var j=0; j<info.length; j++){
					var button_id = 'b' + get_id();
					res += '<input type="radio" id="'+ button_id + '" name="' + id + '" value="' + info[j] + 
					'" onclick="ev(\''+ id + '\', \'' + info[j] + '\')"><label for="' + button_id + '">' + info[j] + '</label><br>';
				}
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


function ev(id, zihom)
{
	var dom = document.getElementById(id);
	dom.innerHTML = zihom_to_gendaikana(zihom);
}


