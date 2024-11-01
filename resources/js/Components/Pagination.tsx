import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"
  import { Table } from "@tanstack/react-table"
  
  import { Button } from "@/Components/ui/button"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/Components/ui/select"
import { Pagination } from "@/types"
import React, { useState } from 'react'
import {useForm} from '@inertiajs/react'
  interface DataTablePaginationProps {
    pagination: Pagination<any>
  }
  
  export function DataTablePagination({
    pagination
  }: DataTablePaginationProps) {

    
    
    

    
    

   
    function navigate(key: string, value: any) {
     // update the url with the new key and value
     const url = new URL(window.location.href);
     url.searchParams.set(key, value);
     window.location.href = url.toString();
    }
   
   

   
    
   

    

    return (
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={pagination.per_page.toString()}
              onValueChange={
                (value) => {
                  
                  navigate('pageSize', value);
                  
                  // wait 1 sec before submitting
                  
                }
              }
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pagination.per_page} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {pagination.current_page} of{" "}
            {pagination.last_page}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => navigate('page', 0)}
              disabled={pagination.first_page_url === null}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => navigate('page', pagination.current_page - 1)}
              disabled={pagination.prev_page_url === null}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => navigate('page', pagination.current_page + 1)}
              disabled={pagination.next_page_url === null}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => navigate('page', pagination.last_page)}
              disabled={pagination.last_page_url === null}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

    )
  }
  