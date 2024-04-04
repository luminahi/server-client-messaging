import { io } from "socket.io-client";

window.onload = () => {
    const socket = io("http://localhost:4000/");
    const form = document.querySelector("form#interval");
    const input = document.querySelector("input");
    const button = document.querySelector("button");

    const dialogSuccess = document.querySelector("dialog#success");
    const dialogFailure = document.querySelector("dialog#failure");

    dialogSuccess.addEventListener("click", (ev) => {
        dialogSuccess.close();
    });

    dialogFailure.addEventListener("click", (ev) => {
        dialogFailure.close();
    });

    form.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        const data = new FormData(form);
        const interval = data.get("number")[0];

        if (Number.isInteger(interval)) return;

        socket.emit("message", interval);
        input.disabled = true;
        button.disabled = true;
    });

    socket.on("connect_error", (conn) => {
        dialogFailure.showModal();
        socket.disconnect();
        setTimeout(() => {
            dialogFailure.close();
        }, 3000000);
        input.disabled = true;
        button.disabled = true;
    });

    socket.on("message", (data) => {
        dialogSuccess.innerHTML = data;
        dialogSuccess.showModal();
        setTimeout(() => {
            dialogSuccess.close();
        }, 3000);
        input.disabled = false;
        button.disabled = false;
    });
};
