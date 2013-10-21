var populate = function() {
	var contacts = chrome.storage.local.get('contacts', function(items){
		var lastTR = $('#contactList tr:last-child');
		var itemsC = items.contacts;
		console.log(itemsC);
		for(i = 0, l = itemsC.length; i < l; i++) {
			lastTR.before(makeTr(itemsC[i].id, itemsC[i].nickname));
		}
	});
}

var makeTr = function(idVal, nicknameVal) {
	return '<tr><td><input type="text" value="'+idVal+
	'" class="idVal"/></td><td><input type="text" value="'+
	nicknameVal+'" class="nicknameVal"/></td></tr>';
};

var init = function() {
	populate();
	$('#contactList a').click(function(e){
		e.preventDefault();
		var nickInp = $(this).prev(), idInp = nickInp.parent().prev().children(), tr = nickInp.parent().parent();
		tr.before(makeTr(idInp.val(), nickInp.val()));
		nickInp.val('');
		idInp.val('');
	});
	$('#contactList > tr:last-child input').keyup(function( event ) {
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
		$('#contactList input.idVal').each(function(i, e){
			var elem = $(e), val = elem.val().trim();
			if(val.length > 0) {
				nickVal = elem.parent().next().children('input.nicknameVal').val().trim();
				nickVal = nickVal.length > 0 ? nickVal : val;
				contacts.push({id: val, nickname: nickVal});
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