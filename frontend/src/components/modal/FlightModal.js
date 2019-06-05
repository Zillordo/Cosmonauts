import React from 'react';
import TextField from '@material-ui/core/TextField';

const modal = props => (
    <div className="flight-modal">
        <form onSubmit={props.submit} id="fFrom">
            <div>
                <TextField
                    id="datetime-local"
                    label="Date"
                    type="datetime-local"
                    value={props.date}
                    onChange={props.onDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Capacity"
                    value={props.capacity}
                    onChange={props.onCapacityChange}
                    margin="normal"
                />
            </div>
            <div>
                <button type="submit" className="flight-modal-button submit">Submit</button>
                <button className="flight-modal-button cancle" onClick={props.onCancleClick}>Cancle</button>
            </div>
        </form>
    </div >
);

export default modal;