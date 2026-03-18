import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon } from '@hugeicons/core-free-icons/index';
import { MinusSignSquareIcon } from '@hugeicons/core-free-icons/index';
import { PlusSignSquareIcon} from '@hugeicons/core-free-icons/index';
import { Card } from './card'
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '@/store/cartSlice';
const CartCard = ({ item}) => {
    const cartItems = useSelector((state) => state.cartItems);
    const dispatch = useDispatch();
    return (
        <Card className="cart-card flex-row items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-4">
                <div className="cart-card__image">
                    <img src={item.image} alt={item.title} width={80} height={80} />
                </div>
                <div className="flex items-center gap-4">
                    <div className="cart-card__details">
                        <h3 className='text-lg font-bold'>{item.title}</h3>
                        <p className='text-cyan-300 text-xl'>Price: ${item.price}</p>
                        <p className='text-muted-foreground text-2xl'>Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <HugeiconsIcon
                            onClick={() => dispatch(decrementQuantity(item))}
                            icon={MinusSignSquareIcon}
                            className="cursor-pointer text-red-500"
                        />
                        <span className='font-bold'>{item.quantity}</span>
                        <HugeiconsIcon
                            onClick={() => dispatch(incrementQuantity(item))}
                            icon={PlusSignSquareIcon}
                            className="cursor-pointer text-red-500"
                        />
                    </div>
                </div>
            </div>
            <div className="cart-card__actions">
                <HugeiconsIcon
          onClick={() => {  dispatch(removeFromCart(item.id)); alert(`${item.title} removed from cart!`)}}
          icon={Delete02Icon}
          className="cursor-pointer text-red-500"
        />
                    
                
            </div>
        </Card>
    );
};

export default CartCard;