import React from 'react';


export const withSuspens = (Component: React.ComponentType) => {

    return (props: any) => {
        return <React.Suspense fallback={<div>Loding...</div>}> 
         <Component {...props}/>
         </React.Suspense>

    }
}