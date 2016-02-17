

var gallery = {
	init:function(){
		this.nav();
	},
	nav:function(){
		var nav = QSA(".gallery-nav_item");
		for (var i = 0; i < nav.length; i++) {
			nav[i].addEvent("click", function(e){
				for (var i = 0; i < nav.length; i++){
					nav[i].removeClass("is-active");
				}
				e.preventDefault();
				this.addClass("is-active");
				QS(".gallery-container").setAttribute("data-category", this.getAttribute("data-cat"));
			});
		};
	}
}
gallery.init();


var form = QS(".footer-form");
if(form){
    form.addEvent("submit", formSubmit);
}

/* Submit the form with AJAX */

function formSubmit(e) {
    e.preventDefault();
    var name = document.getElementsByName("name")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var comments = document.getElementsByName("comments")[0].value;
    ajaxGET("send-form.php?email=" + email + "&name=" + name + "&comments=" + comments, cbFormValidate);
}

/* AJAX Callback for the form */

function cbFormValidate(obj) {
    NAME("comments")[0].value = "";
    NAME("name")[0].value = "";
    NAME("email")[0].value = "";
    var reply = JSON.parse(obj.responseText);
    var response = ID("formAjaxReply");
    response.innerHTML = reply.message;
    if( reply.code === 200){
    	response.classList.add("success");
    }else{
    	response.classList.remove("success");
    }
    response.style.display = "block";
}

/////////////////////////////////
/* FORM */
/////////////////////////////////

var form = QS(".footer-form");
var inputs = CLASS("form-input", form);
for( var x = 0; x < inputs.length; x++){
	inputs[x].addEvent("focus", inputFocus);
	inputs[x].addEvent("blur", inputBlur);
}
function inputFocus(){
	this.previousSibling.previousSibling.classList.add("focus");
}
function inputBlur(){
	if(this.value != ""){
		this.classList.add("filled");
	}else{
		this.classList.remove("filled");
	}
	this.previousSibling.previousSibling.classList.remove("focus");
}

QS(".my-mail").addEvent("click", function(){
	selectText(".my-mail");
});