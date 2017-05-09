let InsertToDB = () =>{
    let CurrentDate = Date();
    console.log(CurrentDate);
    jsonObject = {
       'TrackName' : 'Material Science',
        'TrackDesc' : 'Test Text Test Text Test Text Test Text Test Text Test Text Test Text ',
        'Timestamp' : CurrentDate
    }
    console.log(jsonObject);
    $.ajax({
        type:'post',
        url:'../../../../PHP/adminScripts/addNewTrack.php',
        contentType: "application/json",
        data: {trackDetails:jsonObject},
        success: function(response) {
            console.log('SUMMY SUCCESS');
            console.log('SUMMY SUCCESS');
        },
        error: function(response) {
            console.log('ajax error');
        }
    });
};

InsertToDB();