const form = document.getElementById('inputs');

var totalUser=[];

if(localStorage.getItem('currUser')){
    document.getElementById('message').style.display='inline';
    document.getElementById('message').setAttribute('class','green')
    document.getElementById('message').innerText='Login Successfully';
}




form.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log("Hello");

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    if(!email || !password){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error :All Fields are Mandatory.'
        return;
    }

    let flag=false;
    let currUser;

    if(localStorage.getItem('totalUser')){
        totalUser=JSON.parse(localStorage.getItem('totalUser'));


        totalUser.forEach((user)=>{
            if(user.email==email){
                flag=true;
                user.token=generateToken();
                currUser=user;
                localStorage.setItem('currUser',JSON.stringify(user));
            }
        })

    }

    const loginBtn = document.getElementById("login");
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
      
        if (email.value.trim() === '' || password.value === '') {
          alert("All fields are required")
        } else {
          let users = JSON.parse(localStorage.getItem('users'));
          if (users) {
            let currentUser = users.find((currentUser) => {
              return currentUser.email === email.value.trim();
            });
            if (currentUser) {
              if (password.value === currentUser.password) {
                const token = generateToken(); // Generate the token
                sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser));
                sessionStorage.setItem('token', token); // Store the token in sessionStorage
      
                // Fetch the API
                fetch('https://fakestoreapi.com/products')
                  .then(response => response.json())
                  .then(data => {
                    console.log(data); // Process the API response data here
                    window.location.href = '../profile';
                    alert('Login successful');
                  })
                  .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to fetch API');
                  });
              } else {
                alert('Incorrect password');
              }
            } else {
              alert('You have not signed up');
            }
          } else {
            alert('You have not signed up');
          }
        }
      });
      


    if(flag==true && password!=currUser.password){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error : Wrong Password.'
        window.location.href = '../shop';
        return;
    }
    
    if(flag==false){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error : User does not Exist.'
        return;
    }


    document.getElementById('message').style.display='inline';
    document.getElementById('message').setAttribute('class','green')
    document.getElementById('message').innerText='Login Successfully';

    form.reset();


})

function generateToken(){
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += String.fromCharCode(Math.floor(Math.random() * 256));
    }
    
    return btoa(token);
}