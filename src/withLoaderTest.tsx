import React from 'react';
import {Preloader} from "./components/common/Preloader/Preloader";

type WithLoaderProps<T> = {
    component: React.ComponentType<T>;
    props: T;
    isLoading:boolean
};
export const WithLoaderTest = <T extends object>({component: Component, props,isLoading}: WithLoaderProps<T>) => {
    return isLoading ? <Preloader/> : <Component {...props}/>
};

