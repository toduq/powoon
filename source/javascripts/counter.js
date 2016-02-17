var Counter = {
	pwn: Big('0.0'),
	click: function(){
		var c = Counter;
		var pps = c.pps();
		c.pwn = c.pwn.plus((pps.gte('1.0')) ? pps : '1.0');
		Bind.refresh();
	},
	show: function(){
		return Counter.pwn.toFormat(1);
	},

	powers: [0,0,0,0,0,0],
	p_values: [Big('0.2'), Big('0.9'), Big('8'), Big('70'), Big('600'), Big('5000')],
	p_price: [Big('50'), Big('600'), Big('7000'), Big('80000'), Big('900000'), Big('10000000')],
	last_calculated: new Date().getTime(),
	buy: function(index){
		var c = Counter;
		if(!c.pwn.gte( c.p_price[index] )) return false;
		c.powers[index] += 1;
		c.pwn = c.pwn.minus( c.p_price[index] );
		c.p_price[index] = c.p_price[index].times('1.2');
		Bind.refresh();
		Sound.play('buy');
	},
	pps: function(index){
		var sum = Big('0.0');
		if(index !== undefined){
			return Counter.p_values[index].times( Counter.powers[index] );
		} else {
			for(var i=0; i<Counter.powers.length; i++){
				sum = sum.plus( Counter.p_values[i].times( Counter.powers[i] ) );
			}
			return sum;
		}
	},
	can_buy: function(index){
		return Counter.pwn.gte(Counter.p_price[index]);
	},
	calculate_time: function(){
		var c = Counter;
		var now = new Date().getTime();
		var passed_sec = (now - c.last_calculated)/1000.0;
		c.last_calculated = now;
		var acquired_pwn = c.pps().times( passed_sec );
		//console.log('acquired : ' + acquired_pwn);
		c.pwn = c.pwn.plus(acquired_pwn);
		Bind.refresh();
	}
};
