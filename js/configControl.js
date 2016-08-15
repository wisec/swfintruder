/******************
** configControl.js
** 
** Configuration functions for client initialization
** Uses globalStorage object
**
**  This file is part of SWF Intruder
**  Author: Stefano Di Paola (stefano.dipaola@mindedsecurity.com)
**  Copyright: Minded Security © 2007
**  License: GPL 2.0
*/

var _attackPatternsChecked = new Array(); //
var _customAttackPatterns = new Array(); // attacks added by user
var _customAttackPatternsChecked = new Array(); //

var _customValuedParameters = '';
var _customUndefParameters = new Array();

var historyArr = new Array();

// Init Stuff
// Populate from globalStorage
function initializeConfig(){

//  if( getItem("selectedAttacks")!=null)
//   _selectedAttacks=getItem("selectedAttacks");
// Attack Config 
// removeItem("_customAttackPatterns" ) 
 if( getItem("_customAttackPatterns")!=null)
  _customAttackPatterns=JSON.parse((getItem("_customAttackPatterns")));

 if( getItem("_customAttackPatternsChecked")!=null)
  _customAttackPatternsChecked=JSON.parse((getItem("_customAttackPatternsChecked")));
 else
  for(var e=0;e< _customAttackPatterns.length;e++)
   _customAttackPatternsChecked[e]=true;
  
 if( getItem("_attackPatternsChecked")!=null)
  _attackPatternsChecked=JSON.parse((getItem("_attackPatternsChecked")));
 else
  for(var e=0;e<attackVector.length;e++)
   _attackPatternsChecked[e]=true;
  
// Parameters Config
 if( getItem("_customValuedParameters")!=null)
  _customValuedParameters=JSON.parse((getItem("_customValuedParameters")));

 if( getItem("_customUndefParameters")!=null)
  _customUndefParameters=JSON.parse((getItem("_customUndefParameters")));
 
 if(_customUndefParameters.length>0)
  for(var e=0;e< _customUndefParameters.length;e++){
    addVar('_global',_customUndefParameters[e],'custom');
    addToArray(_customUndefParameters[e], _globalVars)
  }
 if( getItem("alert")!=null)
  alertWhenFound = parseBool((getItem("alert")));
   
 if( getItem("mini")!=null)
  miniSwf =  parseBool((getItem("mini")));

 if( getItem("swfurl")!=null)
  $("swfurl").value = unescape((getItem("swfurl")));

 if( getItem("xssLayout")!=null)
   showXssDiv =  parseBool((getItem("xssLayout")));

 if( getItem("debugLayout")!=null)
   showDebugDiv =  parseBool((getItem("debugLayout")));
 
// Standard config
 if(getItem("seconds")!=null)
  seconds=((getItem("seconds")))*1;

 if(getItem("evilsite")!=null)
  evilsite=(getItem("evilsite"));

 if(getItem("history")!=null)
   historyArr=JSON.parse(getItem("history"));

}

function deleteConfig(){
  for(var i in storage)
      storage.removeItem(i)

}
