import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 0,
        products: [],
    },
    reducers: {
        addProducts(state: any, action: any) {
            const { payload } = action;
            const products = [...state.products];
            const index = products.findIndex((x) => x.id === payload.id);
            if (index === -1) {
                state.products = [...state.products, { ...payload.product, quantity: payload.quantity }];
                state.quantity = state.products.length;
            } else {
                state.products[index].quantity += payload.quantity;
            }
        },
        removeProduct(state: any, action: any) {
            const { payload } = action;
            state.products = state.products.filter((x: any) => x.id !== payload);
        },
        cartItemIncrease(state: any, action: any) {
            const { payload } = action;
            const products = [...state.products];
            const index = products.findIndex((x) => x.id === payload);
            if (index !== -1) {
                state.products[index].quantity += 1;
            }
        },
        cartItemDecrease(state: any, action: any) {
            const { payload } = action;
            const products = [...state.products];
            const index = products.findIndex((x) => x.id === payload);
            if (index !== -1) {
                if (state.products[index].quantity === 1) {
                    state.products = state.products.filter((x: any) => x.id !== payload);
                } else {
                    state.products[index].quantity -= 1;
                }
            }
        },
    },
} as any);

export default cartSlice;
