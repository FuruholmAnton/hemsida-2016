/**
*
* Author: Anton Furuholm
* An Easy and lightweight library for writing faster JavaScript
*
*/

/**
*
* Functions:
* ---
* addEvent
* removeEvent
* ajaxRequest
* getHeight
* addClass
* removeClass
* ID
* getID
* QS
* getQS
* QSA
* getQSA
* 
*
*/

/* Event Listener */

Element.prototype.addEvent = function(evnt, func) {
    if (this.addEventListener){ // W3C DOM
        this.addEventListener(evnt, func, false);
    }else if (this.attachEvent) { // IE DOM
        this.attachEvent('on' + evnt, func);
    } else { // No much to do
        this[evnt] = func;
    }
};
function addEvent(evnt, elem, func) {
    if (elem.addEventListener) // W3C DOM
        elem.addEventListener(evnt, func, false);
    else if (elem.attachEvent) { // IE DOM
        elem.attachEvent("on" + evnt, func);
    } else { // No much to do
        elem[evnt] = func;
    }
}
Element.prototype.removeEvent = function(event, func){
    if (this.removeEventListener) {                   // For all major browsers, except IE 8 and earlier
        this.removeEventListener(event, func);
    } else if (this.detachEvent) {                    // For IE 8 and earlier versions
        this.detachEvent('on'+event, func);
    }
};


/* AJAX */ 

function ajaxPOST(url, callback, message) {
    var XHR = null;
    if (XMLHttpRequest) {
        XHR = new XMLHttpRequest();
    } else {
        XHR = new ActiveXObject('Microsoft.XMLHTTP');
    }
    XHR.onreadystatechange = function() {
        if (XHR.readyState === 4 || XHR.readyState === 'complete') {
            if (XHR.status === 200) {
                callback(XHR);
            } else {
                alert('fel på servern');
            }
        }
    };
    XHR.open('POST', url, true);
    
    XHR.send(message);
}

function ajaxGET(url, callback) {
    var XHR = null;
    if (XMLHttpRequest) {
        XHR = new XMLHttpRequest();
    } else {
        XHR = new ActiveXObject('Microsoft.XMLHTTP');
    }
    XHR.onreadystatechange = function() {
        if (XHR.readyState === 4 || XHR.readyState === 'complete') {
            if (XHR.status === 200) {
                callback(XHR);
            } else {
                alert('fel på servern');
            }

        }
    };
    XHR.open('GET', url, true);
    XHR.send(null);
}

function ajaxIMG(url, callback, message) {
    var XHR = null;
    if (XMLHttpRequest) {
        XHR = new XMLHttpRequest();
    } else {
        XHR = new ActiveXObject('Microsoft.XMLHTTP');
    }
    XHR.onreadystatechange = function() {
        if (XHR.readyState === 4 || XHR.readyState === 'complete') {
            if (XHR.status === 200) {
                callback(XHR);
            } else {
                alert('fel på servern');
            }
        }
    };
    XHR.open('POST', url, true);
    XHR.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    XHR.send(message);
}


/* Get Height */

function getHeight() {
    xHeight = null;
    if (window.screen !== null){
      xHeight = window.screen.availHeight;
    }   

    if (window.innerHeight !== null){
      xHeight = window.innerHeight;
    }
      
    if (document.body !== null){
      xHeight = document.body.clientHeight;
    }
        

    return xHeight;
}


/* CLASS */
Element.prototype.addClass = function( classname ) {
    var cn = this.className;
    //test for existance
    if( cn.indexOf( classname ) !== -1 ) {
        return;
    }
    //add a space if the element already has class
    if( cn !== '' ) {
        classname = ' '+classname;
    }
    this.className = cn+classname;
};
Element.prototype.removeClass = function(className) {
    if (!this || !this.className) {
        return false;
    }
    var regexp = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    this.className = this.className.replace(regexp, '$2');

};
Element.prototype.toggleClass = function(className){
    if (!this || !className){
        return;
    }

    var classString = this.className, nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += ' ' + className;
    }
    else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
    }
    this.className = classString;
};
Element.prototype.hasClass = function(className) {
    return this.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(this.className);
};
/* GET SELECTORS */

