let CurrentDate = Date();

let $submitBtn = $('#submit_button');

//TODO add proper validation
let validate = (data) =>{
    return true;
}

//TODO get session details and send user info along with the json data
let getData = () =>{
    let $TrackName = $('#modal-track-name').val();
    let $TrackDesc = $('#modal-track-description').val();
    let jsondata = {
        'TrackName' : $TrackName,
        'TrackDesc' : $TrackDesc,
        'Timestamp' : CurrentDate
    };
    return jsondata;
}

//TODO create seprate display modals for each message
let showMessage = (type,message) =>{
    let color;
    let icon;

    switch (type){
        case 'success': icon = 'done';
                        color = '#4caf50'
                        console.log(message);
            break;
        case 'failure': icon = 'error_outline';
                        color = '#e53935'
                        console.log(message);
            break;
        case 'info': icon = 'info_outline';
                     color = '#1e88e5'
                     console.log(message);
            break;
        case 'warning': icon = 'warning';
                        color = '#ffeb3b'
                        console.log(message);
            break;
    }

}

let InsertToDB = (trackData) =>{
    $.ajax({
        type:'post',
        url:'../../../../PHP/adminScripts/tracks/addNewTrack.php',
        data: {trackDetails:trackData},
        success: function(response) {
            if(response.status == 'success'){
                showMessage('success', response.message);
            }else if(response.status =='error'){
                showMessage('failure', response.message);
            }
        },
        error: function(response) {
            console.log('ajax call failed');
            console.log(response);
        }
    });
};

$submitBtn.on('click', () =>{
    trackDetails = getData();
    if(validate(trackDetails)){
        InsertToDB(trackDetails)
    }
});