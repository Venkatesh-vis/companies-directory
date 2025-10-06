import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {COMPANY_ACTION_TYPES} from "../store/companiesReducer.js";


const Toast = () => {
    const dispatch = useDispatch();
    const toast = useSelector(state => state.companies.toast);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (toast) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(() => {
                    dispatch({ type: COMPANY_ACTION_TYPES.SET_TOAST, payload: null });
                }, 300);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast, dispatch]);

    if (!toast) return null;

    const message = typeof toast === "string" ? toast : toast.message;
    const type = toast?.type || "info";

    const bgColor = type === "error" ? "bg-red-600" : type === "success" ? "bg-green-600" : "bg-black";

    return (
        <div className={`fixed bottom-16 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full text-white z-50 transition-all duration-300 ${bgColor}`}
             style={{ opacity: visible ? 1 : 0, transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})` }}>
            {message}
        </div>
    );
};

export default Toast;
