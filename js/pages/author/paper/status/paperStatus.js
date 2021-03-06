/**
 * Created by Sumanth on 6/26/2017.
 */
let requiredPrivilage = ['Participant'];

let $paperContainer = $('#papersContainer');

let getPapers = () => {
    let papers;
    $.ajax({
        async: false,
        url: '../../../../PHP/authorScripts/getMyPapers.php',
        success: (response) => {
            if (response.status == 'success') {
                papers = response.DATA;
                console.log(response.DATA);
            } else if (response.status == 'error') {
                console.log(response.message);
            }
        },
        error: (response) => {
            console.log(response);
        }
    });
    return papers;
};
//TODO: paper resubmission
let getPaperStatus = (paper) => {
    let status_response;
    let status;
    let paperDetails = {
        'PaperID' : paper.PaperID
    }
    $.ajax({
        async: false,
        url:'../../../../PHP/generalScripts/getPaperStatus.php',
        data: {paperDetails: paperDetails},
        type: 'post',
        success: function(response){
            status_response = response.DATA;
                console.log(status_response)
                switch(status_response.Status){
                    case 'Approved': status = 'Approved'
                        break;
                    case 'Rejected': status = 'Rejected'
                        break;
                    case 'Under Review': status = 'Under Review'
                        break;
                }

        },
        error:function (response) {
            console.log(response);
        }
    });
    return status;
};

let getTrackName = (TrackId) => {
    let trackName;

    let trackDetails = {
        'trackID': TrackId
    };

    $.ajax({
        async: false,
        type: 'post',
        url: '../../../../PHP/adminScripts/tracks/getTrack.php',
        data: {trackDetails: trackDetails},
        success: function (response) {
            if (response.status == 'success') {
                trackName = response.DATA[0].TrackName;
            } else if (response.status == 'error') {
                console.log('Failed');
                console.log(response);

            }
        },
        error: function (response) {
            console.log('ajax fail');
            console.log(response);
        }
    });

    return trackName;
};

let getUserName = (userID) => {
    let userName;

    let userDetails = {
        'userID': userID
    };

    $.ajax({
        async: false,
        type: 'post',
        url: '../../../../PHP/adminScripts/tracks/getUser.php',
        data: {userDetails: userDetails},
        success: function (response) {
            if (response.status == 'success') {
                userName = response.DATA[0].FirstName;
            } else if (response.status == 'error') {
                console.log('Failed');
                console.log(response);
            }
        },
        error: function (response) {
            console.log('ajax fail');
            console.log(response);
        }
    });
    return userName;
};

let constructPaper = (paper) => {
    let status = getPaperStatus(paper);
    let status_element;
    let track = getTrackName(paper.trackID);
    let author = getUserName(paper.PUID);
    // console.log(status);
    switch (status) {
        case 'Approved':
            status_element = `<div class="small-6 medium-3 columns text-left field-header-row-card" >
                    <i class="material-icons" style="vertical-align: middle; color:#43b736">sentiment_very_satisfied</i> Approved
                </div>`;
            break;
        case 'Rejected' :
            status_element = `<div class="small-6 medium-3 columns text-left field-header-row-card" >
                    <i class="material-icons" style="vertical-align: middle; color:#F0431D">sentiment_very_dissatisfied</i> Rejected
                </div>`;
            break;
        case 'Under Review' :
            status_element = `<div class="small-6 medium-3 columns text-left field-header-row-card" >
                    <i class="material-icons" style="vertical-align: middle; color:#7dc8f0">sentiment_neutral</i> Under Review
                </div>`;
    }
    let element = `<div class="small-2 column">

    </div>
    <div class="small-8 column small-centered" data-paperid="14">
        <div class="small-12 columns  text-center animated fadeInUpBig evaluate-card" style="margin: 7px 0px 20px 0px;">
            <div class="row 1234" style="padding: 0px 20px;">
                <div class="small-12 medium-3 columns text-left field-header-row-card" style="font-weight: bold">
                    ${paper.Title}
                </div>
                <div class="small-6 medium-3 columns text-left field-header-row-card">
                    ${track}
                </div>
                ${status_element}
                <span class="small-12 medium-3 columns text-center do-animation-trigger hover-red-trigger custom-btn1 show-btn">
                    <i class="material-icons do-animation hover-red" style="vertical-align: middle">
                        visibility
                    </i> Show
                </span>
            </div>

            <div class="row summy" style="padding: 5px 20px 20px 20px; display: none">
                <div class="row small-12 columns">
                    <div class="small-12 medium-10 columns text-left">

                    </div>
                    <span class="small-12 medium-2 columns text-center do-animation-trigger hover-red-trigger custom-btn1 hide-btn">
                        <i class="material-icons do-animation hover-red" style="vertical-align: middle">
                            visibility_off
                        </i> Hide
                    </span>
                </div>
                <div class="small-12 medium-2 columns text-left field-header">
                    Title
                </div>
                <div class="small-12 medium-10 columns  text-left field-content">
                    ${paper.Title}
                </div>
                <div class="small-12 medium-2 columns text-left field-header">
                    Track
                </div>
                <div class="small-12 medium-10 columns  text-left field-content">
                    ${track}
                </div>
                <div class="small-12 medium-2 columns text-left field-header">
                    Description
                </div>
                <div class="small-12 medium-10 columns  text-left field-content description-field">
                    ${paper.Description}
                </div>

                <div class="small-12 medium-2 columns text-left field-header">
                    Author
                </div>
                <div class="small-12 medium-10 columns  text-left field-content">
                    ${author}
                </div>
                <div class="small-12 medium-2 columns text-left field-header">
                    Co-Authors
                </div>
                <div class="small-12 medium-10 columns  text-left field-content">
                    SUmanth
                </div>
                <div class="small-12 medium-2 columns text-left field-header">
                    Paper
                </div>
                <div class="small-12 medium-10 columns text-left field-content background-white">
                    <a href="../../../${paper.FileLocation}" download="">
                    <span class="do-animation-trigger hover-red-trigger custom-btn1">
                        <i class="material-icons do-animation hover-red" style="vertical-align: middle">
                            file_download
                        </i>download
                    </span>
                    </a>
                </div>
                <div class="small-12 medium-12 columns custom-columns">
                    <div class="row custom-row action-tab">
                        <span class="small-12 medium-2 columns " style="padding: 4px 0px;">Take Action</span>

                        <span class="small-12 medium-5 columns do-animation-trigger hover-red-trigger action-btns">
                             <div class="small-12 medium-10 columns" >
                                <input id="file" class="pure-button pure-button-active file" type="file" style="color: #fff; margin: 0px !important; ">
                             </div>
                        </span>
                        <span class="small-12 medium-1 columns "></span>

                        <span class="small-12 medium-3 columns do-animation-trigger hover-red-trigger action-btns resubmit" data-paperid="${paper.PaperID}" >
                         <i class="material-icons do-animation hover-red" style="vertical-align: middle; padding: 0px 5px;">autorenew</i>
                            Resubmit
                        </span>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="small-2 column">

    </div>`

    return element;
};

