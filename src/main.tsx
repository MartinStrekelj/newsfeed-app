import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { customTheme } from "./theme/theme";
import { store } from "./features/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider resetCSS theme={customTheme}>
        <ColorModeScript
          initialColorMode={customTheme.config.initialColorMode}
        />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
