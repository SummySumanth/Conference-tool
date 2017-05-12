let CurrentDate = Date();

let $addTrackModal = $('#add-track-modal');
let $viewTrackModal = $('#Track-Details-modal');




let $addTrackBtn = $('#add_new_track_btn');

let $closeAddTrackModalBtn = $('#add-track-modal-close-btn');
let $closeViewTrackModalBtn = $('#view-track-modal-close-btn');

let $addTrackModal_submitBtn = $('#submit_button');

let $tracksContainer = $('#tracks_container');

let show_AddTrackModal = () =>{
    $addTrackModal
        .css('display', 'block')
        .removeClass('magictime vanishOut')
        .addClass('magictime vanishIn');
}

let show_ViewTrackModal = (trackDetails) =>{
    $('#view-track-modal-trackName').text(trackDetails.TrackName);
    $('#view-track-modal-trackDesc').text(trackDetails.TrackDesc);
    $('#view-track-modal-adderName').text(trackDetails.TrackAdderID)
    $viewTrackModal
        .css('display', 'block')
        .removeClass('magictime vanishOut')
        .addClass('magictime vanishIn');
};

$addTrackBtn.on('click', ()=>{
    show_AddTrackModal();
});

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

let hide_ViewTrackModal = () =>{
    $viewTrackModal
        .removeClass('magictime vanishIn')
        .addClass('magictime vanishOut');
    setTimeout(() =>{
        $viewTrackModal.css('display', 'none');
    }, timeoutDurationOfAnimation);
};

$closeAddTrackModalBtn.on('click', () =>{
    hide_AddTrackModal();
});

$closeViewTrackModalBtn.on('click', () =>{
    hide_ViewTrackModal()
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


let insertSuccess = (message) =>{
    hide_AddTrackModal();
    setTimeout(() =>{
        toastIT(message, 1000);
    },500);
};

let insertFailed = (message) =>{
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
    let trackElement = `<div class="medium large-2 columns custom-columns">
    </div>

    <div class=" medium-12 large-8 column1s custom-columns card-margin" id="tracks_container">
        <div class=" row custom-row animated fadeInUpBig  Track-card" style=" width: 100%; height: 100%; margin: 0px !important;">
            <div class="small-4 columns trackCardContent track-card-labels">
                <div class=" small-6 columns custom-columns trackCardContent" style="padding-top: 4px">
                    <i class="material-icons material-icon-text" style="color: #b1b1b1">shuffle</i>
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
                <i id="${track.trackID}" class="material-icons custom-btn view-track-details-btn">open_in_new</i>
                <i data-trackID="${track.trackID}" class="material-icons custom-btn">mode_edit</i>
                <i data-trackID="${track.trackID}" class="material-icons custom-btn">delete</i>
            </div>
        </div>

    </div>

    <div class="medium large-2 columns custom-columns">
    </div>`
    return trackElement;
}

let getTrackDetails = (TrackId) =>{
    console.log('getting details, calling ajax')
    let trackDetails = {
        'trackID' : TrackId
    }

    $.ajax({
        type:'post',
        url:'../../../../PHP/adminScripts/tracks/getTrack.php',
        data: {trackDetails:trackDetails},
        success:function(response){
            if(response.status == 'success'){
                show_ViewTrackModal(response.DATA[0]);
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
}

let ShowTrackDetails = (TrackID) =>{
    console.log('received track Id is' + TrackID);
    getTrackDetails(TrackID);// directly calling show modal from ajax call as I am failing to return the response
};

let assignListeners = () =>{
    $('.view-track-details-btn').on('click', function (){
       let TrackID = $(this).attr('id');
       ShowTrackDetails(TrackID);
    });
}

let populateTracks = (data) =>{
    let elements = "";
     for(let key in data){
         elements = constructTrack(data[key]) + elements;
     }
    $tracksContainer.html("") ;
     $tracksContainer.prepend(elements);
     assignListeners();

}

let getAllTracks = () =>{
    $.ajax({
        type:'get',
        url:'../../../../PHP/adminScripts/tracks/getAllTracks.php',
        data: {SessionDetails:getSessionDetails()},
        success:function(response){
            if(response.status == 'success'){
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

