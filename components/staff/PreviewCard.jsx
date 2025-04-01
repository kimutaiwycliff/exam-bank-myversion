const PreviewCard = ({ number, question, marks }) => {
  return (
    <div className="mb-4 mx-14">
      <div className="flex flex-row items-center space-x-10 mb-4">
        <p className="ml-2">{number}</p>
        <p className="">{question}</p>
        <p>({marks} Marks)</p>
      </div>
      <DottedLine marks={marks} />
    </div>
  );
};

const DottedLine = ({ marks }) => {
  const dots = Array(220).fill('.');

  return (
    <>
      {Array.from({ length: marks }).map((_, index) => (
        <div key={index} className="mb-3">
          <p className="text-black mx-20">{dots.join('')}</p>
        </div>
      ))}
    </>
  );
};
export default PreviewCard;
