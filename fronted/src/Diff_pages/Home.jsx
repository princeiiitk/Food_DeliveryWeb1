import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Cards from '../component/Cards'
import Carousal from '../component/Carousal'
import '../App.css'
import axios from 'axios';


export default function Home() {
  const [fooditem, setfooditem] = useState([]);
  const [foodcat, setfoodcat] = useState([]);
  const reload = async () => {
    const url = 'https://fooddelivery-j1hz.onrender.com/foodItem';

    let respons = await axios.get(url)
    setfoodcat(respons.data[1]);
    setfooditem(respons.data[0])

  }
  useEffect(() => {
    reload();

  }, []);

  return (
    <>
      <div><Navbar /> </div>

      <div><Carousal /> </div>

      <div className='container'>
        {
          foodcat !== []
            ? foodcat.map((i) => {
              return (<div key={i._id} className='fs-3 m-2 row mb-3 align-center'> {i.CategoryName}  <hr />
                {
                  fooditem !== []
                    ?
                    fooditem.filter((item) => item.CategoryName === i.CategoryName)
                      .map((filterdata) => {
                        return (<>
                          <div key={filterdata._id} className='col-12 col-md-6 col-lg-3'>
                            <Cards foodItem={filterdata}

                              option={filterdata.options[0]}>
                            </Cards>
                          </div>
                        </>)
                      })
                    : (<div>"data not found"</div>)}
              </div>)
            })
            : (<div>""</div>)
        }

      </div>



      <div> <Footer /> </div>

    </>
  )
}
