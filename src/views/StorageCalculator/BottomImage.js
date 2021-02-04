import React from "react";
import { BottomImageBoard } from './style';

export default function BottomImage({ featureData }) {

    return (
        <BottomImageBoard>
            <section className="imageContainer">
                <section>
                    <img src="/img/features/bg.png" />
                </section>
                {/* <section>
                    <section className="image-title">We Make Renting Easy. </section>
                    <section className="image-motto">Rent online and move into your space today.</section>
                </section> */}
            </section>
        </BottomImageBoard>
    )
}