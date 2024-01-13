import {format} from "date-fns";
import {v4 as uuidv4} from "uuid";

// збереження даних форми
function saveFormState(event) {
    const form = event.currentTarget;
    const email = form.querySelector("input[name='email']").value;
    const message = form.querySelector("textarea[name='message']").value;
    const formState = {
        email,
        message,
    };

    localStorage.setItem("feedback-form-state", JSON.stringify(formState));
}

// заповнення полів форми з localStorage
function loadFormState(form) {
    const formState = JSON.parse(localStorage.getItem("feedback-form-state"));

    if (formState) {
        form.querySelector("input[name='email']").value = formState.email;
        form.querySelector("textarea[name='message']").value = formState.message;
    }
}

//очищення форми
function clearFormState() {
    localStorage.removeItem("feedback-form-state");

    const form = document.querySelector(".feedback-form");
    form.querySelector("input[name='email']").value = "";
    form.querySelector("textarea[name='message']").value = "";
}

//введення
document
    .querySelector(".feedback-form")
    .addEventListener("input", saveFormState);
//заповнення форми з localStorage
loadFormState(document.querySelector(".feedback-form"));
//submit форми
document.querySelector(".feedback-form").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log({
        email: document.querySelector("input[name='email']").value,
        message: document.querySelector("textarea[name='message']").value,
    });
    clearFormState();
});

//date
const elem = document.querySelector(".feedback-form");
let div = document.createElement("div");
div.innerHTML = format(new Date(2024, 1, 1), "MM/dd/yyyy");
elem.append(div);
//id
console.log(uuidv4());
//
//
//
//google api
//https://gist.github.com/cafeasp/dbe5a31238a1e12d67740ce78de93acc
