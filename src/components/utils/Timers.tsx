export const renderRemainingTimer = ({
  remainingTime,
}: {
  remainingTime: number;
}) => {
  if (remainingTime === 0) {
    return <div className="timer">Too Late</div>;
  }

  return (
    <div className="timer">
      <div className="flex justify-center text-2xl text-brand-offWhite">
        {remainingTime}
      </div>
      <div className="flex justify-center text-brand-offWhite">Answer in</div>

      <div className="flex justify-center text-brand-offWhite">seconds</div>
    </div>
  );
};

export const renderNextQuestionTimer = ({
  remainingTime,
}: {
  remainingTime: number;
}) => {
  if (remainingTime === 15) {
    return <div className="timer">Loading Next Question</div>;
  }

  return (
    <div className="timer">
      <div className="flex justify-center text-2xl text-brand-offWhite">
        {remainingTime}
      </div>
      <div className="flex justify-center text-brand-offWhite">
        Next Question In
      </div>
      <div className="flex justify-center text-brand-offWhite">seconds</div>
    </div>
  );
};
