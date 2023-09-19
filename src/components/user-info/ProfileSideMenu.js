import React from 'react';
import order from "../../../public/static/profile/order.svg";    
import subscribe from "../../../public/static/images/menus/4.png";
import profile from "../../../public/static/images/menus/3.png";
import cupons from "../../../public/static/profile/cupons.png";
import wallet from "../../../public/static//images/menus/6.png";
import Address from "../../../public/static//images/menus/5.png";
import Track from "../../../public/static//images/menus/7.png";
import Notification from "../../../public/static//images/menus/8.png";
import logout from "../../../public/static//images/menus/9.png";
import loyalty from "../../../public/static/profile/loyalty.svg";
import refer from "../../../public/static/refer_code.png";
// import address from "../../../public/static/profile/address.png";
import settings from "../../../public/static/profile/settings.svg";
import wish from "../../../public/static/profile/wish.svg"
import inboxIcon from "../../../public/static/profile/inbox-icon.png"
import {CustomPaperBigCard, CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import CustomerInfo from "./CustomerInfo";
import MenuBar from "./MenuBar";
import {RTL} from "../RTL/RTL";
export const tabData = [
    {
        id: 1,
        label: 'My Profile',
        value:"profile",
        img: profile,
    },
    // {
    //     id: 2,
    //     label: 'Orders',
    //     value:"order",
    //     img: order,
    // },
    {
        id: 2,
        label: 'My Subscriptions',
        value:"subscription",
        img: subscribe,
    },
    // {
    //     id: 3,
    //     label: 'Coupons',
    //     value:"coupons",
    //     img: cupons,
    // },
    // {
    //     id: 4,
    //     label: 'Wish List',
    //     value: 'wishlist',
    //     img:wish,
    // },

    // {
    //     id: 6,
    //     label: 'Loyalty Points',
    //     value:"loyalty",
    //     img: loyalty,
    // },
    // {
    //     id: 7,
    //     label: 'Referral Code',
    //     value: 'referral',
    //     img:refer,

    // },
    // {
    //     id: 8,
    //     label: 'Inbox',
    //     value: 'inbox',
    //     img:inboxIcon,

    // },
   
    // {
    //     id: 9,
    //     label: 'Settings',
    //     value: 'settings',
    //     img: settings,
    // },
    {
        id: 10,
        label: 'Address',
        value:"Address",
        img: Address,
    },
    {
        id: 5,
        label: 'Wallets',
        value:"wallets",
        img: wallet,
    },
    // {
    //     id: 11,
    //     label: 'Track My Food',
    //     value:"Track My Food",
    //     img: Track,
    // },
    {
        id: 12,
        label: 'Notification',
        value:"Notification",
        img: Notification,
    },
    {
        id: 13,
        label: 'Logout',
        value:"Logout",
        img: logout,
    },
]

const ProfileSideMenu = ({onClose,sidedrawer,page}) => {let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <RTL direction={languageDirection} >
        <CustomPaperBigCard padding="1rem" sx={{borderRadius:"5px",height:"100%"}}>
           <CustomStackFullWidth spacing={3}>
               <CustomerInfo/>
               <MenuBar  tabData={tabData} onClose={onClose} sidedrawer={sidedrawer} page={page}/>
           </CustomStackFullWidth>
        </CustomPaperBigCard>
        </RTL>
    );
};

export default ProfileSideMenu;

export const ProfileSideMenu1 = ({onClose,sidedrawer,page}) => {let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <RTL direction={languageDirection} >
        {/* <CustomPaperBigCard padding="1rem" sx={{borderRadius:"5px",height:"100%"}}> */}
        <div className='p-3 h-100'>
           <CustomStackFullWidth spacing={3}>
               <CustomerInfo/>
               <MenuBar  tabData={tabData} onClose={onClose} sidedrawer={sidedrawer} page={page}/>
           </CustomStackFullWidth>
        </div>
        {/* </CustomPaperBigCard> */}
        </RTL>
    );
};

