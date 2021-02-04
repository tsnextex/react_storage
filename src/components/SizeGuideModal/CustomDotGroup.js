import PropTypes from "prop-types";
import { Dot } from "pure-react-carousel";
import React from "react";
import { Button } from "semantic-ui-react";
import { DotContainer } from './style'

const CustomDotGroup = ({ slides, size }) => (
    <DotContainer textAlign="center">
        <Button.Group size={size}>
            {[...Array(slides).keys()].map(slide => (
                <Button as={Dot} key={slide} icon="circle" slide={slide} />
            ))}
        </Button.Group>
    </DotContainer>
);

CustomDotGroup.defaultProps = {
    size: "mini"
};

CustomDotGroup.propTypes = {
    slides: PropTypes.number.isRequired,
    size: PropTypes.string
};

export default CustomDotGroup;
