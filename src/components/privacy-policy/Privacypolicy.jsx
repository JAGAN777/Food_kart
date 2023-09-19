import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import img from '../../../public/static/Privacy/RectangleP.png'
import { StyleThemBox } from '../food-card/FoodCard.style'
import { t } from 'i18next'
import { useTheme } from '@mui/material/styles'
import CustomContainer from '../container'
import { useTranslation } from 'react-i18next'


const Privacypolicy = ({ configData }) => {
    const { t } = useTranslation()

    const theme = useTheme()
    return (
        <Box sx={{ marginTop: { xs: '80px', md: '150px' } }}>
            <Grid item md={12} xs={12} spacing={3}>
                <Grid
                    item
                    md={12}
                    xs={12}
                    alignItems="center"
                    justifyContent="center"
                >
                    {/* <Typography
                        textAlign="center"
                        fontWeight="700"
                        variant="h2"
                        color={theme.palette.neutral[1000]}
                    >
                        {t('Privacy Policy')}
                    </Typography> */}
                    <section className="mb-5">
                        <div className="menu_bg2 position-relative ">
                            <img
                                src="/static/images/Banner/terms_banners.png"
                                className="w-100"
                            />
                            <CustomContainer>
                                <div className="position-absolute translate-middle top-50 ">
                                    {/* <h4 className='fade-in fw-bold'>Where Every meal is cooked with <span className='text_color'>love</span></h4> */}
                                    <h4 className="fade-in fw-bold fs-2 ">
                                      {t('Our Policies')}
                                    </h4>
                                </div>
                            </CustomContainer>
                        </div>
                    </section>
                </Grid>
                <Grid item md={12} xs={12} sx={{ paddingBottom: '50px' }}>
                    {
                        configData?.privacy_policy ? 
                    <StyleThemBox>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: configData?.privacy_policy,
                            }}
                        ></div>
                    </StyleThemBox> : 
                                         <section className=''>
                                         <CustomContainer>
                                            <div className='mb-4'>
                                                <h4 className='fw-bold fs-3'>{t('Our Privacy Policy')}</h4>
                                            </div>
                
                                            <div className=''>
                                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>Foodkart collects information with utmost respect to your security and privacy</h6>

                                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>When you browse our website without providing any of your personal information, we do collect and store some trace information of your visit. We koop record of the kind of browser and operating system you use, your IP address, the date and time of your viewing our website, the pages you visited and if you came to our website using a link from another website. This information is only for our records and does not identify you personally and will not be linked back to you. How do we use the information we gather and do we share it?</h6>

                                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>Foodkartin have a stringent policy of never sharing your personal data unless you authorise us to do so. The information we collect at the time of subscription will be used by us to process your order. We will of course take your permission when we run studies on customer foodback and food behaviour research: however this is done to help us serve you better. happygrub.in categorically does not sell, trade or rent your personal information to third parties for any reason whatsoever.</h6>

                                                <div className='mb-3'>
                                                <h4 className='fw-bold lh-base fs-3'>How secure is your data with us?</h4>
                                                </div>

                                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>Foodkart.in is committed to safeguarding your privacy using the best security standards and procedures known to us and we always comply with applicable privacy laws. Our website runs on a robust combination of industry-approved physical, electronic and procedural security systems to ensure that your information is well protected within our infrastructure.</h6>
                                            </div>
                                         </CustomContainer>
                                     </section>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default Privacypolicy
