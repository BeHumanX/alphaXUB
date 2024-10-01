import Echo from "laravel-echo";

import Pusher from "pusher-js";
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    // forceTLS: import.meta.env.VITE_REVERB_SCHEME,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    debug: true,
    logger: (message) => {
        console.log(message);
    },
    reconnect: true, // Enable automatic reconnection
    reconnectInterval: 1000,
});

// window.echo.channel('channel_for_everyone').listen('pusher:ping',(e)=>{
//     console.log('received ping ',e)
// });
