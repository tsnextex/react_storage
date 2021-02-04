import React from "react";
import { Link } from "react-router-dom";
import { CustomLocationCard } from './style';
import { Divider } from 'semantic-ui-react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Hidden,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";
import ice from '../../icons/ice.png';
import promo from '../../icons/promo.png';
import drive from '../../icons/drive.png';
import ff from '../../icons/ff.png';
import park from '../../icons/park.png';
import wine from '../../icons/wine.png';
import SizeGuideModal from "../../../SizeGuideModal";


export function LocationCard(props) {

  const {
    code = "",
    locationObj,
    units = [],
    handleLocationClick = () => "",
    min_price,
    name,
    rating,
    search_distance,
    address,
    city,
    state,
    phone,
    types,
    images,
    url,
    clearAllSize,
    sizeChange
  } = props;

  const [openModal, setOpenModal] = React.useState(false); //tempcode
  const handleOpenSGModal = (e) => {
    console.log('open modal')
    setOpenModal(true)
  }

  const onLocationClick = () => handleLocationClick(code);

  const getSize = tags => {

    let size;
    size = tags.includes('sm') ? 'Small' : size;
    size = tags.includes('md') ? 'Medium' : size;
    size = tags.includes('lg') ? 'Large' : size;
    size = tags.includes('xl') ? 'Extra Large' : size;
    return size;
  }

  const applyFilter = tags => {

    let size;
    size = tags.includes('sm') ? 'sm' : size;
    size = tags.includes('md') ? 'md' : size;
    size = tags.includes('lg') ? 'lg' : size;
    size = tags.includes('xl') ? 'xl' : size;

    // clear all size filters
    clearAllSize();

    // apply selected filter
    sizeChange(size);
  }


  return (
    <CustomLocationCard>
      <Paper className="root" elevation={3}>
        <Grid container direction="column" style={{ position: "relative", justifyContent: "space-between" }}>

          <Hidden mdUp>
            <div className="unitsFromWrapper">
              <div className="unitsFrom">
                <span className="unutsFromText">Units from</span>
              </div>
              <div className="unitsFromPriceHolder">
                <span className="unitsFromPrice">${min_price}</span>
                <span className="perMonth">/month</span>
              </div>
            </div>
          </Hidden>

          <Link
            className="link"
            to={{
              pathname: url,
              state: {
                locationDetails: locationObj
              },
            }}
          >
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              className="wrapper"
            >
              <Grid item className="imageWrapper">
                <article style={{ background: '#F4F5F8', borderRadius: 4 }}>
                  <div
                    className="img"
                    alt="locationImage"
                    style={{ background: `url(https://images-dev.sroa.com/images/location/${images[0]?.url})` }}
                  />
                </article>

                <Hidden mdUp>
                  <span className="xUnits">
                    {locationObj.totalVacantCount} units available
                  </span>
                </Hidden>
              </Grid>
              <Grid
                item
                container
                className="bodyWrapper"
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
                onClick={onLocationClick}
              >
                <Typography className="name" children={name} />
                <Rating
                  style={{ fontSize: "15px", color: "#E1AC1A" }}
                  name="read-only"
                  value={rating}
                  readOnly
                />
                <Typography className="distance">
                  <LocationOnIcon className="icon" />
                  {search_distance.toFixed(2)} miles away
                </Typography>
                <Typography className="location" children={`${address} ${city}, ${state}`} />
                <Typography className="phone">
                  <CallIcon className="icon" />
                  {phone}
                </Typography>
              </Grid>
            </Grid>
          </Link>

          <Hidden mdUp>
            <Link
              className="link"
              to={{
                pathname: url,
                state: {
                  locationObj: locationObj,
                  locationCode: code,
                  units,
                  collectionType: "units",
                },
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                className="browseUnitsButton"
                fullWidth
              >
                Browse Units
              </Button>
            </Link>
          </Hidden>
        </Grid>

        <Hidden smDown>
          <Divider style={{ color: '#F3F3F3' }} />
          <section className="unitListContainer">
            {[...types].map(unit =>
              <>
                <div className="unitItemContainer">

                  <div className="unitDescription">
                    <div className="sizeImg" onClick={handleOpenSGModal} >
                      <img src={`https://images-dev.sroa.com/images/unit/${unit.image}`} alt="size" />
                    </div>

                    <div className="unitColumn">
                      <div className="unitSize">
                        {`${unit.width}' x ${unit.length}'`} <span className="sizeWord">| {getSize(unit.tags)}</span>
                      </div>
                      <div className="unitRow">
                        {unit.tags.map(tag => (
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
                                <img src={park} alt="wine" />
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
                    <section>
                      <Link to="/reserve">
                        <Button className="selectLocationBtn" variant="contained" size="large" color="primary">
                          Select
                        </Button>
                      </Link>
                      {unit.count <= 5 &&
                        <div className="hurryText">Hurry, only {unit.count} left!</div>
                      }
                    </section>
                  </div>
                </div>

                <Divider style={{ width: '100%', color: '#F3F3F3' }} />
              </>
            )
            }
          </section>

          <Link
            className="link"
            to={{
              pathname: url,
              state: {
                locationDetails: locationObj
              },
            }}
          >
            <section className="viewMatching">
              View matching units & details at this location
            </section>
          </Link>
        </Hidden>
      </Paper>

      <SizeGuideModal openModal={openModal} handleClose={
        () => {
          setOpenModal(false)
        }
      } />

    </CustomLocationCard>
  );
};