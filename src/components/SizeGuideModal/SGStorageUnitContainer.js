import React, { useEffect, useState } from 'react';
import Scroll from 'react-scroll';
import { Accordion, Divider } from 'semantic-ui-react';
import { PlusCircleFilled, MinusCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const Element = Scroll.Element;

export default function SGStorageUnitContainer() {
    const [featuresIndex, setFeaturesIndex] = useState(-1);

    const handleClickFeatures = (e, titleProps) => {

        const { index } = titleProps;
        const newIndex = featuresIndex === index ? -1 : index;
        setFeaturesIndex(newIndex);
    }

    return (
        <div>
            <div className="storageUnitName"><strong>5' x 10'</strong> Storage Unit</div>
            <div className="storageUnitNote">Equivalent to a walk in closet. </div>
            <Divider className="m-0" />
            <Element name="faqElement">
                <Accordion className="faqContent">
                    <Accordion.Title
                        index={0}
                        className="customDropdown"
                        active={featuresIndex === 0}
                        onClick={handleClickFeatures}

                    >
                        {featuresIndex === 0 ? <MinusCircleFilled /> : <PlusCircleFilled />}
                        <div className="faqTitle">How big is a 5'x5' Storage Unit</div>
                    </Accordion.Title>
                    <Accordion.Content className="faqDescription" active={featuresIndex === 0}>
                        Many moving companies use weight as an estimate when performing long distant moves. Typically a studio apartment weights between 1,200 and 2,400 pounds. Depending on the size of the items stored you may need a 5’x5′ or a larger 5’x10′ storage unit. We recommend going with a larger storage unit if you’re not sure which size to go with. It will make packing easier, especially if you need access to certain items throughout your move.
                    </Accordion.Content>
                </Accordion>
            </Element>
            <Divider className="m-0" />

            <Element name="faqElement">
                <Accordion className="faqContent">
                    <Accordion.Title
                        index={1}
                        className="customDropdown"
                        active={featuresIndex === 1}
                        onClick={handleClickFeatures}

                    >
                        {featuresIndex === 1 ? <MinusCircleFilled /> : <PlusCircleFilled />}
                        <div className="faqTitle">How big is a 5'x5' Storage Unit</div>
                    </Accordion.Title>
                    <Accordion.Content className="faqDescription" active={featuresIndex === 1}>
                        Many moving companies use weight as an estimate when performing long distant moves. Typically a studio apartment weights between 1,200 and 2,400 pounds. Depending on the size of the items stored you may need a 5’x5′ or a larger 5’x10′ storage unit. We recommend going with a larger storage unit if you’re not sure which size to go with. It will make packing easier, especially if you need access to certain items throughout your move.
                    </Accordion.Content>
                </Accordion>
            </Element>
            <Divider className="m-0" />

            <Element name="faqElement">
                <Accordion className="faqContent">
                    <Accordion.Title
                        index={2}
                        className="customDropdown"
                        active={featuresIndex === 2}
                        onClick={handleClickFeatures}

                    >
                        {featuresIndex === 2 ? <MinusCircleFilled /> : <PlusCircleFilled />}
                        <div className="faqTitle">How big is a 5'x5' Storage Unit</div>
                    </Accordion.Title>
                    <Accordion.Content className="faqDescription" active={featuresIndex === 2}>
                        Many moving companies use weight as an estimate when performing long distant moves. Typically a studio apartment weights between 1,200 and 2,400 pounds. Depending on the size of the items stored you may need a 5’x5′ or a larger 5’x10′ storage unit. We recommend going with a larger storage unit if you’re not sure which size to go with. It will make packing easier, especially if you need access to certain items throughout your move.
                    </Accordion.Content>
                </Accordion>
            </Element>
            <Divider className="m-0" />

            <Element name="faqElement">
                <Accordion className="faqContent">
                    <Accordion.Title
                        index={3}
                        className="customDropdown"
                        active={featuresIndex === 3}
                        onClick={handleClickFeatures}

                    >
                        {featuresIndex === 3 ? <MinusCircleFilled /> : <PlusCircleFilled />}
                        <div className="faqTitle">How big is a 5'x5' Storage Unit</div>
                    </Accordion.Title>
                    <Accordion.Content className="faqDescription" active={featuresIndex === 3}>
                        Many moving companies use weight as an estimate when performing long distant moves. Typically a studio apartment weights between 1,200 and 2,400 pounds. Depending on the size of the items stored you may need a 5’x5′ or a larger 5’x10′ storage unit. We recommend going with a larger storage unit if you’re not sure which size to go with. It will make packing easier, especially if you need access to certain items throughout your move.
                    </Accordion.Content>
                </Accordion>
            </Element>
            <Divider className="m-0" />

            <Element name="faqElement">
                <Accordion className="faqContent">
                    <Accordion.Title
                        index={4}
                        className="customDropdown"
                        active={featuresIndex === 4}
                        onClick={handleClickFeatures}
                    >
                        {featuresIndex === 4 ? <MinusCircleFilled /> : <PlusCircleFilled />}
                        <div className="faqTitle">How big is a 5'x5' Storage Unit</div>
                    </Accordion.Title>
                    <Accordion.Content className="faqDescription" active={featuresIndex === 4}>
                        Many moving companies use weight as an estimate when performing long distant moves. Typically a studio apartment weights between 1,200 and 2,400 pounds. Depending on the size of the items stored you may need a 5’x5′ or a larger 5’x10′ storage unit. We recommend going with a larger storage unit if you’re not sure which size to go with. It will make packing easier, especially if you need access to certain items throughout your move.
                    </Accordion.Content>
                </Accordion>
            </Element>
            <Divider className="m-0" />

        </div>
    )
}