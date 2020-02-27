import React from 'react';
import {Button} from 'reactstrap'

export default function AttendanceButton({ going, handleClick }) {
    return (
        (going) ?
            <Button color="danger" onClick={() => { if (window.confirm('Are you sure? This will lower your rating')) handleClick() }}>I'm Flopping</Button> :
            <Button color="success" onClick={handleClick}>I'm Going!</Button>
    )
}