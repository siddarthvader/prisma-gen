let promptsContext = [];

export function getContextStore() {
  return {
    set: (role, content) => {
      promptsContext.push({ role, content });
    },
    get: () => {
      return promptsContext;
    },
  };
}
