import React, { memo, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import FoodDetailModal from '../foodDetail-modal/FoodDetailModal'
import ProductCardMedia from './ProductCardMedia'
import {
    calculateItemBasePrice,
    getAmount,
    getConvertDiscount,
    handleBadge,
    isAvailable,
} from '../../utils/customFunctions'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment/moment'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CustomOverlayBox } from '../../styled-components/CustomStyles.style'
import IconButton from '@mui/material/IconButton'
import { toast } from 'react-hot-toast'
import StartPriceView from '../foodDetail-modal/StartPriceView'
import { useMutation } from 'react-query'
import { ProductsApi } from '../../hooks/react-query/config/productsApi'
import { addWishList, removeWishListFood } from '../../redux/slices/wishList'
import { useWishListDelete } from '../../hooks/react-query/config/wish-list/useWishListDelete'
import { RTL } from '../RTL/RTL'
import HorizontalFoodCard from './HorizontalFoodCard'
import FoodVerticalCard from './FoodVerticalCard'
import { CustomChip } from './FoodCard.style'
import { setCart, setClearCart } from '../../redux/slices/cart'
import CartClearModal from '../foodDetail-modal/CartClearModal'


const FoodCard = ({
    product,
    horizontal,
    productImageUrl,
    hasBackGroundSection,
    plansInfo
}) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const {
        name,
        image,
        restaurant_name,
        avg_rating,
        price,
        discount,
        discount_type,
        available_time_ends,
        available_time_starts,
        restaurant_discount,
        
    } = product

    const [openModal, setOpenModal] = React.useState(false)
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    // const {plans} = useSelector((state) => state.storedData)
    const { token } = useSelector((state) => state.userToken)
    const imageUrl = `${productImageUrl}/${image}`
    const [modalData, setModalData] = useState([])
    const [incrOpen, setIncrOpen] = useState(false)

    const [clearCartModal, setClearCartModal] = React.useState(false)
    const handleClearCartModalOpen = () => setClearCartModal(true)
    const { wishLists } = useSelector((state) => state.wishList)
    const { cartList } = useSelector((state) => state.cart)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    
    const discountPrice =
        price -
        (discount_type === 'percent' ? (price * discount) / 100 : discount)
    const handleFoodDetailModal = (e) => {
        e.stopPropagation()
        setOpenModal(true)
    }
    const languageDirection = localStorage.getItem('direction')
    const handleModalClose = () => {
        setOpenModal(false)
    }

    const {
        mutate: addFavoriteMutation,
        isLoading,
        error,
        data,
    } = useMutation(
        'add-favourite',
        () => ProductsApi.addFavorite(product.id),
        {
            onSuccess: (response) => {
                if (response?.data) {
                    dispatch(addWishList(product))
                    toast.success(response.data.message)
                }
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            },
        }
    )

    const addToFavorite = (e) => {
        e.stopPropagation()
        if (token) {
            addFavoriteMutation()
            // notify(data.message)
        } else toast.error(t('You are not logged in'))
    }

    const onSuccessHandlerForDelete = (res) => {
        dispatch(removeWishListFood(product.id))
        toast.success(res.message, {
            id: 'wishlist',
        })
    }
    const { mutate } = useWishListDelete()
    const deleteWishlistItem = (id, e) => {
        e.stopPropagation()
        mutate(id, {
            onSuccess: onSuccessHandlerForDelete,
            onError: (error) => {
                toast.error(error.response.data.message)
            },
        })
    }
    // const addToFav = () => {
    //     toast.success('add')
    // }

    const isInList = (id) => {
        return !!wishLists?.food?.find((wishFood) => wishFood.id === id)
    }
    const isInCart = cartList?.find((things) => things?.id === product?.id)

    useEffect(() => {
        if (product) {  
            product['plans'] = plansInfo
            product['reitem'] = cartList.length
            setModalData([product])
        }
    }, [product,plansInfo]) 
    
    // console.log("ggjf",modalData)

  

    const addToCartHandler = () => {
        if (cartList.length > 0) {
            const isRestaurantExist = cartList.find(
                (item) => item.restaurant_id === product.restaurant_id
            )
            if (isRestaurantExist) {
                dispatch(
                    setCart({
                        ...modalData[0],
                        // totalPrice: getConvertDiscount(
                        //      modalData[0]?.discount,
                        //      modalData[0]?.discount_type,
                        //      modalData[0]?.price,
                        //      0,
                        //      1
                        // ),
                        totalPrice:  modalData[0]?.plans?.price,
                        selectedAddons: [],
                        quantity: 1,
                        // itemBasePrice: getConvertDiscount(
                        //     modalData[0]?.discount,
                        //      modalData[0]?.discount_type,
                        //     modalData[0]?.price,
                        //      0,
                        //      1
                        // ),
                        itemBasePrice:modalData[0]?.plans?.price,
                    })
                )
                toast.success(t('Item added to cart'))
            } else {
                if (cartList.length !== 0) {
                    handleClearCartModalOpen()
                }
            }
        } else {
            if (!isInCart) {
                dispatch(
                    setCart({
                        ...modalData[0],
                        // totalPrice: getConvertDiscount(
                        //     product?.discount,
                        //     product?.discount_type,
                        //     modalData[0]?.price,
                        //     product?.restaurant_discount,
                        //     product.quantity
                        // ),
                    //     totalPrice: getConvertDiscount(
                    //         modalData[0]?.discount,
                    //         modalData[0]?.discount_type,
                    //        modalData[0]?.price,
                    //         0,
                    //         1
                    //    ),
                        totalPrice:  modalData[0]?.plans?.price,
                        quantity: 1,
                        selectedAddons: [],
                        // itemBasePrice: getConvertDiscount(
                        //     product?.discount,
                        //     product?.discount_type,
                        //     product?.price,
                        //     product?.restaurant_discount
                        // ),
                    //     itemBasePrice:getConvertDiscount(
                    //         modalData[0]?.discount,
                    //         modalData[0]?.discount_type,
                    //         modalData[0]?.price,
                    //         0,
                    //         1
                    //    ),
                    itemBasePrice:modalData[0]?.plans?.price,
                    })
                )
                setIncrOpen(true)
                toast.success(t('Item added to cart'))
            }
        }
    }

    const addToCart = (e) => { 
        if (product?.variations.length > 0 || product?.add_ons?.length > 0) {
            setOpenModal(true)
        } else if (product?.available_date_ends) {
            setOpenModal(true)
        } else {
            
            addToCartHandler()
            e.stopPropagation()
        }
    }
    const getQuantity = (id) => {
        const product = cartList.find((cartItem) => cartItem.id === id)
        return product && product.quantity ? product.quantity : 1
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIncrOpen(false)
        }, 10000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [incrOpen])

    const handleClickQuantityButton = (e) => {
        e.stopPropagation()
        setIncrOpen(true)
    }
    
    const clearCartAlert = () => {
        dispatch(setClearCart())
        setClearCartModal(false)
        dispatch(
            setCart({
                ...modalData[0],
                totalPrice: getConvertDiscount(
                    product?.discount,
                    product?.discount_type,
                    modalData[0]?.price,
                    product?.restaurant_discount,
                    product.quantity
                ),
                selectedAddons: [],
                quantity: 1,
                itemBasePrice: getConvertDiscount(
                    product?.discount,
                    product?.discount_type,
                    product?.price,
                    product?.restaurant_discount
                ),
            })
        )
        toast.success(
            t(
                'Previously added restaurant foods have been removed from cart and the selected one added'
            ),
            {
                duration: 6000,
            }
        )
    }

    return (
        <>
            {horizontal == 'true' ? (
                <HorizontalFoodCard
                    isInList={isInList}
                    product={product}
                    imageUrl={imageUrl}
                    addToFavorite={addToFavorite}
                    deleteWishlistItem={deleteWishlistItem}
                    setOpenModal={setOpenModal}
                    available_time_starts={available_time_starts}
                    available_time_ends={available_time_ends}
                    languageDirection={languageDirection}
                    handleFoodDetailModal={handleFoodDetailModal}
                    handleBadge={handleBadge}
                    addToCart={addToCart}
                    isInCart={isInCart}
                    getQuantity={getQuantity}
                    incrOpen={incrOpen}
                    setIncrOpen={setIncrOpen}
                    handleClickQuantityButton={handleClickQuantityButton}
                    hasBackGroundSection={hasBackGroundSection}
                />
            ) : (
                <FoodVerticalCard
                    plansDetails={plansInfo}
                    isInList={isInList}
                    product={product}
                    imageUrl={imageUrl}
                    productImageUrl={productImageUrl}
                    addToFavorite={addToFavorite}
                    deleteWishlistItem={deleteWishlistItem}
                    setOpenModal={setOpenModal}
                    available_time_starts={available_time_starts}
                    available_time_ends={available_time_ends}
                    languageDirection={languageDirection}
                    handleFoodDetailModal={handleFoodDetailModal}
                    handleBadge={handleBadge}
                    addToCart={addToCart}
                    isInCart={isInCart}
                    getQuantity={getQuantity}
                    incrOpen={incrOpen}
                    setIncrOpen={setIncrOpen}
                    handleClickQuantityButton={handleClickQuantityButton}
                    hasBackGroundSection={hasBackGroundSection}
                />
            )}
            {openModal && (
                <RTL direction={languageDirection}>
                    <FoodDetailModal
                        product={product}
                        image={imageUrl}
                        open={openModal}
                        handleModalClose={handleModalClose}
                        setOpen={setOpenModal}
                        currencySymbolDirection={currencySymbolDirection}
                        currencySymbol={currencySymbol}
                        digitAfterDecimalPoint={digitAfterDecimalPoint}
                        handleBadge={handleBadge}
                    />
                </RTL>
            )}
            <CartClearModal
                clearCartModal={clearCartModal}
                setClearCartModal={setClearCartModal}
                clearCartAlert={clearCartAlert}
                addToCard={addToCart}
            />
        </>
    )
}

FoodCard.propTypes = {}

export default memo(FoodCard)
