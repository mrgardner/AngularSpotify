const mockEvent = (value: number): Event => {
  return {
    ...new Event(''),
    target: new HTMLInputElement()
  };
};

export { mockEvent };
