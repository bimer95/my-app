import React from 'react';


export const withSuspens = (Component) => {

    return (props) => {
        return <React.Suspense fallback={<div>Loding...</div>}> 
         <Component {...props}/>
         </React.Suspense>

    }
}