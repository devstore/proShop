import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 Step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>

              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Form.Group>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
