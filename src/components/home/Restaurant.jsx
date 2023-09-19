import React, { memo, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Dropdown } from 'react-bootstrap'
import FilterListIcon from '@mui/icons-material/FilterList'
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    useMediaQuery,
    Stack,
    Tabs,
    Tab,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { QueryClient, useInfiniteQuery, useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import CustomContainer from '../container'
import { useTranslation } from 'react-i18next'
// import noData from '../../../public/static/resturants.png'
import noData from '../../../public/static/images/emp_sub.png'
import { useTheme } from '@mui/material/styles'
import { onSingleErrorResponse,onErrorResponse} from '../ErrorResponse'
import { RTL } from '../RTL/RTL'
import CustomImageContainer from '../CustomImageContainer'
import restaurantIcon from '../../../public/static/result_count.svg'
import { mockData } from './mockData'
import RestaurantTab from './restaurant/RestaurantTab'
import { useGetRestaurant } from '../../hooks/react-query/restaurants/useGetRestaurant'
import DotSpin from './restaurant/DotSpin'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { useInView } from 'react-intersection-observer'
import {PlanApi} from '../../hooks/react-query/plans/planApi'
import { setPlans } from '../../redux/slices/storedData'
import { usePostNewsletterEmail } from '../../hooks/react-query/newsletter/usePostNewsletterEmail'
import { toast } from 'react-hot-toast'





const Restaurant = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const [type, setType] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const [searchKey, setSearchKey] = useState(' ')
    const [offset, setOffSet] = useState(1)
    const [page_limit, setPage_Limit] = useState(12)
    const matchesToMd = useMediaQuery('(min-width:740px)')
    const matchesToScroll = useMediaQuery('(min-width:828px)')
    const matchesToSmall = useMediaQuery('(min-width:400px)')
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [emailAddress, setEmailAddress] = useState(null)
    const [filterByData, setFilterByData] = useState({})
    const [forFilter, setForFilter] = useState(false)
    const { ref, inView } = useInView()
    const refs = useRef(null)
    const dispatch = useDispatch()

    const { mutate, isLoading:newsLodaing } = usePostNewsletterEmail()
    const handleSubmit = (event) => {
        // e.preventdefault()
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (regex.test(emailAddress) === true) {
            mutate(
                { email: emailAddress },
                {
                    onSuccess: () =>
                        toast.success(t('Subscribed Successfully')),
                    onError: onErrorResponse,
                }
            )
            
        } else {
            toast.error(t('Please insert a valid email.'))
        }
        setEmailAddress('')
        event.preventDefault()
    }


    const {
        data,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        fetchPage,
        refetch,
    } = useGetRestaurant({
        filterByData,
        offset,
        page_limit,
        filterType,
        searchKey,
    })

    if(typeof window == 'undefined'){
        return null
    }

    const responsiveTop = isSmall ? 2000 : matchesToScroll ? 1700 : 1950
    // let fetching = false
    // const bottomValue = isSmall ? 3.7 : 1.7
    //
    // const onScroll = async (event) => {
    //     const { scrollHeight, scrollTop, clientHeight } =
    //         event.target.scrollingElement
    //     if (
    //         !fetching &&
    //         scrollHeight - scrollTop <= clientHeight * bottomValue
    //     ) {
    //         fetching = true
    //         await fetchNextPage()
    //         setOffSet((prevState) => prevState + 1)
    //         fetching = false
    //     }
    // }
    // useEffect(() => {
    //     document.addEventListener('scroll', onScroll, { passive: true })
    //     return () => {
    //         document.removeEventListener('scroll', onScroll)
    //     }
    // }, [])

    const handleChange = (event, newValue) => {
        setFilterType(newValue)
        setOffSet(1)
        setForFilter(true)
        window.scrollTo(0, responsiveTop)
    }
    useEffect(() => {
        setForFilter(false)
    }, [])

    useEffect(() => {
        if (inView) {
            fetchNextPage()
            setOffSet((prevState) => prevState + 1)
        }
    }, [inView])

    useEffect(async () => {
        if (forFilter) {
            setOffSet(1)
            // fetchPage(2)
            await refetch()
        }
    }, [forFilter, filterByData, filterType])
    let mode = undefined
    if (typeof window !== 'undefined') {
        mode = localStorage.getItem('mode')
    }
    const lightColor = theme.palette.neutral[1000]
    const languageDirection = localStorage.getItem('direction')

    const [plans, setPlan] = useState([])

    const fetchedPlans = () => {
        PlanApi.Plans().then(res => {
            setPlan(res.data?.packages)
        }).catch(err => {
            console.error("err8",err.message)
        })
    }

    useEffect(()=> {
        fetchedPlans()
    },[])


    return (<>
<div className='d-none'>
<RTL direction={languageDirection}>
            <Grid
                container
                sx={{ paddingBlockStart: '1.6rem', paddingBlockEnd: '2rem' }}
                rowGap="2rem"
            >
                <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        borderBottom: `1px solid ${theme.palette.borderBottomBg}`,
                        position: 'sticky',
                        top: '55px',

                        padding: '15px 10px 0px 0px',
                        zIndex: 5,
                        background: theme.palette.neutral[1800],
                    }}
                >
                    <Grid item xs={12} sm={12} md={4}>
                        <Stack direction="row" spacing={1}>
                            <CustomImageContainer
                                src={restaurantIcon.src}
                                width="26px"
                                height="26px"
                            />
                            <Typography
                                variant="h3"
                                color={theme.palette.neutral[1000]}
                                fontWeight="500"
                            >
                                {data?.pages[0]?.total_size} {t('Restaurants')}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} ref={refs}>
                        <RestaurantTab
                            filterByData={filterByData}
                            setFilterByData={setFilterByData}
                            filterType={filterType}
                            handleChange={handleChange}
                            mockData={mockData}
                            setOffSet={setOffSet}
                            setForFilter={setForFilter}
                            responsiveTop={responsiveTop}
                            forFilter={forFilter}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} container spacing={2}>
                    {data && (
                        <>
                            {data?.pages.map((item) =>
                                item?.restaurants?.map((restaurantData) => (
                                    <Grid
                                        key={restaurantData?.id}
                                        item
                                        md={3}
                                        sm={matchesToMd ? 4 : 6}
                                        xs={matchesToSmall ? 6 : 12}
                                    >
                                        <RestaurantBoxCard
                                            key={restaurantData?.id}
                                            id={restaurantData.id}
                                            image={restaurantData?.cover_photo}
                                            name={restaurantData?.name}
                                            rating={restaurantData?.avg_rating}
                                            restaurantImageUrl={
                                                global?.base_urls
                                                    ?.restaurant_cover_photo_url
                                            }
                                            restaurantDiscount={
                                                restaurantData.discount &&
                                                restaurantData.discount
                                            }
                                            freeDelivery={
                                                restaurantData.free_delivery
                                            }
                                            open={restaurantData?.open}
                                            active={restaurantData?.active}
                                            delivery_time={
                                                restaurantData?.delivery_time
                                            }
                                            cuisines={restaurantData?.cuisine}
                                            coupons={restaurantData?.coupons}
                                            slug={restaurantData?.slug}
                                        />
                                    </Grid>
                                ))
                            )}
                        </>
                    )}
                    <Stack ref={ref}></Stack>
                    {data?.pages[0]?.restaurants.length === 0 && (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                                paddingBlockEnd: '30px',
                                paddingBlockStart: '30px',
                            }}
                        >
                            <CustomEmptyResult
                                image={noData}
                                label="No Restaurant found"
                            />
                        </Grid>
                    )}
                </Grid>
                {isFetchingNextPage && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            paddingBlockEnd: '30px',
                            paddingBlockStart: '30px',
                        }}
                    >
                        <Stack sx={{ minHeight: '30vh' }}>
                            <DotSpin />
                        </Stack>
                    </Grid>
                )}
                {isLoading && !isFetchingNextPage && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            paddingBlockEnd: '30px',
                            paddingBlockStart: '30px',
                        }}
                    >
                        <Stack sx={{ minHeight: '40vh' }}>
                            <DotSpin />
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </RTL>
</div>

