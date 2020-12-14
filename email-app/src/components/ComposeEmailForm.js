import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Redirect } from 'react-router-dom'


const ComposeEmailForm = (props) => {
    const [receiverEmailAddress, setReceiverEmailAddress] = useState('')
    const [emailSubject, setEmailSubject] = useState('')
    const [emailContent, setEmailContent] = useState('')
    const [isRedirectReady, setIsRedirectReady] = useState(false)
    const senderEmailAddress = props.accountEmailAddress

    const sendEmail = async () => {
        var today = new Date(), date, time

        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        time = today.getHours() + ':' + (today.getMinutes())

        const proxyurl = "https://cors-anywhere.herokuapp.com/"
        let url = `https://guy-golpur-messaging-system.herokuapp.com/api/composeNewEmail`
        await fetch((proxyurl + url), {
            method: 'post',
            body: JSON.stringify({ senderEmailAddress, receiverEmailAddress, subject: emailSubject, messageContent: emailContent, date, time }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        setIsRedirectReady(true)

    }

    if (isRedirectReady) {
        return <Redirect to="/sent-email-list" />
    }
    return (
        <div id="send-email-form">
            <h1>Compose New Email</h1>
            <hr />
            <form onSubmit={sendEmail}>
                <TextField
                    id="standard-full-width"
                    label="To:"
                    style={{ margin: 8 }}
                    placeholder="example@email.com"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={receiverEmailAddress} onChange={(event) => setReceiverEmailAddress(event.target.value)}
                    required={true}
                    type="email"
                />
                <TextField
                    id="standard-full-width"
                    label="Subject:"
                    style={{ margin: 8 }}
                    placeholder="Email Title"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={emailSubject} onChange={(event) => setEmailSubject(event.target.value)}
                />
                <TextField
                    id="outlined-full-width"
                    label="Email Content:"
                    style={{ margin: 8 }}
                    placeholder="Write a message"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={emailContent} onChange={(event) => setEmailContent(event.target.value)}
                    multiline={true}
                    rows="17"
                />
                <Button variant="outlined" color="primary" onClick={() => sendEmail()}>
                    Send Email
                </Button>
            </form>
        </div>
    )
}

export default ComposeEmailForm