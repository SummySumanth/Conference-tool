/**
 * Created by Sumanth on 4/15/2017.
 */

$('#logout').on('click',()=>{
    if(confirm("Are you sure you want to log out? any unsaved changes would be lost")){
        $.ajax({
            url:'../../PHP/sessionHandlers/logout.php',
            success: (response) =>{
                console.log('success block');
                if(response.status == 'success'){
                    console.log(response.message);
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
        url: '../../PHP/sessionHandlers/checksession.php',
        success: (response) =>{
            if(!response.loggedIn){
                alert('Please login to continue');
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