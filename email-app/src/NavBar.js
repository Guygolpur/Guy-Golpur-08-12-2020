import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'


const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge)

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))

const logOut = () => {
    localStorage.setItem("accountEmailAddress", '')
    window.location.reload(true)
}


const NavBar = ({ accountEmailAddress }) => {
    const classes = useStyles()
    const [isConnect, setIsConnect] = useState('')

    useEffect(() => {
        if (accountEmailAddress) {
            setIsConnect('dot')
        }
        else {
            setIsConnect('')
        }
    }, [accountEmailAddress])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#c7dcff', flexDirection: 'column' }}>
            <div style={{ width: '100%', height: '15%', display: 'block', textAlign: 'center' }}>
                <div className={classes.root}>
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant={`${isConnect}`}
                    >
                    </StyledBadge>
                </div>
                {accountEmailAddress}
            </div>
            <div style={{ width: '100%', height: '60%', display: 'flex', justifyContent: "center" }}>
                <nav>
                    <ul>
                        {accountEmailAddress ?
                            <div>
                                <li>
                                    <Link to="/composeNewEmail">New Email</Link>
                                </li>
                                <li>
                                    <Link to="/email-list">Inbox</Link>
                                </li>
                                <li>
                                    <Link to="/sent-email-list">Sent</Link>
                                </li>
                            </div> :
                            <div>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                            </div>}
                    </ul>
                </nav>
            </div>
            <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: "center" }}>
                <Button onClick={() => logOut()}><Link to="/"><PowerSettingsNewIcon /></Link></Button>
            </div>
            <div style={{ width: '100%', height: '15%', display: 'flex', justifyContent: "center" }} />
        </div>
    )
}

export default NavBar