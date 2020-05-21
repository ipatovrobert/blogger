import React, { Fragment } from 'react'
import Welcome from '../Welcome'
import LatestsPosts from '../LatestsPosts'
import Discover from '../Discover'
import Footer from '../Footer'

const Home = () => {
    return (
        <Fragment>
            <div className="container">
                <Welcome />
                <LatestsPosts />
                <Discover />
          </div>
          <Footer />
        </Fragment>
    )
}

export default Home
