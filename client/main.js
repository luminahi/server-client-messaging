import { io } from "socket.io-client";

window.onload = () => {
    const socket = io("http://localhost:4000/");
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const button = document.querySelector("button");
    const dialog = document.querySelector("dialog");

    dialog.addEventListener("click", (ev) => {
        dialog.close();
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

    socket.on("message", (data) => {
        dialog.innerHTML = data;
        dialog.showModal();
        setTimeout(() => {
            dialog.close();
        }, 3000);
        input.disabled = false;
        button.disabled = false;
    });
};
