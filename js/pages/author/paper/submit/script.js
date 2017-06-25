/**
 * Created by Sumanth on 5/18/2017.
 */

let requiredPrivilage = ['Participant'];

let $submitBtn = $('#submit-btn');
let $tracksSelect = $('#track-select');

//### To load available tracks in select field
let constructTrack = (track) => {
    let trackElement = `<option value="${track.trackID}">${track.TrackName}</option>`;

    return trackElement;
};

let populateTracksSelector = (tracks) =>{
    let elements = `<option value='' disabled selected>Choose your option</option>`;
    for(let key in tracks){
        elements = elements + constructTrack(tracks[key]);
    }
    $tracksSelect.html(elements);
};

let loadTracks = () =>{
    $.ajax({
        type:'get',
        url:'../../../../PHP/adminScripts/tracks/getAllTracks.php',
        success:function(response){
            if(response.status == 'success'){
                populateTracksSelector(response.DATA);
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

//### To submit the form
let getFormValues = () =>{
  let $Title = $('#paper-title').val();
  let $Description = $('#paper-description').val();
  let $Track = $('#track-select option:selected').val();
  let $CoPresenters = $('#paper-co-presenters').val();
  let $timestamp = Date();
  let paperData = {
      'Title' : $Title,
      'Description' : $Description,
      'Track' : $Track,
      'CoPresenters' : $CoPresenters,
      'Timestamp' : $timestamp
  };
  return paperData;
};

let validate = (data, file) =>{
    let result = {
        'status' : true,
        'errorMessage' : 'Please enter valid data in these fields : ',
        'file' : false
    }

    if(data.Title == ""){
                result['status'] = false;
                result.errorMessage = result.errorMessage + " Title,";
            }
    if(data.Description == ""){
                result.status = false;
                result.errorMessage = result.errorMessage + " Description,";
            }
    if(data.Track == ""){
                result.status = false;
                result.errorMessage = result.errorMessage + " Track";
            }
    if(file){
        result.file = true;
    }
    return result;
};

let callAjax = (paperData, file) =>{

    var form_data = new FormData();
    form_data.append('json', JSON.stringify(paperData));
    form_data.append('file', file);



    $.ajax({
        url: '../../../../PHP/authorScripts/submitPaper.php',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
            if(response.status == 'success'){
                alert(response.message);
                document.location.href= '/works/Conference-tool/navigation/author/author_homepage.html';
            }else if(response.status == 'error'){
                console.log(response);
            }
        },
        error:function (response) {
            console.log(response);
        }
    });
};

let submitPaper = () =>{
    let paperData = getFormValues();
    let file = $('#file').prop('files')[0];
    let result = validate(paperData, file);
    if(result.status){
        callAjax(paperData , file);
    }else{
        alert(result.errorMessage);
        if(!result.file){
            alert('select file please');
        }
    }
};

$submitBtn.on('click', () => submitPaper());

loadTracks();

//Logout
$('#logout').on('click',()=>{
    if(confirm("Are you sure you want to log out? any unsaved changes would be lost")){
        $.ajax({
            url:'../../../../PHP/sessionHandlers/logout.php',
            success: (response) =>{
                console.log('success block');
                if(response.status == 'success'){
                    document.location.href= homepage;
                }else{
                    if(response.status == 'error'){
                        console.log(response.message);
                        document.location.href= homepage;
                    }
                }
            },
            error: (response) =>{
                console.log(response);
            }
        })
    };
});

let checkSession = () =>{
    $.ajax({
        type: 'get',
        url: '../../../../PHP/sessionHandlers/checksession.php',
        success: (response) =>{
            // console.log(requiredPrivilage.indexOf(response.Privilege));
            if(!response.loggedIn){
                alert('Please login to continue');
                document.location.href= homepage;
            } else if(requiredPrivilage.indexOf(response.Privilege) == -1){
                alert('You are not authorized to view this page, please log in');
                document.location.href= homepage;
            }
        },
        error: (response) =>{
            console.log(response);
        }
    });
};

setInterval(() =>{
    checkSession();
}, 2000);