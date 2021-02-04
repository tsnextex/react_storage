import React from "react";
import { CustomSearchBox } from './style';
import { Icon } from 'semantic-ui-react';
import { Grid, Hidden, IconButton, SvgIcon, Button } from "@material-ui/core";
import { SearchFieldMobile } from "../";
import FilterDrawer from "./FilterDrawer";

export const SearchBar = (props) => {

  const {
    sizes,
    types,
    activeTypes,
    activeSizes,
    onActiveTypesChange,
    onActiveSizesChange,
    multipleSizes = true,
    multipleTypes = true,
    typeSelectRef = null,
    sizeSelectRef = null,
    placeholder,
    mapVisible,
    toggleMap,
    searchProperties,
    queryString,
    setQueryString,
    typeChange,
    sizeChange,
    setSearchField,
    sizeFormDetails,
    typeFormDetails,
    clearAllSize,
    clearAllType,
    applyAllSize,
    applyAllType,
    setSearchLatLng
  } = props;

  const [drawerOpen, toggleDrawer] = React.useState(false);
  const onBurgerTap = () => toggleDrawer(!drawerOpen);

  return (
    <CustomSearchBox>
      <FilterDrawer
        sizes={sizes}
        types={types}
        open={drawerOpen}
        toggle={onBurgerTap}
        typeChange={typeChange}
        sizeChange={sizeChange}
        sizeFormDetails={sizeFormDetails}
        typeFormDetails={typeFormDetails}
        clearAllSize={clearAllSize}
        clearAllType={clearAllType}
        applyAllSize={applyAllSize}
        applyAllType={applyAllType}
        type='searchPage'
      />
      <Grid
        item
        className="searchBoxMobile"
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={0}
      >
        <Grid item>
          <Hidden mdUp>
            { mapVisible ?
              (
                <IconButton
                  onClick={toggleMap}
                  aria-label="list"
                  className="listButton"
                >
                  <SvgIcon
                    style={{ width: "14px", height: "14px" }}
                    viewBox="0 0 50 50"
                  >
                    <g
                      id="Icons"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g id="icons/general/list" fill="#FFFFFF">
                        <path
                          d="M8,34 L8,42 L0,42 L0,34 L8,34 Z M50,34 L50,42 L12,42 L12,34 L50,34 Z M8,21 L8,29 L0,29 L0,21 L8,21 Z M50,21 L50,29 L12,29 L12,21 L50,21 Z M8,8 L8,16 L0,16 L0,8 L8,8 Z M50,8 L50,16 L12,16 L12,8 L50,8 Z"
                          id="Combined-Shape"
                        ></path>
                      </g>
                    </g>
                  </SvgIcon>
                </IconButton>
              ) :
              (
                <Icon
                  onClick={toggleMap}
                  style={{ color: 'white', fontSize: 14 }}
                  name='map marker alternate'
                />
              )
            }
          </Hidden>
        </Grid>
        <Grid item xs={9} container justify="center" alignItems="center">
          <SearchFieldMobile
            searchProperties={searchProperties}
            placeholder="Search by City, State or Zip"
            queryString={queryString}
            setSearchField={setSearchField}
            setQueryString={setQueryString}
            setSearchLatLng={setSearchLatLng}
          />
        </Grid>
        <Grid item>
          <Hidden smDown>
            <Button
              onClick={onBurgerTap}
              style={{ color: 'white', border: '1px solid', fontSize: 10, fontWeight: 700, textTransform: 'capitalize' }}
              size="large"
              variant="outlined"
              startIcon={
                <SvgIcon
                  style={{ width: "14px", height: "14px" }}
                  viewBox="0 0 50 50"
                >
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="icons/general/filter" fill="#FFFFFF">
                      <path
                        d="M30.5555556,35.7777778 L30.5555556,41.3333333 L19.4444444,41.3333333 L19.4444444,35.7777778 L30.5555556,35.7777778 Z M41.6666667,21.8888889 L41.6666667,27.4444444 L8.33333333,27.4444444 L8.33333333,21.8888889 L41.6666667,21.8888889 Z M50,8 L50,13.5555556 L0,13.5555556 L0,8 L50,8 Z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                  </g>
                </SvgIcon>
              }
            >
              Filters
            </Button>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              onClick={onBurgerTap}
              aria-label="list"
              className="listButton"
            >
              <SvgIcon
                style={{ width: "14px", height: "14px" }}
                viewBox="0 0 50 50"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="icons/general/filter" fill="#FFFFFF">
                    <path
                      d="M30.5555556,35.7777778 L30.5555556,41.3333333 L19.4444444,41.3333333 L19.4444444,35.7777778 L30.5555556,35.7777778 Z M41.6666667,21.8888889 L41.6666667,27.4444444 L8.33333333,27.4444444 L8.33333333,21.8888889 L41.6666667,21.8888889 Z M50,8 L50,13.5555556 L0,13.5555556 L0,8 L50,8 Z"
                      id="Combined-Shape"
                    ></path>
                  </g>
                </g>
              </SvgIcon>
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>
    </CustomSearchBox>
  );
}
