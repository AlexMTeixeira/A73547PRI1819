<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <style>
                        .index {
                            float: left;
                            width: 20%;
                            height:100%;
                            position: fixed;
                            background-color: #E8E8E8;
                            top: 0;
                            left: 0;
                            overflow: scroll;
                        }
                        .metainfo {
                            float: right;
                            width: 80%;
                            text-align: justify;
                            text-justify: inter-word;
                        }
                        body {
                            font: 18px Baskerville;
                        }
                    </style>
                </head>
                <body>
                    <div class="index">
                        <h2 align="center">Index</h2>
                        <ul style="list-style-type:none">
                            <xsl:apply-templates select="/tstmt/suracoll" mode="index"/>
                        </ul>
                    </div>
                    <div class="metainfo">
                        <xsl:apply-templates mode="body"/>
                    </div>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- INDEX TEMPLATE -->
    <xsl:template match="sura" mode="index">
        <li>
            <a href="sura{count(preceding-sibling::*)+1}.html">
                <xsl:value-of select="bktlong"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- BODY TEMPLATE -->
    <xsl:template match="text()" mode="body" priority="-1"/>
    
    <xsl:template match="tstmt" mode="body">
        <h1 align="center"><xsl:value-of select="coverpg/title"/></h1>
        <h4 align="center"><xsl:value-of select="coverpg/title2"/></h4>
        
        <xsl:apply-templates select="//subtitle" mode="body"/>
        
        <hr/>
        
        <h5 align="center"><xsl:value-of select="preface/ptitle"/></h5>
        <xsl:apply-templates select="preface" mode="body"/>
        
    </xsl:template>
    
    <xsl:template match="text()" mode="paragraph">
        <xsl:value-of select="."/>
    </xsl:template>
    
    <xsl:template match="p" mode="body">
        <p align="center"><xsl:apply-templates mode="paragraph"></xsl:apply-templates></p>
    </xsl:template>
        
    <xsl:template match="i" mode="paragraph">
        <i><xsl:value-of select="."/></i>
    </xsl:template>
    
    <!-- SURA TEMPLATE -->
    <xsl:template match="sura">
        <xsl:result-document href="website/sura{count(preceding-sibling::*)+1}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <style>
                        .suraBar {
                        float: top;
                        width: 100%;
                        height: 3%;
                        position: fixed;
                        background-color: #E8E8E8;
                        top: 0;
                        left: 0;
                        overflow: hidden;
                        }
                        .suraBody {
                            position: absolute;
                            bottom: 0;
                            width: 100%;
                            height: 97%;
                            overflow: scroll;
                        }
                        body {
                            font: 18px Baskerville;
                            background-color: #F8F8F8;
                        }
                    </style>
                </head>
                <body>
                    <div class="suraBar">
                        <table width="100%">
                            <tr>
                                <td width="3%"><h4><a align="center" href="index.html">Index</a></h4></td>
                                <td width="97%"><h3 align="center"><xsl:value-of select="bktlong"/></h3></td>
                            </tr>
                        </table>
                    </div>
                 
                        <div class="suraBody">
                            
                            <h4 align="center"><xsl:value-of select="bktshort"/></h4>
                            <xsl:apply-templates mode="epi"/>
                    
                            <p align="center">
                                <xsl:apply-templates/>
                            </p>
                            <hr/>
                    </div>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="text()" mode="epi" priority="-1"/>
    
    <xsl:template match="epigraph" mode="epi">
        <h5 align="center"><xsl:value-of select="."/></h5>
    </xsl:template>
    
    <xsl:template match="v">
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>

    <xsl:template match="text()" priority="-1"/>
    
</xsl:stylesheet>