const SpinningLoader = () => {
  return (
    <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};
export default SpinningLoader;
