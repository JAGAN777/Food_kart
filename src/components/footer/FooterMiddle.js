import React, { useEffect, useState } from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import {
    Container,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import LogoSide from '../navbar/second-navbar/LogoSide'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import SocialLinks from './SocialLinks'
import AppLinks from '../landingpage/AppLinks'
import RouteLinks from './RouteLinks'
import { useTheme } from '@mui/material/styles'
import { QuickLinkData, QuickLinkData3 } from './QuickLinkData'
import { OtherData } from './OtherData'
import { QuickLinkData1 } from './QuickLinkData1'
import ContactInfo from './ContactInfo'
import CustomContainer from '../container'

const FooterMiddle = ({ landingPageLink }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    const [foogcat,setFoodCat] = useState([])
    const { t } = useTranslation()
    const { featuredCategories } = useSelector((state) => state.storedData)
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }

    const FetchCategory = () => {
        let Categories = []
        featuredCategories?.map((data)=> {
            Categories.push({'name':data?.name,'value':data?.name,'link': `/category/${data.id}`})
        })
        
        setFoodCat(Categories)
        // console.log("ghfghjdsd",Categories)
    }

    useEffect(()=> {
        FetchCategory()
    },[])


    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isXSmall = useMediaQuery(theme.breakpoints.down('md'))
    const businessLogo = global?.logo
    return (
        <CustomStackFullWidth alignItems="center" py="3rem">
            <CustomContainer>
                <div className="d-lg-block d-none footer_responsive">
                    <Grid
                        container
                        spacing={{ xs: 2, md: 4 }}
                        justifyContent="space-between"
                    >
                        <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                            // align={isSmall && 'center'}
                        >
                            <CustomStackFullWidth
                                spacing={4}
                                alignItems={{
                                    xs: 'center',
                                    sm: 'center',
                                    md: 'flex-start',
                                }}
                                // justifyContent="flex-start"
                            >
                                <Link href={zoneid ? '/home' : '/'}>
                                    <LogoSide
                                        global={global}
                                        businessLogo={businessLogo}
                                        className="mb-3"
                                    />
                                </Link>


                                <div className="">
                                    <CustomColouredTypography
                                        fontsize={isXSmall ? '14px' : '14px'}
                                        color="whiteContainer.main"
                                        sx={{
                                            // cursor: 'pointer',
                                            // '&:hover': {
                                            //     color: 'primary.main',
                                            // },
                                        }}
                                    >
                                        <span className="">
                                            {t(
                                                'Foodkart food is very homely. Their regular delivery even during the lockdown was a blessing. Their staff is very helpful.'
                                            )}
                                        </span>
                                    </CustomColouredTypography> 
                                </div>
                                
                                {/* <AppLinks
                                global={global}
                                landing_page_links={landingPageLink}
                                width="140px"
                            /> */}
                            </CustomStackFullWidth>

                            

                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                            // align={isSmall && 'center'}
                        >
                            <RouteLinks
                                token={token}
                                global={global}
                                title="Quick Links"
                                RouteLinksData={QuickLinkData}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                            // align={isSmall && 'center'}
                        >
                            <RouteLinks
                                token={token}
                                global={global}
                                title={'Useful Links'}
                                RouteLinksData={QuickLinkData1}
                            />
                        </Grid>

                        {/* <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                            align={isSmall && 'center'}
                        >
                            <RouteLinks
                                token={token}
                                global={global}
                                title="Food Category"
                                // RouteLinksData={foogcat}
                                RouteLinksData={QuickLinkData3}
                            />
                        </Grid> */}

                        <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                            // align={isSmall && 'center'}
                        >
                            <RouteLinks
                                token={token}
                                global={global}
                                title="Connect"
                                RouteLinksData={[]}
                            />
                            <div className="d-flex justify-content-start align-items-center mt-3 mb-3 d-none">
                                <div
                                    className="social_media cursor-pointer"
                                    onClick={() =>
                                        window.open('https://www.facebook.com/')
                                    }
                                >
                                    <img
                                        src="/static/images/Icons/1.png"
                                        className="w-100"
                                    />
                                </div>
                                <div
                                    className="social_media ms-2 cursor-pointer"
                                    onClick={() =>
                                        window.open(
                                            'https://www.instagram.com/'
                                        )
                                    }
                                >
                                    <img
                                        src="/static/images/Icons/2.png"
                                        className="w-100"
                                    />
                                </div>
                                <div
                                    className="social_media ms-2 cursor-pointer"
                                    onClick={() =>
                                        window.open('https://www.linkedin.com/')
                                    }
                                >
                                    <img
                                        src="/static/images/Icons/3.png"
                                        className="w-100"
                                    />
                                </div>
                                <div
                                    className="social_media ms-2 cursor-pointer"
                                    onClick={() =>
                                        window.open('https://www.youtube.com/')
                                    }
                                >
                                    <img
                                        src="/static/images/Icons/4.png"
                                        className="w-100"
                                    />
                                </div>
                            </div>
                            <div className='mt-3 mb-3'>
                                <ContactInfo global={global} />
                            </div>
                            <SocialLinks global={global} />
                            
                            
                        </Grid>
                    </Grid>
                </div>
                <div className="foot_acc d-lg-none d-block ">
                    <div className="ms-3">
                        <Link href={zoneid ? '/home' : '/'}>
                            <LogoSide
                                global={global}
                                businessLogo={businessLogo}
                            />
                        </Link>
                    </div>

                    <div className="accordion mt-4" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                >
                                    FootKart
                                </button>
                            </h2>
                            <div
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <div className="">
                                        <CustomColouredTypography
                                            fontsize={isXSmall ? '14px' : '14px'}
                                            color="whiteContainer.main"
                                            sx={{
                                                // cursor: 'pointer',
                                                // '&:hover': {
                                                //     color: 'primary.main',
                                                // },
                                            }}
                                        >
                                            <span className="">
                                                {t(
                                                    'Foodkart food is very homely. Their regular delivery even during the lockdown was a blessing. Their staff is very helpful.'
                                                )}
                                            </span>
                                        </CustomColouredTypography> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    Quick Links
                                </button>
                            </h2>
                            <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <RouteLinks
                                        token={token}
                                        global={global}
                                        title="Quick Links"
                                        RouteLinksData={QuickLinkData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                >
                                    Meals Plan
                                </button>
                            </h2>
                            <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <RouteLinks
                                        token={token}
                                        global={global}
                                        title={'Meals Plan'}
                                        RouteLinksData={QuickLinkData1}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFour">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFour"
                                    aria-expanded="false"
                                    aria-controls="collapseFour"
                                >
                                    Food Category
                                </button>
                            </h2>
                            <div
                                id="collapseFour"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingFour"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <RouteLinks
                                        token={token}
                                        global={global}
                                        title="Food Category"
                                        RouteLinksData={QuickLinkData3}
                                        // RouteLinksData={foogcat}
                                    />  
                                </div>
                            </div>
                        </div> */}

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFive">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFive"
                                    aria-expanded="false"
                                    aria-controls="collapseFive"
                                >
                                    Connect
                                </button>
                            </h2>
                            <div
                                id="collapseFive"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingFive"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                            <div className=' mb-3'>
                                <ContactInfo global={global} />
                            
                            </div>
                            <SocialLinks global={global} />
                                    {/* <RouteLinks
                                        token={token}
                                        global={global}
                                        title="Connect"
                                        RouteLinksData={OtherData}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomContainer>
        </CustomStackFullWidth>
    )
}

FooterMiddle.propTypes = {}

export default FooterMiddle
