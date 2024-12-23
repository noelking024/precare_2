function UEAjaxSearch(){var g_objWrapper,g_urlBase,g_cache={},g_objInput,g_searchItemIndex,g_objSearchBtn,g_pageNumber,g_paginationList,g_paginationInner,g_paginationHeader,g_postItem,g_activeItemClass,g_inActiveItemClass,g_arrowLeft,g_arrowRight,g_selectedItemClass,g_activePageIndex,g_homeUrl,g_objSuggested,g_objSuggestedLinks;var g_objItemsWrapper,g_objError;var g_vars={CLASS_DIV_DEBUG:"uc-div-ajax-debug"};var g_temp={handle:null,trashold:500,lastRequest:null};function trace(str){console.log(str);}
function runWithTrashold(func,trashold){if(g_temp.handle)
clearTimeout(g_temp.handle);g_temp.handle=setTimeout(func,g_temp.trashold);};function replaceAll(text,from,to){return text.split(from).join(to);};function addUrlParam(url,param,value){if(url.indexOf("?")==-1)
url+="?";else
url+="&";if(typeof value=="undefined")
url+=param;else
url+=param+"="+value;return(url);}
function getVal(obj,name,defaultValue){if(!defaultValue)
var defaultValue="";var val="";if(!obj||typeof obj!="object")
val=defaultValue;else if(obj.hasOwnProperty(name)==false){val=defaultValue;}else{val=obj[name];}
return(val);}
function ___________AJAX____________(){}
function showAjaxError(message){g_objWrapper.removeClass("uc-loading");g_objError.show();g_objError.html(message);}
function getDebugObject(){var objDebug=g_objWrapper.siblings("."+g_vars.CLASS_DIV_DEBUG);if(objDebug.length)
return(objDebug);g_objWrapper.after("<div class='"+g_vars.CLASS_DIV_DEBUG+"' style='padding:10px;display:none;background-color:#D8FCC6'></div>");var objDebug=jQuery("body").find("."+g_vars.CLASS_DIV_DEBUG);return(objDebug);}
function showAjaxDebug(str){trace("Ajax Error! - Check the debug");str=jQuery.trim(str);if(!str||str.length==0)
return(false);var objStr=jQuery(str);if(objStr.find("header").length||objStr.find("body").length){str="Wrong ajax response!";}
var objDebug=getDebugObject();if(!objDebug||objDebug.length==0){alert(str);throw new Error("debug not found");}
g_objItemsWrapper.hide();objDebug.show();objDebug.html(str);}
function getResponseFromAjaxCache(ajaxUrl,action,objData){var cacheKey=getAjaxCacheKey(ajaxUrl,action,objData);if(!cacheKey)
return(false);var response=getVal(g_cache,cacheKey);return(response);}
function getAjaxCacheKeyFromUrl(ajaxUrl){var key=ajaxUrl;key=key.replace(g_urlBase,"");key=replaceAll(key,"../index.html","");key=replaceAll(key,"?","_");key=replaceAll(key,"&","_");key=replaceAll(key,"=","_");return(key);}
function getAjaxCacheKey(ajaxUrl,action,objData){if(jQuery.isEmptyObject(objData)==false)
return(false);if(action)
return(false);var cacheKey=getAjaxCacheKeyFromUrl(ajaxUrl);if(!cacheKey)
return(false);return(cacheKey);}
function cacheAjaxResponse(ajaxUrl,action,objData,response){var cacheKey=getAjaxCacheKey(ajaxUrl,action,objData);if(!cacheKey)
return(false);if(g_cache.length>100)
return(false);g_cache[cacheKey]=response;}
function ajaxRequest(ajaxUrl,action,objData,onSuccess){if(!objData)
var objData={};if(typeof objData!="object")
throw new Error("wrong ajax param");var responseFromCache=getResponseFromAjaxCache(ajaxUrl,action,objData);if(responseFromCache){setTimeout(function(){onSuccess(responseFromCache);},300);return(false);}
var ajaxData={};ajaxData["action"]="unlimitedelements_ajax_action";ajaxData["client_action"]=action;var ajaxtype="get";if(jQuery.isEmptyObject(objData)==false){ajaxData["data"]=objData;ajaxtype="post";}
var ajaxOptions={type:ajaxtype,url:ajaxUrl,success:function(response){if(!response){showAjaxError("Empty ajax response!");return(false);}
if(typeof response!="object"){try{response=jQuery.parseJSON(response);}catch(e){showAjaxDebug(response);showAjaxError("Ajax Error!!! not ajax response");return(false);}}
if(response==-1){showAjaxError("ajax error!!!");return(false);}
if(response==0){showAjaxError("ajax error, action: <b>"+action+"</b> not found");return(false);}
if(response.success==undefined){showAjaxError("The 'success' param is a must!");return(false);}
if(response.success==false){showAjaxError(response.message);return(false);}
cacheAjaxResponse(ajaxUrl,action,objData,response);if(typeof onSuccess=="function"){onSuccess(response);}},error:function(jqXHR,textStatus,errorThrown){switch(textStatus){case"parsererror":case"error":showAjaxDebug(jqXHR.responseText);break;}}}
if(ajaxtype=="post"){ajaxOptions.dataType='json';ajaxOptions.data=ajaxData}
if(g_temp.currentRequest)
g_temp.currentRequest.abort();g_temp.currentRequest=jQuery.ajax(ajaxOptions);}
function ____________ACTIONS___________(){}
function clearAll(){g_objItemsWrapper.hide();g_objError.hide();}
function getAjaxRequestUrl(){var searchValue=g_objInput.val();searchValue=encodeURIComponent(searchValue);if(!searchValue){clearAll();return(false);}
var objWidget=g_objWrapper.parents(".elementor-widget");if(objWidget.length==0)
throw new Error("widget not found");var elementID=objWidget.data("id");if(!elementID)
throw new Error("element id not found");var objLayout=g_objWrapper.parents(".elementor");if(objLayout.length==0)
throw new Error("Layout not found");var layoutID=objLayout.data("elementor-id");if(!layoutID)
throw new Error("Layout ID not found");var url=g_urlBase;url=addUrlParam(url,"ucfrontajaxaction","ajaxsearch");url=addUrlParam(url,"ucs",searchValue);url=addUrlParam(url,"layoutid",layoutID);url=addUrlParam(url,"elid",elementID);var addUrlFilters=g_objWrapper.triggerHandler("uc_get_filters_url");if(addUrlFilters)
url+="&"+addUrlFilters;return(url);}
function operateAjax_setHtmlDebug(response,objGrid){var htmlDebug=getVal(response,"html_debug");if(!htmlDebug)
return(false);var objDebug=objGrid.siblings(".uc-debug-query-wrapper");if(objDebug.length==0)
return(false);objDebug.replaceWith(htmlDebug);}
function handleResponse(response){var htmlItems=getVal(response,"html_items");g_objItemsWrapper.html(htmlItems);g_objItemsWrapper.show();operateAjax_setHtmlDebug(response,g_objWrapper);}
function placeSuggestedSearches(){if(!g_objSuggested.length)
return(false);var suggestedItemsArray=g_objSuggested.text().split(/\r?\n/);var suggestedItemsLength=suggestedItemsArray.length;g_objSuggested.html("");for(let i=0;i<suggestedItemsLength;i++){suggestedItemsArray[i]=jQuery.trim(suggestedItemsArray[i]);g_objSuggested.append("<a class='uc-ajax-search__suggested-link' href='javascript:void(0)'>"+suggestedItemsArray[i]+"</a>");}
g_objSuggestedLinks=g_objSuggested.find(".uc-ajax-search__suggested-link");for(let i=0;i<suggestedItemsLength-1;i++){g_objSuggestedLinks.eq(i).append(", ");}}
function createPaginationElement(){var isPaginationExist=g_objItemsWrapper.data('pagination');if(isPaginationExist==false)
return(false);if(!g_objItemsWrapper.is(":visible"))
return(false);g_objItemsWrapper.prepend('<div class="uc-pagination-panel"></div>');var paginationPanel=g_objWrapper.find('.uc-pagination-panel');var itemsNumber=g_objItemsWrapper.children().length-1;paginationPanel.append('<div class="uc-pagination-list"></div>');paginationPanel.append('<div class="uc-pagination-footer"></div>');var paginationPosition=g_objItemsWrapper.data('pagination-position');if(paginationPosition=='before')
paginationPanel.prepend('<div class="uc-pagination-header"></div>');if(paginationPosition=='after')
paginationPanel.append('<div class="uc-pagination-header"></div>');g_paginationHeader=g_objWrapper.find('.uc-pagination-header');g_paginationList=g_objWrapper.find('.uc-pagination-list');var paginationFooter=g_objWrapper.find('.uc-pagination-footer');var itemsPerPage=g_objItemsWrapper.data('num-items');var resultsText=g_objItemsWrapper.data('results-text');if(itemsNumber==0){var noResultsText=g_objItemsWrapper.data('no-results-text');g_paginationHeader.prepend('<div class="uc-ajax-search-results">'+noResultsText+'</div>');}else if(itemsNumber==1){g_paginationHeader.prepend('<div class="uc-ajax-search-results">'+itemsNumber+' '+resultsText+'</div>');}else{g_paginationHeader.prepend('<div class="uc-ajax-search-results"></div>');var resultsElement=g_objWrapper.find('.uc-ajax-search-results');var firstNum=itemsPerPage*(g_activePageIndex+1)-itemsPerPage+1;var lastNum=itemsPerPage*(g_activePageIndex+1);if(lastNum>itemsNumber&&itemsPerPage<itemsNumber)
lastNum=itemsNumber
if(firstNum==itemsNumber&&itemsPerPage<itemsNumber)
resultsElement.text(firstNum+'/'+itemsNumber);else if(itemsPerPage>=itemsNumber)
resultsElement.text(itemsNumber+' '+resultsText);else
resultsElement.text(firstNum+'-'+lastNum+'/'+itemsNumber);}
g_paginationHeader.append('<div class="uc-ajax-search-navigation-panel"></div>');var paginationPanel=g_objWrapper.find('.uc-ajax-search-navigation-panel');paginationPanel.append('<div class="uc-ajax-search-pages"></div>');paginationPanel.append('<div class="uc-ajax-arrows"></div>');if(itemsNumber<=itemsPerPage){g_paginationList.append('<div class="uc-pagination-list-inner"></div>');g_paginationInner=g_objItemsWrapper.find('.uc-pagination-list-inner');var searchItems=g_objItemsWrapper.find('.uc-search-item');g_paginationInner.append(searchItems);g_paginationInner.addClass(g_activeItemClass);return(false);}
var pageNumber=Math.ceil(itemsNumber/itemsPerPage);var pageWrapper=g_objWrapper.find('.uc-ajax-search-pages');var arrowsWrapper=g_objWrapper.find('.uc-ajax-arrows');arrowsWrapper.append('<div class="uc-ajax-arrow-left"></div>');arrowsWrapper.append('<div class="uc-ajax-arrow-right"></div>');g_arrowLeft=g_objWrapper.find('.uc-ajax-arrow-left');g_arrowRight=g_objWrapper.find('.uc-ajax-arrow-right');if(g_activePageIndex<=0&&g_arrowLeft)
g_arrowLeft.addClass(g_inActiveItemClass);for(let page=1;page<=pageNumber;page++){pageWrapper.append('<a class="uc-page-number" href="javascript:void(0)">'+page+'</a>');g_paginationList.append('<div class="uc-pagination-list-inner"></div>');}
g_pageNumber=g_objItemsWrapper.find('.uc-page-number');g_pageNumber.eq(0).addClass(g_activeItemClass);g_paginationInner=g_objItemsWrapper.find('.uc-pagination-list-inner');g_paginationInner.eq(0).addClass(g_activeItemClass);var searchItem=g_objItemsWrapper.find('.uc-search-item');for(let i=itemsPerPage;i<=itemsNumber;i=i+itemsPerPage){var searchItemRange=searchItem.slice(i-itemsPerPage,i);g_paginationInner.eq((i/itemsPerPage)-1).append(searchItemRange);}
g_objItemsWrapper.trigger('pages_created');if(itemsNumber%itemsPerPage==0)
return(false);var firstItemIndex=itemsNumber-(itemsNumber%itemsPerPage);var lastItemIndex=itemsNumber;if(firstItemIndex==lastItemIndex){g_paginationInner.eq(-1).append(searchItem.eq(lastItemIndex));return(false);}
var searchItemLastRange=searchItem.slice(firstItemIndex,lastItemIndex);g_paginationInner.eq(-1).append(searchItemLastRange);}
function onInputClick(){focusOnInput();}
function onPageNumberClick(){var objNumber=jQuery(this);var objNumberIndex=objNumber.index();g_activePageIndex=objNumberIndex;if(g_pageNumber)
var pageNumber=g_pageNumber.length-1;if(g_arrowLeft)
g_arrowLeft.removeClass(g_inActiveItemClass);if(g_arrowRight)
g_arrowRight.removeClass(g_inActiveItemClass);if(g_activePageIndex>=pageNumber&&g_arrowRight)
g_arrowRight.addClass(g_inActiveItemClass);if(g_activePageIndex<=0&&g_arrowLeft)
g_arrowLeft.addClass(g_inActiveItemClass);setActive();}
function setActive(){var totalPageNumber=g_paginationInner.length;if(totalPageNumber<=1)
return(false);g_pageNumber.removeClass(g_activeItemClass);g_pageNumber.eq(g_activePageIndex).addClass(g_activeItemClass);g_paginationInner.removeClass(g_activeItemClass);g_paginationInner.eq(g_activePageIndex).addClass(g_activeItemClass);g_searchItemIndex=0;var isDirectionRtl=jQuery("body").hasClass("rtl");if(isDirectionRtl==false){g_paginationList.css({'transform':'translate(-'+g_activePageIndex+'00%, 0)'});}
if(isDirectionRtl==true){g_paginationList.css({'transform':'translate('+g_activePageIndex+'00%, 0)'});}
var totalItems=g_objWrapper.find('.uc-search-item').length;if(totalItems==1)
return(false);var resultsElement=g_objWrapper.find('.uc-ajax-search-results');var itemsPerPage=g_objItemsWrapper.data('num-items');var firstNum=itemsPerPage*(g_activePageIndex+1)-itemsPerPage+1;var lastNum=itemsPerPage*(g_activePageIndex+1);if(lastNum>totalItems)
lastNum=totalItems;if(firstNum==totalItems)
resultsElement.text(firstNum+'/'+totalItems);else
resultsElement.text(firstNum+'-'+lastNum+'/'+totalItems);}
function onArrowLeftClick(){if(g_arrowRight)
g_arrowRight.removeClass(g_inActiveItemClass);g_activePageIndex--;if(g_activePageIndex<=0){g_activePageIndex=0;if(g_arrowLeft)
g_arrowLeft.addClass(g_inActiveItemClass);}
setActive();}
function onArrowRightClick(){if(g_arrowLeft)
g_arrowLeft.removeClass(g_inActiveItemClass);g_activePageIndex++;if(g_pageNumber)
var pageNumber=g_pageNumber.length-1;if(g_activePageIndex>=pageNumber){g_activePageIndex=pageNumber;if(g_arrowRight)
g_arrowRight.addClass(g_inActiveItemClass);}
setActive();}
function appendCustomLinksEnding(){var dataLinksEnding=g_objItemsWrapper.data("linksending");if(dataLinksEnding==false)
return(false);var dataLinksEndingText=g_objItemsWrapper.data("linksendingtext");var objLinks=g_objItemsWrapper.find("a");if(!objLinks||objLinks.length==0)
return(false);objLinks.each(function(){var objLink=jQuery(this);var linkHref=objLink.attr("href");if(!linkHref)
return(true);var islinkClickable=linkHref!="javascript:void(0);";if(islinkClickable==false)
return(true);var newLink=linkHref+"?ue-search-phrase="+dataLinksEndingText;objLink.attr("href",newLink);});}
function doSearch(){var url=getAjaxRequestUrl();if(g_objInput.val()=='')
return(false);if(!url)
throw new Error("Error in ajax url");g_objError.hide();g_objItemsWrapper.hide();g_objWrapper.addClass("uc-loading");ajaxRequest(url,null,null,function(response){g_objWrapper.removeClass("uc-loading");handleResponse(response);g_objInput.data('lastphrase',g_objInput.val());createPaginationElement();highlightSearchTerm(g_objInput.val());appendCustomLinksEnding();});}
function focusOnInput(){g_objInput.addClass(g_activeItemClass);}
function markSubstring(objResultText,text,substring){let regex=new RegExp(substring,"gi");var isCapitalized=objResultText.css('text-transform')=='capitalize';return text.replace(regex,(match)=>{if(isCapitalized==false)
return"<b>"+match+"</b>"
if(isCapitalized==true)
return"<b class='uc-capitalized'>"+match+"</b>"});}
function highlightSearchTerm(searchTerm){var boldSearchPhrase=g_objItemsWrapper.data("bold-phrase");if(boldSearchPhrase==false)
return(false);var resultTitles=g_objItemsWrapper.find(".uc-search-item__link-title");resultTitles.each(function(){var objResultText=jQuery(this);var resultTitleText=objResultText.text();var highlightedText=markSubstring(objResultText,resultTitleText,searchTerm);objResultText.html(highlightedText);});}
function onInputChange(){var newPhrase=g_objInput.val();var lastPhrase=g_objInput.data('lastphrase');checkInput();var isSearchWindowClosed=!g_objItemsWrapper.is(":visible");if(isSearchWindowClosed==false){if(jQuery.trim(lastPhrase)==jQuery.trim(newPhrase))
return(false);}
g_objItemsWrapper.hide();runWithTrashold(doSearch);g_searchItemIndex=-1;}
function onKeyDown(e){if(!g_objInput.is(":focus"))
return(false);var isKeysActivated=g_objItemsWrapper.data('keys');if(isKeysActivated==false)
return(true);if(!g_objItemsWrapper.is(":visible"))
return(true);if(e.keyCode==37||e.keyCode==39){if(g_objInput.hasClass(g_activeItemClass))
return(true);if(e.keyCode==37)
g_activePageIndex--;if(e.keyCode==39)
g_activePageIndex++;if(g_pageNumber)
var pageNumber=g_pageNumber.length-1;if(g_arrowLeft)
g_arrowLeft.removeClass(g_inActiveItemClass);if(g_arrowRight)
g_arrowRight.removeClass(g_inActiveItemClass);if(g_activePageIndex>=pageNumber){g_activePageIndex=pageNumber;if(g_arrowRight)
g_arrowRight.addClass(g_inActiveItemClass);}
if(g_activePageIndex<=0){g_activePageIndex=0;if(g_arrowLeft)
g_arrowLeft.addClass(g_inActiveItemClass);}
setActive();}
var itemsMaxNumber;g_postItem=g_objItemsWrapper.find('.uc-pagination-list-inner.uc-active .uc-search-item');itemsMaxNumber=g_objItemsWrapper.find('.uc-pagination-list-inner.uc-active').children().length;var postItemNumber=g_postItem.length;if(e.keyCode==40||e.keyCode==38||e.keyCode==13||e.keyCode==8&&!g_objInput.hasClass(g_activeItemClass)||e.keyCode==27||e.keyCode==37||e.keyCode==39){e.preventDefault();}else{g_searchItemIndex=postItemNumber;focusOnInput();}
if(e.keyCode!=37||e.keyCode!=39)
g_postItem.removeClass(g_selectedItemClass);if(e.keyCode==40)
g_searchItemIndex++;if(e.keyCode==38)
g_searchItemIndex--;if(g_searchItemIndex<-1)
g_searchItemIndex=itemsMaxNumber-1;if(g_searchItemIndex==-1)
g_searchItemIndex=itemsMaxNumber;if(g_searchItemIndex>postItemNumber||g_searchItemIndex>itemsMaxNumber)
g_searchItemIndex=0;if(g_searchItemIndex>=itemsMaxNumber&&e.keyCode==38||g_searchItemIndex>=itemsMaxNumber&&e.keyCode==40){focusOnInput();}
if(g_searchItemIndex<itemsMaxNumber&&e.keyCode==38||g_searchItemIndex<itemsMaxNumber&&e.keyCode==40){g_objInput.removeClass(g_activeItemClass);}
var selectedItem=g_postItem.eq(g_searchItemIndex);selectedItem.addClass(g_selectedItemClass);var selectedItemLink=selectedItem.find('.uc-search-item__link');var selectedItemLinkUrl=selectedItemLink.attr('href');var goToSearchPageOnEnter=g_objItemsWrapper.data("goto-on-enter");if(e.keyCode==13&&goToSearchPageOnEnter==true&&!g_objInput.hasClass(g_activeItemClass))
window.open(selectedItemLinkUrl,'_blank');if(e.keyCode==13&&goToSearchPageOnEnter==true&&g_objInput.hasClass(g_activeItemClass)){var searchPhrase=g_objInput.val();var homeUrlTarget=g_objInput.data('open-homeurl');window.open(g_homeUrl+'?s='+searchPhrase,homeUrlTarget);}
if(e.keyCode==27){g_objItemsWrapper.hide();focusOnInput();}
if(e.keyCode==8&&!g_objInput.hasClass(g_activeItemClass)){g_objItemsWrapper.hide();focusOnInput();}
if(e.keyCode==9){g_objItemsWrapper.hide();g_objInput.removeClass(g_activeItemClass);}}
function closeDropdownOnBodyClick(event){if(jQuery(event.target).parents().hasClass('uc-ajax-search__items'))
return(false);if(jQuery(event.target).parents().hasClass('uc-ajax-search__suggested'))
return(false);if(!jQuery(event.target).closest(g_objInput).length){g_objInput.blur();g_objItemsWrapper.hide();g_objInput.removeClass(g_activeItemClass);}else{g_objInput.focus();}}
function onSearchButtonClick(){var searchPhrase=g_objInput.val();var homeUrlTarget=g_objInput.data('open-homeurl');var dataPageUrl=g_objSearchBtn.data('page-url');if(dataPageUrl=='')
window.open(g_homeUrl+'?s='+searchPhrase,homeUrlTarget);else
window.open(g_homeUrl+'/'+dataPageUrl+'/s='+searchPhrase,homeUrlTarget);}
function onSuggestedLinkClick(){var objSuggestedItem=jQuery(this);var objSuggestedItemText=objSuggestedItem.text();objSuggestedItemText=jQuery.trim(objSuggestedItemText);objSuggestedItemText=objSuggestedItemText.replace(",","");focusOnInput();g_objInput.val(objSuggestedItemText);g_objInput.trigger("input");}
function checkInput(){if(!g_objSearchBtn.length)
return(false);var isSearchFieldEmpty=g_objInput.val()=="";if(isSearchFieldEmpty==false){g_objSearchBtn.removeClass(g_inActiveItemClass);return(false);}
g_objSearchBtn.addClass(g_inActiveItemClass);}
function initEvents(){g_objInput.on("input",onInputChange);g_objInput.on("keydown",onKeyDown);g_objInput.on('click',onInputClick);g_objSearchBtn.on('click',onSearchButtonClick);g_objSuggestedLinks.on('click',onSuggestedLinkClick);jQuery(document).on('click',function(event){closeDropdownOnBodyClick(event);});g_objItemsWrapper.on('pages_created',function(){g_pageNumber.on('click',onPageNumberClick);g_arrowLeft.on('click',onArrowLeftClick);g_arrowRight.on('click',onArrowRightClick);});}
this.init=function(urlAjax,id,homeUrl){g_objWrapper=jQuery("#"+id);if(g_objWrapper.length==0)
throw new Error("Widget not found by ID: "+id);g_urlBase=urlAjax;g_homeUrl=homeUrl;if(!g_urlBase)
throw new Error("ajax url not found");g_objInput=g_objWrapper.find(".uc-ajax-search__input");if(g_objInput.length==0)
throw new Error("ajax input not found");g_objItemsWrapper=g_objWrapper.find(".uc-ajax-search__items");if(g_objItemsWrapper.length==0)
throw new Error("items wrapper not found");g_objSearchBtn=g_objWrapper.find('.uc-ajax-search__btn');g_activeItemClass='uc-active';g_inActiveItemClass='uc-inactive';g_selectedItemClass='uc-selected';g_searchItemIndex=-1;g_activePageIndex=0;g_objError=g_objWrapper.find(".uc-ajax-search__error");g_objSuggested=g_objWrapper.find(".uc-ajax-search__suggested");g_objSuggestedLinks=g_objWrapper.find(".uc-ajax-search__suggested-link");g_objInput.val("");checkInput();placeSuggestedSearches();var isInEditor=g_objItemsWrapper.data('editor');var dataDebugList=g_objItemsWrapper.data('debug-list');if(isInEditor=='yes'&&dataDebugList==true)
createPaginationElement();if(isInEditor=='no')
initEvents();}}