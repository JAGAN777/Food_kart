import React,{useState,useEffect} from 'react'
import CustomContainer from "../container";
import {CustomPaperBigCard} from "../../styled-components/CustomStyles.style";
import { Container, CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi';
import { useFormik } from "formik";
import toast from 'react-hot-toast'
import * as Yup from "yup";




export default function ContactUs() {

    const { global } = useSelector((state) => state.globalSettings)
    const [canHelp,setCanHelp] = useState('Delivery')
    const { t } = useTranslation()

    const initialValues = {
        name : "",
        email : "",
        address:"",
        phone : "",
        feedback : "",
        how_can_help : ""
      };


      const ContactValildation = Yup.object().shape({
        email: Yup.string().email()
        .required("Email is required"),
        name: Yup.string()
        .required('name is required'),
        phone : Yup.string().min(7).max(10).required('mobile number is required'),
        feedback:Yup.string().required('feedback is required'),
        address:Yup.string()
      });

      const formik = useFormik({
        initialValues,
        validationSchema:ContactValildation,
        onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
          try {

            let body = {
                name : values.name,
                email : values.email,
                address : values.address,
                phone : values.phone,
                feedback : values.feedback,
                how_can_help : canHelp
            }

          const respose =  await RestaurantsApi.ContactApi(body)
          toast.success('Contact Saved')
          resetForm()
          }catch(error){
            console.error(error);
            setStatus("The details is incorrect");
            setSubmitting(false);
          }
        }})


    

  return (
    <CssBaseline>
        <section className='mb-5'>
        <div className='menu_bg2 position-relative '>
        <img src='/static/images/Banner/banner_contact.png' className='w-100' />
        <CustomContainer>
        <div className='position-absolute translate-middle top-50 '>
            {/* <h4 className='fade-in fw-bold'>Where Every meal is cooked with <span className='text_color'>love</span></h4> */}
            <h4 className='fade-in fw-bold fs-3'>Contact Us</h4>
        </div>
        </CustomContainer>
        </div>
     </section>

     <section className='mb-5'>
     <CustomContainer>
        <div className='row justify-content-center'>
            <div className='col-md-6 mb-3'>
                <div className='col-sm-6 mt-4 d-none'>
                    <div className='mb-5 con'>
                       <div className='mb-3'>
                       <h5>{t('From our kitchen to yours, with love')}</h5>
                       </div>
                    </div>

                    <div className='mb-3'>
                        <h6>{t('Call us')}</h6>
                        <div className='mt-3'>
                            <h5 className='text_color'><a className='text-reset text-decoration-none'  href={`tel:+91${global?.phone}`}>{global?.phone}</a></h5>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <h6>{t('Mail us')}</h6>
                        <div className='mt-3'>
                            <h5 className='text_color'><a className='text-reset text-decoration-none' href={`mailto:${global?.email}?subject=Subject&body=message%20goes%20here`}>{global?.email}</a></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-sm-10 px-lg-4'>
                <div className='row p-0 mb-5'>
                    <di className='col-md-4 mb-md-0 mb-4'>
                        <div className='con_callUs d-flex justify-content-center align-items-center'>
                            <div >
                            <div className='mb-3  d-flex justify-content-center align-items-center'>
                                <div className='icon '>
                                    <img src='/static/images/Icons/_-19.png' className='w-100'></img>
                                </div>
                            </div>
                            <div className='text-center'>
                                    <h5 className='mb-3 text_color contact_text'>{t('Phone')}</h5>
                                    <h5 className=''><a className='text-reset text-decoration-none'  href={`tel:+91${global?.phone}`}>{global?.phone}</a></h5>
                                </div>
                        </div>
                            </div>
                    </di>
                    <di className='col-md-4 mb-md-0 mb-4 '>
                        <div className='con_callUs d-flex justify-content-center align-items-center'>
                            <div >
                            <div className='mb-3  d-flex justify-content-center align-items-center'>
                                <div className='icon '>
                                    <img src='/static/images/Icons/_-20.png' className='w-100'></img>
                                </div>
                            </div>
                            <div className='text-center'>
                                    <h5 className='mb-3 text_color contact_text'>{t('Mail')}</h5>
                                    <h5 className=''><a className='text-reset text-decoration-none' href={`mailto:${global?.email}?subject=Subject&body=message%20goes%20here`}>{global?.email}</a></h5>
                                </div>
                        </div>
                            </div>
                    </di>
                    <di className='col-md-4 mb-md-0 mb-3 '>
                        <div className='con_callUs d-flex justify-content-center align-items-center'>
                            <div >
                            <div className='mb-3  d-flex justify-content-center align-items-center'>
                                <div className='icon '>
                                    <img src='/static/images/Icons/_-21.png' className='w-100'></img>
                                </div>
                            </div>
                            <div className='text-center'>
                                    <h5 className='mb-3 text_color contact_text'>{t('Address')}</h5>
                                    <h5 className=''>{global?.address}</h5>
                                </div>
                        </div>
                            </div>
                    </di>
                </div>
                <div className='Contact_card'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='row'>
                            <div className='col-md-4 mb-4'>
                                <div className=''>
                                    <label className='form-label'>{t('Full Name')}</label>
                                    <input type='text' className='form-control'  {...formik.getFieldProps("name")} placeholder={t('Enter Your Name')} />
                                </div>
                                {formik.touched.name && formik.errors.name && (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">
                                        <span role="alert" className="text-danger">
                                            {formik.errors.name}
                                        </span>
                                        </div>
                                    </div>
                                    )}
                            </div>
                            <div className='col-md-4 mb-4'>
                                <div className=''>
                                    <label className='form-label'>{t('Email Address')}</label>
                                    <input type='text' className='form-control'   {...formik.getFieldProps("email")} placeholder={t('Enter Your Mail Address')} />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">
                                        <span role="alert" className="text-danger">
                                            {formik.errors.email}
                                        </span>
                                        </div>
                                    </div>
                                    )}                          
                                      </div>

                            <div className='col-md-4 mb-4'>
                                <div className=''>
                                    <label className='form-label'>{t('Phone Number')}</label>
                                  <div className='row'>
                                    <div className='col-2 pe-0 d-none'>
                                    <select className='form-select'>
                                        <option>+91</option>
                                        <option>+71</option>
                                    </select>
                                    </div>
                                  <div className='col-12'>
                                  <input type='text' className='form-control' {...formik.getFieldProps("phone")} placeholder={t('Enter Your Mobile Number')} />
                                  </div>
                                  {formik.touched.phone && formik.errors.phone && (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">
                                        <span role="alert" className="text-danger">
                                            {formik.errors.phone}
                                        </span>
                                        </div>
                                    </div>
                                    )}
                                  </div>
                                </div>
                            </div>
                            <div className='col-md-12 mb-4'>
                                <div className=''>
                                    <label className='form-label'>{t('Address')}</label>
                                    <textarea type='text' className='form-control'   {...formik.getFieldProps("address")} rows={3} />
                                </div>
                                {formik.touched.address && formik.errors.address && (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">
                                        <span role="alert" className="text-danger">
                                            {formik.errors.address}
                                        </span>
                                        </div>
                                    </div>
                                    )}                          
                                      </div>
                            <div className='col-md-12 mb-4 d-none'>
                            <label className='form-label'>How can help you</label>
                            <div >
                            <div class="form-check form-check-inline" onClick={()=>setCanHelp('Delivery')}>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label class="form-check-label" for="inlineRadio1">Delivery</label>
                                </div>
                                <div class="form-check form-check-inline"  onClick={()=>setCanHelp('Cook')}>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label class="form-check-label" for="inlineRadio2">Cook</label>
                                </div>
                                <div class="form-check form-check-inline"  onClick={()=>setCanHelp('Food')}>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                <label class="form-check-label" for="inlineRadio3">Food</label>
                                </div>
                            </div>
                            {/* {formik.touched.password && formik.errors.password && (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">
                                        <span role="alert" className="text-danger">
                                            {formik.errors.password}
                                        </span>
                                        </div>
                                    </div>
                                    )} */}
                            </div>
                            <div className='col-md-12 mb-4'>
                                <div className=''>
                                <label className='form-label'>How can help you</label>
                                    <textarea type='text' className='form-control'  {...formik.getFieldProps("feedback")} placeholder='Give you Feed back your mind..' rows={3} />
                                </div>
                                {formik.touched.feedback && formik.errors.feedback && (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">
                                        <span role="alert" className="text-danger">
                                            {formik.errors.feedback}
                                        </span>
                                        </div>
                                    </div>
                                    )}
                            </div>
                            <div className=''>
                                <button type='submit' className='btn btn_sub px-5'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     </CustomContainer>
     </section>

     </CssBaseline>

  )
}
