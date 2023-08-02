import type { V2_MetaFunction } from "@remix-run/cloudflare";
import React, { useState } from "react";
import { z } from "zod";
import Icon from "~/components/icons/icon";
import { DesignVector } from "~/components/vectors/design";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Newsletter Sign up" }];
};

export default function Index() {
  const [emailInput, setEmailInput] = useState<string>("");
  const [showInvalidEmailError, setShowInvalidEmailError] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValidEmail = z.string().email().safeParse(emailInput);

    if (!isValidEmail.success) {
      setShowInvalidEmailError(true);
      return;
    }

    setShowInvalidEmailError(false);
    setIsEmailSubmitted(true);
    return;
  }

  return isEmailSubmitted ? (
    <div className="grid place-items-center mx-auto sm:place-items-start sm:mx-0">
      <main className="max-w-[504px] font-roboto max-h-[520px] py-12 px-16 flex flex-col gap-y-10 sm:px-6 sm:gap-y-0 sm:justify-between sm:min-h-screen sm:py-0">
        <div className="sm:pt-[9.375rem] flex flex-col gap-y-10">
          <BigCheckMarkIcon />
          <div className="flex flex-col gap-y-6">
            <h1 className="font-bold text-[3.5rem] leading-[100%] sm:text-[2.5rem]">
              Thanks for subscribing
            </h1>
            <p className="leading-[150%]">
              A confirmation email has been sent to{" "}
              <span className="font-bold">{emailInput}</span>. Please open it
              and click the button inside to confirm your subscription
            </p>
          </div>
        </div>
        <div className="pb-10">
          <GradientButton
            type="button"
            onClick={() => setIsEmailSubmitted(false)}
          >
            Dismiss message
          </GradientButton>
        </div>
      </main>
    </div>
  ) : (
    <main className="font-roboto flex flex-row-reverse justify-between items-center max-w-[928px] mx-auto py-6 sm:pt-0 gap-x-4 px-6 sm:flex-col sm:gap-y-10">
      <section className="max-w-[400px] overflow-hidden max-h-[593px] sm:max-h-[284px]">
        <div className="relative -left-[198px] sm:-left-[150px] sm:-top-[60px]">
          <DesignVector />
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-y-6">
          <h1 className="font-bold text-[3.5rem] leading-[100%] tracking-normal sm:text-[2.5rem]">
            Stay Updated!
          </h1>
          <p className="leading-[150%] tracking-normal">
            Join 60,000+ product managers receiving montly updates on:
          </p>
          <CheckMarkList>
            <CheckMarkListItem>
              Product discovery and building what matters
            </CheckMarkListItem>
            <CheckMarkListItem>
              Measuring to ensure updates are success
            </CheckMarkListItem>
            <CheckMarkListItem>And much more!</CheckMarkListItem>
          </CheckMarkList>
        </div>
        <form
          className="mt-10 flex flex-col"
          onSubmit={onFormSubmit}
          noValidate
        >
          <div className="flex justify-between">
            <label className="font-bold text-[0.75rem] leading-[150%]">
              Email address
            </label>
            {showInvalidEmailError ? (
              <p className="text-[0.75rem] font-bold leading-[150%] text-[#FF6155]">
                Valid Email Required
              </p>
            ) : null}
          </div>
          <input
            type="email"
            placeholder="email@company.com"
            className={`mt-2 h-14 py-4 px-6 border border-[#19182B]/25 leading-[150%] rounded-md outline-none ${
              showInvalidEmailError
                ? "bg-[#FF6155]/[0.15] border-[#FF6155] text-[#FF6155]"
                : "focus:border-[#19182B] "
            }`}
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.currentTarget.value);
            }}
          />
          <div className="mt-6 w-full">
            <GradientButton type="submit">
              Subscribe to montly newsletter
            </GradientButton>
          </div>
        </form>
      </section>
    </main>
  );
}

function CheckMarkList({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-y-[0.625rem]">{children}</ul>;
}

function CheckMarkListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-x-4 leading-[150%]">
      <CheckMarkIcon /> {children}
    </li>
  );
}

function CheckMarkIcon() {
  return (
    <div className="h-5 w-5 bg-[#FF6155] rounded-full grid place-items-center">
      <Icon icon="check" className="text-white h-3 w-3" />
    </div>
  );
}

function BigCheckMarkIcon() {
  return (
    <div className="h-16 w-16 bg-[#FF6155] rounded-full grid place-items-center">
      <Icon icon="check" className="text-white h-10 w-10" />
    </div>
  );
}

function GradientButton({
  children,
  type,
  onClick,
}: {
  type: "submit" | "button";
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type={type}
      className="h-14 bg-[#242742] rounded-md font-bold leading-[150%] text-white hover:bg-gradient-to-tr hover:from-[#FF6A3A] hover:to-[#FF527B] hover:drop-shadow-[0_16px_32px_rgba(255,97,85,0.5)] w-full"
      onClick={onClick}
    >
      {children}{" "}
    </button>
  );
}
