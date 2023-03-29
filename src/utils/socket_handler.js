export function socketHandler(store, socket) {
    switch (socket.type) {
        case 'player_list':
            store.setData(socket.data);
            break;
        case 'user_data':
            store.userInit({...socket});
            break;
        case 'joined_list':
            store.setData(socket.data);
            store.changeStatus('wait');
            break;
        case 'users_data':
            store.startGame(socket.data);
            break;

        case 'night_start':
            store.changeStatus('night_start');
            break;

        case 'killed_player':
            store.setKill(socket.place);
            store.changeStatus('killed_player');
            if(store.user.admin === 'true') {
                const audio = new Audio('http://mafia.warpion.ru/after_kill.mp3');
                audio.play();
            }
            break;

        case 'don':
            store.changeStatus('don');
            if(store.user.admin === 'true') {
                const audio = new Audio('http://mafia.warpion.ru/don.mp3');
                audio.play();
            }
            setTimeout(()=>{
                if(store.user.admin === 'true') {
                    const audio = new Audio('http://mafia.warpion.ru/before_sheriff.mp3');
                    audio.play();
                }
                store.changeStatus('sheriff');
            }, 10000);
            break;

        case 'morning':
            if(store.user.admin === 'true') {
                const audio = new Audio('http://mafia.warpion.ru/after_sheriff.mp3');
                audio.play();
            }
            setTimeout(()=>{
                if(store.user.admin === 'true') {
                    const audio = new Audio('http://mafia.warpion.ru/morning.mp3');
                    audio.play();
                }
                store.setKill(socket.place);
                store.changeStatus('morning');
            }, 10000);
            break;

        case 'restart':
            store.restart();
            break;

    }
}
