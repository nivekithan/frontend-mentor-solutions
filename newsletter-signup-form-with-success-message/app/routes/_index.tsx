import type { V2_MetaFunction } from "@remix-run/cloudflare";
import React, { useState } from "react";
import { z } from "zod";
import Icon from "~/components/icons/icon";
import { DesignVector } from "~/components/vectors/design";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [emailInput, setEmailInput] = useState<string>("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValidEmail = z.string().email().safeParse(emailInput);

    if (!isValidEmail.success) {
      setIsInvalidEmail(true);
      return;
    }

    setIsInvalidEmail(false);
  }

  return (
    <main className="font-roboto flex justify-between items-center max-w-[928px] max-h-[641px] mx-auto py-6 gap-x-4 px-6">
      <section>
        <div className="flex flex-col gap-y-6">
          <h1 className="font-bold text-[3.5rem] leading-[100%] tracking-normal">
            Stay Updated
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
            <label className="font-bold text-[0.75rem] leading=[150%]">
              Email address
            </label>
            {isInvalidEmail ? (
              <p className="text-[0.75rem] font-bold leading-[150%] text-[#FF6155]">
                Valid Email Required
              </p>
            ) : null}
          </div>
          <input
            type="email"
            placeholder="email@company.com"
            className={`mt-2 h-14 py-4 px-6 border border-[#19182B]/25 leading-[150%] rounded outline-none ${
              isInvalidEmail
                ? "bg-[#FF6155]/[0.15] border-[#FF6155] text-[#FF6155]"
                : "focus:border-[#19182B] "
            }`}
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.currentTarget.value);
            }}
          />
          <button
            type="submit"
            className="h-14 bg-[#242742] rounded font-bold leading-[150%] text-white mt-6 hover:bg-gradient-to-tr hover:from-[#FF6A3A] hover:to-[#FF527B] hover:drop-shadow-[0_16px_32px_rgba(255,97,85,0.5)]"
          >
            Subscribe to montly newsletter
          </button>
        </form>
      </section>
      <section className="max-w-[400px] overflow-hidden max-h-[593px]">
        <div className="relative -left-[198px]">
          <DesignVector />
        </div>
      </section>
    </main>
  );
}

function CheckMarkList({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-y-[0.625rem]">{children}</ul>;
}

function CheckMarkListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-x-4">
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
