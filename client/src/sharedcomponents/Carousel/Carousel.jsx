import React from 'react'
import styles from "./Carousel.module.css"

const Carousel = () => {
    return (
        <div className={styles.carousel}>
            <img src="https://ecommercespecials.com/wp-content/uploads/2021/01/dreamstime_m_37921311-1280x700.jpg" alt=""/>
            <h1 className={styles.heading1}>Need help </h1>
            <h1 className={styles.heading2}>finding your next PC</h1>
            <span>KNOW MORE</span>
            <h3>intel</h3>
           
        </div>
    )
}

export default Carousel
