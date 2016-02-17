$(function(){
	var event = (window.ontouchstart === null) ? 'touchstart' : 'click';
	$('.js-clickzone').on(event, function(){
		Popup.create();
		Sound.play('p1');
		Counter.click();
		return false;
	});

	$('.js-power').on('click', function(){
		console.log($(this));
		Counter.buy($(this).attr('data-id'));
	});
	$('.js-power-overlay').on('click', function(){
		$('html,body').animate({scrollTop: $('.js-power-box').offset().top -10}, 'fast');
		return false;
	});
	$('.js-scroll-top').on('click', function(){
		$('html,body').animate({scrollTop: $('.content').offset().top -10}, 'fast');
		return false;
	});

	setInterval(function(){
		Counter.calculate_time();
	}, 500);
});

function Big(str){
	return new BigNumber(str);
}