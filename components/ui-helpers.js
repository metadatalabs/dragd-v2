export const ModalHeading = ({ children }) => (
    <h2 className="text-lg leading-6 font-medium w-full text-center text-slate-900 dark:text-white mb-4">{children}</h2>
);

export const ShinyButton = (props) => (
    <button
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-slate-500 to-slate-600 transition duration-150 hover:from-slate-600 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        {...props} />
);

// badge that shows truncated wallet address
export const AddressBadge = ({ address, truncate = 4 }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
        {(address.length < truncate * 3) ? address :
        `${address.slice(0, truncate)}...${address.slice(-truncate)}`}
    </span>
);
export const Chevron = (props) => {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" focusable="false" shape-rendering="geometricPrecision"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
}

export const ThreeDots = (props) => {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 29.96 122.88"><path class="cls-1" d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"/></svg>
}

export const ErrorText = ({children}) => {
    return <div className={"bg-red-200 text-red-700 border-red-500 border mx-auto p-2 mt-2 rounded-md"}>{children}</div>
}