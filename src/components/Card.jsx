export const Card = ({children, className = 'bg-white',...props}) => {
    return(
        <div
        className={` rounded-2xl shadow-lg p-6 ${className}` }
        {...props}
        >
        {children}
        </div>
    );
};
