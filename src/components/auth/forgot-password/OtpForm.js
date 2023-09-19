import React, { useRef,useState } from 'react'
import { Box, Stack, Typography, TextField } from '@mui/material'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
    StyledInputBase,
} from '../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import OutlinedInput from '@mui/material/OutlinedInput'
import LoadingButton from '@mui/lab/LoadingButton'
import { useOtp } from '../../../hooks/react-query/config/forgot-password/useOtp'
import * as Yup from 'yup'
import OtpInput from 'react-otp-input';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const OtpForm = ({ data, formSubmitHandler, isLoading }) => {
    const { t } = useTranslation()
    const [otp, setOtp] = useState('');
    const otpFormik = useFormik({
        //here reset_token is otp inputs
        initialValues: {
            reset_token: otp,
            phone: data?.phone,
        },
        
        validationSchema: Yup.object({
            // reset_token: Yup.string().required(t('field is empty')),
        }),
        onSubmit: async (values) => {
            try {
                let data2 = {
                    'reset_token': otp,
                    'otp':otp,
                    'phone': data?.phone, 
                }
                formSubmitHandler(data2)
            } catch (err) {}
        },
    })

    return (
        <CustomPaperBigCard width="auto" noboxshadow="true">
            <CustomStackFullWidth>
                <div className='d-flex align-items-center mb-4'>
                    <div className=''>
                        <ArrowBackIosIcon color={'#e01d57'} />
                    </div>
                    <div className=''>
                        <h4>Enter OTP</h4>
                    </div>
                </div>
                <Stack alignItems="center" justifyContent="center" className='mb-4'>
                    <Typography>
                        {t('Enter the verification code (OTP) sent to')}
                        {/* {t('Please enter the code we just sent to ')} {data?.phone}  {t(' to procced')} */}
                    </Typography>
                    <Typography>{data?.phone}</Typography> 
                </Stack>

                <form noValidate onSubmit={otpFormik.handleSubmit}>
                    <Stack
                        mt="2rem"
                        padding="0 20px"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {/* <StyledInputBase
                            // inputRef={input => input && input.focus()}
                            inputProps={{ maxLength: 4 }}
                            width="100px"
                            onChange={otpFormik.handleChange}
                            value={otpFormik.values.reset_token}
                            name="reset_token"
                            error={
                                otpFormik.touched.reset_token &&
                                Boolean(otpFormik.errors.reset_token)
                            }
                            helperText={
                                otpFormik.touched.reset_token &&
                                otpFormik.errors.reset_token
                            }
                            touched={otpFormik.touched.reset_token}
                            required
                        /> */}
                            {/* <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                // renderSeparator={<span> </span>}
                                renderInput={(props) => <input {...props} />}
                                /> */}
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                // value={otpFormik.values.reset_token}
                                                // onChange={otpFormik.handleChange}
                                                numInputs={4}
                                                // name="reset_token"                                                
                                                renderSeparator={<span className='px-3'></span>}
                                                renderInput={(props) => {
                                                    delete props.style;
                                                    delete props.className;
                                                    return(
                                                <input className='text-center fs-5 opt_formInput mb-4' {...props} />
                                                )}}
                                                />

                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                        >
                            {t('Confirm')}
                        </LoadingButton>
                    </Stack>
                </form>
            </CustomStackFullWidth>
        </CustomPaperBigCard>
    )
}
export default OtpForm
