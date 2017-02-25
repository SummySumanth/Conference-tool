let $backButton = $('.back-button');

$backButton.on('mouseenter', () =>{
	console.log('hovered');
	$backButton.removeClass('animated rubberBand');
	$backButton.addClass('animated rubberBand');
	$backButton.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () =>{
		$backButton.removeClass('animated rubberBand');
	})
});