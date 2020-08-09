
function setCookie(name, value) {
	var today = new Date();
	var expiry = new Date(today.getTime() + 1 * 24 * 3600 * 1000); 
  
	document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString() + "; secure";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
}

export {setCookie, getCookie};
