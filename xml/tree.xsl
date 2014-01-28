<?xml version="1.0" ?>
<!--

  $Id: tree.xsl,v 1.5 2007/05/18 12:03:39 source Exp $

  This file is part of the OpenLink Ajax Toolkit (OAT) project

  Copyright (C) 2005-2007 OpenLink Software

  This project is free software; you can redistribute it and/or modify it
  under the terms of the GNU General Public License as published by the
  Free Software Foundation; only version 2 of the License, dated June 1991

  This project is distributed in the hope that it will be useful, but
  WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software Foundation,
  Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

Modified by Stefano Di Paola @ Minded Security


-->
<xsl:stylesheet version="1.0" xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
    <xsl:output method="html"/>
	<xsl:strip-space elements="*"/>

	<xsl:template name="recursion">
		<xsl:for-each select="node()">
		<li style='overflow:fixed;width: 100%;white-space: nowrap'>
			<xsl:choose>
				<xsl:when test="name()=''">
					<em style='overflow:fixed;cursor: pointer;width: 100%;color: darkred; white-space: nowrap'><xsl:value-of select="." /></em>
				</xsl:when>
				<xsl:otherwise>
				<xsl:value-of select="name()" />
					<ul style="border-left: dashed 1px lightgrey">
						<xsl:for-each select="@*">
							<li>
							<xsl:attribute name="id">
							    <xsl:value-of select="." />
							</xsl:attribute> 
							<span style='overflow:fixed;width: 100%;background-color: #eeeeee; white-space: nowrap' onmouseout='hideTooltip();' onclick='setValueToQuery()' onmouseover='getParents(this,event)'><xsl:value-of select="." /></span>
							</li>
						</xsl:for-each>
						<xsl:call-template name="recursion" />
					</ul>
				</xsl:otherwise>
			</xsl:choose>
		</li>
		</xsl:for-each>
	</xsl:template>
	
    <xsl:template match = "/*"> <!-- see http://www.dpawson.co.uk/xsl/sect2/root.html for explanation -->
	<ul id="tree" class="mktree">
		<li>
			<xsl:value-of select="name()" />
			<ul>
				<xsl:call-template name="recursion" />
			</ul>
		</li>
	</ul>

	
	</xsl:template>
</xsl:stylesheet>
