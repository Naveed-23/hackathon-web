export const Input = ({...props}) => {
    return (
      <input
        {...props}
        type="search"
        className="h-12 w-full sm:w-[30rem] md:w-[30rem] lg:w-[45rem] xl:w-[52.5rem] p-6 outline-none rounded-lg pl-10 pr-4 cursor-text"
        placeholder="Search"
      />
    );
  };