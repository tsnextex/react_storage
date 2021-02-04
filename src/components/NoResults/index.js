import React from 'react';
import { NoResultsContainer } from './style';
import { Icon, Header } from 'semantic-ui-react';

export const NoResults = () => (
  <NoResultsContainer>
    <Header as='h2'>
      <Icon name='search' />
      <Header.Content>
        No Units Matched your Search
        <Header.Subheader>
          Sorry, but we were not able to find any units that match your search and filter criteria. Try another search!
        </Header.Subheader>
      </Header.Content>
    </Header>
  </NoResultsContainer>
);