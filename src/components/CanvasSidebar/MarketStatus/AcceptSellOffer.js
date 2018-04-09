import React from 'react'
import { Button, Modal } from 'antd'

const AcceptSellOffer = (props) => {
  const confirmAcceptSellOffer = () => {
    Modal.confirm({
      title: 'Confirm Canvas Buy',
      content: <span>Do you want to buy this Canvas for <b>{props.price} ETH?</b></span>,
      okText: 'Yes, buy this Canvas',
      okType: 'primary',
      onOk: () => props.acceptSellOffer(props.price),
    })
  }

  return (
    (!props.offerReceiver || props.isUserOfferReceiver)
      ? <div>
          <Button type="primary" size="default" onClick={confirmAcceptSellOffer}>
            Buy this Canvas for {props.price} ETH
          </Button>
          <br /><br />
        </div>
      : null
  )
}

AcceptSellOffer.propTypes = {}
AcceptSellOffer.defaultProps = {}

export default AcceptSellOffer