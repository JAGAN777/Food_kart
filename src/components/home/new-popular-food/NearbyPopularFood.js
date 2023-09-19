import React, { memo, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { IconButton, Grid, CircularProgress } from '@mui/material'
import fire_image from '../../../../public/static/fire.svg'
import FoodCard from '../../food-card/FoodCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import { AllRoutes } from '../../../AllRoutes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import CustomImageContainer from '../../CustomImageContainer'

import {
    CustomStackFullWidth,
    CustomViewAll,
} from '../../../styled-components/CustomStyles.style'
import { HandleNext, HandlePrev } from '../../CustomSliderIcon'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import FoodCardHorizontalShimmer from '../../food-card/FoodCardHorizontalShimmer'
import { useRouter } from 'next/router'
import fodKartBg from '../../../../public/static/images/Banner/App_bg.png'
import CustomContainer from '../../container'
import {CoustomerApi} from '../../../hooks/react-query/config/customerApi'
import { onSingleErrorResponse } from '../../ErrorResponse';



const NearbyPopularFood = ({ data, isLoading, isFetching }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const { popularFood } = useSelector((state) => state.storedData)
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const sliderRef = useRef(null)
    const matches = useMediaQuery('(max-width:825px)')
    let languageDirection = undefined
    if (typeof window !== 'undefined') {    
        languageDirection = localStorage.getItem('direction')
    }

    const { data:testimonial, refetch, } = useQuery(
        ['testimonails'],
        CoustomerApi.testimonials,
        {
            onError: onSingleErrorResponse,
        }
    )

    const [hoverOn, setHoverOn] = useState(true)

    const limit = 6

    const settings2 = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        infinite: true,
        autoplay: true,
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        // rtl:true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    dots: true
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    dots: true,
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // initialSlide: 2
                    initialSlide: 0,
                    dots: true,

                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 0,
                },
            },
        ],
    }

    const handleClick = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        router.push(
            {
                pathname:
                    router.pathname === '/home'
                        ? window.location.pathname
                        : 'search',
                query: {
                    page: 'popular',
                },
            },
            undefined,
            { shallow: router.pathname === '/home' ? true : false }
        )
    }
    return (
        <>
            {/* <Grid
                container
                paddingTop={popularFood.length > 0 && '1.9rem'}
                gap="1.4rem"
            >
                {popularFood.length > 0 && (
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <CustomStackFullWidth
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <CustomImageContainer
                                    src={fire_image.src}
                                    width="26px"
                                    height="26px"
                                />
                                <Typography
                                    variant="h3"
                                    color={theme.palette.neutral[1000]}
                                    fontWeight="500"
                                >
                                    {t('Popular in your area')}
                                </Typography>
                            </Stack>
                            <CustomViewAll
                                onClick={handleClick}
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                {isXSmall && (
                                    <Typography>{t('View all')}</Typography>
                                )}
                                <IconButton
                                    sx={{
                                        filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1))',
                                        flex: 'none',
                                        order: '1',
                                        flexGrow: '0',
                                        boxShadow: 3,
                                    }}
                                >
                                    <KeyboardArrowRightIcon
                                        color="primary"
                                        style={{
                                            width: '19px',
                                            height: '19px',
                                            transform:
                                                languageDirection === 'rtl' &&
                                                'rotate(180deg)',
                                        }}
                                        fontWeight="700"
                                    />
                                </IconButton>
                            </CustomViewAll>
                        </CustomStackFullWidth>
                    </Grid>
                )}
                <Grid
                    item
                    container
                    xs={12}
                    md={12}
                    sm={12}
                    lg={12}
                    sx={{
                        background:
                            popularFood.length > 0 &&
                            ((theme) => theme.palette.sectionBg),
                        padding: '20px',
                        [theme.breakpoints.down('sm')]: {
                            padding: '10px',
                        },
                    }}
                >
                    {popularFood?.slice(0, limit).map((product) => {
                        if (
                            product?.variations === null ||
                            product?.variations[0]?.values ||
                            product?.variations?.length === 0
                        ) {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={matches ? 12 : 6}
                                    md={6}
                                    lg={4}
                                    key={product?.id}
                                    padding={{ xs: 0.5, sm: 1, md: 1 }}
                                >
                                    <FoodCard
                                        product={product}
                                        productImageUrl={
                                            global?.base_urls?.product_image_url
                                        }
                                        horizontal="true"
                                        hasBackGroundSection="true"
                                    />
                                </Grid>
                            )
                        }
                    })}
                    {isLoading &&
                        [...Array(6)].map((item) => (
                            <Grid
                                item
                                xs={12}
                                sm={matches ? 12 : 6}
                                md={6}
                                lg={4}
                                padding={{ xs: 0.5, sm: 1, md: 1 }}
                            >
                                <FoodCardHorizontalShimmer />
                            </Grid>
                        ))}
                </Grid>
            </Grid> */}

            <section className="mb-4 wrapper testimonal position-relative fadein">
                <div className="position-absolute icon1">
                    <img
                        src="/static/images/Banner/Element_2.png"
                        className="w-100"
                    />
                </div>
                <div className="position-absolute  icon2">
                    <img
                        src="/static/images/Banner/Element_3.png"
                        className="w-100"
                    />
                </div>
                
                <CustomContainer>
                    <div className="fk_banners  elem to-fade-in mb-5 ">
                        <div className="">
                            <div className="row">
                                <div
                                    className="col-md-6 mb-4 "
                                    style={{ borderRadius: '20px' }}
                                >
                                    <div className="position-relative overflow-hidden" style={{ borderRadius: '20px' }}>
                                        <img
                                            src="/static/images/Slide_1.jpg"
                                            className=""
                                        />
                                        <div className="position-absolute ">
                                            <div className="">
                                                <h6 className="text-success mb-2">
                                                    FoodKart Cook
                                                </h6>

                                                <h4 className="text-light mb-2">
                                                    Trained, Verified, Assured
                                                    Service.
                                                </h4>

                                                <button
                                                    type="button"
                                                    className="btn btn1_sub rounded "
                                                >
                                                    View Menus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-md-6 mb-4 "
                                    style={{ borderRadius: '20px' }}
                                >
                                    <div className="position-relative overflow-hidden" style={{ borderRadius: '20px' }}>
                                        <img
                                            src="/static/images/Slide_2.jpg"
                                            className=""
                                        />
                                        <div className="position-absolute ">
                                            <div className="">
                                                <h6 className="text-danger mb-2">
                                                    FoodKart Gives
                                                </h6>

                                                <h4 className="text-light mb-2">
                                                    Feel Closer to Home Wherever
                                                    you are.
                                                </h4>

                                                <button
                                                    type="button"
                                                    className="btn btn1_sub rounded "
                                                >
                                                    Subscribe Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="elem to-fade-in testimonal_peo ">
                        <div className="d-flex justify-content-center mb-3">
                          { testimonial?.data?.data?.length > 0 &&
                          <div className="text-center">
                          <h5 className="mb-2"> {t('Testimonials')}</h5>
                          <h4 className="fw-bold">
                              {t('What people say')} ?
                          </h4>
                          </div>
                          }  
                            
                        </div>

                        <div className="">
                            <Slider
                                className="slick__slider"
                                {...settings2}
                                ref={sliderRef}
                                arrows={true}
                            >
                                {
                                    testimonial?.data?.data?.map((data,index)=>(
                                    // <div className="Testimonils_card" key={index}>
                                    //     <div className="">
                                    //         <h4 className="comlplete_1">{data?.title}</h4>
                                    //         <div className="mb-3 mt-3">
                                    //             <img
                                    //                 src="/static/images/quote_.png"
                                    //                 className="quates_img"
                                    //             />
                                    //         </div>
                                    //         <div className="">
                                    //             <p className="comlplete_3">
                                    //                 {data?.des}
                                    //             </p>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                    <div className="Testimonils_card" key={index}>
                                    <div className="">
                                        <div className="mb-3 d-flex justify-content-between">
                                        <div className=''>
                                            <img
                                                src={data?.image}
                                                className="quates_img rounded-circle" 
                                                onError={(e)=> e.currentTarget.src = "/static/images/No_Image.jpg"}
                                            />
                                            </div>
                                            <div className=''>
                                            <img
                                                src="/static/images/quote_.png"
                                                className="quates_img"
                                            />
                                            </div>
                                        </div>
                                        <h4 className="comlplete_1 mb-3">{data?.title}</h4>
                                        <div className="">
                                            <p className="comlplete_3">
                                                {data?.des}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </CustomContainer>
            </section>

            <section className="wrapper fadein mb-4">
                <div className="get_app d-flex elem to-fade-in align-items-center">
                    {/* <img src='/static/images/Banner/App_bg.png' className='w-100' /> */}

                    {/* <div className='position-absolute top-50 start-50 translate-middle'> */}
                    <CustomContainer>
                        <div className="d-md-flex justify-content-between align-items-center">
                            <div className="text-md-start text-center sm_getApp">
                                <div className="mb-sm-4 mb-2">
                                    <h4 className="text_color mb-3">
                                        FoodKart
                                    </h4>

                                    <h3 className="mb-3 fw-bold">
                                       {t(' Get Our Updated App Today.')}
                                    </h3>

                                    <p className="mb-sm-3 comlplete_2">
                                        we offer healthy, yummy, honest &
                                        wholesome Indian food, made with real
                                        ingredients, zero trans fat, and lots of
                                        love
                                    </p>

                                    <div className="d-flex justify-content-md-start justify-content-center align-items-center">
                                        <div className='cursor-pointer' onClick={()=>window.open("https://play.google.com/store/games?device=windows")}>
                                            <img
                                                src="/static/images/Banner/Playstore.png"
                                                className="app_store"
                                            />
                                        </div>
                                        <div className="ms-3 cursor-pointer" onClick={()=>window.open("https://www.apple.com/")}>
                                            <img
                                                src="/static/images/Banner/App_store.png"
                                                className="app_store"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-md-block d-none">
                                <div className="">
                                    <img
                                        src="/static/images/Banner/App.png"
                                        className="w-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </CustomContainer>
                </div>
            </section>
        </>
    )
}

export default memo(NearbyPopularFood)
