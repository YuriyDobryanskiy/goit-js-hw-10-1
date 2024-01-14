import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const showMessage = (status, message) => {
    iziToast.show({
        title: status,
        timeout: 5000,
        position: 'center',
        message: message,
        color: (status == 'Fulfilled') ? 'green' : 'red',
    });
}
const promiseForm = document.querySelector(".form");
promiseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const stateInput = document.querySelector('input[name="state"]:checked');
    const delay = parseInt(delayInput.value);
    const state = stateInput.value;

    const promise = new Promise((resolve, reject) => {
        // const isFulfilled = state === "fulfilled";
        // const action = isFulfilled ? resolve : reject;
        // setTimeout(() => action(delay), delay);

        if (state === "fulfilled") {
            setTimeout(() => resolve(delay), delay);
        } else {
            setTimeout(() => reject(delay), delay);
        }
    });

    promise
        .then((delay) => {
            showMessage("Fulfilled", `✅ Fulfilled promise in ${delay}ms`);
            // iziToast.success({title: "Fulfilled",message: `✅ Fulfilled promise in ${delay}ms`});
        })
        .catch((delay) => {
            showMessage("Rejected", `❌ Rejected promise in ${delay}ms`);
            // iziToast.error({title: "Rejected",message: `❌ Rejected promise in ${delay}ms`});
        });
});