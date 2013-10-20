var init = function() {
	var contacts = chrome.storage.local.get('contacts', function(items){
		var ul = $('#savedContacts');
		var itemsC = items.contacts;
		for(i = 0, l = itemsC.length; i < l; i++) {
			var contact = itemsC[i];
		
			ul.append('<li><div id="contact-'+i+'"></div></li>');
			Skype.ui({
				name: "call",
				element: "contact-"+i,
				participants: [itemsC[i]],
				listParticipants: "true",
				video: "true"
			});
			var aElem = $('#contact-'+i+ ' a');
			callFunc[i] = aElem.attr('onclick');
			aElem.removeAttr('onclick');
			aElem.click(function(e){
				e.preventDefault();
				console.log('called');
				eval(callFunc[parseInt($(this).parent().parent().attr('id').replace('contact-', ''),10)]);
			});
			aElem.children().first().css({'margin': '0 10px', 'vertical-align': 'middle'});
		}
	});
};

var callFunc = [];

init();