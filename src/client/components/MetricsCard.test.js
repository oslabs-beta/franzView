import React from "react";
import { render, screen } from "@testing-library/react";

import MetricsCard from "./MetricsCard";

describe("MetricsCard", () => {
  test("renders MetricsCard component", () => {
    render(<MetricsCard />);

    screen.debug();
  });
});
