import React from "react";
import { SideBoard } from './style';

export default function Feature({ featureData }) {

    return (
        <SideBoard>
            {featureData &&
                <section className="sidecontainer">
                    <section className="storage-features">
                        <p>{featureData.name}</p>
                    </section>
                    <section className="title">{featureData.title}</section>
                    <section className="description">
                        {featureData.subtitle}
                    </section>
                </section>
            }
            {featureData && featureData.features &&
                featureData.features.map((item) => (
                    <section className="itemContainer" key={item.title}>
                        <section className="feature-img">
                            <img src={item.icon} />
                        </section>
                        <section className="feature-title">{item.title}</section>
                    </section>
                ))
            }
        </SideBoard>
    )
}