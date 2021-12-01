import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "Store/appStore";

import Pathway from "Containers/CarePathway/Pathway";

const router = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pathway />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default router;
