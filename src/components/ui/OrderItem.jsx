import React from 'react';
import { Button } from './button';
import { Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useThemeStore } from '@/store/useThemeStore';
import { removeFromCart } from '@/store/cartSlice';
const OrderItem = ({ item }) => {
    const theme = useThemeStore(state => state.theme);
    const cartItems = useSelector(state => state.cartItems);
    const dispatch = useDispatch();
    return (
        <div
            className={`flex items-center justify-between py-2 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg px-4`}
        >
            <div>
                <p className="font-medium truncate">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                    {item.quantity} × ${item.price.toFixed(2)}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                </span>

                {cartItems && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dispatch(removeFromCart(item))}
                    >
                        <Trash2 size={16} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OrderItem;
