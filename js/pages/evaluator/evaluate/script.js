/**
 * Created by Sumanth on 4/14/2017.
 */

let requiredPrivilage = ['Evaluator'];

let $paperContainer = $('#papersContainer');
let getPapers = () => {
    let papers;
    $.ajax({
        async: false,
        url: '../../../PHP/adminScripts/tracks/getAllPapers.php',
        success: (response) => {
            console.log('success block');
            if (response.status == 'success') {
                papers = response.DATA;
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

let getPaperStatus = (paper) => {
    let status;

    $.ajax({
        async: false,
        url:'../../../PHP/generalScripts/getPaperStatus.php',
        data: paper,
        type: 'post',
        success: function(response){
            if(response.status == 'success'){
                console.log(response);
            }else if(response.status == 'error'){
                console.log(response);
            }
        },
        error:function (response) {
            console.log(response);
        }
    });
};

let getTrackName = (TrackId) => {
    let trackName;

    let trackDetails = {
        'trackID': TrackId
    };

    $.ajax({
        async: false,
        type: 'post',
        url: '../../../PHP/adminScripts/tracks/getTrack.php',
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

let constructPaper = (paper) => {
    let status;

    let track = getTrackName(paper.trackID);
    let paper_card;

    switch (getPaperStatus(paper)) {
        case 'accepted':
            status = ``;
            break;
        case 'rejected' :
            status = ``;
            break;
        case 'under-review' :
            status = ``;
    }
    console.log(paper);
    let element = `<div class="small-2 column">

    </div>
    <div class="small-8 column small-centered">
        <div class="small-12 columns  text-center animated fadeInUpBig evaluate-card" style="margin: 7px 0px 20px 0px;">
            <div class="row 1234" style="padding: 0px 20px;" >
                <div class="small-12 medium-3 columns text-left field-header-row-card" style="font-weight: bold">
                    ${paper.Title}
                </div>
                <div class="small-6 medium-3 columns text-left field-header-row-card" >
                    ${track}
                </div>
                <div class="small-6 medium-3 columns text-left field-header-row-card" >
                    <i class="material-icons" style="vertical-align: middle; color:#7dc8f0">sentiment_neutral</i> Under Review
                </div>
                <span class="small-12 medium-3 columns text-center do-animation-trigger hover-red-trigger custom-btn1 show-btn" >
                    <i class="material-icons do-animation hover-red" style="vertical-align: middle">
                        visibility
                    </i> Show
                </span>
            </div>

            <div class="row summy" id="track1" style="padding: 5px 20px 20px 20px; display: none" >
                <div class="row small-12 columns">
                    <div class="small-12 medium-10 columns text-left">

                    </div>
                    <span class="small-12 medium-2 columns text-center do-animation-trigger hover-red-trigger custom-btn1 hide-btn" >
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
                <div class="small-12 medium-10 columns  text-left field-content description-field" >
                     ${paper.Description}
                </div>

                <div class="small-12 medium-2 columns text-left field-header">
                    Author
                </div>
                <div class="small-12 medium-10 columns  text-left field-content">
                         ${paper.PUID}
                </div>
                <div class="small-12 medium-2 columns text-left field-header">
                    Co-Authors
                </div>
                <div class="small-12 medium-10 columns  text-left field-content">
                     ${paper.Co_presenters}
                </div>
                <div class="small-12 medium-2 columns text-left field-header">
                    Paper
                </div>
                <div class="small-12 medium-10 columns text-left field-content background-white" >
                    <a href="${'../../../' + paper.FileLocation}">
                    <span class="do-animation-trigger hover-red-trigger custom-btn1" >
                        <i class="material-icons do-animation hover-red" style="vertical-align: middle">
                            file_download
                        </i>download
                    </span>
                    </a>
                </div>
                <div class="small-12 medium-12 columns custom-columns" >
                    <div class="row custom-row action-tab" >
                        <span class="small-12 medium-2 columns " style="padding: 4px 0px;">Take Action</span>

                        <span class="small-12 medium-4 columns do-animation-trigger hover-red-trigger action-btns approve-btn" data-paperID="${paper.PaperID}" >
                            <i class="material-icons do-animation hover-red" style="vertical-align: middle; padding: 0px 5px;">done</i>
                            Approve
                        </span>
                        <span class="small-12 medium-1 columns "></span>

                        <span class="small-12 medium-4 columns do-animation-trigger hover-red-trigger action-btns reject-btn" data-paperID="${paper.PaperID}" >
                            <i class="material-icons do-animation hover-red" style="vertical-align: middle; padding: 0px 5px;">cancel</i>
                            Reject
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
            console.log($hintCard.next());
            $hintCard.prev().removeClass('animated fadeOut').addClass('animated fadeIn');
            $hintCard.prev().css("display", "flex");
        }
        $hintCard.removeClass('animated fadeIn').addClass('animated fadeOut');
        setTimeout(function ($hintCard) {
            hideHintCard();
            showFullCard();
        }, 500);
    });

};

let populatePaperCards = (papers) => {
    let paperCard = "";
    console.log(papers);
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
            url: '../../../PHP/sessionHandlers/logout.php',
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
        url: '../../../PHP/sessionHandlers/checksession.php',
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
    console.log(getPapers());
    populatePaperCards(getPapers());
};

init();