export const loadState = () => {
  try {
    // eslint-disable-next-line no-undef
    const savedState = localStorage.getItem('state');
    if (savedState === null) {
      return undefined;
    }

    return JSON.parse(savedState);
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error(error);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToBeSaved = JSON.stringify(state);
    // eslint-disable-next-line no-undef
    localStorage.setItem('state', stateToBeSaved);
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error(error);
  }
};
