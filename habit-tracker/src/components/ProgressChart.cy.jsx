import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProgressChart from "./ProgressChart";
import { AuthContext } from "../hooks/useAuth";
import { formatDateString } from "../utils/dateUtils";

const queryClient = new QueryClient();

describe("<ProgressChart />", () => {
  it("calculates and renders progress bars correctly", () => {
    const today = new Date();
    const todayStr = formatDateString(today);

    cy.intercept("GET", "**/habits?userId=1", {
      body: [
        { id: 1, name: "H1", userId: 1 },
        { id: 2, name: "H2", userId: 1 },
      ],
    }).as("getHabits");

    cy.intercept("GET", "**/completions?userId=1", {
      body: [{ id: 100, habitId: 1, userId: 1, date: todayStr }],
    }).as("getCompletions");

    const mockAuth = { userId: 1 };

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuth}>
          <ProgressChart />
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    cy.wait(["@getHabits", "@getCompletions"]);

    cy.contains("Progress").should("be.visible");

    cy.get('div[style*="height: 50%"]').should("exist");

    cy.get('div[title="Day 15: 50%"]').should("exist");
  });

  it("shows empty chart when no data", () => {
    cy.intercept("GET", "**/habits?userId=1", { body: [] }).as(
      "getHabitsEmpty",
    );
    cy.intercept("GET", "**/completions?userId=1", { body: [] }).as(
      "getCompletionsEmpty",
    );

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ userId: 1 }}>
          <ProgressChart />
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    cy.wait(["@getHabitsEmpty", "@getCompletionsEmpty"]);

    cy.get('div[style*="height: 50%"]').should("not.exist");
  });
});
