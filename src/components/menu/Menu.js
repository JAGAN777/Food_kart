import React,{useState,useEffect} from 'react'
import CustomContainer from "../container";
import {CustomPaperBigCard} from "../../styled-components/CustomStyles.style";
import { Container, CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import { Grid } from '@mui/material'
import FeaturedCategoryCard from '../featured-category-item/FeaturedCategoryCard'
import CustomShimmerCategories from '../CustomShimmer/CustomShimmerCategories'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import {
    Button,
    IconButton,
    Stack,
    Typography,
    Tab,
    Tabs,
} from '@mui/material'







export default function Menu({setOpen}) {
    const { t } = useTranslation()
    const { featuredCategories } = useSelector((state) => state.storedData)
    const { global } = useSelector((state) => state.globalSettings)
    const [selected, setSelected] = useState(0)
    const [value, setValue] = useState('1')
    const [value2, setValue2] = useState('1')
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChange2 = (event, newValue) => {
        setValue2(newValue ?? event.target.value)
    }

    // console.log('jhfjgfghd',featuredCategories)

    const [toWrite, setToWrite] = useState("");
    const [index, setIndex] = useState(0);
    let text = 'Where Every meal is cooked with'
    useEffect(() => {
        const interval = setInterval(() => {
          if (index === text.length) {
            clearInterval(interval);
          } else {  
            setToWrite(toWrite + text[index]);
            setIndex(index + 1);
          }
        }, 100);
        return () => clearInterval(interval);
      }, [text, index, toWrite]);



  return (<>
  <CssBaseline>
     <section className='mb-4'>
        <div className='menu_bg position-relative '>
        <img src='/static/images/Banner/banner_menu.png' className='w-100' />
        <CustomContainer>
        <div className='position-absolute'>
            {/* <h4 className='fade-in fw-bold'>Where Every meal is cooked with <span className='text_color'>love</span></h4> */}
            <h4 className='fade-in fw-bold'>{toWrite}<span className='text_color'> love</span></h4>
        </div>
        </CustomContainer>
        </div>
     </section>

        <section className='mb-4'>
        {/* <Grid container>
                <Grid item xs={12} md={12}>
                    {featuredCategories?.length > 0 ? (
                        <div className=''>
                            {featuredCategories.map((categoryItem, index) => (
                                <FeaturedCategoryCard
                                    key={categoryItem?.id}
                                    id={categoryItem?.id}
                                    categoryImage={categoryItem?.image}
                                    name={categoryItem?.name}
                                    categoryImageUrl={
                                        global?.base_urls?.category_image_url
                                    }
                                    height="40px"
                                />
                            ))}
                        </div>
                    ) : (
                        <CustomShimmerCategories
                            noSearchShimmer="true"
                            itemCount="7"
                            smItemCount="5"
                        />
                    )}
                </Grid>
          </Grid> */}
          <CustomContainer>
          <div className='d-flex justify-content-center mt-5 mb-3'>
                <div className='text-center mb-3'>
                    <h4 className='fw-bold'>Choose Categories</h4>
                </div>
            </div>

            <div className='row animation-group'>
            {featuredCategories.slice(0,4).map((categoryItem, index) => (
                <div className='col-md-3 col-6 mb-3 ' data-animation="fadeInLeft">
                    <div className={selected == index? 'Choose_categorySelect Choose_category  d-flex justify-content-center': 'Choose_category d-flex justify-content-center' } onClick={()=> setSelected(index)}>
                        <div>
                        <img src={`${global?.base_urls?.category_image_url}/${categoryItem?.image}`} className='mb-3 category_menu' />
                        <h5 className='comlplete_1'>{categoryItem?.name}</h5>
                        </div>
                    </div>
                </div>
            ))}

                <div className='col-md-3 col-6 mb-3 d-none'>
                    <div className={selected == 1 ? 'Choose_categorySelect Choose_category d-flex justify-content-center': 'Choose_category d-flex justify-content-center' } onClick={()=> setSelected(1)}>
                        <div>
                        <img src='/static/images/Categories/3.png' className='mb-3' />
                        <h5 className='comlplete_1'>South India</h5>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-6 mb-3 d-none'>
                    <div className={selected == 2 ? 'Choose_categorySelect Choose_category d-flex justify-content-center': 'Choose_category d-flex justify-content-center' } onClick={()=> setSelected(2)}>
                        <div>
                        <img src='/static/images/Categories/1.png' className='mb-3' />
                        <h5 className='comlplete_1'>Jain Food</h5>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-6 mb-3 d-none'>
                    <div className={selected == 3 ? 'Choose_categorySelect Choose_category d-flex justify-content-center': 'Choose_category d-flex justify-content-center' } onClick={()=> setSelected(3)}>
                        <div>
                        <img src='/static/images/Categories/4.png' className='mb-3' />
                        <h5 className='comlplete_1'>Special Meals</h5>
                        </div>
                    </div>
                </div>
            </div>
          </CustomContainer>
        </section>

        <section className='mb-4 menu_check'>
        <CustomContainer>
        <div className='d-flex justify-content-center mt-5 mb-3'>
                <div className='text-center mb-4'>
                <h5 className='mb-2'>{t('Check Menu of the week')}</h5>
                    <h4 className='fw-bold'>19th June 2023 to 24th June 2023</h4>
                </div>
        </div>

        
                          <Box sx={{ width: '100%', typography: 'body1' }}>
                                <div className="home_Plans mt-3">
                                    <TabContext value={value}>
                                        <Box
                                            sx={{
                                                borderColor: 'divider',
                                                display:'flex',
                                                justifyContent:'space-between',
                                                alignItems:'center',
                                                marginBottom:'15px',
                                                flexDirection:"row-reverse" 

                                            }}
                                        >
                                            <TabList
                                                onChange={handleChange}
                                                aria-label="lab API tabs example"
                                            >
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Breakfast')}
                                                    id="openTabBreakFast"
                                                    value="1"
                                                    sx={{ fontSize: '18px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Lunch')}
                                                    value="2"
                                                    sx={{ fontSize: '18px' }}
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Dinner')}
                                                    value="3"
                                                    sx={{ fontSize: '18px' }}
                                                />
                                            </TabList>

                                            <div className=''>
                                                <h4>North indian</h4>
                                            </div>
                                        </Box>

                                        <TabPanel value="1">
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
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                                                <button className='btn btn_sub3' type='button' onClick={()=>setOpen(true)} >Get Subscription</button>
                                                             </div>
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                    <CustomPaperBigCard>
                                                            <div className='row justify-content-start nerw'>
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                        </TabPanel>

                                        <TabPanel value="2">
                                        <Grid>
                                            <TabContext value={value2}> 
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
                                                            aria-label="lab API tabs example"
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
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                                    <TabPanel value="2">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="4">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="5">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="6">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="7">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                        </TabPanel>

                                        <TabPanel value="3">
                                        <Grid>
                                            <TabContext value={value2}> 
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
                                                            aria-label="lab API tabs example"
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
                                                            <div className=' col-lg-2 col-sm-4 col-6  mb-1 p-2 '>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4  col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/1.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/2.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Pongal
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/9.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Channa masala
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/10.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Tiffon Sambar
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/5.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Idali Podi
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
                                                            <div className='Choose_category d-flex justify-content-center menu_food'>
                                                            <div>
                                                            <img src='/static/images/menu/6.jpg' className='' />
                                                            <h6 className="comlplete_1 mb-0 pb-0 mt-2">
                                                                        Dosai
                                                                    </h6>
                                                            </div>
                                                            </div>
                                                            </div>  
                                                            <div className=' col-lg-2 col-sm-4 col-6 mb-1 p-2'>
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
                                                    <TabPanel value="2">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="4">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="5">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="6">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="7">
                                                    <CustomPaperBigCard></CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                        </TabPanel>
                                    </TabContext>
                                </div>
                            </Box>

        </CustomContainer>  
       </section>        
    </CssBaseline>
  </>)
}
