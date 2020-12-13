import React from 'react'
import EmptyContentPage from '../screens/EmptyContentPage'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        maxWidth: '30%',
    }
})

const EmailList = ({ inboxesContent, accountEmailAddress }) => {
    const classes = useStyles()

    return (
        <div>
            {inboxesContent.length > 0 ?
                <div>
                    {inboxesContent.slice(0).reverse().map((email, key) => (
                        <Card className={classes.root} key={key}>
                            <CardActionArea >
                                <CardContent>
                                    <Link className="email-list-item" key={key} to={`/email/${email.id}/${accountEmailAddress}`}>
                                        <Typography gutterBottom variant="h5" component="h2" className="email-list-item">
                                            Subject: {email.subject.substring(0, 10)}...
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {email.date} at {email.time}
                                        </Typography>
                                        <h3>from : {email.senderEmailAddress}</h3>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Message brief: {email.messageContent.substring(0, 30)}...
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
                : <EmptyContentPage />
            }
        </div>
    )
}

export default EmailList