let body = document.body,
    icons = ['<i class="fas fa-chess-knight"></i>',
        '<i class="fas fa-chess-king"></i>',
        '<i class="fas fa-chess"></i>',
        '<i class="fas fa-dice"></i>',
        '<i class="fas fa-chess-rook"></i>',
        '<i class="fas fa-chess-queen"></i>',
        '<i class="fas fa-chess-bishop"></i>',
        '<i class="fas fa-chess-pawn"></i>',
        '<i class="fas fa-dice-d20"></i>',
        '<i class="fas fa-dice-d6"></i>',
        '<i class="fas fa-dice-one"></i>',
        '<i class="fas fa-dice-two"></i>',
        '<i class="fas fa-dice-three"></i>',
        '<i class="fas fa-dice-four"></i>',
        '<i class="fas fa-dice-five"></i>',
        '<i class="fas fa-dice-six"></i>'],
    creatParent = document.createElement("div"),
    sec = 1000,
    time = 300,
    numOfCont = 60;


// Append Div.Parent To Body
body.appendChild(creatParent);


// Set Class Name To Parent Div
creatParent.className = "parent removePointer";




//For Loop For Append Child Box To Parent
for (let i = 0; i < (icons.length * 2); i++) {

    //Creat Box Div Element 
    let box = document.createElement("div"),

        //Creat Front Div 
        front = document.createElement("div"),

        //Creat Back Div
        back = document.createElement("div");

    // Set Class Name To Box 
    box.className = "box";

    //Set Class Name To Front 
    front.className = "face front";

    // Set Class Name To Back
    back.className = "face back";

    //Append Front And Back To Box
    box.appendChild(front);
    box.appendChild(back);

    //Append Boxs To Parent 
    creatParent.appendChild(box);

    //Append Parent To Container
    let container = document.getElementById("container");
    container.appendChild(creatParent);
};


// Shuffle Index Of Front
function shuffle(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);

        currentIndex -= 1;

        temporaryValue = array[currentIndex];

        array[currentIndex] = array[randomIndex];

        array[randomIndex] = temporaryValue;

    }

    return array;

}


// Call Front Elment
let front = document.querySelectorAll(".front");


// Creat Array To Contain Random Indexs From Front
let arrIndex = shuffle([...front.keys()]);


// Index Of Icons To Make 2 Icons
let indexIcons = 0;

// Loop For Front With Indexs From arrIndex
arrIndex.forEach(el => {

    // Check If indexIcons Equal Icons Length Reset indexIcons To 0
    if (indexIcons === icons.length)
        indexIcons = 0;

    // Append Icons To Front Element
    front[el].innerHTML = icons[indexIcons];

    indexIcons++

})


// Call Boxs Elements
let boxs = document.querySelectorAll(".box");

// Call Count
let count = document.querySelector(".count > span");

//call pupup
let pupup = document.querySelector(".pupup");

//Set Count To Game 
count.textContent = numOfCont;


//Loop To Add Click Event For boxs
boxs.forEach(el => {

    el.addEventListener("click", () => {

        // Add Class rotated To Elements Clicked 
        el.classList.add("rotated");

        // Call Element Have rotated Class
        let rotated = document.querySelectorAll(".rotated");

        // Check If We Have 2 rotated Elements 
        if (rotated.length === 2) {

            // Add Class To Parent To Make Elements Unclickable
            creatParent.classList.add("removePointer");

            //Check If Rotated 1 Equal Rotated 2 
            if (rotated[0].innerHTML === rotated[1].innerHTML) {

                // Make Parent clickable
                creatParent.classList.remove("removePointer");

                // Add success Class To Rotated Elements
                rotated[0].classList.add("success");
                rotated[1].classList.add("success");

                //Remove Rotated From Success Elemets
                rotated[0].classList.remove("rotated");
                rotated[1].classList.remove("rotated");
                // call success
                let success = document.querySelectorAll(".success");

                // Show Pupup Message If User Win
                if (success.length === boxs.length) {

                    localStorage.setItem(
                        document.querySelector(".name >span").innerHTML,
                        `Success Times: <span style="color:green;">${document.querySelectorAll(".success").length / 2}</span>
                        <br>
                        Wrong Times: <span style="color:red;">${numOfCont - parseInt(count.textContent)}</span>`
                    );

                    setTimeout(() => {
                        document.querySelector(".pupup > span").innerHTML = "Good Game :)"

                        pupup.classList.add("active");

                    }, sec)

                }

            } else {

                // Set Time To Make User See Elements Animation
                setTimeout(() => {

                    // Get Count Integer Number Minus 1 
                    count.textContent = parseInt(count.textContent) - 1;

                    //Remove Rotated From Success Elemets
                    rotated[0].classList.remove("rotated");
                    rotated[1].classList.remove("rotated");

                    // Make Parent clickable
                    creatParent.classList.remove("removePointer");

                    // Check If Count Equal 0 Show Pupup To User
                    if (parseInt(count.textContent) === 0) {

                        // Call Pupup Elemnt And Add Class Active To Show Pupup To User
                        pupup.classList.add("active");


                        localStorage.setItem(
                            document.querySelector(".name >span").innerHTML,
                            `Success Times: <span style="color:green;">${document.querySelectorAll(".success").length / 2}</span>
                            <br>
                            Wrong Times: <span style="color:red;">${numOfCont - parseInt(count.textContent)}</span>`
                        );
                    };

                }, sec);

            }

        }


    })

})


// Click Start 
document.getElementById("start").onclick = function () {

    let input = document.querySelector("input");
    if (input.value !== "") {
        //Make Input Value Equal Span From name Class
        document.querySelector(".name >span").innerHTML = input.value;

        //Make Parent clickable
        creatParent.classList.remove("removePointer");

        // Start Time
        let countdownTimer = setInterval(() => {
            let spanTime = document.getElementById("time"),
                min = Math.floor(time / 60),
                remsec = (time % 60);

            min = min < 10 ? "0" + min : min;
            remsec = remsec < 10 ? "0" + remsec : remsec;

            // Show Time In Page
            spanTime.textContent = `${min}:${remsec}`;

            time--

            if (time < 0) {
                spanTime.textContent = "Done";

                pupup.classList.add("active")

                localStorage.setItem(
                    document.querySelector(".name >span").innerHTML,
                    `Success Times: <span style="color:green;">${document.querySelectorAll(".success").length / 2}</span>
                        <br>
                        Wrong Times: <span style="color:red;">${numOfCont - parseInt(count.textContent)}</span>`
                );

                clearInterval(countdownTimer)
            }
        }, sec)

    } else {
        alert("Please Enter Your Name")
    }


};

// Click Button To Make User Reload The Game
document.getElementById("reload").onclick = function () {
    window.location.reload();
};

// When Page Load Done Go Focus On Input Field
window.onload = function () {
    document.getElementById("input").focus();
};



Object.entries(localStorage).forEach(([name, res]) => {
    let result = document.querySelector(".result"),
        divBoxRes = document.createElement("div"),
        divName = document.createElement("div"),
        textName = document.createTextNode(name),
        divResult = document.createElement("div");

    divBoxRes.className = "boxRes";

    divBoxRes.appendChild(divName).appendChild(textName);
    divBoxRes.appendChild(divResult).innerHTML = res;

    result.appendChild(divBoxRes)
});

// Clear Old ResultS
document.getElementById("removeAll").onclick = function () {
    //Old Method
    // Object.entries(localStorage).forEach(([key]) => {
    //     localStorage.removeItem(key)
    // })


    //New Method
    localStorage.clear();
    window.location.reload();
};
