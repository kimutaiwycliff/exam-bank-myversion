import QuestionBankDialog from "./QuestionBankDialog";
import QuestionDialog from "./QuestionDialog";

const QuestionCard = ({
  index,
  number,
  question,
  marks,
  onEdit,
  onChange,
  selected,
  onSelectChange,
  checkboxKey = false,
  scrollableOption = false,
}) => {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`flex items-center justify-between p-1 mb-2 border border-primary/75 rounded-xl ${
        isEven ? 'bg-primary/85 hover:bg-primary/30' : ' hover:bg-primary'
      }`}
    >
      <div className="flex items-center space-x-5">
        {checkboxKey && (
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelectChange}
            className="ml-2"
          />
        )}
        {checkboxKey && <div className="h-10 w-[1px] bg-primary" />}
        {!scrollableOption && <p className="ml-2">{number}</p>}
        {!scrollableOption && <div className="h-10 w-[1px] bg-primary" />}
        <p className="text-md">{question}</p>
        <p>({marks} Marks)</p>
      </div>

      {!scrollableOption && (
        <div className="flex items-center space-x-1">
          <QuestionDialog type="edit" questionObject={onEdit} />
          {!checkboxKey && (
            <QuestionDialog type="change" questionObject={onChange} />
          )}
        </div>
      )}
    </div>
  );
};

export const ExamBankQuestionCard = ({
  index,
  number,
  question,
  marks,
  questionObject,
}) => {
  const isEven = index % 2 === 0;
  return (
    <>
      <div
        className={`flex items-center justify-between p-1 mb-2 border border-primary/75 rounded-xl ${
          isEven ? 'bg-primary/85 hover:bg-primary/30' : 'hover:bg-primary'
        }`}
      >
        <div className="flex items-center space-x-5">
          <p className="ml-2">{number}</p>
          <div className="h-10 w-[1px]" />
          <p className="text-md">{question}</p>
          <p>({marks} Marks)</p>
        </div>
        {questionObject && (
          <div className="flex items-center space-x-1">
            <QuestionBankDialog questionObject={questionObject} />
          </div>
        )}
      </div>
    </>
  );
};
export default QuestionCard;
