/*
 * File:        TableTools.js
 * Version:     2.1.3
 * Description: Tools and buttons for DataTables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Language:    Javascript
 * License:	    GPL v2 or BSD 3 point style
 * Project:	    DataTables
 * 
 * Copyright 2009-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
var TableTools;(function(t,e,n){TableTools=function(e,i){return!this instanceof TableTools&&alert("Warning: TableTools must be initialised with the keyword 'new'"),this.s={that:this,dt:e.fnSettings(),print:{saveStart:-1,saveLength:-1,saveScroll:-1,funcEnd:function(){}},buttonCounter:0,select:{type:"",selected:[],preRowSelect:null,postSelected:null,postDeselected:null,all:!1,selectedClass:""},custom:{},swfPath:"",buttonSet:[],master:!1,tags:{}},this.dom={container:null,table:null,print:{hidden:[],message:null},collection:{collection:null,background:null}},this.classes=t.extend(!0,{},TableTools.classes),this.s.dt.bJUI&&t.extend(!0,this.classes,TableTools.classes_themeroller),this.fnSettings=function(){return this.s},"undefined"==typeof i&&(i={}),this._fnConstruct(i),this},TableTools.prototype={fnGetSelected:function(){var t,e,i=[],n=this.s.dt.aoData;for(t=0,e=n.length;e>t;t++)n[t]._DTTT_selected&&i.push(n[t].nTr);return i},fnGetSelectedData:function(){var t,e,i=[],n=this.s.dt.aoData;for(t=0,e=n.length;e>t;t++)n[t]._DTTT_selected&&i.push(this.s.dt.oInstance.fnGetData(t));return i},fnIsSelected:function(t){var e=this.s.dt.oInstance.fnGetPosition(t);return this.s.dt.aoData[e]._DTTT_selected===!0?!0:!1},fnSelectAll:function(t){var e=this._fnGetMasterSettings();this._fnRowSelect(t===!0?e.dt.aiDisplay:e.dt.aoData)},fnSelectNone:function(t){var e=this._fnGetMasterSettings();this._fnRowDeselect(t===!0?e.dt.aiDisplay:e.dt.aoData)},fnSelect:function(t){this.s.select.type=="single"?(this.fnSelectNone(),this._fnRowSelect(t)):this.s.select.type=="multi"&&this._fnRowSelect(t)},fnDeselect:function(t){this._fnRowDeselect(t)},fnGetTitle:function(t){var e="";if(typeof t.sTitle!="undefined"&&t.sTitle!=="")e=t.sTitle;else{var i=n.getElementsByTagName("title");i.length>0&&(e=i[0].innerHTML)}return"¡".toString().length<4?e.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""):e.replace(/[^a-zA-Z0-9_\.,\-_ !\(\)]/g,"")},fnCalcColRatios:function(t){var e,i,n=this.s.dt.aoColumns,s=this._fnColumnTargets(t.mColumns),o=[],a=0,r=0;for(e=0,i=s.length;i>e;e++)s[e]&&(a=n[e].nTh.offsetWidth,r+=a,o.push(a));for(e=0,i=o.length;i>e;e++)o[e]=o[e]/r;return o.join("	")},fnGetTableData:function(t){return this.s.dt?this._fnGetDataTablesData(t):void 0},fnSetText:function(t,e){this._fnFlashSetText(t,e)},fnResizeButtons:function(){for(var t in ZeroClipboard_TableTools.clients)if(t){var e=ZeroClipboard_TableTools.clients[t];typeof e.domElement!="undefined"&&e.domElement.parentNode&&e.positionElement()}},fnResizeRequired:function(){for(var t in ZeroClipboard_TableTools.clients)if(t){var e=ZeroClipboard_TableTools.clients[t];if(typeof e.domElement!="undefined"&&e.domElement.parentNode==this.dom.container&&e.sized===!1)return!0}return!1},fnPrint:function(t,e){void 0===e&&(e={}),void 0===t||t?this._fnPrintStart(e):this._fnPrintEnd()},fnInfo:function(e,i){var s=n.createElement("div");s.className=this.classes.print.info,s.innerHTML=e,n.body.appendChild(s),setTimeout(function(){t(s).fadeOut("normal",function(){n.body.removeChild(s)})},i)},_fnConstruct:function(t){var e=this;this._fnCustomiseSettings(t),this.dom.container=n.createElement(this.s.tags.container),this.dom.container.className=this.classes.container,this.s.select.type!="none"&&this._fnRowSelectConfig(),this._fnButtonDefinations(this.s.buttonSet,this.dom.container),this.s.dt.aoDestroyCallback.push({sName:"TableTools",fn:function(){e.dom.container.innerHTML=""}})},_fnCustomiseSettings:function(e){typeof this.s.dt._TableToolsInit=="undefined"&&(this.s.master=!0,this.s.dt._TableToolsInit=!0),this.dom.table=this.s.dt.nTable,this.s.custom=t.extend({},TableTools.DEFAULTS,e),this.s.swfPath=this.s.custom.sSwfPath,"undefined"!=typeof ZeroClipboard_TableTools&&(ZeroClipboard_TableTools.moviePath=this.s.swfPath),this.s.select.type=this.s.custom.sRowSelect,this.s.select.preRowSelect=this.s.custom.fnPreRowSelect,this.s.select.postSelected=this.s.custom.fnRowSelected,this.s.select.postDeselected=this.s.custom.fnRowDeselected,this.s.custom.sSelectedClass&&(this.classes.select.row=this.s.custom.sSelectedClass),this.s.tags=this.s.custom.oTags,this.s.buttonSet=this.s.custom.aButtons},_fnButtonDefinations:function(e,i){for(var n,s=0,o=e.length;o>s;s++){if(typeof e[s]=="string"){if(typeof TableTools.BUTTONS[e[s]]=="undefined"){alert("TableTools: Warning - unknown button type: "+e[s]);continue}n=t.extend({},TableTools.BUTTONS[e[s]],!0)}else{if(typeof TableTools.BUTTONS[e[s].sExtends]=="undefined"){alert("TableTools: Warning - unknown button type: "+e[s].sExtends);continue}var a=t.extend({},TableTools.BUTTONS[e[s].sExtends],!0);n=t.extend(a,e[s],!0)}i.appendChild(this._fnCreateButton(n,t(i).hasClass(this.classes.collection.container)))}},_fnCreateButton:function(t,e){var i=this._fnButtonBase(t,e);return t.sAction.match(/flash/)?this._fnFlashConfig(i,t):t.sAction=="text"?this._fnTextConfig(i,t):t.sAction=="div"?this._fnTextConfig(i,t):t.sAction=="collection"&&(this._fnTextConfig(i,t),this._fnCollectionConfig(i,t)),i},_fnButtonBase:function(t,e){var i,s,o;e?(i=t.sTag!=="default"?t.sTag:this.s.tags.collection.button,s=t.sLinerTag!=="default"?t.sLiner:this.s.tags.collection.liner,o=this.classes.collection.buttons.normal):(i=t.sTag!=="default"?t.sTag:this.s.tags.button,s=t.sLinerTag!=="default"?t.sLiner:this.s.tags.liner,o=this.classes.buttons.normal);var a=n.createElement(i),r=n.createElement(s),l=this._fnGetMasterSettings();return a.className=o+" "+t.sButtonClass,a.setAttribute("id","ToolTables_"+this.s.dt.sInstance+"_"+l.buttonCounter),a.appendChild(r),r.innerHTML=t.sButtonText,l.buttonCounter++,a},_fnGetMasterSettings:function(){if(this.s.master)return this.s;for(var t=TableTools._aInstances,e=0,i=t.length;i>e;e++)if(this.dom.table==t[e].s.dt.nTable)return t[e].s},_fnCollectionConfig:function(t,e){var i=n.createElement(this.s.tags.collection.container);i.style.display="none",i.className=this.classes.collection.container,e._collection=i,n.body.appendChild(i),this._fnButtonDefinations(e.aButtons,i)},_fnCollectionShow:function(i,s){var o=this,a=t(i).offset(),r=s._collection,l=a.left,h=a.top+t(i).outerHeight(),c=t(e).height(),u=t(n).height(),d=t(e).width(),p=t(n).width();r.style.position="absolute",r.style.left=l+"px",r.style.top=h+"px",r.style.display="block",t(r).css("opacity",0);var f=n.createElement("div");f.style.position="absolute",f.style.left="0px",f.style.top="0px",f.style.height=(c>u?c:u)+"px",f.style.width=(d>p?d:p)+"px",f.className=this.classes.collection.background,t(f).css("opacity",0),n.body.appendChild(f),n.body.appendChild(r);var m=t(r).outerWidth(),g=t(r).outerHeight();l+m>p&&(r.style.left=p-m+"px"),h+g>u&&(r.style.top=h-g-t(i).outerHeight()+"px"),this.dom.collection.collection=r,this.dom.collection.background=f,setTimeout(function(){t(r).animate({opacity:1},500),t(f).animate({opacity:.25},500)},10),this.fnResizeButtons(),t(f).click(function(){o._fnCollectionHide.call(o,null,null)})},_fnCollectionHide:function(e,i){(null===i||i.sExtends!="collection")&&this.dom.collection.collection!==null&&(t(this.dom.collection.collection).animate({opacity:0},500,function(){this.style.display="none"}),t(this.dom.collection.background).animate({opacity:0},500,function(){this.parentNode.removeChild(this)}),this.dom.collection.collection=null,this.dom.collection.background=null)},_fnRowSelectConfig:function(){if(this.s.master){var e=this,i=this.s.dt;this.s.dt.aoOpenRows,t(i.nTable).addClass(this.classes.select.table),t("tr",i.nTBody).live("click",function(t){this.parentNode==i.nTBody&&i.oInstance.fnGetData(this)!==null&&(e.s.select.preRowSelect===null||e.s.select.preRowSelect.call(e,t))&&(e.fnIsSelected(this)?e._fnRowDeselect(this):e.s.select.type=="single"?(e.fnSelectNone(),e._fnRowSelect(this)):e.s.select.type=="multi"&&e._fnRowSelect(this))}),i.oApi._fnCallbackReg(i,"aoRowCreatedCallback",function(n,s,o){i.aoData[o]._DTTT_selected&&t(n).addClass(e.classes.select.row)},"TableTools-SelectAll")}},_fnRowSelect:function(e){for(var i=this._fnSelectData(e),n=i.length===0?null:i[0].nTr,s=0,o=i.length;o>s;s++)i[s]._DTTT_selected=!0,i[s].nTr&&t(i[s].nTr).addClass(this.classes.select.row);this.s.select.postSelected!==null&&this.s.select.postSelected.call(this,n),TableTools._fnEventDispatch(this,"select",n)},_fnRowDeselect:function(e){for(var i=this._fnSelectData(e),n=i.length===0?null:i[0].nTr,s=0,o=i.length;o>s;s++)i[s].nTr&&i[s]._DTTT_selected&&t(i[s].nTr).removeClass(this.classes.select.row),i[s]._DTTT_selected=!1;this.s.select.postDeselected!==null&&this.s.select.postDeselected.call(this,n),TableTools._fnEventDispatch(this,"select",n)},_fnSelectData:function(t){var e,i,n,s=[];if(t.nodeName)e=this.s.dt.oInstance.fnGetPosition(t),s.push(this.s.dt.aoData[e]);else{if(typeof t.length!="undefined"){for(i=0,n=t.length;n>i;i++)t[i].nodeName?(e=this.s.dt.oInstance.fnGetPosition(t[i]),s.push(this.s.dt.aoData[e])):typeof t[i]=="number"?s.push(this.s.dt.aoData[t[i]]):s.push(t[i]);return s}s.push(t)}return s},_fnTextConfig:function(e,i){var n=this;i.fnInit!==null&&i.fnInit.call(this,e,i),i.sToolTip!==""&&(e.title=i.sToolTip),t(e).hover(function(){i.fnMouseover!==null&&i.fnMouseover.call(this,e,i,null)},function(){i.fnMouseout!==null&&i.fnMouseout.call(this,e,i,null)}),i.fnSelect!==null&&TableTools._fnEventListen(this,"select",function(t){i.fnSelect.call(n,e,i,t)}),t(e).click(function(){i.fnClick!==null&&i.fnClick.call(n,e,i,null),i.fnComplete!==null&&i.fnComplete.call(n,e,i,null,null),n._fnCollectionHide(e,i)})},_fnFlashConfig:function(t,e){var i=this,n=new ZeroClipboard_TableTools.Client;e.fnInit!==null&&e.fnInit.call(this,t,e),n.setHandCursor(!0),e.sAction=="flash_save"?(n.setAction("save"),n.setCharSet(e.sCharSet=="utf16le"?"UTF16LE":"UTF8"),n.setBomInc(e.bBomInc),n.setFileName(e.sFileName.replace("*",this.fnGetTitle(e)))):e.sAction=="flash_pdf"?(n.setAction("pdf"),n.setFileName(e.sFileName.replace("*",this.fnGetTitle(e)))):n.setAction("copy"),n.addEventListener("mouseOver",function(){e.fnMouseover!==null&&e.fnMouseover.call(i,t,e,n)}),n.addEventListener("mouseOut",function(){e.fnMouseout!==null&&e.fnMouseout.call(i,t,e,n)}),n.addEventListener("mouseDown",function(){e.fnClick!==null&&e.fnClick.call(i,t,e,n)}),n.addEventListener("complete",function(s,o){e.fnComplete!==null&&e.fnComplete.call(i,t,e,n,o),i._fnCollectionHide(t,e)}),this._fnFlashGlue(n,t,e.sToolTip)},_fnFlashGlue:function(t,e,i){var s=this,o=e.getAttribute("id");n.getElementById(o)?t.glue(e,i):setTimeout(function(){s._fnFlashGlue(t,e,i)},100)},_fnFlashSetText:function(t,e){var i=this._fnChunkData(e,8192);t.clearText();for(var n=0,s=i.length;s>n;n++)t.appendText(i[n])},_fnColumnTargets:function(t){var e=[],n=this.s.dt;if("object"==typeof t){for(i=0,iLen=n.aoColumns.length;iLen>i;i++)e.push(!1);for(i=0,iLen=t.length;iLen>i;i++)e[t[i]]=!0}else if("visible"==t)for(i=0,iLen=n.aoColumns.length;iLen>i;i++)e.push(n.aoColumns[i].bVisible?!0:!1);else if("hidden"==t)for(i=0,iLen=n.aoColumns.length;iLen>i;i++)e.push(n.aoColumns[i].bVisible?!1:!0);else if("sortable"==t)for(i=0,iLen=n.aoColumns.length;iLen>i;i++)e.push(n.aoColumns[i].bSortable?!0:!1);else for(i=0,iLen=n.aoColumns.length;iLen>i;i++)e.push(!0);return e},_fnNewline:function(t){return t.sNewLine=="auto"?navigator.userAgent.match(/Windows/)?"\r\n":"\n":t.sNewLine},_fnGetDataTablesData:function(e){var i,n,s,o,a,r,l,h=[],c="",u=this.s.dt,d=new RegExp(e.sFieldBoundary,"g"),p=this._fnColumnTargets(e.mColumns),f=typeof e.bSelectedOnly!="undefined"?e.bSelectedOnly:!1;if(e.bHeader){for(a=[],i=0,n=u.aoColumns.length;n>i;i++)p[i]&&(c=u.aoColumns[i].sTitle.replace(/\n/g," ").replace(/<.*?>/g,"").replace(/^\s+|\s+$/g,""),c=this._fnHtmlDecode(c),a.push(this._fnBoundData(c,e.sFieldBoundary,d)));h.push(a.join(e.sFieldSeperator))}var m=u.aiDisplay,g=this.fnGetSelected();if(this.s.select.type!=="none"&&f&&g.length!==0)for(m=[],i=0,n=g.length;n>i;i++)m.push(u.oInstance.fnGetPosition(g[i]));for(s=0,o=m.length;o>s;s++){for(l=u.aoData[m[s]].nTr,a=[],i=0,n=u.aoColumns.length;n>i;i++)if(p[i]){var v=u.oApi._fnGetCellData(u,m[s],i,"display");e.fnCellRender?c=e.fnCellRender(v,i,l,m[s])+"":"string"==typeof v?(c=v.replace(/\n/g," "),c=c.replace(/<img.*?\s+alt\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+)).*?>/gi,"$1$2$3"),c=c.replace(/<.*?>/g,"")):c=v+"",c=c.replace(/^\s+/,"").replace(/\s+$/,""),c=this._fnHtmlDecode(c),a.push(this._fnBoundData(c,e.sFieldBoundary,d))}h.push(a.join(e.sFieldSeperator)),e.bOpenRows&&(r=t.grep(u.aoOpenRows,function(t){return t.nParent===l}),r.length===1&&(c=this._fnBoundData(t("td",r[0].nTr).html(),e.sFieldBoundary,d),h.push(c)))}if(e.bFooter&&u.nTFoot!==null){for(a=[],i=0,n=u.aoColumns.length;n>i;i++)p[i]&&u.aoColumns[i].nTf!==null&&(c=u.aoColumns[i].nTf.innerHTML.replace(/\n/g," ").replace(/<.*?>/g,""),c=this._fnHtmlDecode(c),a.push(this._fnBoundData(c,e.sFieldBoundary,d)));h.push(a.join(e.sFieldSeperator))}return _sLastData=h.join(this._fnNewline(e))},_fnBoundData:function(t,e,i){return""===e?t:e+t.replace(i,e+e)+e},_fnChunkData:function(t,e){for(var i=[],n=t.length,s=0;n>s;s+=e)n>s+e?i.push(t.substring(s,s+e)):i.push(t.substring(s,n));return i},_fnHtmlDecode:function(t){if(t.indexOf("&")==-1)return t;var e,i,s,o,a=this._fnChunkData(t,2048),r=n.createElement("div"),l="";for(e=0,i=a.length;i>e;e++)s=a[e].lastIndexOf("&"),-1!=s&&a[e].length>=8&&s>a[e].length-8&&(o=a[e].substr(s),a[e]=a[e].substr(0,s)),r.innerHTML=a[e],l+=r.childNodes[0].nodeValue;return l},_fnPrintStart:function(i){var s=this,o=this.s.dt;this._fnPrintHideNodes(o.nTable),this.s.print.saveStart=o._iDisplayStart,this.s.print.saveLength=o._iDisplayLength,i.bShowAll&&(o._iDisplayStart=0,o._iDisplayLength=-1,o.oApi._fnCalculateEnd(o),o.oApi._fnDraw(o)),(o.oScroll.sX!==""||o.oScroll.sY!=="")&&this._fnPrintScrollStart(o);var a=o.aanFeatures;for(var r in a)if("i"!=r&&"t"!=r&&r.length==1)for(var l=0,h=a[r].length;h>l;l++)this.dom.print.hidden.push({node:a[r][l],display:"block"}),a[r][l].style.display="none";t(n.body).addClass(this.classes.print.body),i.sInfo!==""&&this.fnInfo(i.sInfo,3e3),i.sMessage&&(this.dom.print.message=n.createElement("div"),this.dom.print.message.className=this.classes.print.message,this.dom.print.message.innerHTML=i.sMessage,n.body.insertBefore(this.dom.print.message,n.body.childNodes[0])),this.s.print.saveScroll=t(e).scrollTop(),e.scrollTo(0,0),t(n).bind("keydown.DTTT",function(t){t.keyCode==27&&(t.preventDefault(),s._fnPrintEnd.call(s,t))})},_fnPrintEnd:function(){var i=this.s.dt,s=this.s.print,o=this.dom.print;this._fnPrintShowNodes(),(i.oScroll.sX!==""||i.oScroll.sY!=="")&&this._fnPrintScrollEnd(),e.scrollTo(0,s.saveScroll),o.message!==null&&(n.body.removeChild(o.message),o.message=null),t(n.body).removeClass("DTTT_Print"),i._iDisplayStart=s.saveStart,i._iDisplayLength=s.saveLength,i.oApi._fnCalculateEnd(i),i.oApi._fnDraw(i),t(n).unbind("keydown.DTTT")},_fnPrintScrollStart:function(){var e=this.s.dt,i=e.nScrollHead.getElementsByTagName("div")[0],n=(i.getElementsByTagName("table")[0],e.nTable.parentNode),s=e.nTable.getElementsByTagName("thead");if(s.length>0&&e.nTable.removeChild(s[0]),e.nTFoot!==null){var o=e.nTable.getElementsByTagName("tfoot");o.length>0&&e.nTable.removeChild(o[0])}s=e.nTHead.cloneNode(!0),e.nTable.insertBefore(s,e.nTable.childNodes[0]),e.nTFoot!==null&&(o=e.nTFoot.cloneNode(!0),e.nTable.insertBefore(o,e.nTable.childNodes[1])),e.oScroll.sX!==""&&(e.nTable.style.width=t(e.nTable).outerWidth()+"px",n.style.width=t(e.nTable).outerWidth()+"px",n.style.overflow="visible"),e.oScroll.sY!==""&&(n.style.height=t(e.nTable).outerHeight()+"px",n.style.overflow="visible")},_fnPrintScrollEnd:function(){var t=this.s.dt,e=t.nTable.parentNode;t.oScroll.sX!==""&&(e.style.width=t.oApi._fnStringToCss(t.oScroll.sX),e.style.overflow="auto"),t.oScroll.sY!==""&&(e.style.height=t.oApi._fnStringToCss(t.oScroll.sY),e.style.overflow="auto")},_fnPrintShowNodes:function(){for(var t=this.dom.print.hidden,e=0,i=t.length;i>e;e++)t[e].node.style.display=t[e].display;t.splice(0,t.length)},_fnPrintHideNodes:function(e){for(var i=this.dom.print.hidden,n=e.parentNode,s=n.childNodes,o=0,a=s.length;a>o;o++)if(s[o]!=e&&s[o].nodeType==1){var r=t(s[o]).css("display");"none"!=r&&(i.push({node:s[o],display:r}),s[o].style.display="none")}n.nodeName!="BODY"&&this._fnPrintHideNodes(n)}},TableTools._aInstances=[],TableTools._aListeners=[],TableTools.fnGetMasters=function(){for(var t=[],e=0,i=TableTools._aInstances.length;i>e;e++)TableTools._aInstances[e].s.master&&t.push(TableTools._aInstances[e]);return t},TableTools.fnGetInstance=function(t){"object"!=typeof t&&(t=n.getElementById(t));for(var e=0,i=TableTools._aInstances.length;i>e;e++)if(TableTools._aInstances[e].s.master&&TableTools._aInstances[e].dom.table==t)return TableTools._aInstances[e];return null},TableTools._fnEventListen=function(t,e,i){TableTools._aListeners.push({that:t,type:e,fn:i})},TableTools._fnEventDispatch=function(t,e,i){for(var n=TableTools._aListeners,s=0,o=n.length;o>s;s++)t.dom.table==n[s].that.dom.table&&n[s].type==e&&n[s].fn(i)},TableTools.buttonBase={sAction:"text",sTag:"default",sLinerTag:"default",sButtonClass:"DTTT_button_text",sButtonText:"Button text",sTitle:"",sToolTip:"",sCharSet:"utf8",bBomInc:!1,sFileName:"*.csv",sFieldBoundary:"",sFieldSeperator:"	",sNewLine:"auto",mColumns:"all",bHeader:!0,bFooter:!0,bOpenRows:!1,bSelectedOnly:!1,fnMouseover:null,fnMouseout:null,fnClick:null,fnSelect:null,fnComplete:null,fnInit:null,fnCellRender:null},TableTools.BUTTONS={csv:t.extend({},TableTools.buttonBase,{sAction:"flash_save",sButtonClass:"DTTT_button_csv",sButtonText:"CSV",sFieldBoundary:'"',sFieldSeperator:",",fnClick:function(t,e,i){this.fnSetText(i,this.fnGetTableData(e))}}),xls:t.extend({},TableTools.buttonBase,{sAction:"flash_save",sCharSet:"utf16le",bBomInc:!0,sButtonClass:"DTTT_button_xls",sButtonText:"Excel",fnClick:function(t,e,i){this.fnSetText(i,this.fnGetTableData(e))}}),copy:t.extend({},TableTools.buttonBase,{sAction:"flash_copy",sButtonClass:"DTTT_button_copy",sButtonText:"Copy",fnClick:function(t,e,i){this.fnSetText(i,this.fnGetTableData(e))},fnComplete:function(t,e,i,n){var s=n.split("\n").length,o=this.s.dt.nTFoot===null?s-1:s-2,a=1==o?"":"s";this.fnInfo("<h6>Table copied</h6><p>Copied "+o+" row"+a+" to the clipboard.</p>",1500)}}),pdf:t.extend({},TableTools.buttonBase,{sAction:"flash_pdf",sNewLine:"\n",sFileName:"*.pdf",sButtonClass:"DTTT_button_pdf",sButtonText:"PDF",sPdfOrientation:"portrait",sPdfSize:"A4",sPdfMessage:"",fnClick:function(t,e,i){this.fnSetText(i,"title:"+this.fnGetTitle(e)+"\n"+"message:"+e.sPdfMessage+"\n"+"colWidth:"+this.fnCalcColRatios(e)+"\n"+"orientation:"+e.sPdfOrientation+"\n"+"size:"+e.sPdfSize+"\n"+"--/TableToolsOpts--\n"+this.fnGetTableData(e))}}),print:t.extend({},TableTools.buttonBase,{sInfo:"<h6>Print view</h6><p>Please use your browser's print function to print this table. Press escape when finished.",sMessage:null,bShowAll:!0,sToolTip:"View print view",sButtonClass:"DTTT_button_print",sButtonText:"Print",fnClick:function(t,e){this.fnPrint(!0,e)}}),text:t.extend({},TableTools.buttonBase),select:t.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(e){this.fnGetSelected().length!==0?t(e).removeClass(this.classes.buttons.disabled):t(e).addClass(this.classes.buttons.disabled)},fnInit:function(e){t(e).addClass(this.classes.buttons.disabled)}}),select_single:t.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(e){var i=this.fnGetSelected().length;1==i?t(e).removeClass(this.classes.buttons.disabled):t(e).addClass(this.classes.buttons.disabled)},fnInit:function(e){t(e).addClass(this.classes.buttons.disabled)}}),select_all:t.extend({},TableTools.buttonBase,{sButtonText:"Select all",fnClick:function(){this.fnSelectAll()},fnSelect:function(e){this.fnGetSelected().length==this.s.dt.fnRecordsDisplay()?t(e).addClass(this.classes.buttons.disabled):t(e).removeClass(this.classes.buttons.disabled)}}),select_none:t.extend({},TableTools.buttonBase,{sButtonText:"Deselect all",fnClick:function(){this.fnSelectNone()},fnSelect:function(e){this.fnGetSelected().length!==0?t(e).removeClass(this.classes.buttons.disabled):t(e).addClass(this.classes.buttons.disabled)},fnInit:function(e){t(e).addClass(this.classes.buttons.disabled)}}),ajax:t.extend({},TableTools.buttonBase,{sAjaxUrl:"/xhr.php",sButtonText:"Ajax button",fnClick:function(e,i){var n=this.fnGetTableData(i);t.ajax({url:i.sAjaxUrl,data:[{name:"tableData",value:n}],success:i.fnAjaxComplete,dataType:"json",type:"POST",cache:!1,error:function(){alert("Error detected when sending table data to server")}})},fnAjaxComplete:function(){alert("Ajax complete")}}),div:t.extend({},TableTools.buttonBase,{sAction:"div",sTag:"div",sButtonClass:"DTTT_nonbutton",sButtonText:"Text button"}),collection:t.extend({},TableTools.buttonBase,{sAction:"collection",sButtonClass:"DTTT_button_collection",sButtonText:"Collection",fnClick:function(t,e){this._fnCollectionShow(t,e)}})},TableTools.classes={container:"DTTT_container",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"},collection:{container:"DTTT_collection",background:"DTTT_collection_background",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"}},select:{table:"DTTT_selectable",row:"DTTT_selected"},print:{body:"DTTT_Print",info:"DTTT_print_info",message:"DTTT_PrintMessage"}},TableTools.classes_themeroller={container:"DTTT_container ui-buttonset ui-buttonset-multi",buttons:{normal:"DTTT_button ui-button ui-state-default"},collection:{container:"DTTT_collection ui-buttonset ui-buttonset-multi"}},TableTools.DEFAULTS={sSwfPath:"/assets/dataTables/extras/swf/copy_csv_xls_pdf.swf",sRowSelect:"none",sSelectedClass:null,fnPreRowSelect:null,fnRowSelected:null,fnRowDeselected:null,aButtons:["copy","csv","xls","pdf","print"],oTags:{container:"div",button:"a",liner:"span",collection:{container:"div",button:"a",liner:"span"}}},TableTools.prototype.CLASS="TableTools",TableTools.VERSION="2.1.3",TableTools.prototype.VERSION=TableTools.VERSION,typeof t.fn.dataTable=="function"&&typeof t.fn.dataTableExt.fnVersionCheck=="function"&&t.fn.dataTableExt.fnVersionCheck("1.9.0")?t.fn.dataTableExt.aoFeatures.push({fnInit:function(t){var e=typeof t.oInit.oTableTools!="undefined"?t.oInit.oTableTools:{},i=new TableTools(t.oInstance,e);return TableTools._aInstances.push(i),i.dom.container},cFeature:"T",sFeature:"TableTools"}):alert("Warning: TableTools 2 requires DataTables 1.9.0 or newer - www.datatables.net/download"),t.fn.DataTable.TableTools=TableTools})(jQuery,window,document);