<section className='mb-4 wrapper fadein plans_cla'>
    <div className='elem to-fade-in'>
            <div className='d-flex justify-content-center  mb-4'>
                    <div className='text-center'>
                    <h5 className='mb-2'> {t('Meals Plans')}</h5>
                    <h4 className='fw-bold text-dark'>{t('Subcription For Your Perfect Plan')}</h4>
                    </div>
                    </div>
                    <CustomContainer>
                    <div className="row justify-content-center ">
                        {
                            plans.length > 0 && 
                            plans.slice(0,3).map((data,index)=> (
                                <di className='col-lg-4 col-sm-6 mb-4'>
                                <div className='subscribe_cards h-100'>
                                    <div className='d-flex justify-content-center align-items-center position-relative card2 mb-3' style={{backgroundColor:data?.colour}}>
                                        <h4>{data?.package_name}</h4>
                                        <img src='/static/images/foot_2.png' className='position-absolute poc top-0 end-0' />
                                        <img src='/static/images/foot_1.png' className='position-absolute poc bottom-0 start-0' />
                                    </div>
                                    <div className='mb-3'>
                                        <h6 className='fw-bold'>{t('Serving Meals')}</h6>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Breakfast</span></p>
                                            <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Lunch</span></p>
                                            <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Dinner</span></p>
                                        </div>
                                    </div>
                                    <div className=''>
                                    <h6 className='fw-bold' >{t('Description')}:</h6>
                                    <p className='comlplete_3'>
                                     {data?.text ?? ' Best in the entire area Homemade Food Breakfast-Puri Sabji Aloo Paratha Paha Jalebi Lunch-BRoti SabjiDal Rice Salad..' } 
                                    </p>
                                    
                                    {/* <p className='text_color cursor-pointer'>View Details</p> */}
                                    </div>
                                </div>
                            </di>
                            ))
                        }
                        <di className='col-lg-4 col-sm-6 mb-4 d-none'>
                            <div className='subscribe_cards'>
                                <div className='d-flex justify-content-center align-items-center p-5 card3 mb-3'>
                                    <h4>Gold</h4>
                                </div>
                                <div className='mb-3'>
                                    <h6 className='fw-bold'>{t('Serving Meals')}</h6>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Breakfast</span></p>
                                        <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Lunch</span></p>
                                        <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Dinner</span></p>
                                    </div>
                                </div>
                                <div className=''>
                                <h6 className='fw-bold' >{t('Description')}:</h6>
                                <p className='comlplete_3'>
                                Best in the entire area Homemade Food Breakfast-Puri Sabji Aloo Paratha Paha Jalebi Lunch-BRoti SabjiDal Rice Salad..
                                </p>
                                
                                <p className='text_color'>View Details</p>
                                </div>
                            </div>
                        </di>
                        <di className='col-lg-4 col-sm-6 mb-4 d-none'>
                            <div className='subscribe_cards'>
                                <div className='d-flex justify-content-center align-items-center p-5 card4 mb-3'>
                                    <h4>Platinam</h4>
                                </div>
                                <div className='mb-3'>
                                    <h6 className='fw-bold'>{t('Serving Meals')}</h6>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Breakfast</span></p>
                                        <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Lunch</span></p>
                                        <p className='mb-0'> <img src='/static/images/Icons/_-17.png' className='icon' /> <span>Dinner</span></p>
                                    </div>
                                </div>
                                <div className=''>
                                <h6 className='fw-bold' >{t('Description')}:</h6>
                                <p className='comlplete_3'>
                                Best in the entire area Homemade Food Breakfast-Puri Sabji Aloo Paratha Paha Jalebi Lunch-BRoti SabjiDal Rice Salad..
                                </p>
                                
                                <p className='text_color'>{t('View Details')}</p>
                                </div>
                            </div>
                        </di>
                    </div>
                    </CustomContainer>
    </div>
