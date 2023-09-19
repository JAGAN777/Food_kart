import React, { useState, useEffect } from 'react'
import CustomContainer from '../container'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import { Container, CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import { Grid } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import { Button, IconButton, Stack, Typography, Tab, Tabs } from '@mui/material'
import { useFormik } from 'formik'
import moment from 'moment'
import { useQuery } from 'react-query'
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {OrderApi} from "../../hooks/react-query/config/orderApi";
import { AddressApi } from '../../hooks/react-query/config/addressApi'
import { onSingleErrorResponse } from '../ErrorResponse'
import OrderDetails from '../order-details/OrderDetails'
import CheckOut from '../checkout-page/CheckOut'
import { useDispatch } from 'react-redux'
import { setCart, setClearCart } from '../../redux/slices/cart'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import {
    calculateItemBasePrice,
    getAmount,
    getConvertDiscount,
    handleBadge,
    isAvailable,
} from '../../utils/customFunctions'





export default function GetSubcription() {
    const { t } = useTranslation()
    const [selected, setSelected] = useState(0)
    const [deliveryType, setDeliveryType] = useState(0)
    const [selectPlan,setSelectPlan] = useState()
    const [value2, setValue2] = useState('1')
    const [address,setAddress] = useState([])
    const [addAddress,setAddaddress] = useState(false)
    const handleChange2 = (event, newValue) => {
        setValue2(newValue ?? event.target.value)
    }
    const dispatch = useDispatch()
    const router = useRouter()
    const { data:addressList, refetch, isFetching } = useQuery(
        ['address-list'],
        AddressApi.addressList,
        {
            onError: onSingleErrorResponse,
        }
    )


    const { userData } = useSelector((state) => state.user)

    // console.log("khgkhg",userData)

    useEffect(()=> {
        setAddress(addressList?.data?.addresses)
    },[addressList])

    const cartToSub = () => {
        dispatch(
            setCart({
                ...{
                    "id": 13,
                    "name": "BreakFast",
                    "description": "Idli and Sambar\r\nDosa\r\nPoha\r\nUpma\r\nParatha\r\nMasala Omelette\r\nAloo Puri\r\nUttapam\r\nMisal Pav",
                    "image": "http://foodkart.vrikshatech.in/storage/app/public/product/2023-07-06-64a6963c1fd51.png",
                    "category_id": 1,
                    "category_ids": "[{\"id\":\"1\",\"position\":1}]",
                    "variations": "[]",
                    "add_ons": "[]",
                    "attributes": "[]",
                    "choice_options": "[]",
                    "price": 599,
                    "tax": 0,
                    "tax_type": "percent",
                    "discount": 0,
                    "discount_type": "percent",
                    "available_time_starts": "01:00:00",
                    "available_time_ends": "23:00:00",
                    "veg": 1,
                    "status": 1,
                    "restaurant_id": null,
                    "created_at": "2023-07-06T08:36:35.000000Z",
                    "updated_at": "2023-07-06T10:23:56.000000Z",
                    "order_count": 0,
                    "avg_rating": 0,
                    "rating_count": 0,
                    "rating": null,
                    "recommended": 0,
                    "slug": "breakfast",
                    "sdate": "2023-07-01",
                    "edate": "2023-07-30",
                    "inbetween": "2023-07-01,2023-07-02,2023-07-03,2023-07-04,2023-07-05,2023-07-06,2023-07-07,2023-07-08,2023-07-09,2023-07-10,2023-07-11,2023-07-12,2023-07-13,2023-07-14,2023-07-15,2023-07-16,2023-07-17,2023-07-18,2023-07-19,2023-07-20,2023-07-21,2023-07-22,2023-07-23,2023-07-24,2023-07-25,2023-07-26,2023-07-27,2023-07-28,2023-07-29,2023-07-30",
                    "translations": [
                        {
                            "id": 22,
                            "translationable_type": "App\\Models\\Food",
                            "translationable_id": 13,
                            "locale": "en",
                            "key": "name",
                            "value": "BreakFast",
                            "created_at": null,
                            "updated_at": null
                        },
                        {
                            "id": 23,
                            "translationable_type": "App\\Models\\Food",
                            "translationable_id": 13,
                            "locale": "en",
                            "key": "description",
                            "value": "Idli and Sambar\r\nDosa\r\nPoha\r\nUpma\r\nParatha\r\nMasala Omelette\r\nAloo Puri\r\nUttapam\r\nMisal Pav",
                            "created_at": null,
                            "updated_at": null
                        }
                    ]
                },
                totalPrice:getConvertDiscount(
                    0,
                    'percent',
                    599,
                    0,
                   1,
                ),
                selectedAddons: [],
                quantity: 1,
                itemBasePrice:getConvertDiscount(
                   0,
                   'percent',
                   599,
                    0
                ),
            })
        )
        toast.success(t('Item added to cart'))
        // router.push({pathname:'/checkout',query:{page:'campaign'}})
    }

    const Subcription = () => {

        let body = {
            "cart": [
            //    {
            //       "food_id": 1,
            //       "item_campaign_id": null,
            //       "price": 0,
            //       "variant": "",
            //       "variations": [],
            //       "quantity": 1,
            //       "add_on_ids": [],
            //       "add_ons": [],
            //       "add_on_qtys": []
            //    }
            ],
            "coupon_discount_amount": 0,
            "coupon_discount_title": null,
            "order_amount": 163.35,
            "order_type": deliveryType == 0 ? 'delivery': deliveryType == 1 && 'Takeaway',
            "payment_method": "cash_on_delivery",
            "order_note": "",
            "coupon_code": null,
            "restaurant_id": 1,
            "distance": 8.119,
            "schedule_at": null,
            "discount_amount": 0.09,
            "tax_amount": 0.06,
            "address": address?.map(data => data?.address),
            "latitude": 13.038865,
            "longitude": 80.2167758,
            "contact_person_name": userData?.f_name,
            "contact_person_number": userData?.phone,
            "address_type": address?.map(data => data?.address_type),
            "road":address?.map(data => data?.road),
            "house": "",
            "floor": "",
            "dm_tips": "",
            "subscription_order": 1,
            "subscription_type": "daily",
            "subscription_days": [
               {
                  "day": "0",
                  "time": "16:20:00"
               }
            ],
            "subscription_quantity": 2,
            "subscription_start_at": formattedStartDate,
            "subscription_end_at": formattedEndDate
         }

        OrderApi.placeOrder(body).then(res => {
            // console.log("jgfghkjl",res.data)
        }).catch(err => {
            console.error("err",err.message)
        })
    }


    const { plans } = useSelector((state) => state.storedData)

    // console.log("jgfgkhfh",plans)

    const initialValues = {
        "meals":'',
        "title":'',
        "address":''
    }
    const [startDate,setStartDate] = useState()
    
    // const getCurrentDateInput = () => {

    //     const dateObj = new Date();
        
    //     // get the month in this format of 04, the same for months
    //     const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    //     const day = ("0" + dateObj.getDate()).slice(-2);
    //     const year = dateObj.getFullYear();
        
    //     const shortDate = `${year}-${month}-${day}`;
    //     return shortDate;
    // };

 var currentDate = new Date();

// Add one month to the current date
var endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

// Format the dates (optional)
var formattedStartDate = formatDate(currentDate);
var formattedEndDate = formatDate(endDate);

// Function to format the date as YYYY-MM-DD
function formatDate(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}

console.log("Start Date: " + moment(currentDate).format('YYYY-MM-DD'));
console.log("End Date: " +  moment(currentDate).startOf('month').format('YYYY-MM-DD'));
    
    const formik = useFormik({
        initialValues,
        onSubmit: async (values,{setStatus, setSubmitting, resetForm}) => {
            try {

                let body = {
                    'meals':values.meals,
                    'title' : values.title,
                    'address': values.address
                }
                address.length < 3 &&  setAddress([...address , body])
                setAddaddress(false)
            } catch (error) {
                setStatus('The registration details is incorrect')
                console.log("err",error)
                setSubmitting(false)
            }
        }
    })


    return (
        <CustomContainer >
            <section className="pt-5 mb-4">
                <div className="row">
                    <div className="col-lg-8 mb-3">
                      <div className='variant_accor'>
                        <div
                            className="accordion accordion-flush mb-3"
                            id="accordionFlushExample"
                        >
                            <div className="accordion-item">
                                <h2
                                    className="accordion-header"
                                    id="flush-headingOne"
                                >
                                    <button
                                        className="accordion-button collapsed "
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseOne"
                                    >
                                       Breakfast
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseOne"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        <div className='food_cat'>
                                            <div className='mb-3'>
                                            <h6>Select Food Category</h6>
                                            </div>

                                            <div className='row '>
                                                <div className='col-md-3 col-sm-6 px-lg-1 mb-3'>
                                                    <div className={selected == 0 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(0)}>
                                                    <div>
                                                    <img src='/static/images/Categories/1.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>North India</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div>  
                                                <div className='col-md-3 col-sm-6 px-lg-1 mb-3'>
                                                <div className={selected == 1 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(1)}>
                                                    <div>
                                                    <img src='/static/images/Categories/2.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>South India</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                                <div className='col-md-3 col-sm-6 px-lg-1 mb-3'>
                                                <div className={selected == 2 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(2)}>
                                                    <div>
                                                    <img src='/static/images/Categories/3.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>Jain Food</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                                <div className='col-md-3 col-sm-6 px-lg-1 mb-3' >
                                                <div className={selected == 3 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(3)}>
                                                    <div>
                                                    <img src='/static/images/Categories/4.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>Special Meals</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className='day_sub'>
                                            <Grid  >
                                            <TabContext value={value2} > 
                                                 <div className="SubCategories_card chech_sub">
                                                    <div className="d-flex justify-content-between align-items-center px-3 sub-cards">
                                            <div className="select d-md-none p-3 w-100">
                                                <select className="form-select w-100"   onChange={handleChange2}> 
                                                    <option value="1" selected>Monday</option> 
                                                    <option value="2">Tuesday</option> 
                                                    <option value="3">Wenesday</option>
                                                    <option value="4">Thursday</option>
                                                    <option value="5">Friday</option>
                                                    <option value="6">Saturday</option>
                                                    <option value="7">Sunday</option>
                                                </select>
                                            </div>
                                                <TabList
                                                    onChange={handleChange2}
                                                   className='d-md-flex d-none'
                                                    aria-label="Vertical tabs example"
                                                >
                                                 <Tab
                                                    iconPosition="start"
                                                    label={t('Monday')}
                                                    value="1"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Tuesday')}
                                                    value="2"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Wenesday')}
                                                    value="3"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Thursday')}
                                                    value="4"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Friday')}
                                                    value="5"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Saturday')}
                                                    value="6"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Sunday')}
                                                    value="7"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                
                                                 </TabList>  
                                                 </div>


                                                    </div> 
                                                    <TabPanel value="1">
                                                        <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className='col-xl-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>

                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-xl-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-xl-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="4">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-xl-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>

                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="5">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-xl-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="6">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-xl-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>

                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="7">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-xl-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-xl-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>

                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2
                                    className="accordion-header"
                                    id="flush-headingTwo"
                                >
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseTwo"
                                    >
                                       Lunch
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                    <div className='food_cat'>
                                    <div className='mb-3'>
                                            <h6>Select Food Category</h6>
                                            </div>

                                            <div className='row '>
                                                <div className='col-md-3 px-lg-1 mb-3'>
                                                    <div className={selected == 0 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(0)}>
                                                    <div>
                                                    <img src='/static/images/Categories/1.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>North India</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div>  
                                                <div className='col-md-3 px-lg-1 mb-3'>
                                                <div className={selected == 1 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(1)}>
                                                    <div>
                                                    <img src='/static/images/Categories/2.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>South India</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                                <div className='col-md-3 px-lg-1 mb-3'>
                                                <div className={selected == 2 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(2)}>
                                                    <div>
                                                    <img src='/static/images/Categories/3.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>Jain Food</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                                <div className='col-md-3 px-lg-1 mb-3' >
                                                <div className={selected == 3 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(3)}>
                                                    <div>
                                                    <img src='/static/images/Categories/4.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>Special Meals</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className='day_sub'>
                                            <Grid  >
                                            <TabContext value={value2} > 
                                                 <div className="SubCategories_card chech_sub">
                                                    <div className="d-flex justify-content-between align-items-center px-3 sub-cards">
                                            <div className="select d-md-none p-3 w-100">
                                                <select className="form-select w-100"   onChange={handleChange2}> 
                                                    <option value="1" selected>Monday</option> 
                                                    <option value="2">Tuesday</option> 
                                                    <option value="3">Wenesday</option>
                                                    <option value="4">Thursday</option>
                                                    <option value="5">Friday</option>
                                                    <option value="6">Saturday</option>
                                                    <option value="7">Sunday</option>
                                                </select>
                                            </div>
                                                <TabList
                                                    onChange={handleChange2}
                                                   className='d-md-flex d-none'
                                                    aria-label="Vertical tabs example"
                                                >
                                                 <Tab
                                                    iconPosition="start"
                                                    label={t('Monday')}
                                                    value="1"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Tuesday')}
                                                    value="2"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Wenesday')}
                                                    value="3"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Thursday')}
                                                    value="4"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Friday')}
                                                    value="5"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Saturday')}
                                                    value="6"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Sunday')}
                                                    value="7"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                
                                                 </TabList>  
                                                 </div>


                                                    </div> 
                                                    <TabPanel value="1">
                                                        <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className='col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>

                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="4">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="5">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="6">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="7">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2
                                    className="accordion-header"
                                    id="flush-headingThree"
                                >
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseThree"
                                    >
                                        Dinner
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-headingThree"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                    <div className='food_cat'>
                                    <div className='mb-3'>
                                            <h6>Select Food Category</h6>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-3 px-lg-1 mb-3'>
                                                    <div className={selected == 0 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(0)}>
                                                    <div>
                                                    <img src='/static/images/Categories/1.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>North India</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div>  
                                                <div className='col-md-3 px-lg-1 mb-3'>
                                                <div className={selected == 1 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(1)}>
                                                    <div>
                                                    <img src='/static/images/Categories/2.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>South India</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                                <div className='col-md-3 px-lg-1 mb-3'>
                                                <div className={selected == 2 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(2)}>
                                                    <div>
                                                    <img src='/static/images/Categories/3.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>Jain Food</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                                <div className='col-md-3 px-lg-1 mb-3' >
                                                <div className={selected == 3 ? 'Choose_categorySelect Select_category' : 'Select_category'} onClick={()=>setSelected(3)}>
                                                    <div>
                                                    <img src='/static/images/Categories/4.png' className='mb-2' />
                                                    <h6 className='comlplete_1'>Special Meals</h6>
                                                    <p className='text_color mb-0'>Menu</p>
                                                    </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className='day_sub'>
                                            <Grid  >
                                            <TabContext value={value2} > 
                                                 <div className="SubCategories_card chech_sub">
                                                    <div className="d-flex justify-content-between align-items-center px-3 sub-cards">
                                            <div className="select d-md-none p-3 w-100">
                                                <select className="form-select w-100"   onChange={handleChange2}> 
                                                    <option value="1" selected>Monday</option> 
                                                    <option value="2">Tuesday</option> 
                                                    <option value="3">Wenesday</option>
                                                    <option value="4">Thursday</option>
                                                    <option value="5">Friday</option>
                                                    <option value="6">Saturday</option>
                                                    <option value="7">Sunday</option>
                                                </select>
                                            </div>
                                                <TabList
                                                    onChange={handleChange2}
                                                   className='d-md-flex d-none'
                                                    aria-label="Vertical tabs example"
                                                >
                                                 <Tab
                                                    iconPosition="start"
                                                    label={t('Monday')}
                                                    value="1"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Tuesday')}
                                                    value="2"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Wenesday')}
                                                    value="3"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Thursday')}
                                                    value="4"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Friday')}
                                                    value="5"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Saturday')}
                                                    value="6"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Sunday')}
                                                    value="7"
                                                    sx={{ fontSize: '17px' }}
                                                />
                                                
                                                 </TabList>  
                                                 </div>


                                                    </div> 
                                                    <TabPanel value="1">
                                                        <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className='col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>

                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="4">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="5">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="6">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="7">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-3 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-3 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                                
                                                             </div>
                                                             <div className='d-flex justify-content-center align-items-center'>
                                                                <button className='btn btn_sub3' type='button' >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Sub_plan'>
                            <div className='mb-3'>
                            <h6>Select Subsciption Plan</h6>
                            </div>
                            <div className='row'>
                                <div className='col-12 mb-3'  onClick={()=>{ setSelectPlan(0); document.getElementById('flexRadioDefault1')?.click()}}>
                                    <div className={selectPlan == 0 ? 'plans2 d-flex justify-content-between align-items-center' : 'plans  d-flex justify-content-between align-items-center'}>
                                        <div className='form-check d-flex align-items-center'>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault"  id="flexRadioDefault1" />
                                        <div className='ms-3'>
                                        <label className="form-check-label mb-2" for="flexRadioDefault1">Silver</label>
                                        <h6 className='mb-0 pb-0'>Get 7 Days Tiffin Different Food</h6>
                                        </div>
                                        </div>
                                        <div className=''>
                                            <h6 className='text-dark'>₹ 899</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 mb-3' onClick={()=> {setSelectPlan(1); document.getElementById('flexRadioDefault2')?.click()}}>
                                    <div className={selectPlan == 1 ? 'plans2 d-flex justify-content-between align-items-center' : 'plans  d-flex justify-content-between align-items-center'}>
                                        <div className='form-check d-flex align-items-center'>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <div className='ms-3'>
                                        <label className="form-check-label mb-2" for="flexRadioDefault2" >Gold</label>
                                        <h6 className='mb-0 pb-0'>Get 7 Days Tiffin Different Food</h6>
                                        </div>
                                        </div>
                                        <div className=''>
                                            <h6 className='text-dark'>₹ 899</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12' onClick={()=>{ setSelectPlan(2); document.getElementById('flexRadioDefault3')?.click() }}>
                                    <div className={selectPlan == 2 ? 'plans2 d-flex justify-content-between align-items-center' : 'plans  d-flex justify-content-between align-items-center'}>
                                        <div className='form-check d-flex align-items-center'>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                        <div className='ms-3'>
                                        <label className="form-check-label mb-2" for="flexRadioDefault3">Platinum</label>
                                        <h6 className='mb-0 pb-0'>Get 7 Days Tiffin Different Food</h6>
                                        </div>
                                        </div>
                                        <div className=''>
                                            <h6 className='text-dark'>₹ 899</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className='Delvery_food mt-2'>
                            <div className='mb-5'>
                            <div className='d-flex justify-content-between mb-4'>
                            <div>
                            <h4>Delivery Address</h4>
                            </div>
                            <div>
                            {address?.length < 3 && <button type='button' className='btn Btn_add' onClick={()=>setAddaddress(true)} ><img src='/static/images/Icons/15.png' />  Add</button> } 
                            </div>
                            </div>
                            {
                            address?.length < 3 &&
                            <form className={addAddress ? 'mb-3' : 'd-none'} onSubmit={formik.handleSubmit}>
                            <div className=' mb-4'>
                                <select className='form-select w-100 border-rounded' {...formik.getFieldProps('meals')}>
                                    <option>Select Your Meals</option>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                                </div>
                                <div className='mb-4'>
                                    <div className='mb-3'>
                                    <h5>Title</h5>
                                    </div>
                                    <div className=''>
                                    <input className='form-control rounded-0 border-0 border-bottom w-100' {...formik.getFieldProps('title')} placeholder='Enter Your Title (Ex:Home,Office,...etc)' type='text' />
                                </div>
                                </div>

                                <div >
                                <div className='mb-5  d-flex align-items-center'>
                                    <div className=''>  
                                    <img src='/static/images/Icons/11.png' className='locate_add' />
                                    </div>
                                    <div className='ms-2'>
                                    <h6 className='mb-0 text-muted'>Address</h6>
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <input className='form-control rounded-0 border-0 border-bottom w-100' {...formik.getFieldProps('address')} placeholder='Enter Your Address' type='text' />
                                </div>
                                </div>
                                <div className=''>
                                    <button className='btn btn1_sub p-2 w-100 fs-5'>Save Address</button>
                                </div>
                            </form> 
                            }

                            {
                                address?.map((data,index)=> (
                                    <div className='d-flex justify-content-between' key={index}>
                                        <div className='address_show '>
                                        <div className='mb-3 d-flex align-items-center'>
                                            <div className=''>  
                                            <img src='/static/images/Icons/11.png' className='locate_add' />
                                            </div>
                                            <div className='ms-2'>
                                            <h6 className='mb-0'>{data?.address_type}-{data?.contact_person_name}</h6>
                                            </div>
                                        </div>
                                        <div className='mb-4 ms-4'>
                                            {/* <h6 className='text-muted'>16th Main Rd, Anna Nagar west, Chennai 600040.</h6> */}
                                            <h6 className='text-muted'>{data?.road ?? data?.address}.</h6>
                                        </div>
                                        </div>
                                        <div className=''>
                                            <h6><EditIcon color='error' /></h6>
                                        </div>
                                    </div> 
                                ))
                            }
                            
                            
                            </div>

                            <div className='mb-4 border-bottom'>
                                <div className='row mb-4'>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                        <label  className="form-label">Start</label>
                                        <input type="date" className="form-control" defaultValue={formattedStartDate} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                        <label  className="form-label">End</label>
                                        <input type="date" className="form-control" defaultValue={formattedEndDate} />
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <div className='mb-4'>
                                    <h5>Delivery</h5>
                                    </div>
                                    <div className='d-flex '>
                                    <div className={deliveryType == 0 ? 'Delivery_opt' : 'Delivery_off'}>
                                    <div className="form-check form-check-inline" onClick={()=> setDeliveryType(0)}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked />
                                    <label className="form-check-label d-flex" for="inlineRadio1">
                                     <img  src={deliveryType == 0 ? '/static/images/Icons/13.png' : '/static/images/Icons/14.png'} className='icon me-1'  />  Delivery</label>
                                    </div>
                                    </div>
                                    <div className={deliveryType == 1 ? 'Delivery_opt ms-3' : 'Delivery_off ms-3'}>
                                    <div className="form-check form-check-inline" onClick={()=> setDeliveryType(1)}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label className="form-check-label d-flex j" for="inlineRadio2"> 
                                    <img src={deliveryType == 1 ? '/static/images/Icons/17.png' : '/static/images/Icons/18.png'}  className='icon me-1' />  Takeaway</label>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <div className=''>
                                <div className='mb-4'>
                                    <h4>Payment summary</h4>
                                    </div>
                                    <div className='border-bottom mb-3'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <div className=''>
                                        <h6>Package Price (Breakfast)</h6>
                                        </div>
                                        <div className=''>
                                        ₹ 999.00
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <div className=''>
                                        <h6>Package Price (Dinner)</h6>
                                        </div>
                                        <div className=''>
                                        ₹ 999.00
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <div className=''>
                                        <h6>Delivery Charges</h6>
                                        </div>
                                        <div className=''>
                                        ₹ 500.00
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <div className=''>
                                        <h6>Foodkart's Point</h6>
                                        </div>
                                        <div className=''>
                                        ₹ 0.00
                                        </div>
                                    </div>
                                    </div>

                                    <div className='d-flex justify-content-between align-items-center mb-4'>
                                        <div className=''>
                                        <h6>Grand Total</h6>
                                        </div>
                                        <div className=''>
                                        <h6 className='text_color'>₹ 2498.00</h6>
                                        </div>
                                    </div>

                                    <div className=''>
                                        <button type='button' data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn1_sub w-100 fs-5'>Continue</button>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </section> 

            <div className='success_messa'>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-2">
                <div className="modal-header d-flex justify-content-center">
                   <ErrorOutlineIcon />
                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <div className="modal-body">
                    {/* <h4>Are You Sure</h4> */}


                        <div className='mb-3'>
                        <div className='d-flex justify-content-between align-items-center '>
                                        <div className=''>
                                        <h6>Grand Total </h6>
                                        </div>
                                        <div className=''>
                                        ₹ 2498
                                        </div>
                                    </div>
                        </div>

                        <div className='d-flex justify-content-between'>
                        <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            Get 7 days Trail Pack
                        </label>
                        </div>

                        <div className=''>
                        ₹ 99.00
                        </div>
                        </div>
                    
                </div>
                <div className=" d-sm-flex justify-content-between px-3 ">
                    <button type="button" className="btn w-100 mx-1 btn_close mb-3" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn w-100 mx-1  btn1_sub  mb-3" data-bs-dismiss="modal">Confirm</button>
                </div>
                </div>
            </div>
            </div>
            </div>
            {/* <CheckOut /> */}
        </CustomContainer>


    )
}
