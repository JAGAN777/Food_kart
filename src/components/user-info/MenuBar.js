import React,{useState} from 'react';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {alpha, List, MenuItem, Typography} from "@mui/material";
import {t} from "i18next";
import CustomImageContainer from "../CustomImageContainer";
import Router from "next/router";
import CustomDialogConfirm from '../custom-dialog/confirm/CustomDialogConfirm'
import { logoutSuccessFull } from '../../utils/ToasterMessages'
import { useDispatch, useSelector } from 'react-redux'
import { clearWishList } from '../../redux/slices/wishList'
import { setClearCart } from '../../redux/slices/cart'
import { removeToken } from '../../redux/slices/userToken'
import { toast } from 'react-hot-toast'




const MenuBar = ({tabData, onClose, sidedrawer, page}) => {
    const [openModal, setOpenModal] = useState(false)
    const [isLogoutLoading, setIsLogoutLoading] = useState(false)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        setIsLogoutLoading(true)
        try {
            setTimeout(() => {
                localStorage.removeItem('token')
                dispatch(removeToken())
                let a = []
                dispatch(clearWishList(a))
                dispatch(setClearCart())

                toast.success(t(logoutSuccessFull))
                onClose?.()
                if (Router.pathname === '/home') {
                    Router.push('/home')
                } else {
                    Router.push('/home')
                }
            }, 500)
        } catch (err) {
            // toast.error('Unable to logout.');
        }
    }


    const handleClick = (item) => {
        if(item?.value == 'Logout'){
            setOpenModal(true)
        }

        Router.push({
                pathname: '/info',
                query: {page: item?.value}
            },
            undefined, {shallow: true}
        )
        sidedrawer === "true" && onClose()
    }
    return (
        <div className='food_sideMenu'>
          <CustomDialogConfirm
            isLoading={isLogoutLoading}
            dialogTexts={t('Are you sure you want to  logout?')}
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSuccess={handleLogout}
           />

        <List>
            {tabData.map((item, index) => {
                if (
                    (global?.customer_wallet_status === 0 && item.id === 4) ||
                    (global?.loyalty_point_status === 0 && item.id === 5) ||
                    (global?.ref_earning_status === 0 && item.id === 6)
                ) {
                    return null
                } else {
                    return (
                        <MenuItem
                            key={index}
                            selected={item.value === page}
                            onClick={() => handleClick(item)}
                            disableGutters="true"
                            sx={{
                                color:(theme)=> item.value===page && theme.palette.primary.main,
                                paddingY: "0px",
                                marginBottom: "5px",
                                borderRadius: "5px",
                                '&:hover': {
                                    backgroundColor: (theme) =>
                                        alpha(theme.palette.primary.main, .2),
                                },
                                "&.Mui-selected": {
                                    backgroundColor: theme=> theme.palette.neutral[200],
                                }
                            }}
                        >
                            <CustomStackFullWidth direction="row" spacing={1.2} padding='10px'>
                                <CustomImageContainer src={item?.img.src} width='20px'/>
                                <Typography fontSize="14px"
                                            fontWeight="500">{t(item.label.replaceAll("-", " "))}</Typography>
                            </CustomStackFullWidth>

                        </MenuItem>
                    )
                }
            })}
        </List>
        </div>
    );
};

export default MenuBar;
