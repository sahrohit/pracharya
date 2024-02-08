import { RxExclamationTriangle } from "react-icons/rx";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <RxExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
