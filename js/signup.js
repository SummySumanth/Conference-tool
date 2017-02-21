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
	console.log("got data:");
	console.log(FirstName);
	console.log(SecondName);
	console.log(Email);
	console.log(PhoneNumber);
	console.log(Institute);
	console.log(City);
	console.log(State);
	console.log(Country);
	console.log(Password1);
	console.log(Password2);
}

let	validate = () =>{

}

let initializeJsonObject = () =>{
	console.log('initializing Json data');
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
			console.log('success response');
            console.log(response);
        },
        error: function(response) {
        	console.log('fail response');
            console.log(response);
        }
	});
}

let init = () =>{
	getData();
	validate();
	initializeJsonObject();
	InsertToDB();
}

$submit.on('click', () =>{
	init();
});