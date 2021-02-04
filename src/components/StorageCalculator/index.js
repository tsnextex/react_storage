import React, { useState, useCallback, useEffect } from "react";
// import styled from "styled-components";
import {
  DropdownRow,
  StyledDropdown,
  UnitImage,
  SizeButtonsRow,
  UnitImageContainer,
  TempImage
} from './style';
import { Button } from "semantic-ui-react";

const formatType = (key) =>
  key.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());

const keyMapper = ({ name: key }) => ({
  key: key,
  text: formatType(key),
  value: key,
});

const getItem = (key, set) => set.find(s => s.name === key)
const getUnitSizeTag = ({ width, length }) => `${width}x${length}`;
const getUnitSizeText = ({ width, length }) => `${width}' x ${length}'`;

const StorageCalculator = ({ units, defaultIndex, onSelect }) => {
  const firstType = units[units.length > defaultIndex ? defaultIndex : 0];
  const firstSubType = firstType.items[0];

  const [type, setType] = useState(firstType);
  const [subType, setSubType] = useState(firstSubType);
  const [unit, setUnit] = useState(firstSubType.items[0]);

  const unitSizeText = getUnitSizeText(unit);
  const unitSizeTag = getUnitSizeTag(unit);

  const setUnitOnTypeChange = useCallback(
    (subType) => {
      setUnit(
        subType.items[
        Math.max(
          0,
          subType.items.findIndex(
            (aUnit) => getUnitSizeTag(aUnit) === unitSizeTag
          )
        )
        ]
      );
    },
    [unitSizeTag, setUnit]
  );

  const onTypeChange = useCallback(
    (e, { value }) => {
      const newType = getItem(value, units);
      setType(newType);

      const newSubType = newType.items[0];
      setSubType(newSubType);
      setUnitOnTypeChange(newSubType);
    },
    [setType, setSubType, setUnitOnTypeChange]
  );

  const onSubTypeChange = useCallback(
    (e, { value }) => {
      const newSubType = getItem(value, type.items);
      setSubType(newSubType);
      setUnitOnTypeChange(newSubType);
    },
    [setSubType, setUnitOnTypeChange]
  );

  const onUnitChange = useCallback((unit) => setUnit(unit), [setUnit]);

  const isSubTypeDisabled = type.items.length === 1 && type.items[0].name === "";
  const typeSelection = units.map(keyMapper);
  const subTypeSelection = type.items.map(keyMapper);

  useEffect(() => {
    if (unit && onSelect) {
      onSelect(unit);
    }
  }, [unit, onSelect]);

  return (
    <div data-testid="storage-calculator">
      <DropdownRow>
        <StyledDropdown
          placeholder="Select a room type"
          fluid
          selection
          options={typeSelection}
          value={type.name}
          onChange={onTypeChange}
          data-testid="dropdown-type"
        />
        <StyledDropdown
          placeholder={isSubTypeDisabled ? "" : "Select a room type"}
          fluid
          selection
          options={subTypeSelection}
          value={subType.name}
          disabled={isSubTypeDisabled}
          onChange={onSubTypeChange}
          data-testid="dropdown-subtype"
        />
      </DropdownRow> 

      <UnitImageContainer>
        <UnitImage className="wrapper" id="slide" src={"https://images-dev.sroa.com/images/unit/10x20_storage_unit.png"}
          data-testid="unit-image" />
      </UnitImageContainer>
      <TempImage src={"https://images-dev.sroa.com/images/unit/10x20_storage_unit.png"}/>
      <SizeButtonsRow>
        {subType.items.map((u, i) => {
          const size = getUnitSizeText(u);
          return (
            <Button
              fluid
              primary={size === unitSizeText}
              onClick={() => onUnitChange(u)}
              key={i}
              data-testid="unit-button"
            >
              {size}
            </Button>
          );
        })}
      </SizeButtonsRow>
    </div>
  );
};

export default StorageCalculator;
