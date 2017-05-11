let CurrentDate = Date();

let $addTrackModal = $('#add-track-modal');
let $addTrackBtn = $('#add_new_track_btn');
let $closeAddTrackModalBtn = $('#add-track-modal-close-btn');

let $addTrackModal_submitBtn = $('#submit_button');

let $tracksContainer = $('#tracks_container');

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
        success: (response) =>{
            if(response.status == 'success'){
                insertSuccess(response.message);
                getAllTracks();
            }else if(response.status =='error'){
                insertFailed(response.message);
            }
        },
        error: (response) =>{
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

let getSessionDetails = () =>{
    let data = {
        'username' : 'summy',
        'level' : 'admin'
    };
    return data;
}

let constructTrack = (track) =>{
    console.log('constructing track');
    let trackElement = `<div class="medium large-2 columns custom-columns">
    </div>

    <div class=" medium-12 large-8 column1s custom-columns card-margin" id="tracks_container">
        <div class=" row custom-row animated fadeInUpBig  Track-card" style=" width: 100%; height: 100%; margin: 0px !important;">
            <div class="small-4 columns trackCardContent track-card-labels">
                <div class=" small-6 columns custom-columns trackCardContent" style="padding-top: 4px">
                    <i class="material-icons material-icon-text">shuffle</i>
                </div>
                <div class=" small-6 columns trackCardContent">
                    ${track.TrackName}
                </div>
            </div>
            <div class="small-4 columns text-center trackCardContent">
                <div class=" small-6 columns custom-columns trackCardContent">
                    <i class="material-icons material-icon-text">person</i> <span
                        style="padding-left:5px; padding-right: 10px;">Added by</span>
                </div>
                <div class=" small-6 columns chip">
                    <img src="../../../../imgs/users/profilePictures/1.jpg" alt="Contact Person">
                    Summy
                </div>
            </div>
            <div class="small-4 columns custom-columns trackCardContent track-card-labels text-right">
                <i id="open-track-btn-3" data-messageid="3" class="material-icons custom-btn">open_in_new</i>
                <i id="edit-track-btn-3" data-messageid="3" class="material-icons custom-btn">mode_edit</i>
                <i id="delete-track-btn-3" data-messageid="3" class="material-icons custom-btn">delete</i>
            </div>
        </div>

    </div>

    <div class="medium large-2 columns custom-columns">
    </div>`
    return trackElement;
}
let populateTracks = (data) =>{
    let elements = "";
     for(let key in data){
         elements = constructTrack(data[key]) + elements;
     }
     console.log('constructed element:');
    console.log(elements);
    $tracksContainer.html("") ;
     $tracksContainer.prepend(elements);

}

let getAllTracks = () =>{
    console.log('Doing ajax call');
    $.ajax({
        type:'get',
        url:'../../../../PHP/adminScripts/tracks/getAllTracks.php',
        data: {SessionDetails:getSessionDetails()},
        success:function(response){
            if(response.status == 'success'){
                console.log('Success');
                console.log(response.DATA);
                populateTracks(response.DATA);
            }else if(response.status == 'error'){
                console.log('Failed');
                console.log(response);
            }
        },
        error:function(response){
            console.log('ajax fail');
            console.log(response);
        }
    });
};

getAllTracks();

