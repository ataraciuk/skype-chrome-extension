var populate = function() {
	var contacts = chrome.storage.local.get('contacts', function(items){
		var lastLI = $('#contactList > li:last-child');
		var itemsC = items.contacts;
		for(i = 0, l = itemsC.length; i < l; i++) {
			lastLI.before('<li><input type="text" value="'+itemsC[i]+'" /></li>');
		}
	});
}

var init = function() {
	populate();
	$('#contactList a').click(function(e){
		e.preventDefault();
		var inp = $(this).prev(), li = inp.parent();
		li.before('<li><input type="text" value="'+inp.val()+'" /></li>');
		inp.val('');
	});
	$('#contactList > li:last-child input').keyup(function( event ) {
		if ( event.which == 13 ) {
			$('#contactList a').click();
		}
	});
	$('#saveBtn').click(function(e) {
		e.preventDefault();
		$('#savedMsg').stop().hide();
		var btn = $(this);
		btn.attr('disabled', 'disabled').html('Saving...');
		var contacts = [];
		$('#contactList input').each(function(i, e){
			var val = $(e).val().trim();
			if(val.length > 0) {
				contacts.push(val);
			}
		});
		chrome.storage.local.set({'contacts':contacts}, function() {
			btn.removeAttr('disabled').html('Save!');
			$('#savedMsg').fadeIn(400, function(){
				setTimeout(function(){$('#savedMsg').fadeOut();}, 5000);
			});
		});
	});
}

init();