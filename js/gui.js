/*************************************************
**  Gui.js
**  Javascript graphical functions for SWF Intruder
**
**  This file is part of SWF Intruder
**  Author: Stefano Di Paola (stefano.dipaola@mindedsecurity.com)
**  Copyright: Minded Security © 2007
**  License: GPL 2.0
**
*/


/**************************
**  Dollar function
**
**
*/
function $(el){
 return document.getElementById(el);
}

/***************************
**  Gets static content 
** (Help, about and other static content stuff)
** synchronously
**
*/
function getContent(url){
 var xhReq=  new XMLHttpRequest();
 xhReq.open('GET',url,false); // sync request
 xhReq.send(null);
 return xhReq.responseText;
}

/************************
** addToHistory
**
**
*/
function addToHistory(str,url){
 if(!inarray({url:url,str:str},historyArr) && str!=''){
   if(historyArr.length > maxHistoryElements)
    historyArr.pop();
   historyArr.unshift({url:url,str:str});
   setItem("history",JSON.stringify(historyArr));
 }
// alert(historyArr.toSource())
 if(historyArr.length==0)
  return;
 var li = '';
 for(var e=0;e<historyArr.length;e++){
  li+='<li style="z-index: 1'+(maxHistoryElements-e)+';"><a class="fakeanchor"  style="color: white;" href="'+(historyArr[e].url.replace(/"/g,'&#34;'))+'">'+(e+1)+'. '+escapeHtml(historyArr[e].str)+"</a>\n";
  li+="</li>";
 }
 $("dinHist").innerHTML=li;
}

/************************
** toggleVisibility
**
*/
function toggleVisibility(el){
  if(el == undefined){
    el =this;
  } else {
    el= $(el);
  }
  var style=el.style;
  if( style != undefined  ){
     if( style.display == "none" ) {
        style.display = "block";
        return true;
    } else {
        style.display = "none"; 
        return false;
    }
  }
}

/*****************
** Called when browsing through the ActionScript Object
** in the Snapshot window
**
** returns the full path of a AS Object
** backtracking through the three
*/
function getParents(el,event){
  var cur=el;
  var baseObj=document.getElementById("Infos").firstChild.id;
 
  str=baseObj;
  var stack=new Array();
  while(cur.parentNode.id!='tree'){
  
     if(typeof cur.parentNode.id!="undefined" && cur.parentNode.id!='')
    stack.push(cur.parentNode.id);
    else if(typeof cur.parentNode.previousSibling!="undefined" && cur.parentNode.previousSibling!=null)
     if(cur.parentNode.previousSibling.hasAttribute('id'))
    stack.push(cur.parentNode.previousSibling.id);
//  cur.style.border = 'solid 1px red';
//  alert(cur.tagName +' ' + cur.previousSibling  ); 
    
    cur=cur.parentNode;
  }
  
  for(e=stack.length-1;e>=0;e--)
   str+='.'+stack[e];
  showTooltip(event,str);
}


/********************
** Hide Tooltip
**
*/
function hideTooltip(){
  toggleVisibility('___tooltip');
}

/********************
**  Shous a tooltip
**  near the mouse pointer.
*/
function showTooltip(event,str){
  
  var ttp=  $('___tooltip');
  if(str!=undefined)
   ttp.innerHTML='<em>'+(str)+"</em>";
    posx=event.pageX;posy=event.pageY
   ttp.style.top= (posy+10)+'px';
   ttp.style.left = ''+(posx+10)+'px';
   ttp.style.display='block';
  return ttp;
}

/****************
** Called when clicking on object explorer
** sets the full path to the Query Object form
** in order to later explore it.
**
*/
function setValueToQuery(){
   $('object').value=($('___tooltip').textContent);
}


//** Graphical positioning helpers **//
function setWidth(el,w){
 $(el).style.width=w
}

function setHeight(el,h){
 $(el).style.height=h 
}

function setTop(el,h){
 $(el).style.top=h 
}

function setLeft(el,h){
 $(el).style.left=h 
}

function setRect(el,top,left,w,h){
setLeft(el, left)
setTop(el, top)
setWidth(el,w)
setHeight(el,h)
}


function writeDebug(str){ 
 
   try{ 
    writeTo("Debug",getDate()+' '+str)
   }catch(e){ dump(id+" "+str+"<br>"); }
}
/******************************************
** void writeTo(id, string)
** append text to innerHtml of an element
** Return Value: void
*/
function writeTo(id,str){ 
 
   try{
     $(id).innerHTML+=str;
   }catch(e){ dump(id+" "+str+"<br>"); }
}

/******************************************
** void reWriteTo(id, string)
** writes string to text to innerHtml of an element
** Return Value: void
*/
function reWriteTo(id,str){ 
 // try{
  document.getElementById(id).innerHTML=str;
 // }catch(e){alert(e+' '+id)}
}

/******************************************
** void addVar(id, string)
** adds a new Undefined Parameter to the select list
** Return Value: void
*/
function addVar(id,str,classObj){ 
 
  try{
   opt=$(id).options;
  
   for(var e=0;e<opt.length;e++)
    if( str==opt[e].value)  return ;
  
   $(id).options[$(id).options.length] = new Option(str,str);

   if(classObj!=undefined)
      $(id).options[$(id).options.length-1].className=classObj;

  }catch(e){dump(e+' '+id)}
}

/******************************************
** void removeVar(id, string)
** adds a new Undefined Parameter to the select list
** Return Value: void
*/
function removeVar(id,str){ 
 
  try{
   var coll=(str,$(id).options);
   for(var i=0;i<  coll.length;i++){
    
    if( str===coll.item(i).value){
    coll[i]=null;
    break;
    }
    }
// document.getElementById(id).innerHTML+=str;
   }catch(e){dump(e+' '+id)}
}


/**********************
** Configuration Window
** for AttackPatterns
**
**/
function showAttackConfigDiv(str){
   str='<h2 style="text-align: center;" >Attack Configuration Window</h2><fieldset id="attacks">';
   setRect("TB_window","100px","200px","500px","500px");
   for(var e=0; e<attackVector.length;e++)
    str+='<div class="row" >\
    <input type="checkbox" onchange="_attackPatternsChecked['+e+']=this.checked" name="'+e+'" '+(_attackPatternsChecked[e]?"checked":"")+'><b>'+escapeHtml(attackVector[e])+"</b></div>";
   for(var e=0; e<_customAttackPatterns.length;e++)
    str+='<div  class="row" style="width: 100%" >\
  	  <input  type="checkbox" onchange="_customAttackPatternsChecked['+e+']=this.checked" name="'+e+'" '+(_customAttackPatternsChecked[e]?"checked":"")+'><b> <acronym title="User defined pattern">[C]</acronym> '+escapeHtml(_customAttackPatterns[e])+
  	  "<div style='text-align: center;float: right;position: relative; top: -20px;background: brown;' class='fakeanchor submit' onclick='removeFromArrayByIndex("+e+",_customAttackPatterns);removeFromArrayByIndex("+e+",_customAttackPatternsChecked);setItem(\x22_customAttackPatternsChecked\x22,JSON.stringify(_customAttackPatternsChecked));setItem(\x22_customAttackPatterns\x22,JSON.stringify(_customAttackPatterns));showAttackConfigDiv();' >Delete</div></b></div>";

  str+='<div style="clear:both"><b>New pattern</b>: <input id="cpattern" class="input" type="text" value="">';
  str+='<input type="button" value="Add" onclick="if($(\x27cpattern\x27).value!=\x27\x27){addToArray($(\x27cpattern\x27).value,_customAttackPatterns );showAttackConfigDiv()}" class="submit"></div></fieldset><input type="button" onclick="hideInfoDiv()"  class="submit" value="Cancel" ><input type="button" value="Save Config" onclick="setItem(\x27_attackPatternsChecked\x27,JSON.stringify(_attackPatternsChecked));setItem(\x27_customAttackPatternsChecked\x27,JSON.stringify(_customAttackPatternsChecked));setItem(\x27_customAttackPatterns\x27,JSON.stringify(_customAttackPatterns));;showOkDiv(\x27Configuration Saved!\x27);" class="submit">';
  showInfoDiv("<div>"+str+"</div><div style='text-align: center; width: 100%;'><span onclick='hideInfoDiv()' style='cursor: pointer;text-decoration: underline;font-weight: bold;' class='submit'>Close</span></div>");

}

/**********************
** Configuration Window
** for Variables
**
**/
function showVariableConfigDiv(str){
   str='<h2 style="text-align: center;" >Parameters Configuration Window</h2><fieldset id="parameters">';
   setRect("TB_window","100px","200px","500px","auto");
   for(var e=0; e<_customUndefParameters.length;e++)
    str+='<div class="row" style="margin-bottom: 8px;width: 100%">\
    <b><acronym title="User defined parameter">[C]</acronym> '+escapeHtml(_customUndefParameters[e])+
    "<div style='text-align: center;float: right;position: relative; top: -20px;right: 0px;background: brown;' class='fakeanchor submit' onclick='removeFromArray(\x22"+_customUndefParameters[e].replace('"','&#34;')+"\x22,_globalVars);removeVar(\x22_global\x22,\x22"+_customUndefParameters[e].replace('"',"&#39;")+"\x22);removeFromArrayByIndex("+e+",_customUndefParameters);/*setItem(\x22_customUndefParameters\x22,JSON.stringify(_customUndefParameters))*/;showVariableConfigDiv();'>Delete</div></b></div>";

  str+='<div style="clear:both"><b>New Undefined Parameter</b>: <input id="cundef" class="input" type="text" value="">';
  str+='<input type="button" value="Add" onclick="if($(\x27cundef\x27).value!=\x27\x27){addToArray($(\x27cundef\x27).value,_customUndefParameters );addToArray($(\x27cundef\x27).value,_globalVars );addVar(\x27_global\x27,$(\x27cundef\x27).value,\x27custom\x27);showVariableConfigDiv()}" class="submit"><br>';
  str+='<b>Additional parameters</b>: <input class="input" id="addpar" type="text" name="addpar" value='+_customValuedParameters+'>'+"</fieldset><br>";
  str+='<input type="button" onclick="hideInfoDiv()"  class="submit" value="Cancel" ><input type="button" value="Save Config" onclick="setItem(\x27_customUndefParameters\x27,JSON.stringify(_customUndefParameters));_customValuedParameters=$(\x27addpar\x27).value;setItem(\x27_customValuedParameters\x27,JSON.stringify(_customValuedParameters));showOkDiv(\x27Configuration Saved!\x27);" class="submit">';
  showInfoDiv("<div>"+str+"</div><div  style='text-align: center; width: 100%;'><span onclick='hideInfoDiv()' style='cursor: pointer;text-decoration: underline;font-weight: bold;' class='submit'>Close</span></div>");
}

/**********************
** Configuration Window
** for Generic stuff
**
**/
function showGeneralConfigDiv(str){
  setRect("TB_window","100px","200px","500px","auto");
  
  str='<h2 style="text-align: center;" >Configuration Window</h2>';
  str+='<div style="margin: 5px;"><fieldset id="general">'+
  '<table><tr><td>Time (in ms): </td><td><input type="text" id="seconds" class="input" name="seconds" value='+seconds+'>'+"</td></tr>";
  str+='<tr><td>Evil Site: </td><td><input class="input" id="evilsite" type="text" name="evilsite" value='+evilsite+'>'+"</td></tr>";
  str+='<tr><td><input type="checkbox" id="mini" onchange="miniSwf=this.checked" '+(miniSwf?"checked":"")+'></td><td>Use additional mini swf during Xss Tests (could minimize false negatives rate)</td></tr>';
  str+='<tr><td><input type="checkbox" id="alert" onchange="alertWhenFound=this.checked" '+(alertWhenFound?"checked":"")+'></td><td>set an alert box when SWF Intruder founds a XSS</td></tr>';
  str+='<tr><td><input type="checkbox" id="allVariables" onchange="useAllVariables=this.checked" '+(useAllVariables?"checked":"")+'></td><td>Use all the input variables</td></tr>';
  str+='</table></fieldset><input type="button"   onclick="hideInfoDiv()"  class="submit" value="Cancel" ><input type="button" onclick="miniSwf=($(\x27mini\x27).checked);setItem(\x27mini\x27,miniSwf);alertWhenFound=($(\x27alert\x27).checked);setItem(\x27alert\x27,alertWhenFound);useAllVariables=($(\x27allVariables\x27).checked);setItem(\x27allVariables\x27,useAllVariables);evilsite=$(\x27evilsite\x27).value;setItem(\x27evilsite\x27,evilsite);seconds=$(\x27seconds\x27).value;setItem(\x27seconds\x27,seconds);showOkDiv(\x27Configuration Saved!\x27);loadAttackVector();" value="Save Config" class="submit"></div>';
  str="<div>"+str+"</div><div style='text-align: center; width: 100%;'><span onclick='hideInfoDiv()' style='cursor: pointer;text-decoration: underline;font-weight: bold;' class='submit'>Close</span></div>"
  showInfoDiv(str);
}

/**********************
** About Window
** 
**
**/
function showAboutDiv(str){

  setRect("TB_window","90px","347px","330px","auto");
  showInfoDiv( getContent('html/about.html') );
}

/**********************
** Help Window
** 
**
**/
function showHelpDiv(str){

  setRect("TB_window","100px","200px","600px","400px");

  showInfoDiv( getContent('html/help.html'));
}


/**********************
** Help Window
** 
**
**/
function showOkDiv(str){

  setRect("TB_window","100px","200px","600px","auto");

  showInfoDiv( "<div style='width: auto;padding: 20px;text-align: center' onclick='hideInfoDiv()'><h2 style='background-color: #004400;color: #ffffff;font-size: 25pt'> Configuration Saved!</h2><p style='font-size: 20pt' >Click everywhere to return to main window</p></div>");
}

/*******************
** Firefox Only Warning
**
**
*/
function showOnlyFirefoxDiv(str){
  showInfoDiv("<div style='text-align: center; padding: 5px' onclick='hideInfoDiv()'><h2>Sorry! SWFIntruder is for Firefox Only </h2><div style='text-align: center; width: 100%;'><span onclick='hideInfoDiv()' style='cursor: pointer;text-decoration: underline;font-weight: bold;' class='submit'>Close</span></div>");
}

/*******************
** Overlay window content 
** called by all show*Div functions
*/
function showInfoDiv(str){
 var theOverlay=$("TB_overlay");
 var theOverlayDiv= $("TB_window");
 try{
 var flashDiv= $("flashcontent");
 flashDiv.style.visibility="hidden";
 }catch(e){}
 theOverlay.style.display=theOverlayDiv.style.display="block";
 theOverlayDiv.innerHTML=str;
}



/*******************
** Overlay window content close function
** 
*/
function hideInfoDiv(){
 $("flashcontent").style.visibility="visible";
 $("TB_overlay").style.display=$("TB_window").style.display="none";
}



/*******************
** ProgressBar function
** 
*/
function setProgressBar(val){
   var pe=  $("pe3");
   if(val>=100){
    val=100; 
    pe.firstChild.style.backgroundImage='url("images/progressbar.png")';
   }else{
    if( pe.firstChild.style.backgroundImage=='url(images/progressbar.png)')
     pe.firstChild.style.backgroundImage='url(images/progressbar.gif)';

   }

   pe.firstChild.style.width=val+'%';
   pe.lastChild.textContent=val+'%';
}

/**************
**  Called to load Swf Movie using swfobject.js 
**  when document is loaded.
**
*/
function goSwf(){
  if(getQueryParamValue("swfurl")!=''){
	var objID = "getVars";
    
	
       url=document.getElementById("swfurl").value;
	   
       var attributes = {
		  allowscriptaccess: "always",
		  id: objID,
		  name: objID,
		  base: url,
		  scale: "showAll",
		  wmode: "transparent"
		};
		var params = {
			allowscriptaccess: "always"
		}

		swfobject.embedSWF("getVars.swf"+document.location.search, "initSWF", "400", "400", "9.0.0", null,{},params,attributes);

      /*
	  var so = new SWFObject("getVars.swf"+document.location.search, objID, "400", "400", "9", "#FFffff");
	  
	  so.addParam("base", url);
      so.addParam("scale", "showAll");
      so.addParam("wmode", "transparent");
      so.write("flashcontent");
	  //*/
      orisrc=document[objID].src;
  }
}
