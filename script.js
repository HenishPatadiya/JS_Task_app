// Validation

function checkMe() {
    let f = document.getElementById("fname").value;
    let l = document.getElementById("lname").value;
    let m = document.getElementById("mobile").value;
    let e = document.getElementById("email").value;

    var namePattern = "^[a-zA-Z]+$";
    var numPattern = "[0-9]{10}"
    var emailPattern = "^[a-zA-Z0-9+._-]+@[a-zA-Z0-9+._-]+$"

    let reg1 = new RegExp(namePattern);
    let reg2 = new RegExp(numPattern);
    let reg3 = new RegExp(emailPattern);

    if (reg1.test(f) && reg1.test(l) && reg2.test(m) && reg3.test(e) && document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value != "0") {
        signup();
    }
    else {
        alert("Please enter valid details !");
    }
}

// Sign up

function signup() {

    var u = JSON.parse(localStorage.getItem("userData"))
    if (u == null) {
        u = [];
    }
    var todo = [];

    let fname = document.getElementById("fname").value;
    // console.log(fname);
    let lname = document.getElementById("lname").value;
    // console.log(lname);
    let email = document.getElementById("email").value;
    // console.log(email);
    let mobile = document.getElementById("mobile").value;
    // console.log(mobile);
    // let gen = document.querySelector("gender");
    let gender = document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value;
    console.log(gender);
    let dob = document.getElementById("dob").value;
    // console.log(dob);
    let password = document.getElementById("password").value;
    // console.log(password);
    u.push({
        "fname": fname,
        "lname": lname,
        "email": email,
        "mobile": mobile,
        "gender": gender,
        "dob": dob,
        "password": password,
        "todo": todo,
    });

    localStorage.setItem("userData", JSON.stringify(u));
    // localStorage.setItem("active", email);
    window.location.href = "index.html"
    getNotes();
}


// Sign in

function signin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // console.log(password);
    var getData = JSON.parse(localStorage.getItem("userData"));

    var flag = 0;
    for (let i = 0; i <= getData.length; i++) {
        if ((getData[i].email == email || getData[i].mobile == email) && getData[i].password == password) {
            flag++;
            window.location.href = "home.html";
            // console.log("ok");
            localStorage.setItem("active", getData[i].email);
            break;
        }
    }
    if (flag == 0) {
        alert("Incorrect Details !");
    }
    getNotes();
}

// Logout

let logout = document.getElementById("logout");
logout.addEventListener('click', function () {
    localStorage.removeItem("active");
    window.location.href = "index.html";
});

// Notes

console.log("Welcome");
getNotes()

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    
    if(addTxt.value == "") {
        alert("Please Enter text !")
    }
    else {
        for (let i = 0; i < uData.length; i++) {
            if (uData[i].email == activeUser) {
                uData[i].todo.push(addTxt.value);
                break;
            }
        }
    }
    addTxt.value = "";
    localStorage.setItem("userData", JSON.stringify(uData));
    getNotes()
});

function getNotes() {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            var notesData = uData[i].todo;
            break;
        }
    }

    let htmlCode = "";
    notesData.forEach((element, index) => {
        htmlCode +=
            `<div class="cards">
                <h5 class="card-title">${index + 1}</h5>
                <textarea class="task" id="note${index}">${element}</textarea>
                <button id="${index}" onclick="editNote(this.id)" class="btnUpdate">Edit</button>
                <button id="${index}" onclick="markNote(this.id)" class="btnHome">Mak/Unmark</button>
                <button id="${index}" onclick="deleteNote(this.id)" class="btnLogout">Delete</button>
            </div>`
    });
    let notesElement = document.getElementById("note");
    if (notesData.length != 0) {
        notesElement.innerHTML = htmlCode;
    }
    else {
        notesElement.innerHTML = "";
    }
}

// function markNote(index) {
//     let uData = JSON.parse(localStorage.getItem("userData"));
//     let activeUser = localStorage.getItem("active");
//     for (let i = 0; i < uData.length; i++) {
//         if (uData[i].email == activeUser) {
//             var notesData = uData[i].todo;
//             break;
//         }
//     }
//     notesData[index].classList.toggle('checked');
// }

function deleteNote(index) {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            var notesData = uData[i].todo;
            break;
        }
    }

    notesData.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(uData));
    getNotes();
}

