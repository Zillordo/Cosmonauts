import React from 'react';
import TextField from '@material-ui/core/TextField';

const modal = props => (
    <div className="flight-modal">
        <form onSubmit={props.submit} id="fFrom">
            <div>
                <TextField
                    label="Name"
                    value={props.name}
                    onChange={props.onNameChange}
                    margin="normal"
                />
                <TextField
                    label="Sur-Name"
                    value={props.surName}
                    onChange={props.onSurNameChange}
                    margin="normal"
                />
                <TextField
                    label="Age"
                    value={props.age}
                    onChange={props.onAgeChange}
                    margin="normal"
                />
                <TextField
                    label="Experience"
                    value={props.exp}
                    onChange={props.onExpChange}
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