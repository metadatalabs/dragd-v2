export default function MobileBoundary ({mobileWidth = 600}) {
    return window.innerWidth > mobileWidth && <div 
        style={{position: "fixed", top: 0, zIndex: 99999}}>
        <Boundary mobileWidth={mobileWidth} />
        <Boundary mobileWidth={mobileWidth} right/>
    </div>
}

function Boundary({mobileWidth, right}) {
    return <>
    <div
        className={'mobile-align-bg'}
        style={{
            position: 'fixed',
            left: right? undefined: `0px`,
            right: right? `0px`: undefined,
            width: `calc((100vw - ${mobileWidth}px)/2)`,
            height: '100vh',
        }}
    >
        <div
            className={'page-align-guide mobile-align-guide active'}
            style={{
                position: "absolute",
                right: right? undefined: "0px",
                left: right? "0px": undefined,
            }}
        />
        <div
            style={{
                position: 'absolute',
                width: '100%',
                top: '50vh',
                textAlign: 'center',
                userSelect: 'none',
            }}
        >
            NOT VISIBLE<br/>
            ON PHONES
        </div>
    </div>
    </>
}