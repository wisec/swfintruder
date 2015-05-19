<b>I have forked this project to address the current issues (the original version does not work anymore)</b>
FlashVars in AS3 can be found by using the FlashBang (https://github.com/cure53/flashbang) project or by decompiling the SWF files.


<b>Original Readme:</b>

Foreword
========

SWFIntruder is the first tool for testing security in SWF files directly in the browser context.
This is the original version that was developed in 2007 and hosted on Google Code.
It has now been ported to github to let other people fork it or help improving.

**Note:** SWFIntruder is unmantained since 2008 so if anybody wants to help is welcome, but I won't be able to fix or add new features. **Means: At the moment needs some fixing to let it work with modern browsers.**


Introduction
============

**SWFIntruder** is a tool developed by [Stefano Di Paola][] and
maintained by [OWASP][] in designed to perform a security analysis of
Flash applications. It helps to find flaws in Flash applications using
the methodology originally described by Stefano Di Paola in [Testing
Flash Applications][] (May 2007) and in [Finding Vulnerabilities in
Flash Applications][] (Nov 2007).

SWFIntruder was developed using ActionScript, Html and JavaScript
resulting in a tool taking advantage of the best features of those
technologies in order to get the best capabilities for analysis and
interaction with the testing Flash movies.

SWFIntruder was developed by using only open source software. Thanks to
its generality, SWFIntruder is OS independent.

Visit SWFIntruder [home page][OWASP] for more details and the [OWASP
Flash Security Project][] for a broad overview about Flash security.

Goals
-----

SWFIntruder purpose is to analyze a Flash application for version =\< 8
and to help check in a semi automated fashion the presence of security
issues like Cross Site Scripting and Cross Site Flashing.

Moreover does help raise awareness around the subject of flash
applications security and how that can be used to and assist in the
security of applications.
 

Project Sponsors
----------------

The SWF Intruder project is sponsored by [Minded Security][]

  [Stefano Di Paola]: http://www.linkedin.com/in/wisec
  [OWASP]: http://www.owasp.org/index.php/Category:SWFIntruder
  [Testing Flash Applications]: http://www.owasp.org/images/8/8c/OWASPAppSec2007Milan_TestingFlashApplications.ppt
  [Finding Vulnerabilities in Flash Applications]: http://www.owasp.org/images/d/df/SanJose_AppSec2007_DiPaola.ppt
  [OWASP Flash Security Project]: https://www.owasp.org/index.php/Category:OWASP_Flash_Security_Project
  [Minded Security]: http://www.mindedsecurity.com
