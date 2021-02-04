import React from "react";

import { render } from "@testing-library/react";
import { within, getNodeText } from "@testing-library/dom";
import userEvent from '@testing-library/user-event'

import StorageCalculator from ".";

import units from "../test/data/units.json";

describe("Storage Calculator", () => {
  it("should render the dropdowns correctly without subtypes", async () => {
    const { getByTestId } = render(<StorageCalculator units={units} />);

    const typeDropdown = within(getByTestId("dropdown-type"));
    const subTypeDropdown = within(getByTestId("dropdown-subtype"));
    const selectedType = await typeDropdown.findByRole("alert");
    const selectedSubType = await subTypeDropdown.findByRole("alert");

    expect(selectedType).toHaveTextContent("Parking");
    expect(selectedType).not.toHaveTextContent("Rooms");
    expect(getNodeText(selectedSubType)).toBeFalsy();
  });

  it("should render the dropdowns correctly with subtypes", async () => {
    const { getByTestId } = render(
      <StorageCalculator units={units} defaultIndex={3} />
    );

    const typeDropdown = within(getByTestId("dropdown-type"));
    const subTypeDropdown = within(getByTestId("dropdown-subtype"));
    const selectedType = await typeDropdown.findByRole("alert");
    const selectedSubType = await subTypeDropdown.findByRole("alert");

    expect(selectedType).not.toHaveTextContent("Parking");
    expect(selectedType).toHaveTextContent("Rooms");
    expect(selectedSubType).toHaveTextContent("1 Room");
  });

  it("should render unit buttons correctly", async () => {
    const { getAllByTestId } = render(
      <StorageCalculator units={units} defaultIndex={3} />
    );

    const unitButtons = getAllByTestId("unit-button");

    expect(unitButtons).toHaveLength(26);
  });

  it("should update unit buttons on type changes", async () => {
    const { getByTestId, getAllByTestId } = render(
      <StorageCalculator units={units} defaultIndex={3} />
    );

    expect(getAllByTestId("unit-button")).toHaveLength(26);

    const typeDropdown = within(getByTestId("dropdown-type"));
    const subTypeDropdown = within(getByTestId("dropdown-subtype"));
    const types = await typeDropdown.findAllByRole("option");
    const subTypes = await subTypeDropdown.findAllByRole("option");

    // Change to other sub-type
    userEvent.click(subTypes[2]);

    expect(getAllByTestId("unit-button")).toHaveLength(18);

    // Change to other type
    userEvent.click(types[1]);

    expect(getAllByTestId("unit-button")).toHaveLength(32);

    // Sub type should have reset to the first option
    const subType = await subTypeDropdown.findByRole("alert");
    expect(subType).toHaveTextContent('Regular Size Closet');
  });
});
