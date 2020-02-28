const mockEvent = (): Event => {
  return {
    ...new Event(''),
    target: new HTMLInputElement()
  };
};

export { mockEvent };
