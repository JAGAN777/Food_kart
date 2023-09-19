import React, { useEffect, useRef, useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { Avatar, Box, ButtonBase, Stack } from '@mui/material'
import DrawerMenu from '../DrawerMenu'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { setGlobalSettings } from '../../../redux/slices/global'
import LogoSide from './LogoSide'
import NavLinks from './NavLinks'
import Wishlist from './Wishlist'
import CustomContainer from '../../container'
import AddressReselect from '../top-navbar/address-reselect/AddressReselect'
import { SignInButton } from '../../../styled-components/CustomButtons.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import LockIcon from '@mui/icons-material/Lock'
import AuthModal from '../../auth'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat'
import SettingsIcon from '@mui/icons-material/Settings';
import { AccountPopover } from '../AccountPopover'
import CustomLanguage from '../../CustomLanguage'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { CustomNavSearchIcon } from '../Navbar.style'
import ReactCountryFlag from 'react-country-flag'

import SearchBoxPopover from '../SearchBoxPopover'
import { onSingleErrorResponse } from '../../ErrorResponse'
import { RTL } from '../../RTL/RTL'
import { useSettings } from '../../../contexts/use-settings'
import ThemeSwitches from '../top-navbar/ThemeSwitches'
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PersonIcon from '@mui/icons-material/Person';
import { useGeolocated } from 'react-geolocated'






const SecondNavbar = () => {

    if (typeof window !== "undefined") {
        require("popper.js");
        require("bootstrap/dist/js/bootstrap");
      }

     const [language, setLanguage] = useState('')
    const [langvalue, setLangValue] = useState()

    


     useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('language') || 'en')
            setLangValue(localStorage.getItem('lanValue')|| 'en')
        }
    }, [language])


      const [alignment, setAlignment] = React.useState('left');

      const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    
      };

      const children = [
        // <ToggleButton value="left" key="left">
        //   <FormatAlignLeftIcon />
        // </ToggleButton>,
        // <ToggleButton value="center" key="center">
        //   <FormatAlignCenterIcon />
        // </ToggleButton>,
        <ToggleButton value="right" key="right">
          <FormatAlignRightIcon />
        </ToggleButton>,
        // <ToggleButton value="justify" key="justify">
        //   <FormatAlignJustifyIcon />
        // </ToggleButton>,
      ];

      const control = {
        value: alignment,
        onChange: handleChange,
        exclusive: true,
      };

    const [modalFor, setModalFor] = useState('sign-in')
    const [openSearchBox, setOpenSearchBox] = useState(false)
    const [authModalOpen, setOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [openPopover, setOpenPopover] = useState(false)
    const { userData } = useSelector((state) => state.user)
    const { token } = useSelector((state) => state.userToken)
    const { t } = useTranslation()
    const router = useRouter()
    const { query } = router.query
    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const searchRef = useRef(null)
    const [theme_mode, setThemeMode] = useState('')

    const businessLogo = global?.fav_icon
    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    const changeThemeMode = (e) => {
        if (theme_mode === 'dark') {
            localStorage.setItem('mode', 'light')
        } else {
            localStorage.setItem('mode', 'dark')
        }
        window.location.reload()
    }

    const handleLanguage = () => {
        // setLanguage(ln)

        localStorage.setItem("lanValue", langvalue == 'English'?'Tamil - தமிழ்':'English')
        localStorage.setItem('language', language == 'en'? 'ta':'en')

        window.location.reload()
    }


    //SEARCH BOX OPEN//

    const handleOpenPopover = () => {
        setOpenPopover(true)
        setModalFor('sign-in')
    }

    const handleSearchBoxOpen = () => {
        setOpenSearchBox(!openSearchBox)
    }
    const handleShowSearch = () => {
        if (router.pathname === '/home') {
            if (window.scrollY >= 250) {
                setShowSearch(true)
            } else {
                setShowSearch(false)
                setOpenSearchBox(false)
            }
        }
    }
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleShowSearch)
    }

    const handleClickOutside = (event) => {
        setOpenSearchBox(false)
    }

    const handleOpenAuthModal = () => setOpen(true)
    const handleCloseAuthModal = () => {
        setOpen(false)
        setModalFor('sign-in')
    }

    const handleClosePopover = () => {
        setOpenPopover(false)
    }
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['config'],
        ConfigApi.config,
        {
            enabled: false,
            onError: onSingleErrorResponse,
            staleTime: 1000 * 60 * 8,
            cacheTime: 8 * 60 * 1000,
        }
    )
    useEffect(() => {
        refetch()
    }, [])

    useEffect(()=> {
        document.getElementById('getCurrentLoactionWithid')?.click()
    },[])

    useEffect(() => {
        if (data) {
            dispatch(setGlobalSettings(data))
        }
    }, [data])





    let zoneid = [1]
    let location = 'Select Your Location'
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
        languageDirection = localStorage.getItem('direction')
        location = localStorage.getItem('location') == 'null' ? location : localStorage.getItem('location')
    }
    const customerbaseUrl = global?.base_urls?.customer_image_url

    const handleClick = (value) => {
        router.push({
            pathname: '/info',
            query: {
                page: value,
            },
        })
    }

    const handleAuthBasedOnRoute = () => {
        return (
            <RTL direction={languageDirection}>
                {!token ? (
                    <Stack direction="row">
                        {/* <Box
                            align="center"
                            alignItem="center"
                            component={ButtonBase}
                            marginRight="10px"
                        >
                            <ThemeSwitches
                                checked={theme_mode === 'light'}
                                handleThemeChangeMode={changeThemeMode}
                                themeMode={theme_mode}
                            />
                        </Box> */}
                        <SignInButton
                            onClick={handleOpenAuthModal}
                            variant="contained"
                            id='hkghkgknl'
                        >
                            <CustomStackFullWidth
                                direction={
                                    languageDirection === 'rtl'
                                        ? 'row'
                                        : 'row-reverse'
                                }
                                alignItems="center"
                                spacing={1}
                            >
                                <CustomTypography
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.whiteContainer.main,
                                            fontWeight:'400'
                                    }}
                                >
                                    {/* {t('Sign In')} */}
                                    {t('Login')}
                                </CustomTypography>
                                {/* <LockIcon fontSize="small" /> */}
                                <PersonIcon  className='text_color'/>
                            </CustomStackFullWidth>
                        </SignInButton>
                        <AuthModal
                            open={authModalOpen}
                            modalFor={modalFor}
                            setModalFor={setModalFor}
                            handleClose={handleCloseAuthModal}
                        />
                    </Stack>
                ) : (
                    <>
                        <Stack direction="row" spacing={2}>
                            {/* <Box
                                align="center"
                                alignItem="center"
                                component={ButtonBase}
                            >
                                <ThemeSwitches
                                    checked={theme_mode === 'light'}
                                    handleThemeChangeMode={changeThemeMode}
                                    themeMode={theme_mode}
                                />
                            </Box> */}
                            {/* <Box
                                align="center"
                                component={ButtonBase}
                                alignItem="center"
                                onClick={() => handleClick('inbox')}
                            >
                                <IconButton>
                                    <ChatIcon
                                        sx={{
                                            height: 25,
                                            width: 25,
                                            color: (theme) =>
                                                theme.palette.primary.main,
                                        }}
                                    ></ChatIcon>
                                </IconButton>
                            </Box> */}
                            {/* {token && !isSmall && (
                                <Wishlist handleClick={handleClick} />
                            )} */}
                            <Box
                                align="center"
                                component={ButtonBase}
                                alignItem="center"
                                onClick={() => handleClick('settings')}
                            >
                                <IconButton>
                                    {/* <SettingsIcon
                                        sx={{
                                            height: 25,
                                            width: 25,
                                            color: (theme) =>
                                                theme.palette.primary.main,
                                        }}
                                    ></SettingsIcon> */} 
                                    <img src='/static/images/translator.png' onClick={()=>handleLanguage()}  className='langIcon' />
                                    {/* <ReactCountryFlag
                                            countryCode={
                                                language === 'en' ? 'US' : language === 'ta' ? 'IN' : language
                                            }
                                            svg

                                        /> */}
                                </IconButton>
                            </Box>
                            
                            <Box
                                align="center"
                                alignItem="center"
                                ml={languageDirection !== 'rtl' && '.9rem'}
                                mr={languageDirection === 'rtl' && '.9rem'}
                                component={ButtonBase}
                                onClick={handleOpenPopover}
                                ref={anchorRef}
                            >
                                <Avatar
                                    sx={{
                                        height: 30,
                                        width: 30,
                                    }}
                                    src={`${customerbaseUrl}/${userData?.image}`}
                                />
                            </Box>
                        </Stack>
                        
                        <AccountPopover
                            anchorEl={anchorRef.current}
                            onClose={handleClosePopover}
                            open={openPopover}
                        />
                    
                    </>
                )}
            </RTL>
        )
    }


    const handleShowingSearch = () => {
        if (
            router.pathname !== '/home' &&
            router.pathname !== '/' &&
            location
        ) {
            return (
                <Stack
                    onClick={handleSearchBoxOpen}
                    sx={{ transition: 'all ease .4s' }}
                >
                    <CustomNavSearchIcon>
                        <SearchOutlinedIcon
                            sx={{ fontSize: '20px' }}
                            color="primary"
                        />
                    </CustomNavSearchIcon>
                </Stack>
            )
        } else if (showSearch && router.pathname !== '/' && location) {
            return (
                <Stack
                    onClick={handleSearchBoxOpen}
                    sx={{
                        transition: 'all ease .4s',
                    }}
                >
                    <CustomNavSearchIcon>
                        <SearchOutlinedIcon
                            sx={{ fontSize: '20px' }}
                            color="primary"
                        />
                    </CustomNavSearchIcon>
                </Stack>
            )
        }
    }

    return (
        <>
            <section className='header_top'>
            <CustomContainer>
                <div className='d-flex justify-content-between align-items-center'>
                    {/* <div className='d-sm-block d-none'>
                        <p className='mb-0 comlplete_1'>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                    </div> */}
                   <div>
                    <div className="d-md-none">
                     <AddressReselect location={location} />
                    </div>
                   <p className='mb-0 d-md-block d-none fw-light'>{t('Nothing brings people together like delicious food.')}</p>
                   </div>
                    <div className='d-flex justify-content-between align-items-center '>
                   <div className='border-end d-md-block d-none pe-2'>
                   <AddressReselect location={location} />
                   </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        {/* <PersonIcon  className='text_color'/> */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={isSmall ? '5px' : '24px'}
                        >
                        <Box
                                sx={{
                                    // display: { xs: 'none', md: 'flex' },
                                    flexGrow: 0,
                                    height: '40px',
                                    alignItems: 'center',
                                }}
                            >
                           <p className='mb-0 cursor-pointer text_h'>{handleAuthBasedOnRoute()}</p>
                            </Box>
                        </Stack>   
                    </div>
                    </div>
                </div>
            </CustomContainer>
            </section>

            <section className='top-header'>
            <CustomContainer>
                <Toolbar disableGutters={true}>
                    <CustomStackFullWidth
                        direction="row"
                        // alignItems="center"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Stack
                           gap="1rem"
                        >

                            <div className='cursor-pointer  ' onClick={()=>router.push('/home')}>
                                <img src='/static/fk_logo.png' className='top_Logfk'/>
                            </div>

                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            gap="1rem"
                        >
                            {/* <LogoSide
                                global={global}
                                width="auto"
                                businessLogo={businessLogo}
                            /> */}

                            {/* {!isSmall && location && (
                                <AddressReselect location={location} />
                            )} */}
                            
                            <div className=''>

                            </div>

                            {/* {!isSmall && (
                                <NavLinks
                                    languageDirection={languageDirection}
                                    t={t}
                                    zoneid={zoneid}
                                />
                            )} */}

                            <div className='d-md-block d-none'>
                            <NavLinks
                                    languageDirection={languageDirection}
                                    t={t}
                                    zoneid={zoneid}
                                />
                            </div>

                            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div class="offcanvas-header border-bottom">
                                <h5 class="offcanvas-title text-dark" id="offcanvasExampleLabel">FOOD KART</h5>
                                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                            <NavLinks
                                languageDirection={languageDirection}
                                t={t}
                                zoneid={zoneid}
                            />
                             <button type='button' className='btn btn_sub mt-2' onClick={()=>router.push('/category/1?name=South+Indian')}>{t('Subscribe Now')}</button>
                            </div>
                            </div>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={isSmall ? '5px' : '24px'}
                        >
                            {/* {isSmall && (
                                <Box
                                    align="center"
                                    alignItem="center"
                                    component={ButtonBase}
                                >
                                    <ThemeSwitches
                                        checked={theme_mode === 'light'}
                                        handleThemeChangeMode={changeThemeMode}
                                        themeMode={theme_mode}
                                    />
                                </Box>
                            )} */}
                            {/* {isSmall && <DrawerMenu zoneid={zoneid} />} */}

                            <Box
                                sx={{
                                    // display: { xs: 'none', md: 'flex' },
                                    display: 'none',
                                    flexGrow: 0,
                                    height: '40px',
                                    alignItems: 'center',
                                }}
                            >
                                {/* {handleShowingSearch()} */}
                                {handleAuthBasedOnRoute()}
                            </Box>
                            {/* {!isSmall && <CustomLanguage />} */}

                            <button type='button' className='btn btn_sub d-md-block d-none text-truncate' onClick={()=>router.push('/category/1?name=South+Indian')}>{t('Subscribe Now')}</button>
                            {/* <ToggleButtonGroup size="large" className='d-sm-none ' {...control} aria-label="Large sizes" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                {children}
                            </ToggleButtonGroup> */}
                            <div className='d-md-none'>
                                <img src='/static/images/menu.png' className='menu' role='button' data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample" />
                            </div>
                        </Stack>
                    </CustomStackFullWidth>
                </Toolbar>
            </CustomContainer>
            </section>
            {openSearchBox && (
                <>
                    <SearchBoxPopover searchRef={searchRef} query={query} />
                    <Box
                        onClick={() => handleClickOutside()}
                        sx={{
                            position: 'fixed',
                            top:
                                router.pathname === '/home' ? '520px' : '520px',
                            left: '0',
                            width: '100vw',
                            height: 'calc(100vh - 320px)',
                            zIndex: 999,
                        }}
                    />
                </>
            )}
        </>
    )
}
export default SecondNavbar
