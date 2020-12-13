import React, { useState, useEffect } from 'react'
import EmptyContentPage from '../screens/EmptyContentPage'
import LoadingIndicator from './LoadingIndicator'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '30%',
    }
}))

const SentEmailList = (props) => {
    var emailAccount = props.accountEmailAddress
    const [sentEmails, setSentEmails] = useState([])
    const [loading, setLoading] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const proxyurl = "https://cors-anywhere.herokuapp.com/"
                const url = `https://guy-golpur-messaging-system.herokuapp.com/api/sent-email-list?receiverEmailAddress=${emailAccount}`
                const result = await fetch(proxyurl + url)
                const body = await result.json()
                setSentEmails(body)
                setLoading(true)
            } catch (err) {
                console.log(`error: ${err}`)
            }
        }
        fetchData()
    }, [emailAccount])



    return (
        <div className="page-body">
            <h1>Sent Items</h1>
            <hr />
            <div>
                {loading ? <div>
                    <div>
                        {sentEmails.length > 0 ?
                            <div>
                                {sentEmails.slice(0).reverse().map((sentEmail, key) => (
                                    <Card className={classes.root} key={key}>
                                        <CardActionArea >
                                            <CardContent>
                                                <Link className="email-list-item" key={key} to={`/single-email-sent/${sentEmail.id}/${emailAccount}`}>
                                                    <div key={key}>
                                                        <Typography gutterBottom variant="h5" component="h2" className="email-list-item">
                                                            Subject: {sentEmail.subject}
                                                        </Typography>
                                                        <h3>to : {sentEmail.receiverEmailAddress}</h3>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {sentEmail.date} at {sentEmail.time}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Message brief: {sentEmail.messageContent.substring(0, 30)}...
                                                        </Typography>
                                                    </div>
                                                </Link>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))
                                }
                            </div> : <EmptyContentPage />
                        }
                    </div>
                </div> :
                    <LoadingIndicator />}
            </div>
        </div>
    )
}


export default SentEmailList