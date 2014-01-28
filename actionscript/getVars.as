/*************************************************
**  Intruder.swf
**  Wrapper for SWF to be tested
**
**  This file is part of SWF Intruder
**  Author: Stefano Di Paola (stefano.dipaola@mindedsecurity.com)
**  Copyright: Minded Security © 2007
**  License: GPL 2.0
**
*/

import flash.*;
class Testext extends MovieClip{

public function Testext (){
}

static var elStack:Array;
static public function _objInArray (obj) {
  for(var i=0;i< Testext.elStack.length;i++)
   if( obj===Testext.elStack[i])
    return true;
  return false;

}

static public function _delArray () {
  for(var i in Testext.elStack)
     Testext.elStack.shift();

}

// Anti self XSS/XSF Stuff.
// Anyway, everyone should use this tool in a controlled environment.
// This means you! :)
public static function checkForDomain (url) {

          if (url.indexOf('http://') == 0) {
            var v1 = (url.split('/', 3))[2];
	    var URL =  (_root.varTarget._url.split('/', 3))[2].toLowerCase();

            if (v1.toLowerCase() == '') {
              return true;
            }
            if ((v1.toLowerCase() ==  URL)) {
              return true;
            }
          }
          return false;
}

static public function _arrayToXML (obj) {
	var _l3 = "<array>";
	var _l1 = 0;
	while (_l1<obj.length) {
		_l3 = _l3+("<Elem_"+_l1+">"+Testext._toXML(obj[_l1])+"</Elem_"+_l1+">");
		++_l1;
	}

	// Needs this because of a FF Bug for empty objects and Xslt.
	if(_l3=="<array>")  
	return (_l3+"[Empty Array]</array>");
	
	return (_l3+" </array>");
}

static public function _objectToXML  (obj) {
	var _l2 = "<object_content>";
	
	for (var _l3 in obj) {
	      // if(_l3 != '$version')
	      var type=typeof obj[_l3]
	      if(type=="string" || type=="number")
		_l2 = _l2+("<type_"+type+" name=\""+_l3+"\"><![CDATA["+obj[_l3]+"]]></type_"+type+">");	        
	      else if(type=="boolean")
		_l2 = _l2+("<type_"+type+" name=\""+_l3+"\"><![CDATA["+obj[_l3]+"]]></type_"+type+">");	        
	      else if(type=="undefined")
		_l2 = _l2+("<type_"+type+" name=\""+_l3+"\"><![CDATA[undefined]]></type_"+type+">");	        
	      else if(type=="null")
		_l2 = _l2+("<type_"+type+" name=\""+_l3+"\"><![CDATA[null]]></type_"+type+">");	        
	       else
		_l2 = _l2+("<type_"+type+" name=\""+_l3+"\">"+Testext._toXML(obj[_l3])+"</type_"+type+">");
	}
	// Needs this because of FF a Bug for empty objects and Xslt.
	if(_l2=="<object_content>" && (typeof obj)=="function")
	  return ("<function>Function</function>");
	if(_l2=="<object_content>")
	 return (_l2+"[Empty Object]</object_content>");
	
	return (_l2+"</object_content>");
};

static public function _toXML  (value) {
	var _l2 = typeof (value); 
	if (_l2 == "string") {
		return ("<string><![CDATA["+eval("flash.external.ExternalInterface._escapeXML")(value)+"]]></string>");
	} else if (_l2 == "undefined") {
		return ("<value>undefined</value>");
	} else if (_l2 == "number") {
		return ("<value>"+value+"</value>");
	} else if (value == null) {
		return ("<value>null</value>");
	} else if (_l2 == "boolean") {
		return (value ? ("<value>true</value>") : ("<value>false</value>"));
	} else if (value.hasOwnProperty("length")) { 
		if(!Testext._objInArray(value)){
		 Testext.elStack.push(value);
		 //trace ("Inserted "+value);
		}
		else {
		 //trace ("Exists "+value);
		 return "<recursion><![CDATA["+value+"]]></recursion>"
		}
		return (Testext._arrayToXML(value));
	} else if (_l2 == "object" || _l2 == "movieclip") {
		if(!Testext._objInArray(value)){
		 Testext.elStack.push(value);
		 //trace ("Inserted "+value);
		}
		else {
		 //trace ("Exists "+value);
		 return "<recursion><![CDATA["+value+"]]></recursion>"
		 }
		return (Testext._objectToXML(value));
	}else if (_l2 == "function" ) {
	 // Function could be a prototype, 
	 // we must treat it as a standard object.
		if(!Testext._objInArray(value)){
		 Testext.elStack.push(value);
		 //trace ("Inserted "+value);
		}
		else {
		 //trace ("Exists "+value);
		 return "<recursion><![CDATA["+value+"]]></recursion>"
		 }
		 return (Testext._objectToXML(value));
		//return ("<function>Function</function>");

	} else {
		return ("<value>unkwnown</value>");
	}
};

