
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;

    
    if (color === '#000') {
        document.body.style.color = '#fff'; // White text
    } else {
        document.body.style.color = '#000'; // Black text for other modes
    }
}

// Function to increase or decrease number
let number = 10;

function increase() {
    if (number < 20) {
        number++;
        document.getElementById('number').innerText = number;
    }
}

function decrease() {
    if (number > 0) {
        number--;
        document.getElementById('number').innerText = number;
    }
}

//  Form validation
function validateForm(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname');
    const password = document.getElementById('password');
    let valid = true;

    if (!fullname.value) {
        fullname.classList.add('error');
        valid = false;
    } else {
        fullname.classList.remove('error');
    }

    if (!password.value) {
        password.classList.add('error');
        valid = false;
    } else {
        password.classList.remove('error');
    }

    if (valid) {
        document.getElementById('message').innerText = "Form submitted";
        document.getElementById('loginForm').style.display = 'none';
    }
}
