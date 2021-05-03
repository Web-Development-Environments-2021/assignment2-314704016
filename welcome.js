//Acounts
let users = ["k"];
let passes = ["k"];
let eamils =["k@gmail.com"];
let currentScreen="welcomePCDiv";

window.onload = function(){

    $("#RegisterPCDiv").submit(function(e) {
		e.preventDefault();
	});
    
	$("#LoginPCDiv").submit(function(e) {
		e.preventDefault();
	});
}


function changeRegisterScreen(page){
    var x = document.getElementById("RegisterPCDiv");
    var y = document.getElementById(currentScreen);
    x.style.display = "block";
    y.style.display = "none";
    currentScreen="RegisterPCDiv";

}

function changeLoginScreen(){
    var x = document.getElementById("LoginPCDiv");
    var y= document.getElementById(currentScreen);
    y.style.display="none";
    x.style.display = "block";
    currentScreen="LoginPCDiv";
}

function changeWelcomeScreen(){
    var x = document.getElementById("welcomePCDiv");
    var y= document.getElementById(currentScreen);
    y.style.display="none";
    x.style.display = "flex";
    currentScreen="welcomePCDiv";
}


function isExist(){
    var i;
    let name=document.getElementById('Username').value;
    let pass=document.getElementById('password').value;
    var temp=0;
    alert(name+","+pass);
   
    for (i = 0; i < users.length; i++) {
        if(users[i]==name && passes[i]==pass){
            temp=1;
            var x = document.getElementById("gameSettingPCDiv");
            var y= document.getElementById(currentScreen);
            var m=document.getElementById("divaa3");
	        m.style.display="none";
            y.style.display="none";
            x.style.display = "flex";
            currentScreen="gameSettingPCDiv";
        }
    }
    if(temp==0){
        alert("password or username incorrect please try");
        document.getElementById("LoginPCDiv").reset();
    }

    
}

function checkRegisteration(){

    var uname=document.getElementById('registerUserName').value;
    var pass=document.getElementById('registerPass').value;
    var eamil=document.getElementById('registerEmail').value;
    var birthday=document.getElementById('registerBirthday').value;
    var lName=document.getElementById('LasttName').value;
    var frstName= document.getElementById('fName').value;
    

    if(checkUserName(uname)  && checkFullName(frstName,lName) &&   
        checkDate(birthday) && checkEmail(eamil) && checkPassword(pass)){
        alert("Regestration done successfully");
        users.push(uname);
        passes.push(pass);
        changeLoginScreen();
    }else{
        alert("please enter ur information again");
        document.getElementById("RegisterPCDiv").reset();
    }
    //i tried but the code didnt work will sorry 
    /*reg.validate({
        rules: {
          uname: {
            required: true, //Required username
            minlength: 6, //Username must be of at least 6 chars
            number: false
          },
          email: {
            required: true, //Required email
            email: true //Validate email using built in email validation
          },
          pass: {
            required: true, //Required password
            minlength: 6 //Password must be of at least 6 chars
          },
          
        },
    
        messages: {
          uname: {
            required: "Please enter username",
            minlength: "Username must be at least 6 characters long"
          },
          email: {
            required: "Please enter email",
            email: "Please enter a valid email"
          },
          password: {
            required: "Please enter password",
            minlength: "Password must be at least 6 characters long"
          },
          birthday: {
            required:"Please enter password",
            validate:"Date must be valid" //valid date
          }
        },
    
        submitHandler: function(form) {
        users.push(uname);
        passes.push(pass);
        alert("Registertion finished successfully")
        }
      });*/

    
}

function checkEmail(val){
    var i;

    if(val == ""){
        alert("please add email");
        return false;
    }

    for(i=0; i<eamils.length;i++){
        if(eamils[i]==val){
            alert("email have been used");
            return false;
        }
    }
    alert("Email checked");
    return true;
}

function checkUserName(val){
    var  i;

    if(val == ""){
        alert("please add User Name");
        return false;
    }

    for(i=0; i<users.length;i++){
        if(users[i]==val){
            alert("Username not valid");
            return false;
        }
    }
    alert("userNameChecked");
    return true;
}

function checkPassword(val){
    var lettersNumbers = /^[0-9a-zA-Z]+$/;
    
    if(val == ""){
        alert("please add password");
        return false;
    }

   
    if(lettersNumbers.test(val))
    {
        alert('Your pass have accepted ');
        return true;
    }
    else
    {
        alert('Please input alphanumeric characters only in the password');
        return false;
    }
}

function checkFullName(fname,lname){    
    var Regex= /^[a-zA-Z]+$/;

    if(fname == ""){
        alert("please add a First Name");
        return false;
    }

    if(lname == ""){
        alert("please add a Last Name");
        return false;
    }

    if(Regex.test(fname) && Regex.test(lname)){
        alert("NAMEChecked");
        return true;
    }
    alert("please enter letters only in the first name and in the second name");
    return false;
}


function checkDate(val){
    if(val == ""){
        alert("please choose ur birthday");
        return false;
    }
    alert("DATEChecked");
    return true;
    
}



//Dialog 

function changeAboutScreen(){
    document.getElementById("myDialog").showModal();
}

function closeDialog(){
    var DialogModal = document.getElementById("myDialog");
    DialogModal.close();	
}

	
