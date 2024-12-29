import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
// import { fass } from "@fortawesome/sharp-solid-svg-icons";
// import { fad } from "@fortawesome/pro-duotone-svg-icons";
// import { fadt } from "@fortawesome/duotone-thin-svg-icons";
// import { fasds } from "@fortawesome/sharp-duotone-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
// import { faHatCowboy } from "@fortawesome/pro-thin-svg-icons";
// import { faHatChef } from "@fortawesome/sharp-solid-svg-icons";

library.add(
  fas,
  // fass,
  // fad,
  // fadt,
  // fasds,
  faTwitter,
  faFontAwesome
  // faHatCowboy,
  // faHatChef
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
