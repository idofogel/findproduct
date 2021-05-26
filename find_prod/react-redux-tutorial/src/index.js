import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import docpage from "./js/components/docpage";
import docclient from "./js/components/docclient";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// const fs = require('fs');
// fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
//   if (err) return console.log(err);
//   console.log('Hello World > helloworld.txt');
// });
render(
  <Provider store={store}>
  	<Router>
      	<Route path="/login" component={App} ></Route>
      	<Route path="/docpage" component={docpage} ></Route>
      	<Route path="/docclient" component={docclient} ></Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
