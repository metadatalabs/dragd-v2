import Image from 'next/image';
import { useEffect, useState } from 'react';
import analytics from '../../../../util/analytics';

export default function BigIntToLocaleStringOptions({ pending }) {
    const [hover, setHover] = useState(pending);

    useEffect(() => {
        if (pending) onHover();
        else onLeave();
    }, [pending]);

    const onHover = () => {
        setHover(true);
        // analytics.track('bclogo_hover');
    };

    const onLeave = () => {
        setHover(false);
    };

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    bottom: '-15px',
                    left: '10px',
                    padding: '10px',
                    zIndex: 999999,
                    opacity: pending ? 1 : undefined,
                }}
                className={'brocorpSaveSpinner'}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div className="cssload-wrap">
                        <div className={hover ? 'cssload-circle' : ''}></div>
                        <div className={hover ? 'cssload-circle' : ''}></div>
                        <div className={hover ? 'cssload-circle' : ''}></div>
                        <div className={hover ? 'cssload-circle' : ''}></div>
                        <div className={hover ? 'cssload-circle' : ''}></div>
                    </div>
                    <div
                        style={{
                            marginLeft: '-47px',
                            marginBottom: '13px',
                            width: '40px',
                            height: '7px',
                        }}
                    >
                        {/* <animated.div> */}
                            <a href="https://brocorp.in">
                                <img src={'/dragd_logo.png'} alt="BroCorp" />
                            </a>
                        {/* </animated.div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
