
Foreword
========

This project has been forked to address the current issues (the original version does not work anymore). At the moment, it has been fixed but it is dirty and may need some efforts to give you the best result.

The original application was developed by Stefano Di Paola and called SWFIntruder. It was one of the OWASP projects but was not maintained since 2008.

SWFIntruder was the first tool for testing security in SWF files directly in the browser context.
The original version was developed in 2007 and hosted on Google Code. It has now been ported to github to let other people fork it or help improving.

How Does It Work?
=================

SWFIntruder has been developed using ActionScript, Html and JavaScript resulting in a tool taking advantage of the best features of those technologies in order to get the best capabilities for analysis and interaction with the testing Flash movies.

It loads the SWF files multiple times in the browser by using different inputs and detect the error messages or execution of a JavaScript code.

This app needs to be hosted locally on a web server with two different hostname (one to open it and one for the payloads). It is recommended to use the least secure crossdomain.xml file on the root of these domains (do not host it on a live server).

"config.js" file inside the "js" directory can be editted to add more attack vectors.

Limitation and Problems
=======================

This application does not support finding the AS3 FlashVars automatically at the moment. However, these parameters can be found by using the FlashBang (https://github.com/cure53/flashbang) project or by decompiling the SWF files.

This application and its original version are vulnerable to XSS attacks. Therefore, do not host them in your live website. 

This new version has been tested in Google Chrome or Mozilla Firefox and does not work in Internet Explorer.

It shows all the loaded Flash files at the moment and a removal process has not been implemented yet. Therefore it can be very slow in the browser and it may crash the Flash plugin. In addition, several features of this application has not been updated since the initial version and can be buggy.

This application only shows the result of loading the SWF files by using different vectors. Therefore, issues that needs user interaction such as clicking a link still needs to be verified manually.

Note: This application and other similar SWF scanners are only good for a fast testing when a securit yassessment time is limited. Remember to perform a manual assessment on the decompiled version of the SWF files to find as many issues as possible. 

Goals
=====

SWFIntruder purpose is to analyze a Flash application for version >= 8 and to help check in a semi automated fashion the presence of security issues like Cross Site Scripting and Cross Site Flashing.

Moreover does help raise awareness around the subject of flash applications security and how that can be used to and assist in the security of applications.
 

Reference to the Original Project
=================================
- OWASP: http://www.owasp.org/index.php/Category:SWFIntruder
- Testing Flash Applications: http://www.owasp.org/images/8/8c/OWASPAppSec2007Milan_TestingFlashApplications.ppt
- Finding Vulnerabilities in Flash Applications: http://www.owasp.org/images/d/df/SanJose_AppSec2007_DiPaola.ppt
