/******************
** globalStorage.js
** 
** helper functions for globalStorage.
** 
**  This file is part of SWF Intruder
**  Author: Stefano Di Paola (stefano.dipaola@mindedsecurity.com)
**  Copyright: Minded Security © 2007
**  License: GPL 2.0
*/
 if(location.host=="localhost")
  document.location=document.location.href.replace("localhost","127.0.0.1")

// tests for globalStorage issues
try{
	//var storage  = globalStorage[location.host];
	var storage  = sessionStorage;
}catch(r){
var str="<div style='text-align: center; padding: 5px' onclick='hideInfoDiv()'><h2>Sorry! globalStorage issue</h2> </div><h4>First of all be sure that your FF version is greater than 2. </h4>"+
 "<h4>If so, we figured out that there could be three cases:</h4>"+
 "<h4>1. your hostname is a name with no tld ('localhost') so try with "+
 "127.0.0.1 and it should work.</h4>"+
 "<h4>2. globalStorage is a like big cookie, so if you have cookies disabled for "+
 "your host, then it won't work. Be sure that cookies from your host are allowed.</h4>"+
 "<h4>3. have a look at about:config and search for dom.storage.enabled being "+
 "sure that is set to true.</h4>"+
 "</div><div style='text-align: center; padding: 5px' onclick='hideInfoDiv()'><span onclick='hideInfoDiv()' style='cursor: pointer;text-decoration: underline;font-weight: bold;' class='submit'>Close</span></div>";
 setTimeout(function(){showInfoDiv(str)},2000); 
}
var pageCount;

function setItem(key,value) {
storage.setItem(key,value);

}
function getItem(key) {
	this.value = function(){
        return storage.getItem(key);
    }
    
	return  storage.getItem(key);
}

function removeItem(key) {
      storage.removeItem(key)
}

