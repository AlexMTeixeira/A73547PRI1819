<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output encoding="UTF-8" method="html" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <style>
                    table {
                        width: 100%;
                    }
                    td {
                        width: 50%;
                    }
                    .col {
                        column-count: 2;
                    }
                </style>
            </head>
            <body>
                <h1 align="center">Manifesto</h1>
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <div class="col">
            <xsl:apply-templates/>
        </div>
        <hr/>
    </xsl:template>
    
    <xsl:template match="meta/id">
        <b>Identificador: </b> 
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="título">
        <b>Título: </b>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="subtítulo">
        <b>Subtítulo: </b>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="dinício">
        <b>Data de Início: </b>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="dfim">
        <b>Data de Conclusão: </b>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <b>Supervisor: </b>
        <a href="{website}">
            <xsl:value-of select="nome"/>
        </a> : <a href="mailto:{email}">&#9993;</a>
        <br/>
    </xsl:template>
    
    <xsl:template match="equipe">
        <hr/>
        <h3>Equipe:</h3>
        <table>
            <ul>
                <xsl:apply-templates/>
            </ul>
        </table>
        <hr/>
    </xsl:template>

    <xsl:template match="elemento">
       <tr>
           <td>
               <li>
                   <a href="{website}">
                       <xsl:value-of select="nome"/>
                   </a> (<xsl:value-of select="id"/>) : 
                   <a href="mailto:{email}">&#9993;</a>
               </li>
           </td>
           <xsl:apply-templates select="foto"/>
       </tr>
    </xsl:template>
    
    <xsl:template match="foto">
        <td>
            <img src="{./@path}" width="60" height="60"/>
        </td>
    </xsl:template>
    
    <xsl:template match="resumo">
        <hr/>
        <h3>Resumo:</h3>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="para">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="resultados">
        <hr/>
        <h3>Resultados:</h3>
        <ul>
            <xsl:apply-templates/>
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="resultado">
        <li>
            <a href="{./@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>