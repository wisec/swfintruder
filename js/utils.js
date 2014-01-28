/*************************************************
**  utils.js
**  Javascript miscellaneuos functions for SWF Intruder
**
**  This file is part of SWF Intruder
**  Author: Stefano Di Paola (stefano.dipaola@mindedsecurity.com)
**  Copyright: Minded Security © 2007
**  License: GPL 2.0
**
*/


/******************************************
** boolean inarray(needle, array)
** checks for the presence of a value in a given array
** Return Value: boolean 
*/
function inarray( value ,arr ){
  for(var i=0;i< arr.length;i++)
   if( value.toSource()===arr[i].toSource())
    return true;
  return false;
}

/******************************************
** boolean  getIndexByValue(needle, array)
** returns the index of a value in a given array
** or -1 if nothing is found 
*/
function getIndexByValue( val ,arr ){
   for(var i=0;i< arr.length;i++)
   if( val==arr[i])
    return i;
  return -1;
}

/*****************


*/
function addToArray(str,array){
 if(!inarray(str,array))
   array.push(str);
}


// /******************************************
// ** boolean inarray(needle, array)
// ** checks for the presence of a value in a given array
// ** Return Value: boolean 
// */
// function inarray( value ,arr ){
//   for(var i=0;i< arr.length;i++)
//    if( value.toUpperCase()===arr[i].toUpperCase())
//     return true;
//   return false;
// }

/******************************************
** boolean  getIndexByValue(needle, array)
** returns the index of a value in a given array
** or -1 if nothing is found 
*/
function getIndexByValue( val ,arr ){
   for(var i=0;i< arr.length;i++)
   if( val==arr[i])
    return i;
  return -1;
}

/*************
*/
function removeFromArray(str,array){
 var index= getIndexByValue(str,array);

 removeFromArrayByIndex(index,array)
}

function removeFromArrayByIndex(index,array){
 array.splice(index,1);
}

function parseBool(str){return str=="true"}



function array2options(array,el){
  var opt=  $(el).options
  for(var e=0;e<opt.length;e++)
   opt.pop();
  
  for(var e=0;e<array.length;e++)
   addVar(el,array[e]);
}

function options2array(array,el){
  var opt=  $(el).options
  for(var e=0;e<array.length;e++)
   array.pop();
   
  for(var e=0;e<opt.length;e++)
   opt[e](el,array[e]);
}
function getDate(){
  var date = (new Date());
d=date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()
d+=' '+date.getHours()+":"
d+=date.getMinutes()+":"
d+=date.getSeconds()
return '['+d+']'; 
}
