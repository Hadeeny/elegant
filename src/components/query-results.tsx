"use client";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";
import Spinner from "./ui/spinner";
import Link from "next/link";

const QueryResults = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.toLocaleLowerCase();

  // const fetchResults = async () => {
  //   const response = await axios.get(`/api/search/${query}`);
  //   return response.data;
  // };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["product-search", query],
    queryFn: () => fetch(`/api/search/${query}`).then((res) => res.json()),
  });

  if (isPending) {
    return (
      <div className="w-full mx-auto">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!query) {
    return;
  }

  return (
    <div className="fixed dark:bg-slate-800 max-h-[20rem] overflow-y-scroll bg-white inset-x-0 top-20 rounded-md z-20 p-8 w-10/12 mx-auto ">
      {query.length > 0 && data.data.length === 0 && <p>No results found</p>}
      <div className="text-xl font-medium flex flex-col gap-y-2">
        {data.data.map((product: Product, index: number) => (
          <Link
            className="hover:bg-slate-400 duration-500"
            href={`/s/${product.id}`}
            key={index}
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QueryResults;
