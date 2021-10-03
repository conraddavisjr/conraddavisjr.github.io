export default function loadStyles(path) {
	return new Promise(function (resolve, reject) {
	  var head  = document.getElementsByTagName('head')[0];
	  var link  = document.createElement('link');
	  link.rel  = 'stylesheet';
	  link.type = 'text/css';
	  link.href = path;
	  head.appendChild(link);
	});
}