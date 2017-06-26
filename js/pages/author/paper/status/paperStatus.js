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


let populatePaperCards = (papers) => {
    let paperCard = "";
    for (let key in papers) {
        paperCard = constructPaper(papers[key]) + paperCard;
    }
    $paperContainer.html("");
    $paperContainer.prepend(paperCard);
    assignListeners();
};


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