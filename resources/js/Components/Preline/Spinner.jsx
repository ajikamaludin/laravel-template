import React from "react";

export default function Spinner(props) {
    return (
        <span 
            className={`animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full ${props.className}`} 
            role="status" 
            aria-label="loading"
        >
        </span>
    )
}