import React, { useEffect,useState } from 'react'
import { Grid, Box, TextField, Card, Stack } from '@mui/material'
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PauseSubcribe({setSubInfo}) {

  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState([
    new Date(2021, 6, 19),
    new Date(2021, 7, 19),
  ]);


  return (
    <Card>
    <Grid
        sx={{
            borderRadius: '10px',
            background: '#F6F6F6',
                height:"100%"
        }}
    >
           <div className='p-4 pause_sub'>
            <div className='mb-4'>
            <h4 className='fw-bold'><span onClick={()=>setSubInfo('default')}><ArrowBackIcon sx={{color:'#000',fontSize:'35px'}} className='me-3' /></span> Pause Subscription</h4>
            </div>

          <div className='calendar-container mb-4'>

          </div>

          <div className=''>
          <div className='mb-3'>
          <h4 className='fw-bold'>Vacation</h4>
          </div>
          <div className='mb-3'>
          <div className='form-check mb-2'>
               <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1"  />
                <label className="form-check-label " for="flexCheckDefault1">
                  Total Availabe Count: 20
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                <label className="form-check-label" for="flexCheckChecked">
                 Vacation days: 4
                </label>
              </div>

          </div>
              <div className=''>
                <button type='button' className='btn btn_sub' >Set Vacation</button>
              </div>
            </div>


          {/* {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )} */}
            </div>
      </Grid>
      </Card>
  )
}
