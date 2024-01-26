// @ts-nocheck 

"use client"

import type { tvShow } from '@prisma/client'
import { trpc } from "@/trpc/client";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Video from 'next-video';
import { pages } from 'next/dist/build/templates/app-page';
import { CardContent, Card } from "@/components/ui/card"

interface TVShow {
  posterLink: string;
  name: string;
  id: string;
  videoLink: string;

}

interface InfiniteQueryData {
  pages: TVShow[][];
}

export default function TV() {





  const [page, setPage] = useState(0);
  const [movieInfo, setmovieInfo] = useState([]);
  const [currSeason, setCurrSeason] = useState(0);
  const [currEpisode, setCurrEpisode] = useState(1);

  const doSomething = async () => {
    const url = 'https://api.themoviedb.org/3/tv/94954?language=en-US';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2ZjMzhiYzlmOTM2ZjdlOWE5OWZlOWNjNzY3MGRiMyIsInN1YiI6IjY1YjJkMTA5YTE5OWE2MDE3YzlkODgyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UCXyMROWyI4nu1qMXrHqZkiOuwQ8DiIlsxuuAPliXOY'
      }
    };

    let tmdb = await fetch(url, options)
      .then(res => res.json())
    let seasons =
      tmdb["seasons"]

    console.log(seasons)
    seasons.forEach((ssn) => {
      movieInfo.push({
        season: ssn.season_number,
        episode_count: ssn.episode_count
      })
    })
  }

  useEffect(() => {
    if (typeof window != "undefined") {
      doSomething();
    }
  }, [])
  const {
    data: shows,
    // call this function to get another 4 posts
    fetchNextPage,
    // flag to decide if there is more posts
    hasNextPage,
    // flag to indicate if we're fetching or not
    isFetchingNextPage
  } = trpc.tvShows.get.useInfiniteQuery(
    async ({ pageParam = '' }): Promise<{ posts: TVShow[]; nextId: string }> => { return await trpc.tvShows.get.useQuery({ cursor: pageParam }) as InfiniteQueryData },
    {
      // lastPage is the data returned from getPosts function
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  )

  const { inView, ref } = useInView()
 
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  const setSeason = (event) => {
    setCurrSeason(event.target.value)
  }
  const setEpisode = (event) => {
    setCurrEpisode(event.target.value)
  }

  let currEpisodes = []
  if (movieInfo[currSeason]) {
    for (let i = 1; i < movieInfo[currSeason].episode_count + 1; i++) {
      currEpisodes.push(<option value={i}>{i}</option>)
    }
  }

  const getseasonstring = () => {
    let sstring = ""
    let estring = ""
    if (currSeason >= 0 && currSeason <= 9) sstring = "S0" + currSeason

    if (currEpisode >= 0 && currEpisode <= 9) estring = "E0" + currEpisode

    if (currSeason >= 10) sstring = "S" + currSeason

    if (currEpisode >= 10) estring = "E" + currEpisode

    return sstring + estring
  }

  const list = [];
  let i = 0;


  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
       {shows && shows.pages?.flatMap((page, i) => {
          return (
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
          
           )
        
          })}


      <div
        className="mx-auto flex max-w-6xl justify-center opacity-0"
        ref={ref}
      />
    </div>
  )
}