 static function main() {
      var tester = new Testext();
      var inarray = function ( value ,arr ){
       for(var i=0;i< arr.length;i++)
	if( value.toUpperCase()===arr[i].toUpperCase())
	 return true;
       return false;
      }

      Testext.elStack = new Array();

      var __internalVars=["varToSend","resolvefor","shareroot","swfurl","__resolve","Testext"  ];

      var checkObject = function (name,test){
	  Testext._delArray();
	  var str='';
          var obj=eval(name);
	  var xmlstr= (eval("Testext._toXML")(obj));
	  return xmlstr;
      }
      
      var findString = function (string){
         
      }
      
      // registering flash callback for object explore
      var res = flash.external.ExternalInterface.addCallback('checkFlashObject', _root, checkObject );
 
      _root.createEmptyMovieClip("varTarget", 99);
      if(_root.shareRoot)
	_root.shareroot=true;
      else
	_root.shareroot=false;
      
      if(_root.resolveFor) 
	_root.resolvefor=_root.resolveFor;
      else
	_root.resolvefor='';

      var mclListener:Object = new Object();

      mclListener.onLoadInit = function(target_mc:MovieClip) {


          trace("movie loaded");
 	  target_mc.__resolve = function (name) {
         	
		fscommand("_global","_root."+name);
		return eval("_global."+name)
	      };
	 
	   var ce=_root.varTarget
	   for(var i in  ce ){
	       try{
 		   if(!inarray(i,__internalVars))
		    fscommand("Variables","_root.varTarget."+i) ;


	        } catch(df) {
		     fscommand("Errors",  df+"");
		}
	      }
	   if(_root.resolvefor!=''){
	       eval(_root.resolvefor).__resolve== function (name) {
         	 fscommand("_global","_root."+name);
	       };
	   }
	   ce=_root
	   for(var i in  ce )
 		   if(!inarray(i,__internalVars))
	      fscommand("Variables","_root."+i) ;

	   ce=_global
	   for(var i in  ce )
 		   if(!inarray(i,__internalVars))
	      fscommand("Variables","_global."+i) ;


	   for(var i in _root){
	     if(typeof _root[i]=="string" && i!="swfurl")
	     _root.varTarget[i] =_root[i];
	   }

	   if(_root.shareroot)
	      for(var i in  _root.varTarget){
	         _root[i] =_root.varTarget[i];
	      }
	   var r= _root.varTarget._width/_root.varTarget._height
	  // _root.varTarget._width=300;
	  // _root.varTarget._height=300/r;
	  // _root.varTarget._x=150;
	  // _root.varTarget._y=_root.varTarget._height/2;
	   
	   if(_root.shareroot)
	   _root.varTarget._lockroot=true 
           Stage.scaleMode='showAll'


      }; 
      
      mclListener.onLoadError = function() {
         _root.createTextField("my_txt", 4, 150, 5, 500, 500);
         _root.my_txt.html=true;
         _root.my_txt.border=true;
         _root.my_txt.background=true;
         _root.my_txt.backgroundColor=0x004400;
         _root.my_txt.textColor=0xFFFFFF;
	 _root.my_txt.autoSize="center";
	 _root.my_txt.htmlText='<P align="center"><FONT SIZE="50" >File Not Found!</FONT></P><BR>'+"\n"+
	 '<BR><P align="center"><FONT SIZE="30">Check the path of the swf you are trying to load</FONT></P>';
      }; 
      
      _root.varToSend  =new String('');

      // Prepare Query String
      for(var i in _root){
	if(typeof _root[i]=="string" && i!="swfurl" && i!="resolvefor")
	_root.varToSend +=i+"="+_root[i]+"&";
      }

      var image_mcl = new MovieClipLoader();
      image_mcl.addListener(mclListener);
      
      if(_root.shareroot)
	   _root._lockroot=false
	else
	   _root._lockroot=true
      
      if( Testext.checkForDomain(_root.swfurl) )
         image_mcl.loadClip( _root.swfurl+"?"+ _root.varToSend, _root.varTarget);
      else{
           _root.getURL("javascript:alert('The movie should be loaded from the same host, sorry..')");
           return;
      }
 
      // RESOLVE Stuff
       _root.__resolve = function (name) {
		       if(name!='flash' && name!='_level99' && name!='Testext' && name!='XML' ) 
        		    fscommand("_global","_root."+name); 
		       else
        		    return eval("_global."+name); 

	             };

      _global.__resolve = function (name) {if(name!='_level99') fscommand("_global","_global."+name); };

      _root.varTarget.__resolve = function (name) { fscommand("_global","_root."+name); }; 

      _level99.__resolve = function (name) { fscommand("_global","_level1."+name); };

  }
}
