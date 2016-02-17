var Sound = {
	play: function(id){
		var target = $('#sound-'+id)[0];
		if(typeof(target.currentTime ) != 'undefined'){
			target.currentTime = 0;
		}
		target.play();
	}
};