</section>


<section className='mb-5 wrapper fadein'>
    <CustomContainer>
    <div className='elem to-fade-in'>
    <div className='banner_foot  d-flex justify-content-center align-items-center text-center position-relative'>
        {/* <img src='/static/images/Newsletter Bg.jpg' className='banner_foot mb-3' ></img> */}
        <div className='d-lg-block d-none position-absolute top-0 end-0'>
        <img src='/static/images/foot_2.png' className='ickk' />
        </div>
        <div className='d-lg-block d-none position-absolute  start-0'>
        <img src='/static/images/foot_1.png' className='ickk' />
        </div>
        <div className=''>
        <div>
        <h4 className='text-light comlplete_1'>{t('Sign Up For Newsletters')}</h4>
        </div>
        <div className=''>
            <p className='text-light'>{t('Recevie Latest News')},{t(' Updates and Many Others News Every Week')}.</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='d-flex justify-content-between align-items-center foot_text'>
            <div className='d-flex'>
            <img src='/static/images/Icons/_-18.png' className='teleTextImg' />
            <input type='text' value={emailAddress} placeholder={t('Enter Your Email Address')} onChange={(e) => setEmailAddress(e.target.value) } className='form-control border-0 ms-2' />
            </div>
            <div className=''>
                <button type='submit' className='btn btn_Sub2' >{t('Subscribe')}</button>
            </div>
        </div>
        </form>
        </div>
    </div>
    </div>
    </CustomContainer>
</section>
</>)
}

export default Restaurant
