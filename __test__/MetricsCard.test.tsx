/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import MetricsCard from "../src/client/components/MetricsCard";

// test("use jsdom in this test file", () => {
//   const element = document.createElement("div");
//   expect(element).not.toBeNull();
// });

describe("MetricsCard", () => {
  test("renders MetricsCard component", () => {
    render(
      <MetricsCard
        value="1"
        title="test"
        description="describe test component"
      />
    );

    screen.debug();
  });
});
