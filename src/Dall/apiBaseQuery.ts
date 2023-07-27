import {BaseQueryFn} from "@reduxjs/toolkit/dist/query/react";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {AppDispatch} from "../redux/store";


interface CustomQueryArgs extends AxiosRequestConfig {
    onSuccess?: (dispatch: AppDispatch, data: unknown) => Promise<void>;
}

export type CustomBaseQueryType = BaseQueryFn<CustomQueryArgs, unknown, unknown>;



export const axiosBaseQuery =
    (
        {baseUrl}: { baseUrl: string } = {baseUrl: ''}
    ):
        BaseQueryFn<
            {
                url: string
                method: AxiosRequestConfig['method']
                data?: AxiosRequestConfig['data']
                params?: AxiosRequestConfig['params']
                withCredentials?: AxiosRequestConfig['withCredentials']

            },
            unknown,
            unknown
        > => {
        return async ({url, method, data, params, withCredentials}) => {
            try {
                const result = await axios({url: baseUrl + url, method, data, params, withCredentials: true})
                return {data: result.data}
            } catch (axiosError) {
                let err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        };
    }