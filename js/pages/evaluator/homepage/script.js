/**
 * Created by Sumanth on 4/14/2017.
 */

let requiredPrivilage = ['Evaluator'];








//Logout
$('#logout').on('click',()=>{
    if(confirm("Are you sure you want to log out? any unsaved changes would be lost")){
        $.ajax({
            url:'../../PHP/sessionHandlers/logout.php',
            success: (response) =>{
                console.log('success block');
                if(response.status == 'success'){
                    document.location.href= "/works/Conference-tool";
                }else{
                    if(response.status == 'error'){
                        console.log(response.message);
                        document.location.href= "/works/Conference-tool";
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
        url: '../../PHP/sessionHandlers/checksession.php',
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
}, 500);