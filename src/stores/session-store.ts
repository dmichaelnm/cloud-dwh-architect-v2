import { defineStore } from 'pinia';
import { Account } from 'src/scripts/application/Account';
import { Project } from 'src/scripts/application/Project';
import { TEditorParameter } from 'src/scripts/utilities/common';

export const useSessionStore = defineStore('session', {
  state: () => ({
    // The current authorized account object
    account: null as Account | null,
    // The list of all accessible projects
    projects: [] as Project[],
    // The current selected project
    project: null as Project | null,
    // Editor parameter
    editorParameter: null as TEditorParameter | null,
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
