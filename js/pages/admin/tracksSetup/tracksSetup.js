let CurrentDate = Date();

let DummyData = {
    'TrackName' : 'Material Science',
    'TrackDesc' : 'Test Text Test Text Test Text Test Text Test Text Test Text Test Text ',
    'Timestamp' : CurrentDate
}

let InsertToDB = () =>{
    $.ajax({
        type:'post',
        url:'../../../../PHP/adminScripts/tracks/addNewTrack.php',
        data: {trackDetails:DummyData},
        success: function(response) {
            console.log('ajax call successful');
            if(response.status == 'success'){
                // console.log(response.message);
            }else if(response.status =='error'){
                // console.log(response.message);
            }
        },
        error: function(response) {
            // console.log('ajax call failed');
            // console.log(response);
        }
    });
};
InsertToDB();