import React, { useEffect, useState } from 'react';
import { UnitItemGrid } from './style';

export default function SGUnitItemContainer() {
    return (
        <UnitItemGrid stackable>
            <UnitItemGrid.Column width={5} className="unitItemImageContainer">
                <div>
                    <img src={'https://images-dev.sroa.com/images/unit/5x5_storage_unit.png'} className="unitImage" />
                </div>
            </UnitItemGrid.Column>
            <UnitItemGrid.Column width={11} className="unitItemLabelContainer">
                <div className="unitItemName"><strong>5' x 10'</strong> Storage Unit</div>
                <div className="unitItemNote">Equivalent to a walk in closet. </div>
            </UnitItemGrid.Column>
        </UnitItemGrid>
    )
}