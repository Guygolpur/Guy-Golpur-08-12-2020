import React, { useState, useEffect } from 'react'
import EmailList from '../components/EmailList'
import LoadingIndicator from '../components/LoadingIndicator'

const EmailListPage = (props) => {
    var emailAccount = props.accountEmailAddress
    const [emailList, setEmailList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const proxyurl = "https://cors-anywhere.herokuapp.com/"
                let url = `https://guy-golpur-messaging-system.herokuapp.com/api/email-list?receiverEmailAddress=${emailAccount}`
                const result = await fetch(proxyurl + url)
                const body = await result.json()
                setEmailList(body)
                setLoading(true)
            } catch (err) {
                console.log(`error: ${err}`)
            }
        }
        fetchData()
    }, [emailAccount])

    var inboxesContent = []
    emailList.map((inbox, key) => (
        inboxesContent = inboxesContent.concat(inbox)
    ))

    return (
        <div className="page-body">
            <h1>Inbox</h1>
            <hr />

            {loading ? <div><EmailList inboxesContent={inboxesContent} accountEmailAddress={emailAccount} /> </div> : <div><LoadingIndicator /></div>}
        </div>
    )
}

export default EmailListPage