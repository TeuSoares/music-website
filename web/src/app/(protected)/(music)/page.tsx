'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useAppContext } from '@/hooks'

import GhostButton from '@/components/layout/ghost-button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import MusicService from './MusicService'

import { Music, Play, Pencil, Trash2, StopCircle } from 'lucide-react'

export default function Home() {
  const [youTubeId, setYouTubeId] = useState<string | null>(null)
  const [selectedMusic, setSelectedMusic] = useState<number>(0)
  const [selectedNameMusic, setSelectedNameMusic] = useState<string | null>(
    null,
  )

  const { setDataToUpdate } = useAppContext()

  const router = useRouter()

  const { data, error, handleDeleteMusic } = MusicService()

  return (
    <div className="flex flex-col h-full gap-5">
      <div className="flex flex-col h-[250px] min-[500px]:h-[450px] rounded-md border-2 border-white">
        <div className="bg-[#111111] p-1 w-full text-center border-b-2 border-white">
          <div className="flex justify-center items-center text-white font-bold gap-2">
            {selectedNameMusic && <Music />}
            <h1>
              {selectedNameMusic ?? 'Choose a music would you like to hear'}
            </h1>
          </div>
        </div>
        {!youTubeId && (
          <div className="h-full bg-banner bg-cover bg-center">
            <div className="h-full flex justify-center items-center bg-gradient-to-r from-black/80 to-black/50">
              <h2 className="text-white font-bold"></h2>
            </div>
          </div>
        )}
        {youTubeId && (
          <iframe
            width="100%"
            height="100%"
            className="rounded-md"
            src={`https://www.youtube.com/embed/${youTubeId}`}
          ></iframe>
        )}
      </div>
      <div className="flex-1 overflow-hidden overflow-y-auto scrollbar-style">
        <Table className="h-full">
          {!data?.data && !error && (
            <TableCaption className="text-[#acacac]">{`You don't have a music on your album yet`}</TableCaption>
          )}
          <TableHeader>
            <TableRow className="text-[#acacac]">
              <TableHead className="w-[40px] text-center">#</TableHead>
              <TableHead className="w-[100px]">Thumbnail</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Music</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {data?.data.map((music) => (
              <TableRow
                key={music.id}
                className={`text-white ${youTubeId && selectedMusic == music.id ? 'bg-[#972e2e]' : 'bg-[#111111]'}`}
              >
                <TableCell>
                  {(!youTubeId || (youTubeId && selectedMusic != music.id)) && (
                    <GhostButton
                      onClick={() => {
                        setYouTubeId(music.youtube_id)
                        setSelectedMusic(music.id)
                        setSelectedNameMusic(music.name)
                      }}
                    >
                      <Play className="h-5 w-5" />
                    </GhostButton>
                  )}
                  {youTubeId && selectedMusic == music.id && (
                    <GhostButton
                      onClick={() => {
                        setYouTubeId(null)
                        setSelectedMusic(0)
                        setSelectedNameMusic(null)
                      }}
                    >
                      <StopCircle className="h-5 w-5" />
                    </GhostButton>
                  )}
                </TableCell>
                <TableCell>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${music.thumbnail}`}
                    alt={`${music.name}`}
                    width={65}
                    height={65}
                  />
                </TableCell>
                <TableCell>{music.artist}</TableCell>
                <TableCell>{music.name}</TableCell>
                <TableCell className="text-right">
                  <GhostButton
                    onClick={() => {
                      setDataToUpdate(music)
                      router.push(`/${music.id}/update`)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </GhostButton>
                  <GhostButton onClick={() => handleDeleteMusic(music.id)}>
                    <Trash2 className="h-4 w-4" />
                  </GhostButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
