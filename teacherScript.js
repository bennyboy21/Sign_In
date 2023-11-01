const firebaseConfig = {
    apiKey: "AIzaSyDOrwFpiYuD7Fatx5P4YKqO-vM6quVrYRM",
    authDomain: "dateyet-a69a0.firebaseapp.com",
    databaseURL: "https://dateyet-a69a0-default-rtdb.firebaseio.com",
    projectId: "dateyet-a69a0",
    storageBucket: "dateyet-a69a0.appspot.com",
    messagingSenderId: "68054972373",
    appId: "1:68054972373:web:108f33f587f6908bf3ef5c",
    measurementId: "G-TVZPWBWJ7P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

day = new Date().getDate()
month = new Date().getMonth()
year = new Date().getFullYear()

var student_Here = []

if(day < 10) {
    day = String(0) + String(day)
}

if(month + 1 < 10) {
    month = String(0) + String(month)
}

if(year < 10) {
    year = String(0) + String(year)
}

ran = true

today = String(day) + String(month + 1)+ String(year)

console.log(months[month] + " " + String(day) + ", " + String(year))
document.getElementById("todays-Date").textContent = months[month] + " " + String(day) + ", " + String(year)

firebase.database().ref("Days/" + today).once("value", function(snapshot) {
    console.log(snapshot.val())
})

for(var i=0;i<students_Nums.length;i++) {
    studentNUM = students_Nums[i]
    createStudentThing(studentNUM)
}

function createStudentThing(studentNUM) {
    // var element = document.createElement("div")
    // // document.getElementById("no-Students-Container").style.display = "none"

    document.getElementById("list").innerHTML += '<div class="student-Container"><div class="circle" id="circle-'+studentNUM+'"></div><div class="student-Name">'+ students_Names[students_Nums.indexOf(studentNUM)] +'</div><div class="student-Num">' + studentNUM + '</div><div class="sign-In-Time" id="sign-In-Time-'+studentNUM+'" style="margin-right:62px;">-</div></div>'
}

// firebase.database().ref("Days/" + today).once('value', function(snapshot) {
//     snapshot.forEach(function(ChildShapshot) {
        
//         // if(ran) {
//         //     document.getElementById("list").innerHTML = '<div class="student-Container first"><div class="attendence">A</div><div class="student-Name">Name</div><div class="student-Num-Title">Student#</div><div class="sign-In-Time-Title">Time</div></div>'
//         //     ran = false
//         // }

//         console.log(ChildShapshot.val().student)
//         student_Here.push([ChildShapshot.val().student, ChildShapshot.val().time])

//         createStudentInfo(ChildShapshot.val())
//     })
// })

firebase.database().ref("Days/" + today).on('child_added', function(snapshot) {
    // snapshot.forEach(function(ChildShapshot) {
    //     ChildShapshot.forEach(function(childNewSnap) {
    //         console.log(childNewSnap.val())  
    //     })
        
    //     // if(ran) {
    //     //     document.getElementById("list").innerHTML = '<div class="student-Container first"><div class="attendence">A</div><div class="student-Name">Name</div><div class="student-Num-Title">Student#</div><div class="sign-In-Time-Title">Time</div></div>'
    //     //     ran = false
    //     // }

        
    // })

    console.log(snapshot.val())
    console.log("something")
    student_Here.push([snapshot.val().student, snapshot.val().time])
    info = {
        "student":snapshot.val().student, 
        "time": snapshot.val().time
    }

    createStudentInfo(info)
})

function createStudentInfo(info) {
    // console.log(info)

    document.getElementById("circle-" + info.student).classList.add("here")
    document.getElementById("sign-In-Time-" + info.student).innerText = info.time
    document.getElementById("sign-In-Time-" + info.student).style.marginRight = "0"
    // var element = document.createElement("div")
    // // document.getElementById("no-Students-Container").style.display = "none"

    // document.getElementById("list").innerHTML += '<div class="student-Container"><div class="circle"></div><div class="student-Name">'+ students_Names[students_Nums.indexOf(info.student)] +'</div><div class="student-Num">' + info.student + '</div><div class="sign-In-Time">' + info.time + '</div></div>'
}