function ID(elementID)
{
  return document.getElementById(elementID);
}
Element.prototype.getID = function(id){
  this.getElementById(id);
};
function QS(element){
  return document.querySelector(element);
}
Element.prototype.getQS = function(selector){
  return this.querySelector(selector);
};
function QSA(element){
  return document.querySelectorAll(element);
}
Element.prototype.getQSA = function(selector){
  return this.querySelectorAll(selector);
};
function CLASS(element, elem){
  if(elem && elem !== undefined){
    return elem.getElementsByClassName(element);
  }
  else{
    return document.getElementsByClassName(element);
  }   
}
Element.prototype.getCLASS = function(element){
  return this.getElementsByClassName(element);
};
function NAME(element){
    return document.getElementsByName(element);
}
Element.prototype.getNAME = function(element){
  return this.getElementsByName(element);
};
function TAG(element){
    return document.getElementsByTagName(element);
}
Element.prototype.getTAG = function(){
  return this.getElementsByTagName(element);
};
Element.prototype.getAttr = function(attribute)
{
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
};

Element.prototype.setAttr = function(attribute, value){
  this.setAttribute(attribute, value);
}


/* VALIDATION */

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
function hasLetter(str){
  // check for characters between a and z
  // i flag makes it case insensitive
  return /[a-zåäö]/i.test(str);
}

/* PREVENT DEFAULT */
Element.prototype.stopDefault = function(){
  // e = e || window.event;
  if (this.preventDefault){
    this.preventDefault();
  } 
  this.returnValue = false;  
};
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault){
    e.preventDefault();
  }
  e.returnValue = false;
}


/* STOP BEFORE CLOSING THE PAGE */

function confirmOnPageExit(e) 
{
    // If we haven't been passed the event get the window.event
    e = e || window.event;

    var message = 'Are you sure you want to delete this?';

    // For IE6-8 and Firefox prior to version 4
    if (e) 
    {
        e.returnValue = message;
    }

    // For Chrome, Safari, IE8+ and Opera 12+
    return message;
}


/* IS DESCENDANT */
function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node !== null) {
         if (node === parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}


function log(text) {
  if (window.console) {
     window.console.log(text);
  }
}

// Needs modification
function addMultipleListeners(element,events,handler,useCapture,args){
  if (!(events instanceof Array)){
    throw 'addMultipleListeners: '+
          'please supply an array of eventstrings '+
          '(like ["click","mouseover"])';
  }
  //create a wrapper for to be able to use additional arguments
  var handlerFn = function(e){
    handler.apply(this, args && args instanceof Array ? args : []);
  };
  for (var i=0;i<events.length;i+=1){
    element.addEventListener(events[i],handlerFn,useCapture);
  }
}


// Gets the number of pixels from the top of the window
Element.prototype.getOffset = function(){
  var _x = 0;
  var _y = 0;
  while( this && !isNaN( this.offsetLeft ) && !isNaN( this.offsetTop ) ) {
      _x += this.offsetLeft - this.scrollLeft;
      _y += this.offsetTop - this.scrollTop;
      // el = this.offsetParent;
  }
  return { top: _y, left: _x };

};

// Gets the number of pixels from the top of the document
Element.prototype.absoluteOffset = function(){
  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = this.getBoundingClientRect();
  var offsetTop = elemRect.top - bodyRect.top;
  var offsetLeft = elemRect.left - bodyRect.left;
  return {
    top: offsetTop,
    left: offsetLeft
  };
};


Element.prototype.removeElem = function(elem){
  this.remove(this.selectedIndex);
};
function createElem(elem){
  return document.createElement(elem);
}

Element.prototype.insertAfter = function(newNode) {
    this.parentNode.insertBefore(newNode, this.nextSibling);
};



function forEach(list,callback) {                   
  for (var i = 0; i < list.length; i++) {
    callback.call(list[i]);                       
  }
}


function getDate(){
    // GET CURRENT DATE
    var date = new Date();
    
    // GET YYYY, MM AND DD FROM THE DATE OBJECT
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
    
    // CONVERT mm AND dd INTO chars
    var mmChars = mm.split('');
    var ddChars = dd.split('');
    
    // CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
    var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);   
}

function selectText(name) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(QS(name));
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(QS(name));
    window.getSelection().addRange(range);
  }
}
Element.prototype.selectText = function(node){
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(this);
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(QS(this));
    window.getSelection().addRange(range);
  }
};