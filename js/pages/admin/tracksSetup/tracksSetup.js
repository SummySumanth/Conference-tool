let CurrentDate = Date();

let $addTrackModal = $('#add-track-modal');
let $addTrackBtn = $('#add_new_track_btn');
let $closeAddTrackModalBtn = $('#add-track-modal-close-btn');

let $addTrackModal_submitBtn = $('#submit_button');

let show_AddTrackModal = () =>{
    $addTrackModal
        .css('display', 'block')
        .removeClass('magictime vanishOut')
        .addClass('magictime vanishIn');
}

let hide_AddTrackModal = () =>{
    $addTrackModal
        .removeClass('magictime vanishIn')
        .addClass('magictime vanishOut');
    setTimeout(() =>{
        //hiding modal and making the fields empty
        $addTrackModal.css('display', 'none');
        $('#modal-track-name')
            .val("")
            .trigger('autoresize');
        $('#modal-track-description')
            .val("")
            .trigger('autoresize');
    }, timeoutDurationOfAnimation);
};

$addTrackBtn.on('click', ()=>{
    show_AddTrackModal();
});

$closeAddTrackModalBtn.on('click', () =>{
    hide_AddTrackModal();
});


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

let insertSuccess = (message) =>{
    hide_AddTrackModal();
    setTimeout(() =>{
        toastIT(message, 1000);
    },500);
};

let insertFailed = (message) =>{
    // hide_AddTrackModal();
    setTimeout(() =>{
        toastIT(message, 3000);
    },500);
};

let InsertToDB = (trackData) =>{
    $.ajax({
        type:'post',
        url:'../../../../PHP/adminScripts/tracks/addNewTrack.php',
        data: {trackDetails:trackData},
        success: function(response) {
            if(response.status == 'success'){
                insertSuccess(response.message);
            }else if(response.status =='error'){
                insertFailed(response.message);
            }
        },
        error: function(response) {
            console.log('ajax call failed');
            console.log(response);
        }
    });
};

$addTrackModal_submitBtn.on('click', () =>{
    trackDetails = getData();
    if(validate(trackDetails)){
        InsertToDB(trackDetails)
    }
});



