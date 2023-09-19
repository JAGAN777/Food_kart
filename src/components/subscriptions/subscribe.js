import React, { useEffect } from 'react'
import { Grid, Box, TextField, Card, Stack } from '@mui/material'
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PauseIcon from '@mui/icons-material/Pause';
import SubscriptionDetails from '../order-details/subscription-details';
import OrderDetails from '../order-details/OrderDetails';
import {useGeLogs} from '../../hooks/react-query/subscription/useGeLogs';
import { CustomHeader } from '../../api/Headers'
import OrderHistory from '../order-history/OrderHistory';
import { useTranslation } from 'react-i18next'



export default function subscribe({setSubInfo}) {
  const { t } = useTranslation()

  function createData(id, Subscribs, Status, Period, Action) {
    return { id, Subscribs, Status, Period, Action };
  }

  const plansSilver = () => {
    return (
      <div>
        <h5>Silver</h5>
        <h6 className='text-muted mb-0 mt-2'>Breakfast, Lunch, Dinner</h6>
      </div>
    )
  }

  const plansGold = () => {
    return (
      <div>
        <h5>Gold</h5>
         <h6 className='text-muted mb-0 mt-2'>Breakfast, Dinner</h6>
      </div>
    )
  }

  const rows = [
    createData('#123456', plansSilver(), "Active", "19 Jun- 19 Jul", "Edit"),
    createData('#123457', plansGold(), "Expired", "19 Jun- 19 Jul", "Edit"),
  ];
  

  const router = useRouter()

  return (<>
  
    <Card>
    <Grid
        sx={{
            borderRadius: '10px',
            background: '#F6F6F6',
                height:"100%"
        }}
    >
        <div className='p-4 my_subscribe'>
          <div className='mb-4'>
            <h4 className='fw-bold'>{t('My Subscriptions')}</h4>
          </div>

          <div className='d-flex justify-content-center align-items-center px-sm-5 d-none'>
            <div className='text-center'>
              <div className='mb-4'>
              <img src='/static/images/emp_sub.png' className='empty_Sub' />
              </div>
              <div className='mb-4'>
                <h4 className='text_color fw-bold'>Your Subscription Go Here</h4>
              </div>
              <div className='mb-4'>
                <h6 className='text-muted fw-light'>Our Subscription Includes One Or More Meals Including Breakfast, Lunch, & Dinner. Once You Subscribe.</h6>
              </div>
              <div className=''>
                <button type='button' className='btn btn_sub p-2 px-3' onClick={()=>router.push({pathname:'/menu',query:{subscribe:true}})}>Subscribe Now</button>
              </div>
            </div>
          </div>

          <div className=' d-none'>
            <div className='plan mb-4 cursor-pointer' >
              <div className='d-flex justify-content-between' onClick={()=>setSubInfo('deails')}>
                <div className=''>
                <h5>Silver</h5>
                <p className='mt-2 text-muted'>Brakfast, Lunch, Dinner</p>
                </div>
                <div className=''>
                  <h6 className='text-muted'>$899 / Month</h6>
                </div>
              </div>
              <div className='d-sm-flex mt-5 justify-content-start align-items-end'>
                <button type='button' className='btn btn_cancel mb-3 text-truncate'>Cancel Subscriotion</button>
                <button type='button' className='btn btn_cancel1 ms-sm-3 mb-3' onClick={()=>setSubInfo('Pause')}><PauseIcon sx={{color:'#fff'}}/> Pause</button>
              </div>
            </div>

            <div className=''>
            <h4 className='fw-bold'>History</h4>

      <div className='plans_table mt-3'>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Subscriptions Plans</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Period</TableCell>
            {/* <TableCell >Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >{row.Subscribs}</TableCell>
              <TableCell >{row.Status == "Active" ? <span className='text-success'>{row.Status}</span> : <span className='text-danger'>{row.Status}</span>}</TableCell>
              <TableCell ><span className='text-muted'>{row.Period}</span></TableCell>
              {/* <TableCell >{row.Action}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
            </div>


          </div>

          <OrderHistory />
        </div>
        </Grid>
        </Card> 

        
  </> )
}


export const getServerSideProps = async () => {
  const configRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
      {
          method: 'GET',
          headers: CustomHeader,
      }
  )
  const config = await configRes.json()
  return {
      props: {
          configData: config,
      },
  }
}