import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import axios from 'axios';

export default function MyOrder() {

  const [orderData, setorderData] = useState([])

  const fetchMyOrder = async () => {
    const userEmailf = localStorage.getItem('useremail')
    const response = await axios.post("https://fooddelivery-j1hz.onrender.com/myOrder", { email: userEmailf })
    const json = response.data

    //  console.log(json)

    await setorderData(json)

  }




  useEffect(() => {
    fetchMyOrder()
  }, [])


  return <>
    <div>
      <Navbar />
    </div>
    <h1>your order</h1>

    {
      orderData !== [] ? orderData.slice(0).reverse().map((arrayData) => {
        return <>
          <div className='col-12 col-md-6 col-lg-3' >
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
              <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "30vh", objectFit: "fill" }} />
              <div className="card-body">
                <h5 className="card-title">{arrayData.name}</h5>
                <div className='container w-100 p-0' style={{ height: "50px" }}>
                  <span className='m-1'>{arrayData.Qty}</span>
                  <span className='m-1'>{arrayData.Size}</span>
                  <br></br>
                  <div className=' d-inline ms-2 h-100 w-20 fs-5' >₹{arrayData.price}/-</div>
                </div>
              </div>
            </div>
          </div>
        </>
      }) : "hello"

    }

    <div>
      <Footer />
    </div>
  </>

}