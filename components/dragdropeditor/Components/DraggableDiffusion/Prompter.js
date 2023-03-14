import { useEffect, useState } from 'react';

const Prompter = (props) => {
    const [value, setValue] = useState('');
    // useEffect(() => {
    //     props.onLocalUpdate({ prompt: props.elemData.prompt });
    // }, [value]);

    const save = () => {
        console.log(value);
        props.onLocalUpdate({ prompt: value });
        props.setModal(null);
        props.initBananaSD(value);
    };
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input
                    className={'minimal-input'}
                    style={{
                        display: 'flex',
                        flexGrow: 1,
                        width: '80vw',
                        maxWidth: '500px',
                        fontFamily: 'Courier New',
                        fontSize: '1.2em',
                    }}
                    placeholder={'Enter a prompt'}
                    autoFocus={true}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                ></input>
                <button
                    className={'button'}
                    onClick={() => {
                        save();
                    }}
                >
                    Generate
                </button>
            </div>
        </>
    );
};

export default Prompter;
