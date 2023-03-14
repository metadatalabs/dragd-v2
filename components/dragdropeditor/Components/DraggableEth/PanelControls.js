const { useState, useEffect, useContext } = require('react');
import SiteContext from '../../siteContext';
import { EthContractSelector } from './EthContractSelector';

export default function PanelControls({ elemData, setPanelControls }) {
    const siteData = useContext(SiteContext);

    return (
        <>
            {/* <button
                onClick={() => {
                    setModal(
                        <EthContractSelector
                        />,
                    );
                }}
            >
                Edit Contract
            </button> */}
        </>
    );
}
