import React,{useState,useEffect} from 'react'
import CustomContainer from '../../container'
import { Box, Stack } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import ImageNotFound from '../../../../public/static/no-image-found.png'
import heroImg from '../../../../public/static/heroHome.svg'
import SearchSection from './SearchSection'
import FeatureCatagories from '../featured-categories/FeatureCatagories'
import { useSelector } from 'react-redux'
import foodKart from '../../../../public/static/images/Banner/Banner_Bg.png'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next'


const HeroSectionWithSearch = ({ query, noCategories, page }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [toWrite, setToWrite] = useState("");
    const [index, setIndex] = useState(0);

    let text = 'Say Goodbye To The Fast Food.'
    
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



    const theme = useTheme()
    return (<>
    <section className='home_banner'>
        <Box
            sx={{
                // backgroundColor: `${
                //     theme.palette.mode === 'light' && ' rgba(255, 121, 24, 0.1)'
                // }`,
                backgroundImage: `url(${
                    heroImg ? foodKart.src : ImageNotFound.src
                })`,
                height:'100%'
            }}
        >
                                       <div className='position-absolute d-lg-block d-none'>
                                <img src='/static/images/Banner/0.png' />
                                </div>
            <CustomContainer>
                <Stack
                    sx={{
                        // backgroundImage: `url(${
                        //     heroImg ? foodKart.src : ImageNotFound.src
                        // })`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        justifyContent: 'center',
                        paddingTop: '50px',
                        paddingBottom: '34px',
                        alignItems:'center'
                    }}
                    spacing={4}
                >
                    {/* <SearchSection query={query} /> */}

                    <div className='row d-flex justify-content-center align-items-center position-relative'>
                        <div className='col-md-6'>
                            <div className='w-100 '>
                                <img src='/static/images/Banner/2_Subscription.png' />
                            </div>
                        </div>
                        <div className='col-md-6 d-flex justify-content-center'>
                            <div className=''>
                                <h4 className='mb-3 fade-in fw-bold fs-1'>{t(toWrite)}</h4>
                                <p className='fade-in delayed'>{t('Say hello to family-style dinners, delivered straight to your door.')}</p>
                                <button type='button' className='btn btn1_sub px-3 p-2' onClick={()=>router.push('/category/1?name=South+Indian')}>{t('Subscribe Now')}</button>
                            </div>
                        </div>
                    </div>  
                </Stack>
            </CustomContainer>
        </Box>
    </section>


          <Box>
            <div className='position-relative best_cat fadein'>
          <CustomContainer>
            <div className='d-flex justify-content-center mt-5'>
                <div className='text-center mb-3'>
                    <h5 className='mb-2 fw-bold'>{t("FoodKart's")}</h5>
                    <h4 className='fw-bold'>{t('Our Best Categories')}</h4>
                </div>

                <div className='position-absolute '>
                    <img src='/static/images/Banner/Element_1.png' className='w-100 leafImg' />
                </div>
            </div>
          {!page && !query && <FeatureCatagories height="70px" />}
          </CustomContainer>
          </div>
          </Box>
        </> )
}

export default HeroSectionWithSearch
