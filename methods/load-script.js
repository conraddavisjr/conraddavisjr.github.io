export default function loadScript(src, isModule) {
  return new Promise(function (resolve, reject) {
      var s;
      s = document.createElement('script');
      s.src = src;
      if(isModule) s.type = 'module';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
  });
}