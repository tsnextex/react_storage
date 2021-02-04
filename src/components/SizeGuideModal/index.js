import React, { useEffect, useState } from 'react';
import { CustomModal, SGCarouselDiv, CloseIcon } from './style';
import { Grid } from 'semantic-ui-react';
import SGUnitItemContainer from './SGUnitItemContainer';
import SGStorageUnitContainer from './SGStorageUnitContainer';
import SGContactPanel from './SGContactPanel';
import MobileCarousel from './MobileCarousel';
import SGCarousel from "./SGCarousel";

export default function SizeGuideModal({ openModal, handleClose }) {

    const [tabData, setTabData] = useState([
        { _id: 'sm', label: 'Small', active: true },
        { _id: 'md', label: 'Medium', active: false },
        { _id: 'lg', label: 'Large', active: false },
        { _id: 'xl', label: 'X-Large', active: false },
        { _id: 'pk', label: 'Parking', active: false }
    ]);
    const [activeTab, setActiveTab] = useState('sm');

    const handleCloseModal = () => {
        handleClose(false)
    }

    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });

        useEffect(() => {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount

        return windowSize;
    }

    const size = useWindowSize();

    return (
        <CustomModal
            open={openModal}
            onClose={() => handleClose(false)}
        >
            <CloseIcon onClick={() => handleClose(false)} swidth={size.width} />
            <div class="modalHeader">
                <div class="mobileHeaderTitle">Size Guide</div>
                <div class="mobileHeaderButtons">
                    {tabData.map((item, index) => (
                        activeTab == item._id ?
                            <button key={index} class="ui fluid button activeButton" onClick={() => setActiveTab(item._id)}>{item.label}</button> :
                            <button key={index} class="ui fluid button normalButton" onClick={() => setActiveTab(item._id)}>{item.label}</button>
                    ))}
                </div>
            </div>

            <CustomModal.Content className="modalWrap" scrolling={size.width <= 768 ? true : false}>
                <Grid stackable className="modalContentGridContainer">
                    <div className="leftContainer">
                        <div style={{ display: 'flex' }}>
                            <SGCarousel />
                        </div>
                        <SGCarouselDiv>
                            <div className="unitLabel">
                                <strong>Small</strong> | Similar Storage Units
                            </div>
                        </SGCarouselDiv>
                        <SGUnitItemContainer />
                        <SGUnitItemContainer />
                    </div>
                    <div className="rightContainer">
                        <SGStorageUnitContainer />
                        <SGContactPanel handleCloseModal={handleCloseModal} />
                        <MobileCarousel />
                    </div>
                </Grid>
            </CustomModal.Content>
        </CustomModal>
    )
}