import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { NavLinkStyle } from '../Navbar.style'
import NavCatagory from '../NavCatagory'
import NavResturant from '../NavResturant'
import NavCuisines from '../NavCuisines'
import { setHandleHomePage } from '../../../redux/slices/global'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const NavLinks = ({ zoneid, t, languageDirection }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [openCategoryModal, setCategoryModal] = useState(false)
    const [openRestaurantModal, setRestaurantModal] = useState(false)
    const handleClick = () => {
        router.push('/home')
        dispatch(setHandleHomePage(false))
    }
    

    const handleAboutUS = () => {
        router.push('/about-us')
    }
    return (
        <Stack direction="row" spacing={2.5}>
            {zoneid && (
                <>
                    <NavLinkStyle
                        onClick={handleClick}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer' }}
                    >
                    <Typography fontSize="14px">{t('Home')}</Typography>
                    </NavLinkStyle>

                    <NavLinkStyle  
                     onClick={()=>router.push('/category/1?name=South+Indian')}
                    sx={{ cursor: 'pointer' }}>
                    <Typography fontSize="14px">{t('Menu')}</Typography>
                    </NavLinkStyle>
                    <NavCatagory
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                        languageDirection={languageDirection}
                    />

                    <NavLinkStyle 
                          sx={{ cursor: 'pointer' }}
                          onClick={()=>router.push('/testimonials')}
                    >
                    <Typography fontSize="14px">{t('Testimonials')}</Typography>
                    </NavLinkStyle>

                    <NavLinkStyle 
                    onClick={handleAboutUS}
                    underline="none"
                    languageDirection={languageDirection}
                    sx={{ cursor: 'pointer' }}
                    >
                    <Typography fontSize="14px"><span className='text-truncate'>{t('About Us')}</span></Typography>
                    </NavLinkStyle>

                    <NavLinkStyle 
                    onClick={()=>router.push('/contact-us')}
                          sx={{ cursor: 'pointer' }}
                    >
                    <Typography fontSize="14px"><span className='text-truncate'>{t('Contact Us')}</span></Typography>
                    </NavLinkStyle>

                  {/* 
                    <NavCatagory
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                        languageDirection={languageDirection}
                    /> */}
                     {/* <NavLinkStyle
                        onClick={handleAboutUS}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer' }}>
                    <Typography fontSize="14px">{t('About Us')}</Typography>
                    </NavLinkStyle>
                
                    <NavLinkStyle
                        onClick={handleClick}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer' }}>
                    <Typography fontSize="14px">{t('Contact Us')}</Typography>
                    </NavLinkStyle> */}

                    {/* <NavCuisines
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                        languageDirection={languageDirection}
                    />

                    <NavResturant
                        openModal={openRestaurantModal}
                        setModal={setRestaurantModal}
                        zoneid={zoneid}
                        languageDirection={languageDirection}
                    /> */}
                </>
            )}
        </Stack>
    )
}

NavLinks.propTypes = {}

export default NavLinks
