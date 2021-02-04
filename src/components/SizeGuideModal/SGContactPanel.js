import React, { useEffect, useState } from 'react';
import { SGContactDiv } from './style';
import { Grid, Button } from 'semantic-ui-react';

export default function SGContactPanel({handleCloseModal}) {

    const handleContact = () => {
        handleCloseModal(false)
    }

    return (
        <SGContactDiv>
            <div className="contactTitle">
                Can’t find what you need?
            </div>
            <div className="contactNote">
                Our call center is available 7 days a week and can help determine which storage unit size best fits your unique storage situation. You can also reserve or move into your storage unit over the phone or online.
            </div>
            <div>
                <Button onClick={handleContact} fluid className="contactButton" color="primary">
                    {"Contact the Experts"}
                </Button>
            </div>
        </SGContactDiv>
    )
}