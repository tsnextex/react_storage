import React from "react";
import { Grid } from "semantic-ui-react";
import { StyledContainer } from './style';

import StorageCalculator from "../../components/StorageCalculator";
import Note from "./Note";
import Feature from "./Feature";
import BottomImage from "./BottomImage";
import { useQuery } from "@apollo/client";

import STORAGE_CALCULATOR from '../../graphql/storageCalculator'


export const StorageCalculatorView = ({ featuredCalculatorData }) => {
  const { data, loading, error } = useQuery(STORAGE_CALCULATOR)

  const units = data ? data.getCalculatorTypes : null;

  return (
    <StyledContainer>
      <Note noteText={featuredCalculatorData.storageFeatures} />
      <Grid stackable>
        <Grid.Column width={9}>
        {units && (
          <StorageCalculator units={units} defaultIndex={2} />
        )}
        </Grid.Column>
        <Grid.Column width={7}>
          <Feature featureData={featuredCalculatorData.storageFeatures}/>
          <BottomImage />
        </Grid.Column>
      </Grid>
    </StyledContainer>
  );
};

export default StorageCalculatorView;
