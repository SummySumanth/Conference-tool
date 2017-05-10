let timeoutDurationOfAnimation = 500;

let toastIT = (message, duration) =>{
    var $toastContent = $('<span >' + message + '</span>');
    Materialize.toast($toastContent, duration);
}