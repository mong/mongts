import React from "react";
import { render } from "@testing-library/react";
import { RequirementList } from "..";
import { vi, test, expect } from "vitest";
import * as hooks from "../../../helpers/hooks";
import {
  requirementsTestData,
  rankTestData,
  scoresTestData,
} from "../../../test/test_data/registryRequirements.ts";

vi.mock("../../../helpers/hooks");

test("The requirement list renders correctly 3A", async () => {
  vi.spyOn(hooks, "useRegistryRequirementsQuery").mockReturnValue({
    data: requirementsTestData,
  });

  vi.spyOn(hooks, "useRegistryRankQuery").mockReturnValue({
    data: rankTestData,
  });

  vi.spyOn(hooks, "useRegistryScoresQuery").mockReturnValue({
    data: scoresTestData,
  });

  const { container } = render(
    <RequirementList registry="TestReg1" year={2022} />,
  );

  expect(container).toMatchSnapshot();
});

test("The requirement list renders correctly 3C", async () => {
  vi.spyOn(hooks, "useRegistryRequirementsQuery").mockReturnValue({
    data: requirementsTestData,
  });

  vi.spyOn(hooks, "useRegistryRankQuery").mockReturnValue({
    data: rankTestData,
  });

  vi.spyOn(hooks, "useRegistryScoresQuery").mockReturnValue({
    data: scoresTestData,
  });

  const { container } = render(
    <RequirementList registry="TestReg2" year={2022} />,
  );

  expect(container).toMatchSnapshot();
});

test("The requirement list renders correctly 4A", async () => {
  vi.spyOn(hooks, "useRegistryRequirementsQuery").mockReturnValue({
    data: requirementsTestData,
  });

  vi.spyOn(hooks, "useRegistryRankQuery").mockReturnValue({
    data: rankTestData,
  });

  vi.spyOn(hooks, "useRegistryScoresQuery").mockReturnValue({
    data: scoresTestData,
  });

  const { container } = render(
    <RequirementList registry="TestReg1" year={2023} />,
  );

  expect(container).toMatchSnapshot();
});

test("The requirement list renders correctly 4B", async () => {
  vi.spyOn(hooks, "useRegistryRequirementsQuery").mockReturnValue({
    data: requirementsTestData,
  });

  vi.spyOn(hooks, "useRegistryRankQuery").mockReturnValue({
    data: rankTestData,
  });

  vi.spyOn(hooks, "useRegistryScoresQuery").mockReturnValue({
    data: scoresTestData,
  });

  const { container } = render(
    <RequirementList registry="TestReg2" year={2023} />,
  );

  expect(container).toMatchSnapshot();
});
