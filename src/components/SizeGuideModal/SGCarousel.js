import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import React from "react";

import CustomDotGroup from "./CustomDotGroup";
import "pure-react-carousel/dist/react-carousel.es.css";

export default function SGCarousel() {
    return (
        <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={0.56}
            totalSlides={3}
            style={{ width: "100%" }}
        >
            <Slider>
                <Slide index={0}>
                    <Image src="https://images-dev.sroa.com/images/unit/5x5_storage_unit.png" />
                </Slide>
                <Slide index={1}>
                    <Image src="https://images-dev.sroa.com/images/unit/5x5_storage_unit.png" />
                </Slide>
                <Slide index={2}>
                    <Image src="https://images-dev.sroa.com/images/unit/5x5_storage_unit.png" />
                </Slide>
            </Slider>
            <CustomDotGroup slides={3} />
        </CarouselProvider>
    )
};

