let timeoutDurationOfAnimation = 500;

let homepage = "/works/Conference-tool";

let toastIT = (message, duration) =>{
    var $toastContent = $('<span >' + message + '</span>');
    Materialize.toast($toastContent, duration);
}
