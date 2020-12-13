import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles({
    root: {
        maxWidth: '75%',
    }
})

const EmailPage = ({ match }) => {
    const classes = useStyles()
    const history = useHistory()
    var emailAccount = match.params.accountEmailAddress
    let senderEmailId = match.params.senderEmailId
    senderEmailId = parseInt(senderEmailId)

    const [emailContent, setEmailContent] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const proxyurl = "https://cors-anywhere.herokuapp.com/"
                const url = `https://guy-golpur-messaging-system.herokuapp.com/api/email/${senderEmailId}/${emailAccount}`
                const result = await fetch(proxyurl + url)
                const body = await result.json()
                setEmailContent([body])
            } catch (err) {
                console.log(`error: ${err}`)
            }
        }
        fetchData()
    }, [emailAccount, senderEmailId])

    const deleteEmailFromDb = async (receiverEmailAddress, emailId) => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/"
            const url = 'https://guy-golpur-messaging-system.herokuapp.com/api/deleteEmail'
            const result = await fetch((proxyurl + url), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiverEmailAddress: receiverEmailAddress,
                    id: emailId,
                })
            })
            setOpen(false)
            history.goBack()
        } catch (err) {
            console.log(`error: ${err}`)
        }
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <div className="page-body">
            <h1>Email content</h1>
            <hr />
            <div className="page-body">{emailContent.map((content, key) => (
                <Card className={classes.root} key={key}>
                    <CardContent key={key}>
                        <Typography gutterBottom variant="h5" component="h2" >
                            Subject: {content.subject}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {content.date} at {content.time}
                        </Typography>
                        <h2>from : {content.senderEmailAddress}</h2>
                        <div>Message:</div>
                        <p> {content.messageContent}</p>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Delete
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"You are about to DELETE that email"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Pressing on the 'AGREE' button will delete this email permanently.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Disagree
                                </Button>
                                <Button onClick={() => deleteEmailFromDb(emailAccount, content.id)} color="primary" autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardActions>
                </Card>
            ))}
            </div>
        </div >
    )
}

export default EmailPage