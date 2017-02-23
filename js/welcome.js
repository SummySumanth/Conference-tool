let $sinupRevealShow = $('#sign-up-reveal');
let $sininRevealShow = $('#sign-in-reveal');





let $signupContainer = $('#signup-container');
let $welcomeContainer = $('#welcome-container');

let $fname = $('#first_Name');
let $sname = $('#second_Name');
let $email = $('#email');
let $pnumber = $('#phone');
let $institution = $('#institution');
let $city = $('#city');
let $state = $('#state');
let $country = $('#country');
let $pass1 = $('#password');
let $pass2 = $('#retype_password');
let $submit = $('#submit_button');

let FirstName;
let	SecondName;
let Email;
let PhoneNumber;
let Institute;
let City;
let State;
let Country;
let Password1;
let Password2;

let jsonObject;

let getData = () =>{
	FirstName = $fname.val();
	SecondName = $sname.val();
	Email = $email.val();
	PhoneNumber = $pnumber.val();
	Institute = $institution.val();
	City = $city.val();
	State = $state.val();
	Country = $country.val();
	Password1 = $pass1.val();
	Password2 = $pass2.val();
}

let	validate = () =>{

}

let initializeJsonObject = () =>{
	jsonObject = {
		'first_name': FirstName,
		'second_name': SecondName,
		'email_address': Email,
		'phone_number': PhoneNumber,
		'institute': Institute,
		'city': City,
		'state': State,
		'country': Country,
		'password': Password1
	}
}

let InsertToDB = () =>{
	$.ajax({
		type:'post',
		url:'php/registration.php',
		data: {myData:jsonObject},
		success: function(response) {
			alert('Successfully added your record');
        },
        error: function(response) {
        	alert('Failed to add your record added your record , check console for error');
        	console.log(response)
        }	
	});
}

let init = () =>{
	getData();
	validate();
	initializeJsonObject();
	InsertToDB();
}



let hideSignupModal = () =>{
		$signupContainer.removeClass('animated slideInRight');
		$signupContainer.addClass('animated slideOutLeft')
}

let showSignupModal = () =>{
	$signupContainer.css('display', 'block');
	$signupContainer.addClass('animated slideInRight');
}

let hideWelcomeModal = () =>{
	$welcomeContainer.removeClass('animated slideInRight');
	$welcomeContainer.addClass('animated slideOutLeft')
};

$sinupRevealShow.on('click', () =>{
		console.log('show clicked');
	hideWelcomeModal();
	$welcomeContainer.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () =>{
		$welcomeContainer.css('display', 'none');
		showSignupModal();
	})
	
});






$submit.on('click', () =>{
	init();
});