let submitPaper = (paperData, file) =>{

    var form_data = new FormData();
    form_data.append('json', JSON.stringify(paperData));
    form_data.append('file', file);



    $.ajax({
        url: '../../../../PHP/authorScripts/resubmitPaper.php',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
            if(response.status == 'success'){
                alert(response.message);
                location.reload();
            }else if(response.status == 'error'){
                console.log(response);
            }
        },
        error:function (response) {
            console.log(response);
        }
    });
};


let assignListeners = () =>{

    $('.show-btn').on('click', function () {
        let $hintCard = $(this).parent();

        let hideHintCard = () => {
            $hintCard.css("display", "none");
        };
        let showFullCard = () => {
            $hintCard.next().removeClass('animated fadeOut').addClass('animated fadeIn');
            $hintCard.next().css("display", "flex");
        }
        $hintCard.removeClass('animated fadeIn').addClass('animated fadeOut');
        setTimeout(function ($hintCard) {
            hideHintCard();
            showFullCard();

        }, 500);
    });

    $('.hide-btn').on('click', function () {
        let $hintCard = $(this).parent().parent();
        let hideHintCard = () => {
            $hintCard.css("display", "none");
        };
        let showFullCard = () => {
            $hintCard.prev().removeClass('animated fadeOut').addClass('animated fadeIn');
            $hintCard.prev().css("display", "flex");
        }
        $hintCard.removeClass('animated fadeIn').addClass('animated fadeOut');
        setTimeout(function ($hintCard) {
            hideHintCard();
            showFullCard();
        }, 500);
    });

    $('.resubmit').on('click', function(){
        let file = $('.file').prop('files')[0];
        let paperID= $(this).data('paperid');
        console.log(paperID);
        let paperData = {
            'paperID' : paperID,
            'timestamp': Date()
        };
        submitPaper(paperData,file);
    });

};

let populatePaperCards = (papers) => {
    let paperCard = "";
    for (let key in papers) {
        paperCard = constructPaper(papers[key]) + paperCard;
    }
    $paperContainer.html("");
    $paperContainer.prepend(paperCard);
    assignListeners();
};





//Logout
$('#logout').on('click', () => {
    if (confirm("Are you sure you want to log out? any unsaved changes would be lost")) {
        $.ajax({
            url: '../../../../PHP/sessionHandlers/logout.php',
            success: (response) => {
                console.log('success block');
                if (response.status == 'success') {
                    document.location.href = "/works/Conference-tool";
                } else if (response.status == 'error') {
                    console.log(response.message);
                    document.location.href = "/works/Conference-tool";
                }
            },
            error: (response) => {
                console.log(response);
            }
        })
    }
    ;
});

let checkSession = () => {
    $.ajax({
        type: 'get',
        url: '../../../../PHP/sessionHandlers/checksession.php',
        success: (response) => {
            if (!response.loggedIn) {
                alert('Please login to continue');
                document.location.href = homepage;
            } else if (requiredPrivilage.indexOf(response.Privilege) == -1) {
                alert('You are not authorized to view this page, please log in');
                document.location.href = homepage;
            }
        },
        error: (response) => {
            console.log(response);
        }
    });
};

setInterval(() => {
    checkSession();
}, 500);

let init = () => {
    populatePaperCards(getPapers());
};

init();