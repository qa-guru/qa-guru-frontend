import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";
import { SnackbarProvider } from "notistack";
import { client } from "../http";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

describe("App.ts", () => {
  it("Check if the App render very well", () => {
    render(
      <BrowserRouter>
        <ApolloProvider client={client}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            variant="error"
            autoHideDuration={1500}
            maxSnack={1}
          >
            <App />
          </SnackbarProvider>
        </ApolloProvider>
      </BrowserRouter>
    );
    screen.debug();
  });
});
