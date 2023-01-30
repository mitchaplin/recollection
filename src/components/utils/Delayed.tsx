import { useEffect, useState } from "react";

type Props = {
  children: JSX.Element;
  waitBeforeShow?: number;
};

export const Delayed = ({
  children,
  waitBeforeShow = 500,
}: Props): JSX.Element => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown ? children : <></>;
};
