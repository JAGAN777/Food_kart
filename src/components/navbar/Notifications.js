import React from 'react'
import Box from '@mui/material/Box'
import {Divider, IconButton, Menu, MenuItem, Stack, Typography} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Notification from '../../../public/static/Notification/Ellipse 26.png'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {CustomStack} from "../../styled-components/CustomStyles.style";
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import noData from '../../../public/static/images/subs.png'



const Notifications = () => {
    const { t } = useTranslation()
    const [notify, setNotify] = React.useState(null)
    const notifyopen = Boolean(notify)
    const handleNotifyClick = (event) => {
        setNotify(event.currentTarget)
    }
    const handleNotifyClose = () => {
        setNotify(null)
    }
    return (
        <> 
        <div className='d-none'>            
            <IconButton
                onClick={handleNotifyClick}
                size="small"
                aria-controls={notifyopen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={notifyopen ? 'true' : undefined}
            >
                <NotificationsIcon  />
            </IconButton>
            <SimpleBar style={{ maxHeight: 400 }}>
            <Menu
                anchorEl={notify}
                id="account-menu"
                open={notifyopen}
                onClose={handleNotifyClose}
                onClick={handleNotifyClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        height: '300px',

                        // webkitOverflowScrolling: 'touch',

                        // overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 10,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                  <CustomStack>
                       <Typography sx={{ fontSize: '18px', color: '#e01d57' }}>

                           {t('Notification')}
                       </Typography>
                  </CustomStack>
                   <Divider />
                <CustomStack>
                       <Typography sx={{ color: '#9B9B9B' }}>
                           15 April, 2022
                       </Typography>
                    </CustomStack>
                   <MenuItem
                       sx={{
                           display: 'flex',
                           alignItems: 'flex-start',
                           gap: '5px',
                       }}
                   >
                       <img src={Notification.src} alt="" />
                       <Box>
                           <Typography>Notification sent </Typography>
                           <Typography
                               sx={{
                                   fontSize: '12px',
                                   whiteSpace: 'no-wrap',
                                   textOverflow: 'ellipsis',
                                   overflow: 'hidden',
                                   width: '200px',
                               }}
                           >
                               "Lorem ipsum dolor sit amet, consectetur adipiscing
                               elit, sed do eiusmod tempor incididunt ut labo fgjkj
                               magna....{' '}
                           </Typography>
                       </Box>
                   </MenuItem>
                   <Divider />
                   <MenuItem
                       sx={{
                           display: 'flex',
                           alignItems: 'flex-start',
                           gap: '5px',
                       }}
                   >
                       <img src={Notification.src} alt="" />
                       <Box>
                           <Typography>Notification sent </Typography>
                           <Typography
                               sx={{
                                   fontSize: '12px',
                                   whiteSpace: 'no-wrap',
                                   textOverflow: 'ellipsis',
                                   overflow: 'hidden',
                                   width: '200px',
                               }}
                           >
                               "Lorem ipsum dolor sit amet, consectetur adipiscing
                               elit, sed do eiusmod tempor incididunt ut labo fgjkj
                               magna....{' '}
                           </Typography>
                       </Box>
                   </MenuItem>
                <CustomStack>
                    <Typography sx={{ color: '#9B9B9B' }}>
                        15 April, 2022
                    </Typography>
                </CustomStack>
                   <MenuItem
                       sx={{
                           display: 'flex',
                           alignItems: 'flex-start',
                           gap: '5px',
                       }}
                   >
                       <img src={Notification.src} alt="" />
                       <Box>
                           <Typography>Notification sent </Typography>
                           <Typography
                               sx={{
                                   fontSize: '12px',
                                   whiteSpace: 'no-wrap',
                                   textOverflow: 'ellipsis',
                                   overflow: 'hidden',
                                   width: '200px',
                               }}
                           >
                               "Lorem ipsum dolor sit amet, consectetur adipiscing
                               elit, sed do eiusmod tempor incididunt ut labo fgjkj
                               magna....
                           </Typography>
                       </Box>
                   </MenuItem>
                   <Divider />

            </Menu>
            </SimpleBar>
             </div>

             <CustomPaperBigCard padding="1.5rem" sx={{backgroundColor:'#F6F6F6'}}>
             <div className=''>
                    <div className='mb-4'>
                        <h4 className='fw-bold'>{t('Notification')}</h4>
                    </div>

                    <div className='Notify_card d-none'>
                        <div className='d-flex justify-content-between border-bottom pb-3 mb-3'>
                            <div className='d-md-flex mt-2'>
                                <div className='mb-3 mb-md-0'>
                                <img src='/static/fk_logo.png' className='' />
                                </div>
                                <div className='ms-md-3'>
                                    <div className='mb-4'>
                                    <h6>FootKart</h6>
                                    <h6 className='comlplete_1 text-muted fw-normal'>Tour breakfast is ready to delivery! Pongal, Tiffon Sambar, Godumai Dosai... </h6>
                                    </div>
                                    <div className='d-flex'>
                                        <button type='button' className='btn btn_cancel'>Cancel</button>
                                        <button type='button' className='btn btn_cancel text-truncate ms-2'>Track Food</button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 mt-md-0'>
                                <h6 className='text-muted fw-normal text-lowercase  comlplete_1 '>1 min ago</h6>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between border-bottom pb-3 mb-3'>
                            <div className='d-md-flex'>
                                <div className='mb-3 mb-md-0'>
                                <img src='/static/fk_logo.png' className='' />
                                </div>
                                <div className='ms-md-3'>
                                    <div className='mb-4'>
                                    <h6>FootKart</h6>
                                    <h6 className='comlplete_1 text-muted fw-normal'>Your Dinner is Delivered! Pongal, Tiffin sambar, Godumai dosai...</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 mt-md-0'>
                                <h6 className='text-muted fw-normal text-lowercase comlplete_1'>1 min ago</h6>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between border-bottom pb-3 mb-3'>
                            <div className='d-md-flex '>
                                <div className='mb-3 mb-md-0'>
                                <img src='/static/fk_logo.png' className='' />
                                </div>
                                <div className='ms-md-3'>
                                    <div className='mb-4'>
                                    <h6>FootKart</h6>
                                    <h6 className='comlplete_1 text-muted fw-normal'>Your Subscription Plan was expired Soon! Renewal now! </h6>
                                    </div>
                                    <div className='d-flex'>
                                        <button type='button' className='btn btn_cancel'>Cancel</button>
                                        <button type='button' className='btn btn_cancel  text-truncate  ms-2'>Track Food</button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 mt-md-0'>
                                <h6 className='text-muted fw-normal text-lowercase comlplete_1'>1 min ago</h6>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between border-bottom pb-3 mb-3'>
                            <div className='d-md-flex '>
                                <div className='mb-3 mb-md-0'>
                                <img src='/static/fk_logo.png' className='' />
                                </div>
                                <div className='ms-md-3'>
                                    <div className='mb-4'>
                                    <h6>FootKart</h6>
                                    <h6 className='comlplete_1 text-muted fw-normal'>your Breakfast is Delivered! Pongal, Tiffin sambar, Godumai dosai... </h6>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 mt-md-0'>
                                <h6 className='text-muted fw-normal text-lowercase comlplete_1'>1 min ago</h6>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between border-bottom pb-3 mb-3'>
                            <div className='d-md-flex '>
                                <div className='mb-3 mb-md-0'>
                                <img src='/static/fk_logo.png' className='' />
                                </div>
                                <div className='ms-md-3'>
                                    <div className='mb-4'>
                                    <h6>FootKart</h6>
                                    <h6 className='comlplete_1 text-muted fw-normal'>Tour breakfast is ready to delivery! Pongal, Tiffon Sambar, Godumai Dosai... </h6>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 mt-md-0'>
                                <h6 className='text-muted fw-normal text-lowercase comlplete_1'>1 min ago</h6>
                            </div>
                        </div>
                    </div>

                    <div className='Notify_card d-flex justify-content-center align-item-center'>
                      <CustomEmptyResult
                        image={noData}
                        label=" No Food Found"
                        />
                    </div>

            </div>
             </CustomPaperBigCard>

        </>
    )
}

export default Notifications
