var Bind = {
	text: [
		'Counter.pwn.toFormat(1)',
		'Counter.pps().toFormat(1)',
		'Counter.powers[0]',
		'Counter.pps(0).toFormat(1)',
		'Counter.p_price[0].toFormat(1)',
		'Counter.powers[1]',
		'Counter.pps(1).toFormat(1)',
		'Counter.p_price[1].toFormat(1)',
		'Counter.powers[2]',
		'Counter.pps(2).toFormat(1)',
		'Counter.p_price[2].toFormat(1)',
		'Counter.powers[3]',
		'Counter.pps(3).toFormat(1)',
		'Counter.p_price[3].toFormat(1)',
		'Counter.powers[4]',
		'Counter.pps(4).toFormat(1)',
		'Counter.p_price[4].toFormat(1)',
		'Counter.powers[5]',
		'Counter.pps(5).toFormat(1)',
		'Counter.p_price[5].toFormat(1)',
	],
	cache: {},
	refresh: function(){
		var b = Bind;
		b.text.forEach(function(e){
			var current = eval(e);
			if(!(e in b.cache) || current !== b.cache[e]){
				b.cache[e] = current;
				$('.bind-'+e.replace(/[.()\[\]]/g, '')).text(current);
			}
		});
		for(var i=0; i<6; i++){
			var can_buy = Counter.can_buy(i);
			var e = 'JsPower'+i;
			if(!(e in b.cache) || can_buy !== b.cache[e]){
				b.cache[e] = can_buy;
				if(can_buy){
					$(".bind-power[data-id='"+i+"']").removeClass('disable');
				} else {
					$(".bind-power[data-id='"+i+"']").addClass('disable');
				}
			}
		}
		document.title = Counter.pwn.toFormat(1) + 'pwn | Spowoon';
	}
};