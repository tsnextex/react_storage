import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import {
  CustomLocationContainer,
  LocationDetailsCard,
  LocationContent,
  PromoItem,
  ListOfUnits,
  CustomReviewBox,
  NavigationTabs,
  FilterMenu
} from './style';
import { NoResults } from '../../components/NoResults';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { Accordion, Icon, Divider, Button, Segment, Dimmer, Loader, Menu } from 'semantic-ui-react';
import { List, Button as AntBtn } from 'antd';
import { IconButton, SvgIcon, Typography, Hidden, Button as MaterialBtn, Grid, Avatar } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";
import { NearbyLocations } from '../../components/NearbyLocations';
import { gqlRequest } from "../../utils";
import client from "../../apollo";
import { GetFullLocationQuery } from "../../graphql/selectedLocation";
import parse from 'html-react-parser';
import ice from './icons/ice.png';
import promo from './icons/promo.png';
import drive from './icons/drive.png';
import ff from './icons/ff.png';
import park from './icons/park.png';
import wine from './icons/wine.png';
import Scroll from 'react-scroll';
import FilterDrawer from "../Search/components/SearchBar/FilterDrawer";
import { PlusCircleFilled, MinusCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import location_red from '../../img/icons/general/location_red.png';
import location_blue from '../../img/icons/general/location_blue.png';
import moment from 'moment';
import SizeGuideModal from "../../components/SizeGuideModal";

const Element  = Scroll.Element;
const scroller = Scroll.scroller;

export const SelectedLocation = props => {

  const {
    sizes,
    types,
    typeChange,
    sizeChange,
    sizeFormDetails,
    typeFormDetails,
    clearAllSize,
    clearAllType,
    applyAllSize,
    applyAllType,
    latLng
  } = props;

  const [fetchingLocation, setFetchingLocation] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [aboutActiveIndex, setAboutActiveIndex] = useState(0);
  const [reviewsActiveIndex, setReviewsActiveIndex] = useState(0);
  const [faqActiveIndex, setFaqActiveIndex] = useState(-1);
  const [cityActiveIndex, setCityActiveIndex] = useState(-1);
  const [annexLocationIndex, setAnnexLocationIndex] = useState(0);
  const [featuresIndex, setFeaturesIndex] = useState(-1);
  const [accessIndex, setAccessIndex] = useState(-1);
  const [extrasIndex, setExtrasIndex] = useState(-1);
  const [parkingIndex, setParkingIndex] = useState(-1);
  const [promotionsIndex, setPromotionsIndex] = useState(-1);
  const [securityIndex, setSecurityIndex] = useState(-1);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [fullTypes, setFullTypes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [drawerOpen, toggleDrawer] = useState(false);
  const [mapDropdown, setMapDropdown] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [zoom, setZoom] = useState(12);

  let history = useHistory();

  useEffect(() => {

    // set bounds on load or list change
    if (!!mapRef) getMapBounds();

  }, [mapRef]);

  useEffect(() => {

    console.log('start get location')

    // get property data by id
    const path = window.location.href;
    const url = path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
    const slug = url.substring(url.lastIndexOf("/") + 1);
    
    if (!currentLocation) {

      gqlRequest(client, GetFullLocationQuery(slug))
      .then(res => {
        console.log('full location set', res);
        setCurrentLocation(res.data.getLocationWithTypes);
        setFullTypes(res.data.getLocationWithTypes.types);
        setReviews(res.data.getLocationReviews);
        setFetchingLocation(false);
      });  

    } else setFetchingLocation(false);

  }, [fetchingLocation]);

  useEffect(() => {

    if (fullTypes.length > 0) applyFiltersToTypes(fullTypes);

  }, [fullTypes]);

  

  const [openModal, setOpenModal] = React.useState(false); //tempcode
  const handleOpenSGModal = (e) => {
    console.log('open modal')
    setOpenModal(true)
  }
  

  const applyFiltersToTypes = types => {

    // filter for size
    let allSizes = [];
    Object.entries(sizeFormDetails).map(x => allSizes = [...allSizes, x[1]]);

    let filterBySize = [];
    if (allSizes.includes(true)) {

      types.map(type => {
        type.tags.map(tag => {
          if (sizeFormDetails[tag]) filterBySize = [...filterBySize, type];
        });
      });

    } else filterBySize = types;

    
    // filter for type
    let allTypes = [];
    Object.entries(typeFormDetails).map(x => allTypes = [...allTypes, x[1]]);

    let filterByType = [];
    if (allTypes.includes(true)) {

      filterBySize.map(type => {
        type.tags.map(tag => {
          if (typeFormDetails[tag]) filterByType = [...filterByType, type];
        });
      });

    } else filterByType = filterBySize;

    // remove duplicates
    const removeDuplicates = filterByType.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);

    // remove any 0 sizes or 0 prices
    const removeZeroSizeAndPrice = removeDuplicates.filter(x => (!!x && x.price !== 0 && x.length !== 0 && x.width !== 0));

    // sort by price
    const sortedByPrice = removeZeroSizeAndPrice.sort((a, b) => a.price - b.price);
    
    // update results
    setFilteredTypes(sortedByPrice);
  }

  const onBurgerTap = () => toggleDrawer(!drawerOpen);

  const handleClick = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  const handleClickAbout = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = aboutActiveIndex === index ? -1 : index;
    setAboutActiveIndex(newIndex);
  }

  const handleClickReviews = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = reviewsActiveIndex === index ? -1 : index;
    setReviewsActiveIndex(newIndex);
  }

  const handleClickFaq = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = faqActiveIndex === index ? -1 : index;
    setFaqActiveIndex(newIndex);
  }

  const handleClickCity = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = cityActiveIndex === index ? -1 : index;
    setCityActiveIndex(newIndex);
  }

  const handleClickAnnexList = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = annexLocationIndex === index ? -1 : index;
    setAnnexLocationIndex(newIndex);
  }

  const handleClickFeatures = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = featuresIndex === index ? -1 : index;
    setFeaturesIndex(newIndex);
  }

  const handleClickAccess = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = accessIndex === index ? -1 : index;
    setAccessIndex(newIndex);
  }

  const handleClickExtras = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = extrasIndex === index ? -1 : index;
    setExtrasIndex(newIndex);
  }

  const handleClickParking = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = parkingIndex === index ? -1 : index;
    setParkingIndex(newIndex);
  }

  const handleClickPromotions = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = promotionsIndex === index ? -1 : index;
    setPromotionsIndex(newIndex);
  }

  const handleClickSecurity = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = securityIndex === index ? -1 : index;
    setSecurityIndex(newIndex);
  }

  const getSize = tags => {

    let size;
    size = tags.includes('sm') ? 'Small' : size;
    size = tags.includes('md') ? 'Medium' : size;
    size = tags.includes('lg') ? 'Large' : size;
    size = tags.includes('xl') ? 'Extra Large' : size;
    return size;
  }

  const panes = [
    { menuItem: 'Units' },
    { menuItem: 'Features' },
    { menuItem: 'Reviews' },
    { menuItem: 'Storage FAQ' },
    { menuItem: 'City Information' },
  ];

  const handleTabChange = (e, { activeIndex }) => {

    let scrollElement;
    scrollElement = activeIndex === 0 ? 'unitsElement' : scrollElement;
    scrollElement = activeIndex === 1 ? 'featuresElement' : scrollElement;
    scrollElement = activeIndex === 2 ? 'reviewsElement' : scrollElement;
    scrollElement = activeIndex === 3 ? 'faqElement' : scrollElement;
    scrollElement = activeIndex === 4 ? 'cityElement' : scrollElement;

    scroller.scrollTo(scrollElement, {
      duration: 1500,
      delay: 100,
      smooth: true
    });
  }

  const checkActive = tag => {

    if (tag !== 'all') {

      if (sizeFormDetails[tag] || typeFormDetails[tag]) return true;
      else return false;

    } else {

      if (
        tag === 'all' &&
        !sizeFormDetails['sm'] &&
        !sizeFormDetails['md'] &&
        !sizeFormDetails['lg'] &&
        !sizeFormDetails['xl'] &&
        !typeFormDetails['pk'] &&
        !typeFormDetails['pr'] &&
        !typeFormDetails['wn'] &&
        !typeFormDetails['ff'] &&
        !typeFormDetails['du'] &&
        !typeFormDetails['cc']
      ) return true
      else return false
    }
  }

  const style = {
    width: "100%",
    height: "100%",
  };

  const containerStyle = {
    position: "relative",
    width: "inherit",
    height: 225,
    paddingBottom: "1em",
  };

  const determineLocationTitle = item => {

    const type = item.is_main ? 'Office' : 'Annex';
    const address = item.is_main ? '' : `- ${item.address}`;
    
    return <div style={{ fontSize: 11, display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <span style={{ color: '#1B3C92', fontWeight: 700 }}>{item.name} {address} </span> 
        ({type})
      </div>
      { item.miles_to_annex &&
        <div style={{ color: '#4A4A4A', fontWeight: 700, minWidth: 55, paddingLeft: 10, textAlign: 'end' }}>
          {item.miles_to_annex.toFixed(1)} m
        </div>
      }
    </div>;
  }

  const getTotalVacant = () => {

    // add up all total vacants from all filtered types
    let count = 0;
    filteredTypes.map(type => count = count + type.total_vacant);
    return count;
  }

  const determineMapMarkerColor = item => {

    // if marker id === location id
    return Number(item.id) === Number(currentLocation.id);
  }

  // set initial map load
  const setMap = (mapProps, map) => {
    setMapRef(map);
  }

  const getMapBounds = () => {

    let bounds = new props.google.maps.LatLngBounds();

    if (currentLocation.map.length > 1) {

      // locations available
      currentLocation.map.map(({ latitude, longitude }) => {
        bounds.extend({
          lat: latitude,
          lng: longitude
        });
      });

      mapRef.fitBounds(bounds);

    } else {

      // center of search
      bounds.extend({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude
      });

      mapRef.fitBounds(bounds);
      setTimeout(() => {
        setZoom(14);
      }, 1000);
    }
  }

  return (
    <CustomLocationContainer>

      { (!fetchingLocation && !!currentLocation) ?
        <>
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
            type='locationPage'
          />

          <Hidden smDown>
            <NavigationTabs
              onTabChange={handleTabChange}
              menu={{ secondary: true, pointing: true }}
              panes={panes}
            />
          </Hidden>

          <section class="locationTopNav">
            <AntBtn
              type="text"
              onClick={() => history.goBack()}
              className="topNavBackBtn">
                Back
            </AntBtn>

            <Hidden mdUp>
              <Button onClick={() => setMapDropdown(!mapDropdown)} basic icon>
                { currentLocation.map.length > 1 ? 'Annex Locations' : 'Map' }
                <Icon name='map marker alternate' />
              </Button>
            </Hidden>
          </section>

          <section className="mainContentContainer">
            <Hidden smUp>
              { mapDropdown &&
              <>
                <section className="mapContainer">
                  <Map
                    onReady={setMap}
                    google={props.google}
                    mapTypeControl={false}
                    fullscreenControl={false}
                    style={style}
                    containerStyle={containerStyle}
                    initialCenter={{lat: currentLocation.latitude, lng: currentLocation.longitude }}
                    zoom={zoom}
                  >
                    { currentLocation.map.map(marker => (
                      <Marker
                        icon={{
                          url: determineMapMarkerColor(marker) ? location_red : location_blue,
                          anchor: new props.google.maps.Point(32,32),
                          scaledSize: new props.google.maps.Size(25,25)
                        }}
                        title={marker.name}
                        name={marker.name}
                        position={{lat: marker.latitude, lng: marker.longitude }} />
                    ))
                    }
                  </Map>
                </section>
                { currentLocation.map.length > 1 &&
                  <Accordion className="section">
                    <Accordion.Title
                      active={annexLocationIndex === 0}
                      index={0}
                      onClick={handleClickAnnexList}
                      className="customDropdownAnnex"
                    >
                      <div>Locations</div>

                      <div className="dropdownLabelAnnex">
                      { annexLocationIndex === 0 ? '–' : '+'}
                      </div>
                    </Accordion.Title>
                    <Accordion.Content active={annexLocationIndex === 0}>
                      <List
                        itemLayout="horizontal"
                        dataSource={currentLocation.map.sort((a, b) => a?.miles_to_annex - b?.miles_to_annex)}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              style={{ alignItems: 'center' }}
                              avatar={
                                <Icon
                                  style={{
                                    color: determineMapMarkerColor(item) ? '#CE3138' : '#1B3C92'
                                  }}
                                  name='map marker alternate'
                                />
                              }
                              title={determineLocationTitle(item)}
                            />
                          </List.Item>
                        )}
                      />
                    </Accordion.Content>
                  </Accordion>
                }
              </>
              }
            </Hidden>
            <div>
              <LocationDetailsCard>
                <div className="property_details">

                  <img
                    src={`https://images-dev.sroa.com/images/location/${currentLocation.images[0]?.url}`}
                    alt={currentLocation.images[0]?.alternative_text}
                  />
                  
                  <section className="details_container">
                    <Typography className="name" children={currentLocation.name} />
                    <Rating
                      style={{ fontSize: "15px", color: "#E1AC1A", margin: '2px 0' }}
                      name="read-only"
                      value={currentLocation.rating}
                      readOnly
                    />
                    <Typography className="location">
                      <LocationOnIcon className="icon" />
                      <div>
                        <div>{currentLocation.address}</div>
                        <div>{currentLocation.city}, {currentLocation.state} {currentLocation.zipcode}</div>
                      </div>
                    </Typography>
                    <Typography className="phone">
                      <CallIcon className="icon" />
                      {currentLocation.phone}
                    </Typography>
                  </section>
                </div>

                { !!currentLocation.office_located ?
                  (
                    <section className="officeLocationContainer">
                      <div className="officeIcon">
                        <Icon name="exclamation circle" />
                      </div>
                      <div className="officeDetails">
                        <div>Office located at: <strong>{currentLocation.office_located?.name}</strong></div>
                        <div><strong>{currentLocation.office_located?.address}, {currentLocation.office_located?.state} {currentLocation.office_located?.zipcode}</strong></div>
                      </div>
                    </section>
                  ) :
                  (
                    <Divider />
                  )
                }

                <Accordion style={{ padding: '0 10px 10px 10px' }}>
                  <Accordion.Title
                    className="locationDetailsDropdown"
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleClick}
                  >
                    {
                      activeIndex === 0 ?
                      '- ' :
                      '+ '
                    }
                    View Location Details
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                    <div className="infoHeader">Leasing Office Hours</div>
                    { !!currentLocation.business_hours && parse(currentLocation.business_hours) }
                    <div className="infoHeader">For Unit Prices or to Rent by Phone Call Hours</div>
                    { !!currentLocation.call_center_hours && parse(currentLocation.call_center_hours) }
                    <div className="infoHeader">Unit Access Hours</div>
                    { !!currentLocation.gate_access && parse(currentLocation.gate_access) }
                  </Accordion.Content>
                </Accordion>
              </LocationDetailsCard>

              <Hidden smDown>
                <section className="mapContainer">
                  <Map
                    onReady={setMap}
                    google={props.google}
                    mapTypeControl={false}
                    fullscreenControl={false}
                    style={style}
                    containerStyle={containerStyle}
                    initialCenter={{lat: currentLocation.latitude, lng: currentLocation.longitude }}
                    zoom={zoom}
                  >
                    { currentLocation.map.map(marker => (
                      <Marker
                        icon={{
                          url: determineMapMarkerColor(marker) ? location_red : location_blue,
                          anchor: new props.google.maps.Point(32,32),
                          scaledSize: new props.google.maps.Size(25,25)
                        }}
                        title={marker.name}
                        name={marker.name}
                        position={{lat: marker.latitude, lng: marker.longitude }} />
                    ))
                    }
                  </Map>
                </section>
                { currentLocation.map.length > 1 &&
                  <Accordion className="section">
                    <Accordion.Title
                      active={annexLocationIndex === 0}
                      index={0}
                      onClick={handleClickAnnexList}
                      className="customDropdownAnnex"
                    >
                      <div>Locations</div>

                      <div className="dropdownLabelAnnex">
                      { annexLocationIndex === 0 ? '–' : '+'}
                      </div>
                    </Accordion.Title>
                    <Accordion.Content active={annexLocationIndex === 0}>
                      <List
                        itemLayout="horizontal"
                        dataSource={currentLocation.map.sort((a, b) => a?.miles_to_annex - b?.miles_to_annex)}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              style={{ alignItems: 'center' }}
                              avatar={
                                <Icon
                                  style={{
                                    color: determineMapMarkerColor(item) ? '#CE3138' : '#1B3C92'
                                  }}
                                  name='map marker alternate'
                                />
                              }
                              title={determineLocationTitle(item)}
                            />
                          </List.Item>
                        )}
                      />
                    </Accordion.Content>
                  </Accordion>
                }
              </Hidden>

              <Hidden mdUp>
                <NavigationTabs
                  onTabChange={handleTabChange}
                  menu={{ secondary: true, pointing: true }}
                  panes={panes}
                />
              </Hidden>
            </div>

            <LocationContent>

              <PromoItem />

              <div className="filterRow">

                <div>{getTotalVacant()} Available Units</div>

                <Hidden mdUp>
                    <IconButton
                      onClick={onBurgerTap}
                      aria-label="list"
                      className="filterIconBtn"
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
                          <g id="icons/general/filter" fill="#4A4A4A">
                            <path
                              d="M30.5555556,35.7777778 L30.5555556,41.3333333 L19.4444444,41.3333333 L19.4444444,35.7777778 L30.5555556,35.7777778 Z M41.6666667,21.8888889 L41.6666667,27.4444444 L8.33333333,27.4444444 L8.33333333,21.8888889 L41.6666667,21.8888889 Z M50,8 L50,13.5555556 L0,13.5555556 L0,8 L50,8 Z"
                              id="Combined-Shape"
                            ></path>
                          </g>
                        </g>
                      </SvgIcon>
                    </IconButton>
                  </Hidden>
              </div>

              <section className="filterBtnRow">

                <FilterMenu secondary>
                  <Menu.Item
                    name='All'
                    active={checkActive('all')}
                    onClick={() => {
                      clearAllSize();
                      clearAllType();
                    }} 
                  />
                  <Menu.Item name='Small' active={checkActive('sm')} onClick={() => sizeChange('sm')} />
                  <Menu.Item name='Medium' active={checkActive('md')} onClick={() => sizeChange('md')} />
                  <Menu.Item name='Large' active={checkActive('lg')} onClick={() => sizeChange('lg')} />
                  <Menu.Item name='X-large' active={checkActive('xl')} onClick={() => sizeChange('xl')} />
                  <Menu.Item name='Parking' active={checkActive('pk')} onClick={() => typeChange('pk')} />
                </FilterMenu>

                <Grid item>
                  <Hidden smDown>
                    <MaterialBtn
                      onClick={onBurgerTap}
                      style={{ color: '#4A4A4A', border: '1px solid #e0e1e2', fontSize: 10, fontWeight: 700, textTransform: 'capitalize' }}
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
                            <g id="icons/general/filter" fill="#4A4A4A">
                              <path
                                d="M30.5555556,35.7777778 L30.5555556,41.3333333 L19.4444444,41.3333333 L19.4444444,35.7777778 L30.5555556,35.7777778 Z M41.6666667,21.8888889 L41.6666667,27.4444444 L8.33333333,27.4444444 L8.33333333,21.8888889 L41.6666667,21.8888889 Z M50,8 L50,13.5555556 L0,13.5555556 L0,8 L50,8 Z"
                                id="Combined-Shape"
                              ></path>
                            </g>
                          </g>
                        </SvgIcon>
                      }
                    >
                      More Filters
                    </MaterialBtn>
                  </Hidden>
                </Grid>
              </section>

              <Element name="unitsElement">
                { filteredTypes.length > 0 ?
                  (
                    <ListOfUnits>
                      <List
                        dataSource={filteredTypes}
                        pagination={{
                          hideOnSinglePage: true,
                          size: "small",
                          defaultPageSize: 5,
                          total: filteredTypes.length
                        }}
                        renderItem={unit => {
                          return(
                            <div className="unitItemContainer">
                              <section className="itemContainerTop">
    
                                <div className="unitDescription">
                                  <div className="sizeImg" onClick={handleOpenSGModal}>
                                    <img src={`https://images-dev.sroa.com/images/unit/${unit.image}`} alt="size" />
                                  </div>
    
                                  <div className="unitColumn">
                                    <div className="unitSize">
                                      {`${unit.length}' x ${unit.width}'`} <span className="sizeWord">| {getSize(unit.tags)}</span>
                                    </div>
                                    <div className="unitRow">
                                    { unit.tags.map(tag => (
                                      <div className="unitTag">
                                        { tag === 'pr' &&
                                          <div>
                                            <img src={promo} alt="offer" />
                                            <span>{unit.promotion_name}</span>
                                          </div>
                                        }
                                        { tag === 'cc' &&
                                          <div>
                                            <img src={ice} alt="snow" />
                                            <span>Climate Control</span>
                                          </div>
                                        }
                                        { tag === 'du' &&
                                          <div>
                                            <img src={drive} alt="drive up" />
                                            <span>Drive Up</span>
                                          </div>
                                        }
                                        { tag === 'ff' &&
                                          <div>
                                            <img src={ff} alt="first floor" />
                                            <span>First Floor</span>
                                          </div>
                                        }
                                        { tag === 'ws' &&
                                          <div>
                                            <img src={wine} alt="wine" />
                                            <span>Wine Storage</span>
                                          </div>
                                        }
                                        { tag === 'pk' &&
                                          <div>
                                            <img src={park} alt="park" />
                                            <span>Parking</span>
                                          </div>
                                        }
                                      </div>
                                    ))
                                    }
                                    </div>
                                  </div>
                                </div>
    
                                <div className="unitRow">
                                  <div className="priceColumn">
                                    <div className="unitPrice">${unit.online_price}<span>/mo</span></div>
                                    <div className="unitPriceStore">${unit.price}<span>/mo in store</span></div>
                                  </div>
                                </div>
                              </section>
    
                              <section className="itemContainerBtn">
                                <Link to="/reserve">
                                  <Button className="selectLocationBtn" variant="contained" size="large">
                                    Select
                                  </Button>
                                </Link>
                                { unit.total_vacant <= 5 &&
                                  <div className="hurryText">Hurry, only {unit.total_vacant} left!</div>
                                }
                              </section>
    
                              <Divider style={{ width: '100%' }} />
                            </div>
                          )
                        }}
                      />
                    </ListOfUnits>
                  ) : <NoResults />
                }
              </Element>

              { currentLocation.map.length === 1 && latLng &&
                <section className="section">
                  <NearbyLocations refLocation={currentLocation} type='location' latLng={latLng} />
                </section>
              }

              <Accordion className="aboutSection">
                <Accordion.Title
                  active={aboutActiveIndex === 0}
                  index={0}
                  onClick={handleClickAbout}
                  className="aboutCustomDropdown"
                >
                  <div>
                    About {currentLocation.city}, {currentLocation.state} Units
                  </div>
              
                  <div className="dropdownLabel">
                  { aboutActiveIndex === 0 ? '–' : '+' }
                  </div>
                </Accordion.Title>
                <Accordion.Content active={aboutActiveIndex === 0}>

                  { !!currentLocation.about &&
                    <div style={{ padding: '0 25px' }}>
                      { parse(currentLocation.about) }
                    </div>
                  }

                  <section className="aboutListContainer">
                    { !!currentLocation.feature_unit &&
                      <Element className="contentContainer" name="featuresElement">
                        <Accordion>

                          <Accordion.Title
                            active={featuresIndex === 0}
                            index={0}
                            onClick={handleClickFeatures}
                            className="aboutCustomDropdownSub"
                          >
                            <div className="aboutSubDropdown">
                              <Icon name="check square" />
                              <div>Unit Features</div>
                            </div>
                            { featuresIndex === 0 ? <MinusCircleFilled /> : <PlusCircleFilled /> }
                          </Accordion.Title>

                          <Accordion.Content className="aboutSubContent" active={featuresIndex === 0}>
                            {parse(currentLocation.feature_unit)}

                            <div className="closeCustomDropdown">
                              <Button onClick={handleClickFeatures} shape="circle" icon={<CloseCircleFilled />} />
                            </div>
                          </Accordion.Content>
                        </Accordion>

                      </Element>
                    }

                    { !!currentLocation.feature_access &&
                      <Element className="contentContainer">
                        <Accordion>
                          <Accordion.Title
                            active={accessIndex === 0}
                            index={0}
                            onClick={handleClickAccess}
                            className="aboutCustomDropdownSub"
                          >
                            <div className="aboutSubDropdown">
                              <Icon name="key" />
                              <div>Access</div>
                            </div>
                            { accessIndex === 0 ? <MinusCircleFilled /> : <PlusCircleFilled /> }
                          </Accordion.Title>

                          <Accordion.Content className="aboutSubContent" active={accessIndex === 0}>
                            {parse(currentLocation.feature_access)}

                            <div className="closeCustomDropdown">
                              <Button onClick={handleClickAccess} shape="circle" icon={<CloseCircleFilled />} />
                            </div>
                          </Accordion.Content>
                        </Accordion>

                      </Element>
                    }

                    { !!currentLocation.feature_security &&
                      <Element className="contentContainer">
                        <Accordion>
                          <Accordion.Title
                            active={securityIndex === 0}
                            index={0}
                            onClick={handleClickSecurity}
                            className="aboutCustomDropdownSub"
                          >
                            <div className="aboutSubDropdown">
                              <Icon name="lock" />
                              <div>Security</div>
                            </div>
                            { securityIndex === 0 ? <MinusCircleFilled /> : <PlusCircleFilled /> }
                          </Accordion.Title>

                          <Accordion.Content className="aboutSubContent" active={securityIndex === 0}>
                            {parse(currentLocation.feature_security)}

                            <div className="closeCustomDropdown">
                              <Button onClick={handleClickSecurity} shape="circle" icon={<CloseCircleFilled />} />
                            </div>
                          </Accordion.Content>
                        </Accordion>
                        
                      </Element>
                    }
                    
                    { !!currentLocation.feature_extras &&
                      <Element className="contentContainer">
                        <Accordion>
                          <Accordion.Title
                            active={extrasIndex === 0}
                            index={0}
                            onClick={handleClickExtras}
                            className="aboutCustomDropdownSub"
                          >
                            <div className="aboutSubDropdown">
                              <Icon name="star" />
                              <div>Extras</div>
                            </div>
                            { extrasIndex === 0 ? <MinusCircleFilled /> : <PlusCircleFilled /> }
                          </Accordion.Title>

                          <Accordion.Content className="aboutSubContent" active={extrasIndex === 0}>
                            {parse(currentLocation.feature_extras)}

                            <div className="closeCustomDropdown">
                              <Button onClick={handleClickExtras} shape="circle" icon={<CloseCircleFilled />} />
                            </div>
                          </Accordion.Content>
                        </Accordion>
                        
                      </Element>
                    }

                    { !!currentLocation.feature_parking &&
                      <Element className="contentContainer">
                        <Accordion>
                          <Accordion.Title
                            active={parkingIndex === 0}
                            index={0}
                            onClick={handleClickParking}
                            className="aboutCustomDropdownSub"
                          >
                            <div className="aboutSubDropdown">
                              <Icon name="product hunt" />
                              <div>Parking</div>
                            </div>
                            { parkingIndex === 0 ? <MinusCircleFilled /> : <PlusCircleFilled /> }
                          </Accordion.Title>

                          <Accordion.Content className="aboutSubContent" active={parkingIndex === 0}>
                            {parse(currentLocation.feature_parking)}

                            <div className="closeCustomDropdown">
                              <Button onClick={handleClickParking} shape="circle" icon={<CloseCircleFilled />} />
                            </div>
                          </Accordion.Content>
                        </Accordion>
                        
                      </Element>
                    }

                    { !!currentLocation.feature_promotion &&
                      <Element className="contentContainer">
                        <Accordion>
                          <Accordion.Title
                            active={promotionsIndex === 0}
                            index={0}
                            onClick={handleClickPromotions}
                            className="aboutCustomDropdownSub"
                          >
                            <div className="aboutSubDropdown">
                              <Icon name="tag" />
                              <div>Promotions</div>
                            </div>
                            { promotionsIndex === 0 ? <MinusCircleFilled /> : <PlusCircleFilled /> }
                          </Accordion.Title>

                          <Accordion.Content className="aboutSubContent" active={promotionsIndex === 0}>
                            {parse(currentLocation.feature_promotion)}

                            <div className="closeCustomDropdown">
                              <Button onClick={handleClickPromotions} shape="circle" icon={<CloseCircleFilled />} />
                            </div>
                          </Accordion.Content>
                        </Accordion>
      
                      </Element>
                    }  
                  </section>
                </Accordion.Content>
              </Accordion>

              { reviews.length > 0 &&
              <Element name="reviewsElement">
                <Accordion className="section">
                  <Accordion.Title
                    active={reviewsActiveIndex === 0}
                    index={0}
                    onClick={handleClickReviews}
                    className="customDropdown"
                  >
                    <div>Reviews</div>

                    <div className="dropdownLabel">
                    { reviewsActiveIndex === 0 ? '–' : '+'}
                    </div>
                  </Accordion.Title>

                  <Accordion.Content active={reviewsActiveIndex === 0}>
                    <CustomReviewBox>
                      <div className="reviewTop">
                        <div className="reviewOverview">
                          <section>
                            <div className="reviewTotalScore">
                              {currentLocation?.rating?.toFixed(1)}
                            </div>
                            <Rating
                              className="reviewRating"
                              name="read-only"
                              value={currentLocation.rating}
                              precision={0.5}
                              readOnly
                            />
                            <div className="reviewTotalCount">
                              ({reviews.length} Reviews)
                            </div>
                          </section>
                        </div>
                      </div>

                      { !!reviews.length > 0 &&
                        <>
                          <Divider />
                          <div className="reviewList">
                          <List
                            dataSource={reviews}
                            pagination={{
                              hideOnSinglePage: true,
                              size: "small",
                              defaultPageSize: 5,
                              total: reviews.length
                            }}
                            renderItem={review => {
                              return(
                                <>
                                  <div className="reviewItem">
                                    <div className="reviewReviewer">
                                      <Hidden smDown>
                                        <Avatar>OP</Avatar>
                                      </Hidden>
                                      <div className="reviewName">{review.reviewer}</div>
                                    </div>

                                    <div className="reviewDetails">
                                      <div className="detailsTop">
                                        <Rating
                                          name="read-only"
                                          size="small"
                                          value={review.rating}
                                          readOnly
                                        />

                                        <div className="reviewDate">
                                          Reviewed on {moment(review.original_date).format('MMMM, Do, YYYY')}
                                        </div>
                                      </div>

                                      <div className="reviewDescription">
                                        {review.description}
                                      </div>
                                    </div>
                                  </div>
                                  <Divider />
                                </>
                              )
                            }}
                          />
                          </div>
                        </>
                      }

                      { !!reviews.length > 3 &&
                        <Button className="reviewViewMoreBtn" fluid>
                          + Load More Reviews
                        </Button>
                      }
                    </CustomReviewBox>
                  </Accordion.Content>
                </Accordion>
              </Element>
              }

              { !!currentLocation.faqs &&
                <Element name="faqElement">
                  <Accordion className="section">
                    <Accordion.Title
                      active={faqActiveIndex === 0}
                      index={0}
                      onClick={handleClickFaq}
                      className="customDropdown"
                    >
                      <div>Storage FAQ</div>

                      <div className="dropdownLabel">
                      { faqActiveIndex === 0 ? '–' : '+'}
                      </div>
                    </Accordion.Title>
                    <Accordion.Content className="faqContent" active={faqActiveIndex === 0}>
                      <Accordion.Accordion
                        panels={
                          currentLocation.faqs.map((faq, i) => {
                            return {
                              key: i,
                              title: {
                                content: faq.title,
                                icon: <PlusCircleFilled />
                              },
                              content: parse(faq.content)
                            }
                          })
                        }
                      />
                    </Accordion.Content>
                  </Accordion>
                </Element>
              }

              <Element name="cityElement">
                <Accordion className="section">
                  <Accordion.Title
                    active={cityActiveIndex === 0}
                    index={0}
                    onClick={handleClickCity}
                    className="customDropdown"
                  >
                    <div>City Information</div>

                    <div className="dropdownLabel">
                    { cityActiveIndex === 0 ? '–' : '+'}
                    </div>
                  </Accordion.Title>
                  <Accordion.Content className="cityContent" active={cityActiveIndex === 0}>
                    { !!currentLocation.city_information && parse(currentLocation.city_information) }
                  </Accordion.Content>
                </Accordion>
              </Element>

            </LocationContent>
          </section>
        </>
        :
        (
          <Segment style={{ height: '100vh' }}>
            <Dimmer active inverted>
              <Loader size='massive'></Loader>
            </Dimmer>
          </Segment>
        )
      }
      <SizeGuideModal openModal={openModal} handleClose={
        () => {
          setOpenModal(false)
        }
      } />
    </CustomLocationContainer>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB09s9IJePPEZZbuFo94H3M8x3W6RdWx9s",
})(SelectedLocation);