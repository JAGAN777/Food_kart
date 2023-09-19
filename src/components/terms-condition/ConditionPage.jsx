import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { StyleThemBox } from '../food-card/FoodCard.style'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import CustomContainer from '../container';


const ConditionPage = ({ configData }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    return (
        <Box sx={{ marginTop: { xs: '80px', md: '150px' } }}>
            <Grid  item md={12} xs={12} spacing={3}>
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
                        {t('Terms and conditions')}
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
                                       Our Terms and conditions
                                    </h4>
                                </div>
                            </CustomContainer>
                        </div>
                    </section>
                </Grid>
                <Grid item md={12} xs={12} sx={{ paddingBottom: '50px' }}>
                    {
                        configData?.terms_and_conditions ? 
                    <StyleThemBox>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: configData?.terms_and_conditions,
                            }}
                        ></div>
                    </StyleThemBox> : 
                     <section className=''>
                         <CustomContainer>
                            <div className='mb-4'>
                                <h4 className='fw-bold fs-3'>Terms Of Use</h4>
                            </div>

                            <div className=''>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>1. Mai Type on Plan once and cant be changed to any other pian For og Healthy Eco meal selected cant be changed to Hocitry Mini meal or Join Executive Meal</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>2. Meal duration once salected cant be changed. For eg Monthly Order cant be changed to 3 monthly or weekly order</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>3. Lunch meals cant be changed to Dinner meals and vice versa</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>4. 6 Day meals selected cont be delivered on Saturdays.</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>5. All concallations should be communicated a day prior on Online on the Website directly or by SMS/WhatsApp as mentioned in the Cancelation Page</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>6. 8.1 Monthly subscription includes 20/24 meals and wook subscription includes 6/6 mools, which can be serviced from Monday-Friday Or Monday-Saturday, as per your working cycle.</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>7. Any communication regarding happycrubs ardor/complaints/ananges/Cancellations ato, noads to be done through customar cara only and no correspondence or verbal communication to dobbawala or any other agent shall be valid</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>8. All the Payments of the Tiffin and Delivery Charges are to be paid prior to the Commencement of Tiffin's on our Website using Credit/Debit Cord, Notbanking or to our A/C No by NEFTAMPS/Cheque/Cash Deposit in account</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>9. In case of any non-payment or defoult happy@rub reserves the right of canceling/holding the tiffin</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>10. All the grievances/suggestions/recommendations should be mailed at contact@happygrubin</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>11. Under the force majeure clause & unavoidable circumstances such as riots strikes Dabbaivals going on annual leave ste: may not be possible to cover the riffin mas However, we will try to inform you in advance, it passes Titinnalline corry forward to the next working doto with prior intimation</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>12. in case of any cancelation we must get the communication as mentioned in the Cancellation Section</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>13. No Tiffin Serving on the following days: Bundays and a low government holidays. You will be notified prior to any changes in delivery schedules. All meae cancelled by us will be carry forwarded automatically</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>14. Delivery timing: Lunch will be delivered between 11am to 1:30 pm and dinner will be delivered between 5:00 pm to 8 pm</h6>
                                <h6 className='text-muted fw-normal lh-lg mb-4 comlplete_4'>15. We reserve the right to refuse service to any customer as per our discretion.</h6>

                            </div>
                         </CustomContainer>
                     </section>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default ConditionPage
