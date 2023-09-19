import React, { useEffect, useState } from 'react'
import { Box, Container, } from '@material-ui/core'
import FoodOrRestaurant from '../../components/products-page/FoodOrRestaurant'
import ProductList from '../products-page/ProductList'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, Grid, Typography } from '@mui/material'
import FoodNavigation from '../restaurant-details/foodSection/FoodNavigation'
import { RestaurantDetailsNavButton } from '../food-card/FoodCard.style'
import { useSelector,useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import RestaurantList from '../restaurant-page/RestaurantList'
import RestaurantCard from '../restaurant-details/RestaurantCard'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import CustomePagination from '../pagination/Pagination'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
// import noData from '../../../public/static/food.png'
import noData from '../../../public/static/images/subs.png'
import {CustomPaperBigCard} from "../../styled-components/CustomStyles.style";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Category from '../../components/category/Category'
import {
    CustomStackFullWidth,
    FlexContainerCenter,
} from '../../styled-components/CustomStyles.style'
import FilterButtons from './FilterButtons'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import CustomShimmerForCard from '../CustomShimmer/CustomShimmerForCard'
import FoodCard from '../food-card/FoodCard'
import Image from 'next/image'
import RestaurantsData from './RestaurantsData'
import noRestaurants from '../../../public/static/resturants.png'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { setSubCategories,setPlans } from '../../redux/slices/storedData'
import { RTL } from '../RTL/RTL'
import CustomRatings from '../custom-ratings/CustomRatings'
import CustomContainer from "../container";
import {
    Button,
    IconButton,
    Stack,
    Tab,
    Tabs,
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { PlanApi } from '../../hooks/react-query/plans/planApi'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

  


  

const CategoryDetailsPage = ({
    data,
    id,
    category_id,
    setCategoryId,
    resData,
    offset,
    page_limit,
    type,
    setOffset,
    setType,
}) => {
    const dispatch = useDispatch()
    let fetchId = data?.data?.data.products[0]?.id
  
    const { featuredCategories } = useSelector((state) => state.storedData)
    const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const [catetoryMenus, setCategoryMenus] = useState([])
    const [SubFoodId,setSubFoodId] = useState(13)
    const [value2, setValue2] = useState('1')
    const [value, setValue] = useState('1')
    // const [CategoryId,setcategoryId] = useState(id)
    const [foodData, setFoodData ] = useState([])
    const [plansInfo,setPlanInfo] = useState()
    const [planSlist,setPlansList] = useState([])
    const [foodlist,setFoodlist] = useState([])
    const [selected, setSelected] = useState(null)
    const { global } = useSelector((state) => state.globalSettings);
    const [loading,setLoading] = useState(false)
    const { t } = useTranslation()
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    // State to manage the selected option
    const [selectedOption, setSelectedOption] = useState('Gold');
  
    // Function to toggle the accordion
    const toggleAccordion = () => {
      setIsAccordionOpen((prevState) => !prevState);
    };

  
    // Function to handle option selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsAccordionOpen(false);
    };

    const {
        isLoading: isLoadingChilds,
        data: childesData,
        isError,
        error,
        refetch,
    } = useQuery([`category-Childes`, id], () =>
        CategoryApi.categoriesChildes(id)
    )

    useEffect(async ()=> {
        let fetchId = data?.data?.data.products[JSON.parse(value)-1]?.id
        setSubFoodId(fetchId)
    },[category_id,data])

    useEffect(()=> {
      setValue2('1')
      setValue('1')
    },[category_id])

    const fetchPlanslist = () => {
      PlanApi.Plans().then(res => {
        setPlansList(res.data?.packages)
      }).catch(err => {
        console.error('err',err.message)
      })
    }

    const fetchFoodslist = (SubFoodId) => {
        // setSubFoodId(food_id)
        PlanApi.plansDetails(category_id,SubFoodId,value2).then(res => {
            setFoodlist(res.data?.data)
            // dispatch(setPlans(res.data?.data[0]?.package))
            // let objdata = {}
            // objdata['monday'] = res.data?.data[0]?.monday
            // objdata['tuesday'] = res.data?.data[0]?.tuesday
            // objdata['wednesday'] = res.data?.data[0]?.wednesday
            // objdata['thursday'] = res.data?.data[0]?.thursday
            // objdata['friday'] = res.data?.data[0]?.friday
            // objdata['saturday'] = res.data?.data[0]?.saturday
            // objdata['sunday'] = res.data?.data[0]?.tuesday

            // let result = Object.keys(obj).reduce((arr, day) => {
            //     let dishes = obj[day].split(',');
            //     let newObj = {};
              
            //     dishes.forEach(dish => {
            //       newObj[day] = dish;
            //       arr.push({ ...newObj });
            //     });
              
            //     return arr;
            //   }, []);

            // setFoodData(result)
            setPlanInfo(res.data?.data[0]?.package)
        }).catch(err => {
            console.error('err',err.message)
        })
    }

    useEffect(()=> {
        setCategoryId(id)
    },[id])

    useEffect(()=>{
      fetchPlanslist()
    },[])

    useEffect(()=> {
       fetchFoodslist(SubFoodId)
    },[value2,SubFoodId,category_id])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChange2 = (event, newValue) => {
        setValue2(newValue ?? event.target.value)
    }
    const handleChange3 = (newValue) => {
      setValue2(newValue)
    }


  function createData(name, food ) {
    return { name, food };
  }

  const rows = [
    createData(t('Monday'), foodlist[0]?.monday),
    createData(t('TuesDay'),  foodlist[0]?.tuesday),
    createData(t('Wednesday'),  foodlist[0]?.wednesday),
    createData(t('Thursday'),  foodlist[0]?.thursday),
    createData(t('Friday'),  foodlist[0]?.friday),
    createData(t('Saturday'),  foodlist[0]?.saturday),
    createData(t('Sunday'),  foodlist[0]?.sunday),
  ]

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
    useEffect(() => {
        if (childesData && id?.length > 0) {
            // const catetoryMenu = childesData?.data?.filter((item) =>
            //     id.includes(item.id)
            // )

            setCategoryMenus(childesData.data)
            dispatch(setSubCategories(childesData.data))
        }
        // setCategoryId(id)
    }, [childesData, id])
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    return (
        <>
            <Grid container spacing={{ xs: 3, sm: 3, md: 4 }}>
                {/* <Grid item xs={12} sm={12} md={12} align="center">
                    <FoodOrRestaurant
                        foodOrRestaurant={foodOrRestaurant}
                        setFoodOrRestaurant={setFoodOrRestaurant}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} align="center">
                    <FoodNavigation
                        catetoryMenus={catetoryMenus}
                        setCategoryId={setCategoryId}
                        category_id={category_id}
                        id={id}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} align="center">
                    <CustomStackFullWidth
                        alignItems="center"
                        justifyContent="center"
                    >
                        <RTL direction={languageDirection}>
                            <GroupButtons setType={setType} type={type} />
                        </RTL>
                    </CustomStackFullWidth>
                </Grid> */}

                <Grid item xs={12} sm={12} md={12} align="center">
                <div className='d-flex justify-content-center mt-5 mb-3'>
                <div className='text-center mb-3'>
                    <h4 className='fw-bold'>{t('Choose Categories')}</h4>
                    </div>
                </div>

                    <div className='row justify-content-center animation-group'>
                    {featuredCategories.map((categoryItem, index) => (
                        <div className='col-md-3 col-6 mb-3' data-animation="fadeInLeft" onClick={()=>{setCategoryId(categoryItem?.id)}} key={index}>
                            <div className={selected == index? 'Choose_categorySelect Choose_category  d-flex justify-content-center': 'Choose_category d-flex justify-content-center' } onClick={()=> setSelected(index)}>
                                <div>
                                <img src={`${global?.base_urls?.category_image_url}/${categoryItem?.image}`} className='mb-3 category_menu' />
                                <h5 className='comlplete_1'>{t(categoryItem?.name)}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <Category /> */}
                    </div>
                </Grid>
            
        {/* <Grid item xs={12} sm={12} md={12} align="center">
        <div className='d-flex justify-content-center mt-5 mb-3 '>
                <div className='text-center mb-4'>
                <h5 className='mb-2 fw-bold'>{t('Check Menu of the week')}</h5>
                    <h4 className='fw-bold'>19th June 2023 to 24th June 2023</h4>
                </div>
        </div>
        </Grid>   */}

        {
             (data?.data ? ( <>            
                         <Grid item xs={12} sm={12} md={12} align="center">
            { data?.data?.data.products?.length > 0  &&
                                <div className="home_Plans mt-3 mb-4">
                                    <TabContext value={value}>
                                        {/* <Box
                                            sx={{
                                                borderColor: 'divider',
                                                display:'flex',
                                                justifyContent:'space-between',
                                                alignItems:'center',
                                                marginBottom:'15px',
                                                flexDirection:"row-reverse" 

                                            }}
                                        > */}
                                            <TabList
                                                onChange={handleChange}
                                                aria-label="lab API tabs example" 
                                                sx={{ marginBottom:'15px'}}
                                            >
                                                {
                                                    data?.data?.data.products?.map((foodValue,index)=> (                                                   
                                                        <Tab
                                                            iconPosition="start"
                                                            label={t(foodValue?.name)}
                                                            value={`${index+1}`}
                                                            key={index}
                                                            sx={{ fontSize: '18px',}} 
                                                            onClick={()=>setSubFoodId(foodValue?.id)}
                                                        />
                                                    ))
                                                }
    
                                            </TabList>
                                            {/* 
                                            <div className=''>
                                                <h4>North indian</h4>
                                            </div>
                                        </Box> */}

                                        <TabPanel value="1">
                                            <Grid className='' >
                                            <TabContext value={value2}  > 
                                                 {/* <div className="SubCategories_card chech_sub"> */}
                                                 <div className="chech_sub">
                                                <div className="d-flex justify-content-center align-items-center p-2 sub-cards">
                                            <div className="select d-flex justify-content-between d-md-none p-3 w-100">
                                                <select className="form-select w-100"   onChange={handleChange2}> 
                                                    <option value="1" selected>{t(`Gold`)}</option> 
                                                    <option value="2">{t(`Silver`)}</option> 
                                                    <option value="3">{t('Bronze')} </option>
                                                </select>

                                                    {/* <div className="accordion-select">
                                                        <div className="accordion-header" onClick={toggleAccordion}>
                                                         <h5 className='text_color cursor-pointer'> {selectedOption || 'Select an option'}</h5>
                                                        </div>
                                                        {isAccordionOpen && (
                                                          <div className="accordion-options w-100">
                                                            <div className='mt-3 mb-3 cursor-pointer w-100' onClick={() => { handleOptionSelect('Gold'),handleChange3('1') }}><h5>Gold</h5></div>
                                                            <div className='mb-3 cursor-pointer w-100' onClick={() => { handleOptionSelect('Silver'),handleChange3('2') }}><h5>Silver</h5></div>
                                                            <div className='mb-3 cursor-pointer w-100' onClick={() => { handleOptionSelect('Bronze'),handleChange3('3') }}><h5>Bronze</h5></div>
                                                          </div>
                                                        )}
                                                      </div> */}
                                            </div>
  
                                              <TabList
                                                    onChange={handleChange2}
                                                   className='d-md-flex d-none'
                                                    aria-label="Vertical tabs example"

                                                >
                                                  {
                                                    planSlist?.length > 0 && 
                                                    planSlist?.slice(0,3).map((data,index)=>(
                                                      <Tab
                                                        iconPosition="start"
                                                        label={t(data?.package_name)}
                                                        value={`${data?.id}`}
                                                        key={index}
                                                        className='tabButt'
                                                        sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%',}}
                                                      />
                                                    ))
                                                  }

                                                {/* <Tab
                                                    iconPosition="start"
                                                    label={t(`Silver`)}
                                                    value="2"
                                                    className='tabButt'
                                                    sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%'}} 
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Bronze')}
                                                    value="3"
                                                    className='tabButt'
                                                    sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%'}} 
                                                /> */}
                                                
                                                 </TabList>  
                                                 </div>

                                                    </div> 

                                                    <TabPanel value="1"> 
                                                    <CustomPaperBigCard>
                                                    {/* {
                                                        foodlist?.length > 0 && 
                                                            <div className=''>
                                                            <div className='row '>
                                                                <div className='col-12 '>

                                                                    <div className='d-flex justify-content-start mb-3'>
                                                                        <div className=''>
                                                                        <h6>Monday -</h6>
                                                                        </div>
                                                                        <div className=''>
                                                                           {foodlist[0]?.monday ?? 'No Food Found'}
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-start mb-3'>
                                                                        <div className=''>
                                                                        <h6>Tuesday -</h6>
                                                                        </div>
                                                                        <div className=''>
                                                                        {foodlist[0]?.tuesday ?? 'No Food Found'}
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-start mb-3'>
                                                                        <div className=''>
                                                                        <h6>Wednesday  -</h6>
                                                                        </div>
                                                                        <div className=''>
                                                                            {foodlist[0]?.wednesday ?? 'No Food Found'}
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-start mb-3'>
                                                                        <div className=''>
                                                                        <h6>Thursday -</h6>
                                                                        </div>
                                                                        <div className=''>
                                                                            {foodlist[0]?.thrusday ?? 'No Food Found'}
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-start mb-3'>
                                                                        <div className=''>
                                                                        <h6>Friday -</h6>
                                                                        </div>
                                                                        <div className=''>
                                                                            {foodlist[0]?.friday ?? 'No Food Found'}
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-start mb-3'>
                                                                        <div className=''>
                                                                        <h6>Saturday -</h6>
                                                                        </div>
                                                                        <div className=''>
                                                                            {foodlist[0]?.saturday ?? 'No Food Found'}
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-start mb-3'>
                                                                        <div className=''>
                                                                        <h6>Sunday -</h6>
                                                                        </div>
                                                                        <div className=''>
                                                                            {foodlist[0]?.sunday ?? 'No Food Found'}
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className='border-top p-4 pb-0'>
                                                             <div className='d-flex justify-content-between align-items-center '>
                                                               <div className=''>
                                                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>{foodlist[0]?.package?.price}₹</div>
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>Add to cart</button>
                                                             </div>
                                                            </div>
                                                            </div>
                                                    } */}
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}} >
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%', }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                          </TableContainer> 
                                                        <div className='border-top p-sm-4 pt-3 pb-0'>
                                                             <div className='d-flex justify-content-between align-items-center '>
                                                               <div className='text-truncate'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>
                                                               </div>

                                                                <button className='btn btn_sub3 text-nowrap' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label="No Food Found"
                                                    />
                                                    }
                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                        <CustomPaperBigCard>
                                                        {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}} >
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%', }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                          </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                             <div className='d-sm-flex justify-content-between align-items-center '>
                                                               <div className='mb-sm-0 mb-3'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }
                                                    
                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                        <CustomPaperBigCard>
                                                        {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                             <div className='d-sm-flex justify-content-between align-items-center '>
                                                               <div className='mb-sm-0 mb-3'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div> 
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                        </TabPanel>

                                        <TabPanel value="2">
                                        <Grid>
                                            <TabContext value={value2}> 
                                                 <div className="SubCategories_card chech_sub">
                                                        <div className="d-flex justify-content-between align-items-center p-2 sub-cards">
                                            <div className="select d-md-none p-3 w-100">
                                                <select className="form-select w-100"   onChange={handleChange2}> 
                                                    <option value="1" selected>{t('Gold')}</option> 
                                                    <option value="2">{t('Silver')}</option> 
                                                    <option value="3">{t('Bronze')}</option>

                                                </select>
                                            </div>
                                                        <TabList
                                                            onChange={handleChange2}
                                                            className='d-md-flex d-none'
                                                            aria-label="lab API tabs example"
                                                        >
                                                   {
                                                    planSlist?.length > 0 && 
                                                    planSlist?.slice(0,3).map((data,index)=>(
                                                      <Tab
                                                        iconPosition="start"
                                                        label={t(data?.package_name)}
                                                        value={`${data?.id}`}
                                                        key={index}
                                                        className='tabButt'
                                                        sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%',}}
                                                      />
                                                    ))
                                                  }
                                                      </TabList> 
                                                      

                                                        </div>


                                                    </div> 
                                                    <TabPanel value="1">
                                                    <CustomPaperBigCard>
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                             <div className='d-sm-flex justify-content-between align-items-center '>
                                                               <div className='mb-sm-0 mb-3'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }
                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                        <CustomPaperBigCard> 
                                                        {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                             <div className='d-sm-flex justify-content-between align-items-center '>
                                                               <div className='mb-sm-0 mb-3'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }
                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                        <CustomPaperBigCard>
                                                        {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                             <div className='d-sm-flex justify-content-between align-items-center '>
                                                               <div className='mb-sm-0 mb-3'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>{foodlist[0]?.package?.price}₹</div>
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                   {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }

                                                    </CustomPaperBigCard>
                                                    </TabPanel>

                                                    </TabContext>
                                            </Grid>
                                        </TabPanel>

                                        <TabPanel value="3">
                                        <Grid>
                                            <TabContext value={value2}> 
                                                 <div className="SubCategories_card chech_sub">
                                                        <div className="d-flex justify-content-between align-items-center p-2 sub-cards">
                                                       
                                                        <div className="select d-md-none p-3 w-100">
                                                <select className="form-select w-100"   onChange={handleChange2}> 
                                                    <option value="1" selected>{t('Gold')}</option> 
                                                    <option value="2">{t('Silver')}</option> 
                                                    <option value="3">{t('Bronze')}</option>
                                                </select>
                                            </div>

                                                        <TabList
                                                            onChange={handleChange2}
                                                            className='d-md-flex d-none'
                                                            aria-label="lab API tabs example"
                                                        >
                                                 {/* <Tab
                                                    iconPosition="start"
                                                    label={t('Gold')}
                                                    value="1"
                                                    sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%'}}
                                                     className='tabButt' 
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Silver')}
                                                    value="2"
                                                    sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%'}}
                                                     className='tabButt' 
                                                />
                                                <Tab
                                                    iconPosition="start"
                                                    label={t('Bronze')}
                                                    value="3"
                                                    sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%'}}
                                                     className='tabButt' 
                                                /> */}
                                                {
                                                    planSlist?.length > 0 && 
                                                    planSlist?.slice(0,3).map((data,index)=>(
                                                      <Tab
                                                        iconPosition="start"
                                                        label={t(data?.package_name)}
                                                        value={`${data?.id}`}
                                                        key={index}
                                                        className='tabButt'
                                                        sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%',}}
                                                      />
                                                    ))
                                                   }
                                                
                                                            </TabList> 
                                                      

                                                        </div>


                                                    </div> 
                                                    <TabPanel value="1">
                                                    <CustomPaperBigCard>
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                             <div className='d-sm-flex justify-content-between align-items-center '>
                                                               <div className='mb-sm-0 mb-3'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                   {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }

                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                    <CustomPaperBigCard>
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                             <div className='d-sm-flex justify-content-between align-items-center '>
                                                               <div className='mb-sm-0 mb-3'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                   {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }

                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                    <CustomPaperBigCard>
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                             <div className='d-sm-flex justify-content-between align-items-center '>
                                                               <div className='mb-sm-0 mb-3'>
                                                               {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                                                    <div className=''><h6>Items Price -</h6></div>
                                                                    <div>{foodlist[0]?.package?.food_price}₹</div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                               </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                             </div>
                                                            </div>
                                                          </div>
                                                    }
                                                   {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                        />
                                                    }

                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                        </TabPanel>
                                    </TabContext>
                                </div>
            }
                            </Grid>
                        
                        {data?.data?.data.products?.length === 0 && (
                            <CustomEmptyResult
                                image={noData}
                                label=" No Food Found"
                                className='mb-4'
                            />
                        )}
               </> ) : (
                <CustomShimmerForBestFood />
            ))
        }

        
     <div className='d-none'>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    spacing={{ xs: 1, md: 2 }}
                    justifyContent={'center'}
                >
                    {foodOrRestaurant === 'products' &&
                        (data?.data ? (
                            <>
                                <ProductList
                                    product_list={data?.data?.data}
                                    offset={offset}
                                    plansDetails={plansInfo}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                />
                                {data?.data?.data.products?.length === 0 && (
                                    <CustomEmptyResult
                                        image={noData}
                                        label=" No Food Found"
                                    />
                                )}
                            </>
                        ) : (
                            <CustomShimmerForBestFood />
                        ))}

                    {foodOrRestaurant === 'restaurants' &&
                        (resData ? (
                            <>
                                <RestaurantsData
                                    resData={resData}
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                    global={global}
                                />
                                {resData.data.total_size === 0 && (
                                    <CustomStackFullWidth sx={{ mt: '10px' }}>
                                        <CustomEmptyResult
                                            image={noRestaurants}
                                            label="No Restaurants Found"
                                        />
                                    </CustomStackFullWidth>
                                )}
                            </>
                        ) : (
                            <>
                                <CustomShimmerRestaurant />
                            </>
                        ))}
                </Grid>
     </div>
            </Grid>
        </>
    )
}

export default CategoryDetailsPage
