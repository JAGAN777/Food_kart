import React,{useState,useRef} from 'react';
import { CssBaseline, Container } from '@mui/material';
import AboutUsPage from "./AboutUsPage";
import CustomContainer from "../container";
import {ConfigApi} from "../../hooks/react-query/config/useConfig";
import Slider from 'react-slick'
import { HandleNext, HandlePrev } from '../../components/CustomSliderIcon'
import { useTranslation } from 'react-i18next'
import { CoustomerApi } from '../../hooks/react-query/config/customerApi';
import { onSingleErrorResponse } from '../ErrorResponse';
import { useQuery } from 'react-query'
import { usePostNewsletterEmail } from '../../hooks/react-query/newsletter/usePostNewsletterEmail'
import { toast } from 'react-hot-toast'







const AboutUs = ({configData}) => {
    const { t } = useTranslation()
    const [hoverOn, setHoverOn] = useState(true)
    const [emailAddress, setEmailAddress] = useState(null)
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
                    onError: onSingleErrorResponse,
                }
            )
        } else {
            toast.error(t('Please insert a valid email.'))
        }

        event.preventDefault()
    }

    const sliderRef = useRef(null)

    const settings2 = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        infinite: false,
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
                    // dots: true
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

    const { data:testimonial, refetch, } = useQuery(
        ['testimonails'],
        CoustomerApi.testimonials,
        {
            onError: onSingleErrorResponse,
        }
    )

    return (
    <>
    <CssBaseline>
    <section className='mb-5'>
        <div className='menu_bg2 position-relative '>
        <img src='/static/images/Banner/banner_about.png' className='w-100' />
        <CustomContainer>
        <div className='position-absolute translate-middle top-50 '>
            {/* <h4 className='fade-in fw-bold'>Where Every meal is cooked with <span className='text_color'>love</span></h4> */}
            <h4 className='fade-in fw-bold fs-2'>About Us</h4>
        </div>
        </CustomContainer>
        </div>
     </section>

     <section className='mb-4 About_Us'>
     <CustomContainer>
     <div className=" people_say ">
                            <div className="row align-items-center">
                            <div className="col-md-6 mb-3">
                                    <div className="">
                                        <img
                                            src="/static/images/About Us/Chef.png"
                                            className="w-100"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                        <div className='d-flex justify-content-center'>
                                        <div className="">
                                            <h4 className="mb-3 fw-bold fon_reduce">
                                            How Do Things Work In Our Kitchens?
                                            </h4>
                                            <p className="">
                                            The food in our kitchens is made with the highest standard of quality and cleanliness. We understand the value of your trust, therefore our cooking stations go through rigorous cleaning everyday.
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
     </CustomContainer>
     </section>


     <section className='mb-5'>
        <CustomContainer>
        <div className='d-flex justify-content-center mt-5 mb-3'>
                <div className='text-center mb-4'>
                <h5 className='mb-2 fw-bold'>Our current journey</h5>
                    <h4 className='fw-bold fs-3'>Favourite home-cooked meal</h4>
                </div>
        </div>

        <div className='row justify-content-center'>
            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                <div className='cooked_meal d-flex justify-content-center'>
                    <div className='text-center'>
                        <div className='mb-3'>
                            <img  src="/static/images/About Us/_1.png" />
                        </div>
                        <div className=''>
                            <h5 className='comlplete_2'>4.5+ Rating on taste</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                <div className='cooked_meal d-flex justify-content-center'>
                    <div className='text-center'>
                        <div className='mb-3'>
                            <img  src="/static/images/About Us/_2.png" />
                        </div>
                        <div className=''>
                            <h5 className='comlplete_2'>We now have 39+ kitchens</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                <div className='cooked_meal d-flex justify-content-center'>
                    <div className='text-center'>
                        <div className='mb-3'>
                            <img  src="/static/images/About Us/_3.png" />
                        </div>
                        <div className=''>
                            <h5 className='comlplete_2'>19 lakh+ happy consumers</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                <div className='cooked_meal d-flex justify-content-center'>
                    <div className='text-center'>
                        <div className='mb-3'>
                            <img  src="/static/images/About Us/_4.png" />
                        </div>
                        <div className=''>
                            <h5 className='comlplete_2'>Delivered 92 lakh+ on time</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </CustomContainer>
     </section>

     <section className='mb-4 About_Us '>
        <CustomContainer>
     <div className=" people_say mb-3">
                            <div className="row align-items-center">
                                <div className="col-md-6 text-md-start text-center">
                                    <div className="">
                                        <div className="mb-3">
                                            <h4 className="mb-3 fw-bold">
                                            To Provide Homely And Hygienic
                                            Food At An Affordable Price
                                            </h4>
                                            <p className="comlplete_3">
                                            We promise to provide healthy, hygienic food at the most affordable price point at your doorstep and make this available to as many people as possible.
                                            </p>
                                        </div>
                                        <div className="">
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src="/static/images/About Us/1.png"
                                                        className="me-2 icon"
                                                    />{' '}
                                                    Easy & Convenient
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src="/static/images/About Us/2.png"
                                                        className="me-2 icon"
                                                    />{' '}
                                                    No Commitment
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src="/static/images/About Us/3.png"
                                                        className="me-2 icon"
                                                    />{' '}
                                                    Fresh and Affordable
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src="/static/images/About Us/4.png"
                                                        className="me-2 icon"
                                                    />{' '}
                                                    Most 5-start reviews
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className=" d-flex justify-content-end ">
                                        <img
                                            src="/static/images/About Us/3_Delivery.png"
                                            className="w-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
        </CustomContainer>
        </section>    


         <section className="mb-4 testimonal position-relative ">
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
                    <div className="testimonal_peo ">
                        <div className="d-flex justify-content-center mb-3">
                          { testimonial?.data?.data?.length > 0 &&
                          <div className="text-center">
                          <h5 className="mb-2"> {t('Testimonials')}</h5>
                          <h4 className="fw-bold">
                              {t('What people say ?')}
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

    <section className='mb-5'>
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
        <h4 className='text-light comlplete_1'>{t('Stay fresh, stay updated')}</h4>
        </div>
        <div className=''>
            <p className='text-light fw-light'>{t('Receive Latest News, Updates and Many Other News Every Week.')}</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='d-flex justify-content-between align-items-center foot_text'>
            <div className='d-flex'>
            <img src='/static/images/Icons/_-18.png' className='teleTextImg' />
            <input type='text' placeholder='Enter Your Email Address' onChange={(e) => setEmailAddress(e.target.value) } className='form-control border-0 ms-2' />
            </div>
            <div className=''>
                <button type='submit' className='btn btn_Sub2' >Subscribe</button>
            </div>
        </div>
        </form>
        </div>
    </div>
    </div>
    </CustomContainer>
</section>  
     
     </CssBaseline>
        
    </>
    );
};

export default AboutUs;
