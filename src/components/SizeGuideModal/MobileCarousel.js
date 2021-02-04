import React, { useEffect, useState } from 'react';
import {  MobileCarouselItem, MobileCarouselContainer } from './style'; 

import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import CustomDotGroup from "./CustomDotGroup";
import "pure-react-carousel/dist/react-carousel.es.css";

export default function MobileCarousel() {
    return (
        <MobileCarouselContainer>
            <div className="mobileCarouselTitle">
                <strong>Small</strong> | Similar Storage Units
            </div>
            <CarouselProvider
                naturalSlideWidth={1}
                naturalSlideHeight={0.23}
                totalSlides={2}
                style={{ width: "100%" }}
            >
                <Slider>
                    <Slide index={0}>
                        <MobileCarouselItem>
                            <div className="carouselImageContainer">
                                <img src={'https://images-dev.sroa.com/images/unit/5x5_storage_unit.png'} className="carouselImage" />
                            </div>
                            <div className="carouselLabelContainer">
                                <div className="carouselTitle"><strong>5' x 10'</strong> Storage Unit</div>
                                <div className="carouselNote">Equivalent to a walk in closet.</div>
                            </div>
                        </MobileCarouselItem>
                    </Slide>
                    <Slide index={1}>
                        <MobileCarouselItem>
                            <div className="carouselImageContainer">
                                <img src={'https://images-dev.sroa.com/images/unit/5x5_storage_unit.png'} className="carouselImage" />
                            </div>
                            <div className="carouselLabelContainer">
                                <div className="carouselTitle"><strong>5' x 10'</strong> Storage Unit</div>
                                <div className="carouselNote">Equivalent to a walk in closet.</div>
                            </div>
                        </MobileCarouselItem>
                    </Slide>
                </Slider>
                <CustomDotGroup slides={2} />
            </CarouselProvider>
        </MobileCarouselContainer>

        // <MobileCarouselContainer>
        //     <div className="mobileCarouselTitle">
        //         <strong>Small</strong> | Similar Storage Units
        //     </div>
        //     <Carousel className="showInMobile">
        //         <MobileCarouselItem>
        //             <div className="carouselImageContainer">
        //                 <img src={'https://images-dev.sroa.com/images/unit/5x5_storage_unit.png'} className="carouselImage" />
        //             </div>
        //             <div className="carouselLabelContainer">
        //                 <div className="carouselTitle"><strong>5' x 10'</strong> Storage Unit</div>
        //                 <div className="carouselNote">Equivalent to a walk in closet.</div>
        //             </div>
        //         </MobileCarouselItem>
        //         <MobileCarouselItem>
        //             <div className="carouselImageContainer">
        //                 <img src={'https://images-dev.sroa.com/images/unit/5x5_storage_unit.png'} className="carouselImage" />
        //             </div>
        //             <div className="carouselLabelContainer">
        //                 <div className="carouselTitle"><strong>5' x 10'</strong> Storage Unit</div>
        //                 <div className="carouselNote">Equivalent to a walk in closet.</div>
        //             </div>
        //         </MobileCarouselItem>
        //     </Carousel>
        // </MobileCarouselContainer>
    )
}