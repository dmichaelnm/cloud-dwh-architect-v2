import { defineStore } from 'pinia';
import { Account } from 'src/scripts/application/Account';

export const useSessionStore = defineStore('session', {
  state: () => ({
    // The current authorized account object
    account: null as Account | null,
  }),
  getters: {},
  actions: {
    /**
     * Resets the current user session.
     */
    resetSession(): void {
      this.account = null;
    },
  },
});
