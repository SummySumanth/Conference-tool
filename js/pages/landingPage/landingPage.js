//Modal Containers
let $signupContainer = $('#signup-container');
let $signinContainer = $('#signin-container');
let $welcomeContainer = $('#welcome-container');

//Modal reveal buttons
let $sinupRevealShow = $('#sign-up-reveal');
let $signInReveal = $('#sign-in-reveal');
let $signUpHere = $('#sign-up-here');
let $signUpBackButton = $('#sign-up-back');
let $signInBackButton = $('#sign-in-back');

//Sign Up Sheet
let $fname = $('#first_Name');
let $sname = $('#second_Name');
let $email = $('#email-signup');
let $pnumber = $('#phone');
let $institution = $('#institution');
let $city = $('#city');
let $state = $('#state');
let $country = $('#country');
let $pass1 = $('#password');
let $pass2 = $('#retype_password');
let $submit = $('#submit_button');

let $backButton = $('.back-button');

let $signInBtn = $('#sign-in-btn');

//Sign up sheet local variable values
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

let showWelcomeModal = () =>{
	$welcomeContainer
		.css('display', 'block')
		.removeClass('animated slideOutUp')
		.addClass('animated slideInDown');
};

let showSignInModal = () =>{
	$signinContainer
		.css('display', 'block')
		.removeClass('animated slideOutUp')
		.addClass('animated slideInDown');
};

let showSignupModal = () =>{
	$signupContainer
		.css('display', 'block')
		.removeClass('animated slideOutUp')
		.addClass('animated slideInDown');
};

let hideWelcomeModal = () =>{
	$welcomeContainer
		.removeClass('animated slideInDown')
		.addClass('animated slideOutUp');
};

let hideSignInModal = () =>{
	$signinContainer
		.removeClass('animated slideInDown')
		.addClass('animated slideOutUp');
};

let hideSignupModal = () =>{
	$signupContainer
		.removeClass('animated slideInDown')
		.addClass('animated slideOutUp');
};

$signInReveal.on('click', () =>{
	hideWelcomeModal();
	setTimeout(() =>{
		$welcomeContainer.css('display', 'none');
		showSignInModal();
	}, 750);
});

$signInBackButton.on('click', () =>{
	console.log('back button clicked');
	hideSignInModal();
	setTimeout(() =>{
		$signinContainer.css('display', 'none');
		showWelcomeModal();
	}, 750);
});

$signUpHere.on('click', () =>{
	hideSignInModal();
	setTimeout(() =>{
		$signinContainer.css('display', 'none');
		showSignupModal();
	}, 750);
});

$sinupRevealShow.on('click', () =>{
	hideWelcomeModal();
	setTimeout(() =>{
		$welcomeContainer.css('display', 'none');
		showSignupModal();
	}, 750);
});

$signUpBackButton.on('click', () =>{
	hideSignupModal();
	setTimeout(() =>{
		$signupContainer.css('display', 'none');
		showWelcomeModal();
	}, 750);
});

let registrationSuccess = (message) =>{
	alert(message);
	setTimeout(function (){
        location.reload();
	},4000);
};

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
};

let	validate = () =>{

};

let initializeJsonObject = () =>{
	console.log('email address received : ' + $email.val());
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
};

let InsertToDB = () =>{
	$.ajax({
		type:'post',
		url:'php/registration.php',
		data: {myData:jsonObject},
		success: function(response) {
            console.log('ajax call successful');
            if(response.status == 'success'){
				registrationSuccess(response.message);
                location.reload();
            }else if(response.status =='error'){
                toastIT(response.message, 5000);
            }
        },
        error: function(response) {
        	console.log('ajax call failed');
        	console.loh(response);
        }	
	});
};

$backButton.on('mouseenter', () =>{
$backButton.removeClass('animated rubberBand');
$backButton.addClass('animated rubberBand');
$backButton.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () =>{
    $backButton.removeClass('animated rubberBand');
})
});

let init = () =>{
	getData();
	validate();
	initializeJsonObject();
	InsertToDB();
};

$submit.on('click', () =>{
	init();
});

// ###################### SIGN IN PROCESS ######################

let redirect = (destination) =>{
    switch (destination){
        case 'Admin':
            console.log('case reached');
            window.location = "navigation/admin/admin_homepage.html";
            break;
        case 'Participant':
            window.location = "navigation/author/author_homepage.html";
            break;
        case 'Evaluator':
            window.location = "navigation/evaluator/evaluator_homepage.html";
            break;
    }
}

let login = (userEmail,password) =>{
  let loginDetails = {
      'userEmail' : userEmail,
      'userPassword' : password
  }

  $.ajax({
        type: 'post',
        url: 'php/sessionHandlers/login.php',
        data: {loginDetails: loginDetails},
        success: function(response) {
           if(response.status == 'success'){
                console.log('login success');
                console.log(response);
                redirect(response.Privilage);
           }else if(response.status =='error'){
               toastIT(response.message, 5000);
           }
        },
        error: function(response) {
           console.log('ajax call failed');
           console.log(response);
        }
  });
};

$signInBtn.on('click', () =>{
	let userEmail = $('#sign_in_user_email').val();
    let password = $('#sign_in_user_password').val();
    login(userEmail,password);
});

// ##################################################################
$( document ).ready(function() {
	setTimeout(() =>{
		showWelcomeModal();
	},500)
});


