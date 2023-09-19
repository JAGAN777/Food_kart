import React, { useEffect } from 'react'
import { Grid, Box, TextField, Card, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PauseIcon from '@mui/icons-material/Pause';


export default function SubscriptionInfo({setSubInfo}) {
  return (<>
     <Card>
    <Grid
        sx={{
            borderRadius: '10px',
            background: '#F6F6F6',
                height:"100%"
        }}
    >

        <div className='p-4 '>
            <div className='mb-4'>
            <h4 className='fw-bold'><span onClick={()=>setSubInfo('default')}><ArrowBackIcon sx={{color:'#000',fontSize:'35px'}} className='me-3' /></span> #123456</h4>
            </div>

            <div className='plan_info mb-4'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h4 className='fw-bold'>Silver</h4>
                    <h6 className='text-success'>&#x2022; Active</h6>
                </div>
                <div className='d-sm-flex justify-content-between align-items-center'>
                    <div className='mb-sm-0 mb-3'>
                        <p className='text-muted mb-0'>19 Jul- 19 Jul 2023</p>
                        <p className='text-muted  mb-0'>Breakfast, Lunch, Dinner</p>
                    </div>
                    <div className='d-sm-flex align-items-end'>
                    <button type='button' className='btn btn_cancel mb-sm-0 mb-3 text-truncate'>Cancel Subscriotion</button>
                    <button type='button' className='btn btn_cancel1 ms-sm-3 text-truncate mb-sm-0 mb-3 '><PauseIcon sx={{color:'#fff'}}/> Pause</button>
                    </div>
                </div>
            </div>

            <div className='col-md-6 '>
                <div className='mb-4'>
               <div className='mb-3'>
               <h5>Description</h5>
               </div>
               <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6>Breakfast:</h6>
                <h6 className='text-muted fw-normal'>North Indian</h6>
               </div>
               <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6>Lunch:</h6>
                <h6 className='text-muted fw-normal'>South Indian</h6>
               </div>
               <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6>Dinner:</h6>
                <h6 className='text-muted fw-normal'>South Indian</h6>
               </div>
                </div>

             <div className='mb-4 '>
                <div className='border-bottom mb-3'>
               <div className='mb-3'>
               <h5>Payment summary</h5>
               </div>
               <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className='text-muted fw-normal'>Package Price:</h6>
                <h6 className='text-muted fw-normal'>₹ 1500.00 </h6>
               </div>
               <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className='text-muted fw-normal'>Offer Price:</h6>
                <h6 className='text-muted fw-normal'>₹ 1399.00</h6>
               </div>
               <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className='text-muted fw-normal'>Delivery Charges:</h6>
                <h6 className='text-muted fw-normal'>₹ 500.00</h6>
               </div>
               <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className='text-muted fw-normal'>Footkart's Point:</h6>
                <h6 className='text-muted fw-normal'>₹ 0.00</h6>
               </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className='text-muted fw-normal'>Grand Total</h6>
                <h6 className='text_color'>₹ 1899.00</h6>
                </div>
                </div>
            </div>
        </div>    
    </Grid>
    </Card>
  </>
  )
}
