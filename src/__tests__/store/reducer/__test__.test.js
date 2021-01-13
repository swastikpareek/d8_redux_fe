// Import readucer and actions

(() => {
  describe("Reducers", () => {
    let action;
    const state = {
    };

    describe("SOME_REDUCER reducer", () => {
      describe("SOMEACTION Action", () => {
        beforeAll(() => {
          action = setSomeActionFn();
        });

        it("should do something", () => {
          expect(SomeReducerFn(state, action).counter).toEqual(someState);
        });
      });
    });
  });
})();
