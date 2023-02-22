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
        {address.slice(0, truncate)}...{address.slice(-truncate)}
    </span>
);