import React from "react";
import styled from "styled-components";


export type PaginatorType = {
    pageSize: number
    onPageChanged?: (page: number) => void
    allPage?: number
    currentPage: number
}

export const Pages = (props: PaginatorType) => {

    const {allPage=5, pageSize, onPageChanged, currentPage} = props

    const pages = []
    for (let i = 1; i <= allPage; i++) {
        pages.push(i);
    }

    return (
        <PaginatorStyle>
            {pages.map(p => {
                return (
                    p === currentPage
                        ? <CurrentCirclePage key={p}></CurrentCirclePage>
                        : <CirclePage  key={p}></CirclePage>
                )
            })
            }
        </PaginatorStyle>
    )
}
const PaginatorStyle = styled.div`
  display: flex;
  position: relative;
  top:70px;
  left: -15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap:10px;
`
const CirclePage = styled.span`
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background-color: rgba(203, 199, 199, 0.15);
  border: 4px solid rgba(203, 199, 199, 0.15);
`
const CurrentCirclePage = styled.span`
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background-color: white;
  border: 4px solid white;
`