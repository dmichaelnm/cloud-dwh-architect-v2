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
     * Retrieves a project by its unique identifier.
     *
     * @param {string} id - The unique identifier of the project to retrieve.
     * @return {Project | null} The matching project if found, otherwise null.
     */
    getProject(id: string | null): Project | null {
      const project = this.projects.find((p) => p.id === id);
      return project ?? null;
    },
    /**
     * Sorts the list of projects by their common name in alphabetical order.
     */
    sortProjects(): void {
      this.projects.sort((a, b) =>
        a.data.common.name.localeCompare(b.data.common.name)
      );
    },
    /**
     * Resets the current user session.
     */
    resetSession(): void {
      this.account = null;
    },
  },
});
