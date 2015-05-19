/***************************************************
 **  Control.js 
 **  Main functions for finding flaws in SWF Files
 **  
 **  Author: Stefano Di Paola (stefano.dipaola@mindedsecurity.com)
 **  Copyright: Minded Security © 2007
 **  License: GPL 2.0
 **
 ****************************************************/
// Arrays for informations storing
var _rootVars = new Array();
var _globalVars = new Array('_url');
var _level0Vars = new Array();
var VariablesVars = new Array();

// Arrays for Xss informations
var Xssed = new Array();
var _undefVars = new Array();
var _selectedAttackPatterns = new Array();
var globalEl = '';
var clearit = null;
var i = 0;
var elem = 0;
var orisrc = '';
var otherVariables = '';


/******************************************
 ** void gotRoot(Parameter_name)
 ** called if Xss test is accomplished
 ** Adds the affected parameter name to
 ** Xssed array
 ** Return Value: void
 */
function gotRoot(name) {
	name = name.toString();
	name = name.replace(/\//g,"");
    if (!inarray(name, Xssed)) {
        Xssed.push(name);
		var par = (name.substr(0, name.indexOf('_')));
        var elNum = (name.substr(name.indexOf('_')+1, name.length));
        if (par.indexOf("!") >= 0)
            par = par.substr(par.indexOf('!') + 1, par.length);

        if (alertWhenFound)
            alert('gotcha! ' + name);

        writeTo("Xss", "<b> " + "<a href='" + $("swfurl").value + "?" + par + "=" + _selectedAttackPatterns[elNum * 1].replace("gotRoot", "alert").replace("%%NAME%%", "test").replace(/'/g, '&#39;') + "&" + _customValuedParameters + "' target='_blank'><span title='" + _selectedAttackPatterns[elNum * 1].replace(/'/g, "&#39;") + "'>" + escapeHtml(name) + "</span>" + "</b></a> <br>");
    }
}

onerror = function(e) {
    writeTo("Errors", "<b> " + e + "</b> <br>");
}

/******************************************
 ** void writeSWF(SwfUrl)
 ** Facility Function which loads an SWF to
 ** an embed element.
 ** 
 ** Return Value: void
 */
function writeSWF(url, where) {
    writeDebug(escapeHtml(unescape(url)) + "<br>")
	var objID = "getVars"+makeRandomID(10);
	
	var SWFDiv = document.createElement("div");
	SWFDiv.id = objID;
	document.getElementById(where).appendChild(SWFDiv);
	
	var attributes = {
		  AllowScriptAccess: "always",
		  id: objID,
		  name: objID,
		  base: url,
		  scale: "showAll",
		  wmode: "transparent"
		};
		
	swfobject.embedSWF(url, objID, "400", "400", "9.0.0", null,{},{},attributes);
	
	/*
    var so = new SWFObject(url, objID, "400", "400", "9", "#eeeeee");
    url = $("swfurl").value;
    so.addParam("base", url);
    so.addParam("wmode", "transparent");
    so.addParam("AllowScriptAccess","always");
    so.write(where);
	*/
}

var countAttacks = 1;


function makeRandomID(idLen)
{
    if (idLen=='') idLen = 10;
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < idLen; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
/////////////////////
// 
//
//
//
function checkXss() {

    if (_undefVars[i] == undefined) {
        return false;
    }

    setTimeout(function() {
        setProgressBar(((countAttacks++) * 100 / (_selectedAttackPatterns.length * _undefVars.length)).toFixed(1))
    }, 1);
    var varName = _undefVars[i];
    var varValue = "";
    if (_undefVars[i].indexOf("=") > 0) {
        varName = unescape(_undefVars[i].split("=")[0]);
        varValue = unescape(_undefVars[i].split("=")[1]);
    }
    var attackString = (_selectedAttackPatterns[elem].replace('%%NAME%%', varName.replace(' ', '') + '_' + elem));
	
	var targetURL = $("swfurl").value + '?' + escape(varName) + '=' + escape(attackString) + (_customValuedParameters != '' ? "&" + _customValuedParameters : '') + ((useAllVariables == true && otherVariables != '') ? "&" + otherVariables : '');
	
	var newDiv = document.createElement("div");
	var newDivID = "flashcontent2_"+makeRandomID(10);
	newDiv.id = newDivID;
	newDiv.innerHTML = "Variable: <b>"+escapeHtml(varName)+"</b><br/>Payload: <b>"+escapeHtml(attackString)+"</b><br/>Target: "+escapeHtml(targetURL)+"<br/>";
	document.getElementById('flashcontent2').appendChild(newDiv);
	
    writeSWF(targetURL,newDivID);

    if (miniSwf) {
        url = (swfurl + '?' + escape(varName) + '=' + escape(attackString)) + (_customValuedParameters != '' ? "&" + _customValuedParameters : '') + ((useAllVariables == true && otherVariables != '') ? "&" + otherVariables : '');
		var objID = "getVars2"+makeRandomID(10);
		
		var SWFDiv = document.createElement("div");
		SWFDiv.id = objID;
		document.getElementById('flashcontent2').appendChild(SWFDiv);
		
		var attributes = {
			  AllowScriptAccess: "always",
			  id: objID,
			  name: objID,
			  base: url.substr(0, url.indexOf('?'))
			};
			
		swfobject.embedSWF(url, objID, "400", "400", "9.0.0", null,{},{},attributes);
		/*
        var so = new SWFObject(url, objID, "30", "30", "9", "#ffffff");
        so.addParam("base", url.substr(0, url.indexOf('?')));
		so.addParam("AllowScriptAccess","always");
		var newMiniSWFDiv = document.createElement("div");
		var newMiniSWFDivID = "flashcontent2_"+makeRandomID(10);
		newMiniSWFDiv.id = newMiniSWFDivID;
		document.getElementById('flashcontent2').appendChild(newMiniSWFDiv);
        so.write(newMiniSWFDivID);
		*/
    }
    elem++;
    if (_selectedAttackPatterns[elem] == undefined) {
        elem = 0
        i++;
    }

}

/******************************************
 ** void writeSWF(SwfUrl)
 ** Facility Function which loads an SWF to
 ** an embed element.
 ** 
 ** Return Value: void
 */
function goXss() {
    i = 0;
    elem = 0;
	
	document.getElementById('flashcontent2').innerHTML = '';
	loadAttackVector();
	
    _selectedAttackPatterns = new Array();
    _undefVars = new Array();
    selObj = document.getElementById('_global');
    otherVariables = '';
    countAttacks = 1;
    //     mystr=''
    //     for(var j=0;j<selObj.options.length;j++)
    //        mystr+=' '+selObj.options[j].value
    //     alert(_globalVars.toString()+' '+mystr);
    while (i < _globalVars.length) {
        var tempVar = _globalVars[i].substr(_globalVars[i].indexOf('.') + 1);
		if (selObj.options[i].selected) {
            //  _undefVars.push(  selObj.options[i].value.substr(_globalVars[i].indexOf('.')+1));
            _undefVars.push(tempVar);
        } else {
            if (tempVar.indexOf("=") > 0) {
                otherVariables += escape(unescape(tempVar.split("=")[0])) + "=" + escape(unescape(tempVar.split("=")[1])) + "&";
            } else {
                otherVariables += escape(unescape(tempVar)) + "=1&";
            }
        }
        i++;
    }
	
	if(otherVariables!='')
		otherVariables = otherVariables.substring(0, otherVariables.length - 1); // to remove the last "&" character
	
    if (_undefVars.length == 0) {
        alert("Error, no Parameter selected!");
        return;
    }

    // Load standard attack Array (only selected element)
    for (var e = 0; e < _attackPatternsChecked.length; e++)
        if (_attackPatternsChecked[e])
            _selectedAttackPatterns.push(attackVector[e]);

        // Load custom attack Array (only selected element)
    for (var e = 0; e < _customAttackPatternsChecked.length; e++)
        if (_customAttackPatternsChecked[e])
            _selectedAttackPatterns.push(_customAttackPatterns[e]);

    if (_selectedAttackPatterns.length == 0) {
        alert("Error, no Attack selected!");
        return;
    }

    setProgressBar(0);
    swfurl = $("swfurl").value;
    i = 0;


    // first one is directly
    // called so we dont have to wait for n seconds
    checkXss();

    // We call checkXss every n seconds
    clearit = setInterval(checkXss, seconds);
}


function isVariableOnTheList(varName){
	var result = false;
	
	if (varName.indexOf("=") > 0) {
			varName = unescape(varName.split("=")[0]);
		} else {
			varName = unescape(varName);
	}

	selObj = document.getElementById('_global');
    
	var j=0;
    while (j < _globalVars.length) {
        var tempVar = _globalVars[j].substr(_globalVars[j].indexOf('.') + 1);
		if (tempVar.indexOf("=") > 0) {
			tempVar = unescape(tempVar.split("=")[0]);
		} else {
			tempVar = unescape(tempVar);
		}
		
		if(varName==tempVar){
			result = true;
			break;
		}
        j++;
	}
	return result;
}

/*******
 ** String escapeHtml(string) 
 ** escapes < and > for printing string
 ** 
 */
function escapeHtml(str) {
    return str.replace(/>/g, '&gt;').replace(/</g, "&lt;");
}

/* source: http://www.w3schools.com/xsl/xsl_client.asp */
/* added by irsdl*/
function loadXMLDoc(filename) {
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    try {
        xhttp.responseType = "msxml-document"
    } catch (err) {}; // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
}

/* changed by irsdl*/
function parseXml(XMLValue) {
    var objDOMParser = new DOMParser();
    var xml = objDOMParser.parseFromString(XMLValue.replace(/&/g, "&amp;"), "text/xml");
    xml.async = false;

    /*
        xsl = document.implementation.createDocument("","",null);    
        try
        {
            xsl.async=false;
            xsl.load('xml/tree.xsl');
        }
        catch(e)
        {
            alert(e.message);
        }
		

        var oProcessor = new XSLTProcessor()
        oProcessor.importStylesheet(xsl);
		*/

    xsl = loadXMLDoc('xml/tree.xsl');
    var xsltProcessor = new XSLTProcessor();
    var resultDocumentString;
    /* source: http://www.w3schools.com/xsl/xsl_client.asp */
    // code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        resultDocumentString = xml.transformNode(xsl);
    }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        var resultDocument = xsltProcessor.transformToFragment(xml, document);
        var serializer = new XMLSerializer();
        resultDocumentString = serializer.serializeToString(resultDocument);
    }


    // var oResultDom = oProcessor.transformToDocument(xml);
    // var oResultDom = xsltProcessor.transformToDocument(xml);
    //var serializer = new XMLSerializer();
    //return serializer.serializeToString(oResultDom);
    //return serializer.serializeToString(resultDocument);

    return resultDocumentString;


}
var countObject = 0;
/*******
 **   getObject(element) 
 ** calls Flash checkFlashObject method and gets the snapshot of an object
 ** 
 */
function getObject(el, str) {
    if (str == '') {
        return;
    }
    pre = '<?xml version="1.0" encoding="windows-1250" ?>'; //+'<?xml-stylesheet type="text/xsl" href="js/oat/xslt/tree.xsl"?>'

    str = str ? str : el.textContent.toString();

    var params = str.split("&");

    for (var item in params) {
		if(!isVariableOnTheList(params[item])){
			var FlashObject = document.getVars.checkFlashObject(params[item], true);
			
			if (typeof FlashObject == "undefined" || typeof FlashObject == "null")
				FlashObject = '<' + typeof FlashObject + '></' + typeof FlashObject + '>';

			html = (parseXml(pre + FlashObject)) //FlashObject;
			countObject++;
			reWriteTo("Infos", '<div id="' + params[item] + '" style="font-weight:bold;color: #004400;margin-bottom: 2px;border-bottom: solid 1px;">' + params[item] + '</div><div style="float: right;">Search value <input type="text" onkeyup="if(event.keyCode==13){expandToItem(\x27tree\x27,this.value);};" style="border: solid 1px"></div><br><b>' + (html) + "</b>");

			var f = $(params[item]);
			f.scrollIntoView();
		}
    }
    convertTrees();
    expandTree('tree');
}


/*******
 ** getVars_DoFSCommand(command, args) 
 ** called by getVars.swf when parameters are undefined
 ** 
 */
function getVars_DoFSCommand(command, args) {

    try {
        var array = eval(command + "Vars")

        if (!inarray(args, array)) {

            array.push(args);
            if (command != '_global')
                writeTo(command, "<b> <span class='explore' onclick='getObject(this);'>" + escapeHtml(args) + "</span></b> <br>");
            else
                addVar('_global', args);
        }
    } catch (e) {

        writeTo("Errors", "<b> " + escapeHtml(command) + " " + escapeHtml(args) + " called</b> <br>");
    }
}

/************
   This function is due to a bug in firefox+flash
   Flash doesnt' recognize the full path to itself and misses 
   loading external files from the right directory
*/
function checkDomain() {
    var swfval = $("swfurl").value;
    if (swfval.indexOf(location.protocol + '//' + location.host + '/') != 0)
        $("swfurl").value = location.protocol + '//' + location.host + '/' + swfval;
    return true;
}



/****
Initialization stuff
*/
function init() {
    globalEl = $('Errors');
    initializeConfig();
    /*
    if(navigator.userAgent.indexOf("Firefox")<0) {
       showOnlyFirefoxDiv();
    }
    */
    if (showXssDiv) {
        $("Xssdiv").style.display = "block";
        setWidth("snapshot", "382px");
    } else {
        $("Xssdiv").style.display = "none";
        setWidth("snapshot", "564px");
    }
    if (showDebugDiv)
        $("debug").style.display = "block";
    else
        $("debug").style.display = "none";
    // showHelpDiv();
    var url = unescape(getQueryParamValue("swfurl"));
    $("swfurl").value = ((url != '') ? unescape(url) : location.protocol + '//' + location.host + '/');

    setItem("swfurl", $("swfurl").value);
    url = unescape(url);
    maxUrlLength = 25;
    url2 = url.substr(url.indexOf('/', 7), url.length);
    urlhist = url2.substr(((url2.length - maxUrlLength) < 0 ? 0 : (url2.length - maxUrlLength)), url2.length);
    // alert( urlhist+' '+(url2.length-maxUrlLength) )
    if (url2.length > maxUrlLength)
        urlhist = '... ' + urlhist;
    addToHistory(urlhist, location.href);

}