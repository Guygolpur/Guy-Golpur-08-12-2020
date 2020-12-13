import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Explain from '../components/Explain'

const HomePage = ({ login }) => {

    const [userName, setUserName] = useState('')

    const loginWithEmail = (event) => {
        event.preventDefault()
        var isValidateAccountSender = userName.localeCompare('sender@gmail.com')
        var isValidateAccountReceiver = userName.localeCompare('receiver@gmail.com')

        if ((isValidateAccountSender === 0) || (isValidateAccountReceiver === 0)) {
            localStorage.setItem("accountEmailAddress", userName)
            login(userName)
        }
        else {
            localStorage.setItem("accountEmailAddress", '')
            window.location.reload(true)
        }
    }

    return (
        <div className="page-body">
            <Explain />
            <form onSubmit={loginWithEmail}>
                <TextField
                    id="standard-full-width"
                    label="Please enter an email address:"
                    style={{ margin: 8 }}
                    placeholder="example@email.com"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={userName} onChange={(event) => setUserName(event.target.value)}
                    required={true}
                    type="email"
                    variant="outlined"
                />
                <Button variant="outlined" color="primary" type="submit" style={{ marginLeft: '8px' }}>
                    Sign in
                </Button>
            </form>
        </div>
    )
}


export default HomePage