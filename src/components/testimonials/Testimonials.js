import React,{useState,useEffect} from 'react'
import CustomContainer from "../container";
import {CustomPaperBigCard} from "../../styled-components/CustomStyles.style";
import { Container, CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import {CoustomerApi} from '../../hooks/react-query/config/customerApi'
import { useQuery } from 'react-query'
import { onSingleErrorResponse } from '../ErrorResponse';



export default function Testimonials() {


    const { data:testimonial, refetch, isFetching } = useQuery(
        ['testimonails'],
        CoustomerApi.testimonials,
        {
            onError: onSingleErrorResponse,
        }
    )



  return (
  <CssBaseline>
        <section className='mb-4'>
        <div className='menu_bg2 position-relative '>
        <img src='/static/images/Banner/banner_test.png' className='w-100' />
        <CustomContainer>
        <div className='position-absolute translate-middle top-50 '>
            {/* <h4 className='fade-in fw-bold'>Where Every meal is cooked with <span className='text_color'>love</span></h4> */}
            <h4 className='fade-in fw-bold'>Testimonial</h4>
        </div>
        </CustomContainer>
        </div>
     </section>

     <section>
     <CustomContainer>
     <div className='d-flex justify-content-center mt-5 mb-3'>
     <div className='text-center mb-4'>
                <h5 className='mb-2'>Thank you for all the love</h5>
                    <h4 className='fw-bold'>We value your heartfelt testimonials.</h4>
                </div>
            </div>

                <section className='mb-4'>
                    <div className='row'>
                        {
                            testimonial?.data?.data?.map((data,index)=> (
                            <div className='col-lg-4 col-md-4 col-sm-6 mb-4' key={index}>
                            <div className="Testimonils_card">
                                        <div className="">
                                            <div className="mb-3 d-flex justify-content-center">
                                            <div className=''>
                                                <img
                                                    src="/static/images/quote_.png"
                                                    className="quates_img"
                                                />
                                            </div>
                                            
                                            </div>
                                            <div className="text-center">
                                                <p className="comlplete_3">
                                                    {data?.des}
                                                </p>
                                            </div>
                                            <div className='text-center mb-3'>
                                                <img
                                                    src={data?.image}
                                                    className="testimonial_img rounded-circle" 
                                                    onError={(e)=> e.currentTarget.src = "/static/images/No_Image.jpg"}
                                                />
                                            </div>
                                            <h4 className="text-center comlplete_1">{data?.title}</h4>
                                            
                                        </div>
                                    </div>
                            </div>
                            ))
                        }
                        
                        {/* <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                        <div className="Testimonils_card">
                                    <div className="">
                                        <h4 className="comlplete_1">
                                            Anita,T Nagar
                                        </h4>
                                        <div className="mb-3 mt-3">
                                            <img
                                                src="/static/images/quote_.png"
                                                className="quates_img"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="comlplete_3">
                                                Cooking was becoming tough
                                                everyday, and I ended up eating
                                                stale food. Now I'm eating fresh
                                                food everyday :
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                        <div className="Testimonils_card">
                                    <div className="">
                                        <h4 className="comlplete_1">
                                            vivek Dutta, Velachery
                                        </h4>
                                        <div className="mb-3 mt-3">
                                            <img
                                                src="/static/images/quote_.png"
                                                className="quates_img"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="comlplete_3">
                                                I was looking for a tiffin
                                                service that would provide fresh
                                                meals to my office. Not just
                                                fresh, the food from YOYO is
                                                healthy with lots of vegetables.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                        <div className="Testimonils_card">
                                    <div className="">
                                        <h4 className="comlplete_1">
                                            vivek Dutta, Velachery
                                        </h4>
                                        <div className="mb-3 mt-3">
                                            <img
                                                src="/static/images/quote_.png"
                                                className="quates_img"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="comlplete_3">
                                                I was looking for a tiffin
                                                service that would provide fresh
                                                meals to my office. Not just
                                                fresh, the food from YOYO is
                                                healthy with lots of vegetables.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                        <div className="Testimonils_card">
                                    <div className="">
                                        <h4 className="comlplete_1">Kanaga</h4>
                                        <div className="mb-3 mt-3">
                                            <img
                                                src="/static/images/quote_.png"
                                                className="quates_img"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="comlplete_3">
                                                Foodkart food is very homely.
                                                Their regular delivery even
                                                during the lockdown was a
                                                blessing. Their staff is very
                                                helpful.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        
                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                        <div className="Testimonils_card">
                                    <div className="">
                                        <h4 className="comlplete_1">
                                            Anita,T Nagar
                                        </h4>
                                        <div className="mb-3 mt-3">
                                            <img
                                                src="/static/images/quote_.png"
                                                className="quates_img"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="comlplete_3">
                                                Cooking was becoming tough
                                                everyday, and I ended up eating
                                                stale food. Now I'm eating fresh
                                                food everyday :
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                        <div className="Testimonils_card">
                                    <div className="">
                                        <h4 className="comlplete_1">
                                            vivek Dutta, Velachery
                                        </h4>
                                        <div className="mb-3 mt-3">
                                            <img
                                                src="/static/images/quote_.png"
                                                className="quates_img"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="comlplete_3">
                                                I was looking for a tiffin
                                                service that would provide fresh
                                                meals to my office. Not just
                                                fresh, the food from YOYO is
                                                healthy with lots of vegetables.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                        <div className="Testimonils_card">
                                    <div className="">
                                        <h4 className="comlplete_1">
                                            vivek Dutta, Velachery
                                        </h4>
                                        <div className="mb-3 mt-3">
                                            <img
                                                src="/static/images/quote_.png"
                                                className="quates_img"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="comlplete_3">
                                                I was looking for a tiffin
                                                service that would provide fresh
                                                meals to my office. Not just
                                                fresh, the food from YOYO is
                                                healthy with lots of vegetables.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        </div> */}
                    </div>
                </section>
     </CustomContainer>
     </section>
  </CssBaseline>
  )
}
