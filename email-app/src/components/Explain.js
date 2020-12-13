import React from 'react'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'


const Explain = ({ login }) => {
    return (
        <>
            <h2>Please read the instructions</h2>
            <p>
                There are two users that can be used to connect to the system and perform actions.
            </p>
            <h3>
                sender@gmail.com
            </h3>
            <h3>
                receiver@gmail.com
            </h3>
            <p>
                Once logged in, the following actions will be possible:
                <ul>
                    <li>Sending an email message</li>
                    <li>Read incoming and outgoing e-mail</li>
                    <li>Delete incoming and outgoing e-mail</li>
                    <li>Switching between users (disconnecting via the power button in the Navbar) <PowerSettingsNewIcon /></li>
                </ul>
            </p>
            <p>
                The e-mail interface should be performed between the two users mentioned above.
            </p>
            <p>
                It is clarified that at this stage sending and receiving e-mail will only be possible between the e-mail addresses mentioned above.
            </p>
        </>
    )
}


export default Explain