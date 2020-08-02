import React from 'react';
import {Button} from 'reactstrap'
import { useState } from 'react';
import { useEffect } from 'react';

export default function AttendanceButton({ going, handleClick }) {
    const [click, setClick] = useState(true);


    // toggle the remove the disabled effect when the going prop updates
    useEffect(()=>{
        setClick(!click);
    }, [going]);

    // on button click, disable the button until update comes through from the API
    return (
        (going) ?
            <Button color="danger" disabled={click} onClick={()=>{
                if (window.confirm('Are you sure? This will lower your rating'))
                    handleClick(setClick(true));
                
            }}>I'm Flopping</Button> :
            <Button color="success" disabled={click} onClick={()=>handleClick(setClick(true)) }>I'm Going!</Button>
    )
}