import {defineStore} from 'pinia';

const USER_DATA = 'user_data';
const GAME_DATA = 'player_data';
const GAME_STATUS = 'game_status';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem(USER_DATA)) ?? null,
        data: JSON.parse(localStorage.getItem(GAME_DATA)) ?? null,
        status: localStorage.getItem(GAME_STATUS) ?? 'wait',
        killed: 0,
        loader: true,
    }),
    actions: {
        userInit(resp) {
            const user = {
                name: resp.name,
                sid: resp.sid,
                admin: resp.admin,
            }
            this.user = user;
            localStorage.setItem(USER_DATA, JSON.stringify(user));
        },
        setData(data) {
            if (this.status === 'wait') {
                this.data = data;
                localStorage.setItem(GAME_DATA, JSON.stringify(data));
                this.status = 'wait';
                localStorage.setItem(GAME_STATUS, 'wait');
            }
        },
        startGame(data) {
            this.data = data;
            localStorage.setItem(GAME_DATA, JSON.stringify(data));
            this.status = 'game';
            localStorage.setItem(GAME_STATUS, 'game');
        },

        changeStatus(param) {
            this.status = param;
            localStorage.setItem(GAME_STATUS, param);
        },

        setKill(param) {
            this.killed = param;
        },

        restart() {
            localStorage.removeItem(USER_DATA);
            localStorage.removeItem(GAME_DATA);
            localStorage.removeItem(GAME_STATUS);
            this.user = null;
            this.data = null;
            this.status = 'wait';
            this.killed = 0;
            this.loader = false;
        },

        loaderUp() {
          this.loader = true;
        },

        loaderDown() {
            this.loader = false;
        },
    },
})
