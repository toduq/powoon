var Popup = {
	instances: [],
	last_id: 0,

	create: function(){
		if(Popup.instances.length > 20) return;
		var score = Counter.pps();
		if(score.lt('1.0')) score = Big('1.0');
		var text = '+' + score.toFormat(1);
		var dom = $('<p data-id="'+Popup.last_id+'"">'+text+'</p>');
		var field_size = $('.js-popups').innerWidth();
		$('.js-popups').append(dom);
		dom.css('left', Math.random()*field_size).css('top', Math.random()*field_size);
		Popup.instances.push([Popup.last_id++, -10.0, dom]);
		Popup.start_animation();
	},

	timer_id: null,

	start_animation: function(){
		if(Popup.timer_id !== null) return;
		Popup.timer_id = setInterval(Popup.animation, 50);
	},

	animation: function(){
		Popup.instances.forEach(function(arr, index){
			var id = arr[0];
			var speed = arr[1];
			var dom = arr[2];
			dom.css('top', '+='+arr[1]);
			Popup.instances[index][1] += 3.0;
			var top = parseInt(dom.css('top'));
			if(top > 1000){
				Popup.instances.splice(index, 1);
				dom.remove();
				if(Popup.instances.length == 0){
					clearInterval(Popup.timer_id);
					Popup.timer_id = null;
				}
			}
		});
		console.log(Popup.instances.length);
	}
};