function editNote(index) {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            var notesData = uData[i].todo;
            break;
        }
    }

    let newData = document.getElementById(`note${index}`).value;
    notesData.splice(index, 1, newData);
    localStorage.setItem("userData", JSON.stringify(uData));
    getNotes();
}

// User Details

function fillDetails() {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    
    // console.log(activeUser);
    if (activeUser == null) {
        window.location.href = "index.html";
        alert("Login First !");
    }
    else {
        for (let i = 0; i < uData.length; i++) {
            if (uData[i].email == activeUser) {
                document.getElementById("fname").value = uData[i].fname;
                document.getElementById("lname").value = uData[i].lname;
                document.getElementById("email").value = uData[i].email;
                document.getElementById("mobile").value = uData[i].mobile;
                document.getElementById("gender").value = uData[i].gender;
                document.getElementById("dob").value = uData[i].dob;
                document.getElementById("password").value = uData[i].password;
            }
        }
    }
}

function updateDetails() {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");

    let fname1 = document.getElementById("fname").value;
    let lname1 = document.getElementById("lname").value;
    let email1 = document.getElementById("email").value;
    let mobile1 = document.getElementById("mobile").value;
    let gender1 = document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value;
    let dob1 = document.getElementById("dob").value;
    let password1 = document.getElementById("password").value;
    // console.log(uData);

    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            uData[i].fname = fname1;
            uData[i].lname = lname1;
            uData[i].email = email1;
            uData[i].mobile = mobile1;
            uData[i].gender = gender1;
            uData[i].dob = dob1;
            uData[i].password = password1;
        }
    }
    localStorage.setItem("userData", JSON.stringify(uData));
    window.location.href = "profileView.html";
    localStorage.setItem("active",email1);
}

function userDetails() {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");

    if (activeUser == null) {
        window.location.href = "index.html";
        alert("Login First !");
    }
    else {
        for (let i = 0; i < uData.length; i++) {
            if (uData[i].email == activeUser) {
                document.getElementById("name").innerHTML = uData[i].fname + " " + uData[i].lname;
                document.getElementById("email").innerHTML = uData[i].email;
                document.getElementById("mobile").innerHTML = uData[i].mobile;
                document.getElementById("gender").innerHTML = uData[i].gender;
                document.getElementById("dob").innerHTML = uData[i].dob;
            }
        }
    }
}

function deleteAccount() {
    let check = confirm("Are you sure ?");
    console.log(check);

    if(check) {
        let uData = JSON.parse(localStorage.getItem("userData"));
        let activeUser = localStorage.getItem("active");
        for (var i = 0; i < uData.length; i++) {
            if (uData[i].email == activeUser) {
                break;
            }
        }
        // console.log(i);
        uData.splice(i, 1);
        // console.log(uData);
        localStorage
        localStorage.setItem("userData", JSON.stringify(uData));
        localStorage.removeItem("active");
        window.location.href = "signup.html";
    }
}

// Time

function getTime() {
    var today = new Date();
    document.getElementById("time").innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}
setInterval(() => {
    getTime();
}, 1000);


// Location

(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
})();

function showPosition(position) {
    //console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=9a89db368e450d3e7beab143550cc28c`)
        .then(response => response.text())
        .then(data => {
            let weatherData = JSON.parse(data);
            // console.log(weatherData);
            let temp = (weatherData.main.temp - 273.15);
            // console.log(temp);
            let cityName = weatherData.name;
            // console.log(cityName);
            let weather = weatherData.weather[0].main;
            // console.log(weather);

            document.getElementById("cityName").innerHTML = `<i class="fas fa-city"></i>  ${cityName}`;
            document.getElementById("temp").innerHTML = `<i class="fas fa-temperature-low"></i> ${temp.toFixed(2)} °C`;
            document.getElementById("weather").innerHTML = `<i class="fas fa-cloud"></i> ${weather}`;
        })
}

// gif

function giphy() {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=f9pXQ5uQeMzdVekwOrowVIG01MFdm3PO`)
        .then(response => response.json())
        .then(content => {
            // console.log(content);
            let img = document.getElementById('img');
            img.src = content.data.images.downsized.url;
            img.alt = content.data.title;
        })
        .catch(err => console.log(err))
}
(function gifChange() {
    setInterval(() => {
        giphy();
    }, 10000);
})();