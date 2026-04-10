import { Separator } from './separator';
import { useSelector } from 'react-redux';

const OrderTotal = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <>
            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </>
    );
};

export default OrderTotal;
