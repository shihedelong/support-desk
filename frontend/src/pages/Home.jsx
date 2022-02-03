import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>What do you need help with? </h1>
      </section>

      <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Tickect
      </Link>

      <Link to='/ticket' className='btn  btn-block'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}

export default Home