import React from 'react'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPaginatedData = async (pageNumber, pageSize, url) => {
  const response = await axios.get(url, {
    params: {
      pageNumber,
      pageSize,
    },
  });
  return response.data;
};

export const usePaginatedQuery = (page,key, url, pageSize = 10) => {
  

  const {
    data,
    isLoading,
    isError, // Helpful for knowing if the data is from the previous page
    refetch,
  } = useQuery({
    queryKey: [key, page],
    queryFn: () => fetchPaginatedData(page,pageSize,url),
  })
  
/*
  const nextPage = () => {
    if (!isPreviousData && data?.hasMore) {
      setPage((old) => old + 1);
    }
  };

  const prevPage = () => {
    setPage((old) => Math.max(old - 1, 1));
  };
   const handlechange = (event,value)=>{
    setPage(value);
   }*/
  return {
    data,
    isLoading,
    isError,
    
    refetch,
  };
};