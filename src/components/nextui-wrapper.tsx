"use client";
import { NextUIProvider } from "@nextui-org/system";
import { PropsWithChildren, useEffect, useState } from "react";

const NextUI = ({ children }: PropsWithChildren) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUI;
