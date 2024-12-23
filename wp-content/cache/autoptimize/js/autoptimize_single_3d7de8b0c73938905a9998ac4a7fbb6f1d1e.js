function ueMegaMenu(){var g_menu,g_menuSection,g_menuItem,g_menuListWrap,g_indicator,g_translateX,g_menuList,g_objBody,g_objHtml,g_dataMenuOpen,g_objOverlay,g_menuWrapOffsetLeft,g_viewportWidth,g_dataPositionX,g_dataEditor,g_menuItemTitle,g_showErrors,g_offsetX,g_urlBase,g_dataCloseDelay;var g_classActive,g_classSection,g_menuActiveClass;var g_isDesktopViewport,g_isNotDesktopViewport,g_isCustomResponsiveViewport,g_isNotCustomResponsiveViewport;var g_arrItems;function setTemplateStyle(){var objLayout=jQuery('.uc-template-wrapper .elementor');var objLayoutClass=objLayout.attr('class');g_menu.addClass(objLayoutClass);}
function hideIcon(objSection){if(g_indicator.length==0)
return(false);var objSectionArrow=objSection.find(".sub-arrow");var objSectionTitle=objSection.find('.uc-mega_menu_title');var dataClickable=objSectionTitle.data('clickable-link');if(dataClickable==false)
return(false);if(dataClickable==true&&g_dataMenuOpen=='click')
objSectionArrow.hide();}
function findSections(objSection,menuSectionParent,menuSectionItem,firstMenuSectionParent){var clonedSectionItem;if(g_dataEditor=='yes')
clonedSectionItem=menuSectionItem.clone();if(g_dataEditor=='no')
clonedSectionItem=menuSectionItem.detach();menuSectionParent.html(clonedSectionItem);hideIcon(objSection);var objMenuSection=menuSectionParent.children();objMenuSection.addClass("uc-connected");if(!objMenuSection.hasClass("uc-connected"))
return(true);setTimeout(function(){objMenuSection.css({'position':'absolute','visibility':'hidden'});var dataOpenFirstItem=g_menuList.data('open-first');if(dataOpenFirstItem==false)
return(false);var firstObjMenuSection=firstMenuSectionParent.children();firstObjMenuSection.css({'position':'','visibility':'visible'});},200)}
function showHideErrors(objSection,menuSectionId,menuSectionParent,menuSectionItem){if(g_showErrors==false)
return(false);if(menuSectionItem.length>0)
return(false);var menuItemTitle=objSection.find('.uc-mega_menu_title');var menuItemTitleType=menuItemTitle.data('type');if(menuItemTitleType=='link')
return(false);objSection.addClass('section-error');menuSectionParent.addClass('section-error');menuSectionParent.html("<div class='uc-section-error'><div class='uc-error'>Couldn't find a section with id: '"+menuSectionId+"'</div></div>");}
function debugHiddenElements(){if(g_dataEditor=='no')
return(false);var menuTemplate=jQuery(".uc-template-wrapper");var dataDebug=g_menu.data("debug");if(dataDebug==false)
return(false);menuTemplate.css({'display':''});}
function setFullWidth(menuSectionParent){menuSectionParent.css({'width':g_viewportWidth+'px','top':'100%','left':-g_menuWrapOffsetLeft+'px','transform':'translate(0, 0)','right':'unset'});var menuItemParent=menuSectionParent.parents(".uc-mega_menu_list_item");menuItemParent.css({'position':'static'});}
function setScreenStartPos(menuSectionParent){menuSectionParent.css({'left':-g_menuWrapOffsetLeft+'px','transform':'translate(0, 0)'});var objElementorParent=g_menu.parents('.elementor');if(objElementorParent.length>0){var elementorParentOffsetLeft=jQuery(objElementorParent[0]).offset().left;menuSectionParent.css({'left':-g_menuWrapOffsetLeft+elementorParentOffsetLeft+'px',});}}
function setWidthType(widthType,widthTypeFull,widthTypeCustom,customWidthNumber,menuSectionParent,each){var objElementorParent=g_menu.parents('.elementor');if(objElementorParent.length>0){var elementorParentWidth=jQuery(objElementorParent[0]).width();menuSectionParent.css({'max-width':elementorParentWidth+'px'});}
if(widthType==widthTypeFull){setScreenStartPos(menuSectionParent);menuSectionParent.css({'width':g_viewportWidth+'px'});return(false);}
if(widthType==widthTypeCustom){menuSectionParent.css({'width':customWidthNumber+'px'});}
if(customWidthNumber=='0'||customWidthNumber==''||customWidthNumber>=g_viewportWidth){setFullWidth(menuSectionParent);}else{g_menuItem.eq(each).css({'position':'relative'});if(g_dataPositionX=="item_left"){menuSectionParent.css({'left':'0'});}
if(g_dataPositionX=="item_right"){menuSectionParent.css({'left':'unset','right':'0'});}
if(g_dataPositionX=="item_center"){menuSectionParent.css({'left':'50%','right':'unset'});}}}
function handleWidthType(){var menuItemsNumber=g_menuItem.length;for(let i=0;i<menuItemsNumber;i++){var menuSectionParent=g_menuItem.eq(i).find('.uc-mega_menu_section');var widthType=g_arrItems[i].dropdown_width;var customWidthNumber=g_arrItems[i].dropdown_width_number;setWidthType(widthType,'full','custom',customWidthNumber,menuSectionParent,i);if(widthType=='default'){var defaultWidthType=g_menuList.data('default-width-type');var defaultWidthNumber=g_menuList.data('default-width-number');setWidthType(defaultWidthType,'default_full','default_custom',defaultWidthNumber,menuSectionParent,i)}}}
function showHideMenuItemsId(){var debugMenuItemsId=g_menu.data("items-id");if(debugMenuItemsId==false)
return(false);g_menuListWrap.append("<div class='available_id_s'>Item Id's List<ul class='available_item_id_s_list'></ul></div>");var objItemIdList=g_menu.find(".available_item_id_s_list");var menuItemsNumber=g_menuItem.length;for(let i=0;i<=menuItemsNumber-1;i++){var objMenuItem=g_menuItem.eq(i);var objMenuItemDataId=objMenuItem.data("id");if(!objMenuItemDataId){continue;}else{objItemIdList.append("<li>"+objMenuItemDataId+"</li>");}}}
function showHideElementsId(){var debugElementsId=g_menu.data("elements-id");if(debugElementsId==false)
return(false);g_menuListWrap.append("<div class='available_id_s'>Section Id's List<ul class='available_section_id_s_list'></ul></div>");var objSectionIdList=g_menu.find(".available_section_id_s_list");var availableSections=jQuery('section');availableSections.each(function(){var objSectionItem=jQuery(this);var objSectionItemId=objSectionItem.attr('id');var objSectionItemDisplay=objSectionItem.css('display');if(objSectionItemDisplay=='none')
return(true);if(!objSectionItemId){return(true);}
if(objSectionItem.hasClass("uc-connected")){return(true);}else{objSectionIdList.append("<li>"+objSectionItemId+"</li>");}});}
function setOverlayPosition(activeMenuItem){var dataOverlay=g_objOverlay.data('overlay');if(dataOverlay==false)
return(false);if(g_isCustomResponsiveViewport.matches==true||!activeMenuItem.length)
return(false);var g_menuListWrapOffsetTop=g_menuListWrap.offset().top;var g_menuListWrapOffsetHeight=g_menuListWrap.height();var documentOffsetHeight=jQuery(document).height();var g_objOverlayOffsetTop=g_menuListWrapOffsetTop+g_menuListWrapOffsetHeight;var g_objOverlayOffsetHeight=documentOffsetHeight-g_objOverlayOffsetTop;g_objOverlay.show();var dataOverlayPosition=g_objOverlay.data('overlay-position');g_objOverlay.css({'width':g_viewportWidth+'px','left':-g_menuWrapOffsetLeft+'px','transform':'translate(0, 0)','height':g_objOverlayOffsetHeight+'px'});if(dataOverlayPosition=='under')
return(false);var overlayTopPosition=-g_menuListWrapOffsetTop;g_objOverlay.css({'top':overlayTopPosition+'px','height':documentOffsetHeight+'px'});}
function setDisactiveResponsiveHeight(){if(g_isNotCustomResponsiveViewport.matches==true)
return(false);g_menuSection.css({'height':'0px'});}
function setActiveResponsiveHeight(activeMenuItem){if(!activeMenuItem)
return(false);var menuSectionActive=activeMenuItem.find(g_classSection);var menuSectionActiveChild=menuSectionActive.children();var menuSectionActiveHeight=menuSectionActiveChild.outerHeight();if(g_menuSection.hasClass(g_classActive)){setDisactiveResponsiveHeight();menuSectionActive.css({'height':menuSectionActiveHeight+'px'});}else{setDisactiveResponsiveHeight();}}
function setActiveArrow(activeItem){var indicatorActive=activeItem.find('.sub-arrow');var collapseIndicatorClass='.uc_collapse_indicator';var objCollapseIndicator=jQuery(collapseIndicatorClass);if(objCollapseIndicator.length){var objCollapseIndicatorItem=objCollapseIndicator.parents('.uc-mega_menu_list_item');objCollapseIndicatorItem.find('.sub-arrow').html("<span class='uc_expand_indicator'></span>");}
indicatorActive.html("<span class='uc_collapse_indicator'></span>");}
function setDisactiveArrow(){var collapseIndicatorClass='.uc_collapse_indicator';var objCollapseIndicator=jQuery(collapseIndicatorClass);if(objCollapseIndicator.length){var objCollapseIndicatorItem=objCollapseIndicator.parents('.uc-mega_menu_list_item');objCollapseIndicatorItem.find('.sub-arrow').html("<span class='uc_expand_indicator'></span>");}}
function setTopPosition(objElement){var activeMenuSection=objElement.find(g_classSection);var menuListPaddingBottom=g_menuList.css('padding-bottom');activeMenuSection.css({'top':'calc(100% + '+menuListPaddingBottom+')'});}
function isElementInViewportX(objElement){var activeMenuSection=objElement.find(g_classSection);if(!activeMenuSection.length)
return(true);var activeMenuSectionWidth=activeMenuSection.width();var elementPositionLeft=activeMenuSection.offset().left;var elementPositionRight=activeMenuSectionWidth+elementPositionLeft;var isInViewport;if(g_dataPositionX=="item_left"){var menuItemPositionLeft=objElement.offset().left;var elementPositionRight=activeMenuSectionWidth+menuItemPositionLeft+g_offsetX;var elementPositionLeft=activeMenuSection.offset().left;if(activeMenuSectionWidth==g_viewportWidth)
return(true);setTopPosition(objElement);if(elementPositionLeft<0){g_translateX=0+'px';}else if(elementPositionRight>=g_viewportWidth){g_translateX=g_viewportWidth-elementPositionRight+g_offsetX+"px";}
isInViewport=elementPositionLeft>0&&elementPositionRight<g_viewportWidth;return(isInViewport);}
if(g_dataPositionX=="item_right"){var menuItemPositionRight=objElement.offset().left+objElement.width();var elementPositionLeft=menuItemPositionRight-activeMenuSectionWidth+g_offsetX;var elementPositionRight=activeMenuSection.offset().left+activeMenuSectionWidth;if(activeMenuSectionWidth==g_viewportWidth)
return(true);setTopPosition(objElement);if(elementPositionLeft<0){g_translateX=Math.abs(elementPositionLeft)+g_offsetX+"px";}else{g_translateX=0+'px';}
isInViewport=elementPositionLeft>0&&elementPositionLeft+g_offsetX>0&&elementPositionRight<g_viewportWidth;return(isInViewport);}
if(g_dataPositionX=="item_center"){var menuItemPositionLeft=objElement.offset().left;var objElementWidth=objElement.width();var elementPositionCenter=menuItemPositionLeft+(objElementWidth/2);var elementPositionLeft=elementPositionCenter-(activeMenuSectionWidth/2)+g_offsetX;var elementPositionRight=elementPositionCenter+(activeMenuSectionWidth/2)+g_offsetX;if(activeMenuSectionWidth==g_viewportWidth)
return(true);setTopPosition(objElement);if(elementPositionLeft<0){g_translateX='-'+(objElementWidth/2)-menuItemPositionLeft+'px';}else if(elementPositionRight>g_viewportWidth){g_translateX='calc(-50% + '+(g_viewportWidth-elementPositionRight+g_offsetX)+'px)';}
isInViewport=elementPositionLeft>0&&elementPositionRight<g_viewportWidth;return(isInViewport);}}
function setCssVisiblePositionX(activeMenuSection){activeMenuSection.css({"transform":"translate("+g_translateX+", 0)"});}
function setVisiblePositionX(objElement){if(g_isCustomResponsiveViewport.matches==true)
return(false);var activeMenuSection=objElement.find(g_classSection);var activeMenuSectionWidth=activeMenuSection.width();if(activeMenuSectionWidth>g_viewportWidth)
return(false);activeMenuSection.css({"transform":"translate("+g_offsetX+"px, 0)"});if(g_dataPositionX=="item_center"&&activeMenuSectionWidth<g_viewportWidth){activeMenuSection.css({"transform":"translate(calc(-50% + "+g_offsetX+"px), 0)"});}
if(isElementInViewportX(objElement))
return(false);setCssVisiblePositionX(activeMenuSection);}
function setCoverPosition(menuSection,menuSectionChild){if(menuSection.length==0)
return(false);if(menuSectionChild.length==0)
return(false);var objCover=menuSection.next();var menuItem=menuSectionChild.parents('.uc-mega_menu_list_item');var objCoverHeight=menuSectionChild.outerHeight();var objCoverWidth=menuSection.width();var menuItemWidth=menuItem.width();var menuItemOffsetLeft=menuItem.offset().left;var menuSectionOffsetLeft=menuSection.offset().left;var menuItemOffsetRight=menuItemOffsetLeft+menuItemWidth;var menuSectionOffsetRight=menuSectionOffsetLeft+objCoverWidth;objCover.css({'width':objCoverWidth+'px','height':objCoverHeight+'px'});if(menuItemOffsetLeft==menuSectionOffsetLeft){objCover.css({'left':'0px','right':'unset'});}
if(menuItemOffsetRight==menuSectionOffsetRight){objCover.css({'left':'unset','right':'0px'});}
if(menuItemOffsetLeft>menuSectionOffsetLeft){var menuItemSectionPositionDeviation=menuItemOffsetLeft-menuSectionOffsetLeft;objCover.css({'right':'unset','left':-menuItemSectionPositionDeviation+'px'});}
if(menuItemOffsetLeft<menuSectionOffsetLeft){var menuItemSectionPositionDeviation=menuSectionOffsetLeft-menuItemOffsetLeft;objCover.css({'right':'unset','left':menuItemSectionPositionDeviation+'px'});}
if(objCoverWidth==g_viewportWidth){objCover.css({'right':'unset','left':-g_menuWrapOffsetLeft+'px'});}}
function setActive(activeMenuItem){g_menuItem.removeClass(g_classActive);g_menuSection.removeClass(g_classActive);var activeMenuItemSection=activeMenuItem.find(g_classSection);activeMenuItem.addClass(g_classActive);activeMenuItemSection.addClass(g_classActive);setTimeout(function(){activeMenuItemSection.children().css({'position':'','visibility':'visible'});},100);if(activeMenuItemSection.children().length){g_menu.addClass(g_menuActiveClass);if(g_isCustomResponsiveViewport.matches==false){g_objBody.addClass(g_menuActiveClass);g_objHtml.addClass(g_menuActiveClass);}}else{g_menu.removeClass(g_menuActiveClass);g_objBody.removeClass(g_menuActiveClass);g_objHtml.removeClass(g_menuActiveClass);}
if(g_isCustomResponsiveViewport.matches==true){setActiveResponsiveHeight(activeMenuItem);}
setVisiblePositionX(activeMenuItem);handleWidthType();setTipPosition(activeMenuItemSection);setOverlayPosition(activeMenuItem);var menuSectionChild=activeMenuItemSection.children();setCoverPosition(activeMenuItemSection,menuSectionChild);scrollToHead(activeMenuItem);}
function setDisactive(){g_menuItem.removeClass(g_classActive);g_menuSection.removeClass(g_classActive);setDisactiveArrow();setTimeout(function(){g_menuSection.children().css({'position':'absolute','visibility':'hidden'});},g_dataCloseDelay);g_menu.removeClass(g_menuActiveClass);if(g_isCustomResponsiveViewport.matches==false){g_objBody.removeClass(g_menuActiveClass);g_objHtml.removeClass(g_menuActiveClass);}
if(g_objOverlay.length)
g_objOverlay.hide();}
function createTip(menuSectionParent){var isTipExist=menuSectionParent.data('tip');if(isTipExist==false)
return(false);var offsetY=g_menuList.data("offset-y");if(offsetY<14){menuSectionParent.css({'padding-top':'14px'})}else if(offsetY>=14){menuSectionParent.css({'padding-top':offsetY+'px'})}
var objsection=menuSectionParent.find('.uc-connected');objsection.prepend('<div class="ue-tip"></div>');var objErrorTip;if(menuSectionParent.hasClass('section-error')){menuSectionParent.find('.uc-section-error').prepend('<div class="ue-tip"></div>');objErrorTip=menuSectionParent.find('.ue-tip');objErrorTip.css({'border-top-color':'#cccccc','border-left-color':'#cccccc'})}
var objTip=menuSectionParent.find('.ue-tip');var menuSectionBgColor=objsection.css('background-color');var dataTipBgColor=menuSectionParent.data('bg-color');var dataTipMainColor=menuSectionParent.data('tip-color');var isMenuSectionBorderExist=parseInt(objsection.css('border-width'))>0;var menuSectionBorderColor=objsection.css('border-color');if(menuSectionBgColor=='rgba(0, 0, 0, 0)'&&isMenuSectionBorderExist==false){objTip.css({'border-top-color':dataTipBgColor,'border-left-color':dataTipBgColor,});}
if(isMenuSectionBorderExist==true){objTip.css({'border-top-color':menuSectionBorderColor,'border-left-color':menuSectionBorderColor,});}
if(menuSectionBgColor!='rgba(0, 0, 0, 0)'&&isMenuSectionBorderExist==false){objTip.css({'border-top-color':menuSectionBgColor,'border-left-color':menuSectionBgColor,});}
if(menuSectionParent.hasClass('section-error')){objErrorTip.css({'border-top-color':'#cccccc','border-left-color':'#cccccc'})}
if(dataTipMainColor!=''){objTip.css({'border-top-color':dataTipMainColor,'border-left-color':dataTipMainColor,});}
if(menuSectionBgColor=='rgba(0, 0, 0, 0)'&&isMenuSectionBorderExist==false&&dataTipBgColor==''&&dataTipMainColor==''){objTip.css({'border-top-color':'#C9C9C9','border-left-color':'#C9C9C9'});}}
function setTipPosition(menuSectionParent){if(menuSectionParent.length==0)
return(false);var objTip=menuSectionParent.find('.ue-tip');var objsection=menuSectionParent.find('.uc-connected');var menuSectionBgColor=objsection.css('background-color');var menuSectionBorderColor=objsection.css('border-color');var dataTipBgColor=menuSectionParent.data('bg-color');var dataTipMainColor=menuSectionParent.data('tip-color');var isMenuSectionBorderExist=parseInt(objsection.css('border-width'))>0;var menuItem=menuSectionParent.parents('.uc-mega_menu_list_item');var menuItemWidth=menuItem.width();var objTipWidth=objTip.width();var menuSectionWidth=menuSectionParent.width();var menuItemCenter=menuItemWidth/2;var menuItemOffsetLeft=menuItem.offset().left;var menuSectionOffsetLeft=menuSectionParent.offset().left;var menuItemOffsetRight=menuItemOffsetLeft+menuItemWidth;var menuSectionOffsetRight=menuSectionOffsetLeft+menuSectionWidth;var menuItemCenterOffsetLeft=menuItemOffsetLeft+menuItemCenter;if(menuItemOffsetLeft==menuSectionOffsetLeft){objTip.css({'left':(menuItemWidth/2)+'px','right':'unset'});}
if(menuItemOffsetRight==menuSectionOffsetRight){objTip.css({'left':'unset','right':(menuItemWidth/2)+'px'});}
if(menuSectionOffsetLeft<menuItemOffsetLeft&&menuSectionOffsetRight>menuItemCenterOffsetLeft+objTipWidth){var menuItemSectionPositionDeviation=menuItemOffsetLeft-menuSectionOffsetLeft;objTip.css({'left':menuItemSectionPositionDeviation+(menuItemWidth/2)+'px','right':'unset'});}
if(menuSectionOffsetLeft<menuItemOffsetLeft&&menuSectionOffsetRight<=menuItemCenterOffsetLeft+objTipWidth){var menuItemSectionPositionDeviation=menuItemOffsetLeft-menuSectionOffsetLeft;objTip.css({'left':'unset','right':'0px','transform':'translate(0, -50%) rotate(0)','border-top-color':'transparent','border-left-color':'transparent'});if(menuSectionBgColor=='rgba(0, 0, 0, 0)'&&isMenuSectionBorderExist==false){objTip.css({'border-right-color':dataTipBgColor});}
if(isMenuSectionBorderExist==true){objTip.css({'border-right-color':menuSectionBorderColor});}
if(menuSectionBgColor!='rgba(0, 0, 0, 0)'&&isMenuSectionBorderExist==false){objTip.css({'border-right-color':menuSectionBgColor});}
if(menuSectionParent.hasClass('section-error')){var objErrorTip=menuSectionParent.find('.ue-tip');objErrorTip.css({'border-right-color':'#cccccc',});}
if(dataTipMainColor!=''){objTip.css({'border-right-color':dataTipMainColor});}
if(menuSectionBgColor=='rgba(0, 0, 0, 0)'&&isMenuSectionBorderExist==false&&dataTipBgColor==''&&dataTipMainColor==''){objTip.css({'border-right-color':'#C9C9C9'});}}
if(menuSectionOffsetLeft>menuItemOffsetLeft&&menuSectionOffsetLeft<menuItemCenterOffsetLeft-objTipWidth){var menuItemSectionPositionDeviation=menuSectionOffsetLeft-menuItemOffsetLeft;objTip.css({'left':(menuItemWidth/2)-menuItemSectionPositionDeviation+'px','right':'unset'});}
if(menuSectionOffsetLeft>menuItemOffsetLeft&&menuSectionOffsetLeft>=menuItemCenterOffsetLeft-objTipWidth){var menuItemSectionPositionDeviation=menuSectionOffsetLeft-menuItemOffsetLeft;objTip.css({'left':'0px','right':'unset','transform':'translate(0, -50%) rotate(0)','border-top-color':'transparent'});}}
function getScrollPos(){if(g_isNotCustomResponsiveViewport.matches==true)
return(false);g_menuItem.each(function(){var objItem=jQuery(this);var menuItemOffsetTop=objItem.offset().top;objItem.attr('data-scrollpos',menuItemOffsetTop);});}
function isElementInViewport(element){var elementTop=element.offset().top;var viewportTop=jQuery(window).scrollTop();var isInViewport=elementTop>viewportTop;return(isInViewport);}
function scrollToHead(menuItem){if(g_isNotCustomResponsiveViewport.matches==true)
return(false);var menuItemOffsetTop=menuItem.data('scrollpos');var menuItemSection=menuItem.find(g_classSection);setTimeout(function(){if(isElementInViewport(menuItemSection)==true)
return(false);g_menuListWrap.animate({scrollTop:menuItemOffsetTop},400);},400);}
function showHideArrows(){if(g_indicator.length==0)
return(false);var dataAnimation=g_indicator.data('animate-arrows')
if(dataAnimation==false)
return(false);setTimeout(function(){g_indicator.css({'opacity':1});},300)}
function checkUrl(){var itemsNumber=g_menuItem.length;for(let i=0;i<itemsNumber;i++){var menuItemTitle=g_menuItem.eq(i).find('.uc-mega_menu_title');var menuItemUrl=menuItemTitle.attr('href');if(menuItemUrl==g_urlBase){menuItemTitle.addClass('uc-current-page');}}}
function hideSectionInEditor(menuSectionItem){if(g_dataEditor==false)
return(false);if(menuSectionItem.hasClass('uc-connected')==true)
return(false);var dataShowInEditor=g_menuList.data('show-section');if(dataShowInEditor=='no'){menuSectionItem.css({'position':'','visibility':'visible'});}
if(dataShowInEditor=='message'||dataShowInEditor=='hide'){menuSectionItem.css({'position':'absolute','visibility':'hidden'});}}
function openFirstItem(){if(g_isNotCustomResponsiveViewport.matches==true)
return(false);var firstItem=g_menuItem.eq(0);var firsItemTitle=firstItem.find('.uc-mega_menu_title');var dataFirstItemType=firsItemTitle.data('type');var dataFirstItemClickable=firsItemTitle.data('clickable-link');if(dataFirstItemType!='section')
return(false);if(dataFirstItemClickable!=false)
return(false);var dataOpenFirstItem=g_menuList.data('open-first');if(dataOpenFirstItem==false)
return(false);setActive(firstItem);setActiveArrow(firstItem);}
function handleItemTypeSection(){var menuSectionParentItem=g_menuSection.parents('.uc-mega_menu_list_item');menuSectionParentItem.each(function(){var objSection=jQuery(this);var menuSectionId=objSection.data("id");var menuSectionItem=jQuery("#"+menuSectionId);var menuSectionParent=objSection.find(g_classSection);var firstMenuSectionParent=objSection.eq(0).find(g_classSection);setTemplateStyle();findSections(objSection,menuSectionParent,menuSectionItem,firstMenuSectionParent);showHideErrors(objSection,menuSectionId,menuSectionParent,menuSectionItem);debugHiddenElements();});handleWidthType();showHideArrows();for(let i=0;i<g_menuItem.length;i++){var objMenuItem=g_menuItem.eq(i);var menuSection=objMenuItem.find(g_classSection);var menuSectionChild=menuSection.children();setVisiblePositionX(objMenuItem);createTip(menuSection);setTipPosition(menuSection);setCoverPosition(menuSection,menuSectionChild);}
showHideMenuItemsId();showHideElementsId();if(g_isCustomResponsiveViewport.matches==true){g_menuListWrap.addClass('uc-mobile-mode');}else{g_menuListWrap.removeClass('uc-mobile-mode');}
getScrollPos();checkUrl();openFirstItem();}
function handleItemTypeSectionInEditor(){g_menuItem.each(function(){var objSection=jQuery(this);var menuSectionId=objSection.data("id");var menuSectionItem=jQuery("#"+menuSectionId);var menuSectionParent=objSection.find(g_classSection);showHideErrors(objSection,menuSectionId,menuSectionParent,menuSectionItem);debugHiddenElements();hideSectionInEditor(menuSectionItem)});showHideMenuItemsId();showHideElementsId();}
function menuItemClick(objTitle){var activeMenuItemClick=objTitle.parents('.uc-mega_menu_list_item');if(activeMenuItemClick.hasClass(g_classActive)){setDisactive();if(g_isCustomResponsiveViewport.matches==true)
setDisactiveResponsiveHeight();}else{setActive(activeMenuItemClick);setActiveArrow(activeMenuItemClick);}}
function closeMenuOnAnchorClick(objTitle){var url=objTitle.attr('href');if(url.indexOf("#")==-1)
return(false);setDisactive();if(g_isCustomResponsiveViewport.matches==false)
return(false);setDisactiveResponsiveHeight();g_menuListWrap.removeClass(g_menuActiveClass);g_objBody.removeClass(g_menuActiveClass);g_objHtml.removeClass(g_menuActiveClass);g_menu.removeClass(g_menuActiveClass);}
function onMenuItemClick(e){var objTitle=jQuery(this);var isItemClickable=objTitle.data('clickable-link');var itemType=objTitle.data('type');var titleClass='uc-mega_menu_title';if(g_dataMenuOpen=='hover'){if(g_isDesktopViewport.matches==true&&g_isCustomResponsiveViewport.matches==false&&itemType!='link'&&isItemClickable==false)
return(false);if(itemType!='link'&&isItemClickable==false){menuItemClick(objTitle);return(false);}
if(g_isNotDesktopViewport.matches==true&&isItemClickable==true){var objTarget=jQuery(e.target);var objTargetParent=objTarget.parent();if(objTargetParent.hasClass(titleClass)==false){menuItemClick(objTitle);return(false);}
if(objTargetParent.hasClass(titleClass)==true)
return(true)}
if(g_isDesktopViewport.matches==true&&isItemClickable==true)
return(true);if(itemType=='link'){closeMenuOnAnchorClick(objTitle);return(true);}
menuItemClick(objTitle);}
if(itemType=='link'){closeMenuOnAnchorClick(objTitle);return(true);}
if(g_isDesktopViewport.matches==true&&isItemClickable==true)
return(true);if(g_isNotDesktopViewport.matches==true&&isItemClickable==true){var objTarget=jQuery(e.target);var objTargetParent=objTarget.parent();if(objTargetParent.hasClass(titleClass)==false){menuItemClick(objTitle);return(false);}
if(objTargetParent.hasClass(titleClass)==true)
return(true)}
if(isItemClickable==false)
menuItemClick(objTitle);}
function setDisactiveOnbodyClick(event){if(g_menuItem.hasClass(g_classActive)==false)
return(false);if(g_isCustomResponsiveViewport.matches==true)
return(false);if(jQuery(event.target).hasClass('uc_expand_indicator'))
return(false);if(!jQuery(event.target).closest(g_menuItem).length)
setDisactive();}
function bodyClick(event){if(g_dataMenuOpen=='hover'){if(g_isDesktopViewport.matches==true&&g_isNotCustomResponsiveViewport.matches==true){return(false);}
setDisactiveOnbodyClick(event);}
setDisactiveOnbodyClick(event);}
function onInnerLinkClick(){setDisactive();if(g_isCustomResponsiveViewport.matches==true){setDisactiveResponsiveHeight();g_menuListWrap.removeClass(g_menuActiveClass);g_objBody.removeClass(g_menuActiveClass);g_objHtml.removeClass(g_menuActiveClass);g_menu.removeClass(g_menuActiveClass);}
openFirstItem();}
function handleMenuItemClick(){g_menuItemTitle.on("click",onMenuItemClick);jQuery(document).on('click',function(event){bodyClick(event);});}
function onMenuItemMouseEnter(){if(g_dataMenuOpen=='click')
return(false);if(g_isCustomResponsiveViewport.matches==true)
return(false);var activeMenuItemHover=jQuery(this);setActive(activeMenuItemHover);setActiveArrow(activeMenuItemHover);}
function onMenuItemMouseLeave(){if(g_dataMenuOpen=='click')
return(false);if(g_isCustomResponsiveViewport.matches==true)
return(false);setDisactive();}
function handleMenuItemHover(){g_menuItem.on('mouseenter',onMenuItemMouseEnter);g_menuListWrap.on('mouseleave',onMenuItemMouseLeave);}
function handleMenuInnerLinksClick(){g_menuList.on('close_mega_menu',onInnerLinkClick);}
function menuItemOpen(){handleMenuItemHover();handleMenuItemClick();handleMenuInnerLinksClick();}
function onBurgerMenuClick(){g_menuListWrap.addClass(g_menuActiveClass);g_objBody.addClass(g_menuActiveClass);g_objHtml.addClass(g_menuActiveClass);}
function onCloseBurgerMenuBtnClick(){g_menuItem.removeClass(g_classActive);g_menuSection.removeClass(g_classActive);setDisactiveArrow();setDisactiveResponsiveHeight();g_menuListWrap.removeClass(g_menuActiveClass);g_objBody.removeClass(g_menuActiveClass);g_objHtml.removeClass(g_menuActiveClass);g_menu.removeClass(g_menuActiveClass);openFirstItem();}
function removeOpenClass(){if(g_menuListWrap.hasClass(g_menuActiveClass)==false)
return(false);if(g_objBody.hasClass(g_menuActiveClass)==false)
return(false);g_menuListWrap.removeClass(g_menuActiveClass);g_objBody.removeClass(g_menuActiveClass);g_objHtml.removeClass(g_menuActiveClass);}
function onWindowResize(){var activeMenuItem=g_menu.find('.uc-mega_menu_list_item.uc-active_item');if(g_isCustomResponsiveViewport.matches==true){g_menuListWrap.addClass('uc-mobile-mode');setActiveResponsiveHeight(activeMenuItem);g_objOverlay.hide();}
if(g_isNotCustomResponsiveViewport.matches==true){removeOpenClass();g_menuListWrap.removeClass('uc-mobile-mode');g_menuSection.css({'height':'unset'});}
g_viewportWidth=jQuery(window).width();g_menuWrapOffsetLeft=g_menuListWrap.offset().left;handleWidthType();for(let i=0;i<g_menuItem.length;i++){var objMenuItem=g_menuItem.eq(i);var menuSection=objMenuItem.find(g_classSection);var menuSectionChild=menuSection.children();setVisiblePositionX(objMenuItem);setTipPosition(menuSection);setCoverPosition(menuSection,menuSectionChild);}
setOverlayPosition(activeMenuItem);getScrollPos();setTimeout(onPageScroll,100);}
function onPageScroll(){var objParentSticky=g_menu.parents('.elementor-sticky');if(!objParentSticky.length)
return(false);var objActiveMenuSections=jQuery('.uc-mega_menu_section.uc-active_item');var visibleMenuSectionNum=objActiveMenuSections.length;if(!visibleMenuSectionNum)
return(false);if(visibleMenuSectionNum==1)
return(false);objActiveMenuSections.each(function(index,el){if(index==0)
return(true);el.style.opacity=0;el.style.pointerEvents='none';if(g_isNotCustomResponsiveViewport.matches==true)
return(true)
jQuery(this).removeClass('uc-active_item');});}
function findFocusedAndTrigger(e,eventToTrigger){g_menuItemTitle.each(function(){var objTitle=jQuery(this);if(!objTitle.is(':focus'))
return(true);if(g_dataMenuOpen=='hover')
objTitle.trigger(eventToTrigger);var activeMenuItemClick=objTitle.parents('.uc-mega_menu_list_item');if(g_dataMenuOpen=='click'&&e.keyCode==13){if(activeMenuItemClick.hasClass(g_classActive)==false){setActive(activeMenuItemClick);setActiveArrow(activeMenuItemClick);}}
if(g_dataMenuOpen=='click'&&e.keyCode==27){if(activeMenuItemClick.hasClass(g_classActive)==false)
return(true);setDisactive();}
e.preventDefault();});}
function findFocusedAndOpen(e){findFocusedAndTrigger(e,'mouseenter');}
function findFocusedAndClose(e){findFocusedAndTrigger(e,'mouseleave');}
function onKeyDown(e){if(g_isCustomResponsiveViewport.matches==true)
return(true);if(e.keyCode==13)
findFocusedAndOpen(e);if(e.keyCode==27)
findFocusedAndClose(e);}
function backdropFilterProtection(){var objElements=g_menu.parents('.elementor-element');if(!objElements.length)
return(false);objElements.each(function(){var objElement=jQuery(this);var objElementBackdropProperty=objElement.css('backdrop-filter');if(objElementBackdropProperty=='none')
return(true);objElement.css('backdrop-filter','none');});}
function lordIconsProtection(){var objLordIcons=g_menu.find('lord-icon');if(!objLordIcons.length)
return(false);objLordIcons.each(function(){var objIcon=jQuery(this);var srcIcon=objIcon.attr('src');objIcon.attr('src','')
setTimeout(function(){objIcon.attr('src',srcIcon);},600);});}
this.init=function(objMegaMenu,arrItems,urlAjax){g_menu=jQuery(objMegaMenu);if(!g_menu.length){console.log("Mega Menu not found");return(false);}
setTimeout(backdropFilterProtection,200);g_menuSection=g_menu.find(".uc-mega_menu_section");g_menuList=g_menu.find(".uc-mega_menu_list");g_menuItem=g_menu.find(".uc-mega_menu_list_item");g_menuItemTitle=g_menu.find(".uc-mega_menu_title");g_menuListWrap=g_menu.find(".uc-mega_menu-wrapper");g_indicator=g_menuItem.find('.sub-arrow');g_objBody=jQuery("body");g_objHtml=jQuery("html");g_dataMenuOpen=g_menuList.data("menu-open");g_objOverlay=g_menu.find('.uc_mega_menu_overlay');g_menuWrapOffsetLeft=g_menuListWrap.offset().left;g_viewportWidth=jQuery(window).width();g_dataPositionX=g_menuList.data("position-x");g_dataEditor=g_menu.data("editor");g_showErrors=g_menu.data("errors");g_offsetX=g_menuList.data("offset-x");g_dataCloseDelay=g_menuList.data("close-delay");g_urlBase=urlAjax;g_menuActiveClass="uc-menu-open";g_classSection='.uc-mega_menu_section';g_classActive='uc-active_item';g_isDesktopViewport=window.matchMedia("(min-width: 1025px)");g_isNotDesktopViewport=window.matchMedia("(max-width: 1024px)");var customResponsiveBreakpoint=g_menuListWrap.data("responsive-breakpoint");g_isCustomResponsiveViewport=window.matchMedia("(max-width: "+customResponsiveBreakpoint+"px)");g_isNotCustomResponsiveViewport=window.matchMedia("(min-width: "+(customResponsiveBreakpoint+1)+"px)");g_arrItems=arrItems;var objLoaders=g_menu.find('.uc-mega-menu-item-loader');objLoaders.remove();if(g_indicator.length)
g_indicator.removeClass('uc-arrow-hidden');if(g_dataEditor=='no')
handleItemTypeSection();if(g_dataEditor=='yes')
handleItemTypeSectionInEditor();var burgerMenu=g_menu.find(".uc-mega_menu-burger");var closeBtn=g_menu.find(".uc-mega_menu-close-btn");burgerMenu.on("click",onBurgerMenuClick);closeBtn.on("click",onCloseBurgerMenuBtnClick);if(g_dataEditor=='yes')
return(false);menuItemOpen();jQuery(window).on('resize',function(){setTimeout(onWindowResize,100)});jQuery(window).on('scroll',function(){setTimeout(onPageScroll,100);});g_menuListWrap.on('scroll',function(){setTimeout(onPageScroll,100);});jQuery(window).on("keydown",function(e){onKeyDown(e);});lordIconsProtection();}}