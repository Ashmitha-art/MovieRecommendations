import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

configure({ adapter: new Adapter() });

// Mock local storage so that tests can see pages as a logged in user.
var localStorageMock = (function () {
  var store = { token: "1" };
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });
