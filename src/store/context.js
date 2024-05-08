import React from 'react';

const defaultVal = {
  data: null,
  response: null,
  setContext: () => {},
};

const MainContext = React.createContext(defaultVal);

export default MainContext;
