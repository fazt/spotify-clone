import React, { useRef, FormEvent, useState } from "react";
import Cookie from 'universal-cookie'
import styled from 'styled-components'
const cookie = new Cookie()
const BASE_API = 'http://localhost:3001';

const FormStyled = styled.form`
  input {
    display: flex;
    padding: 0.7em 1em;
  }
  button {
    display: flex;
    border: none;
    color: white;
    background: #58aae6;
    padding: 1em 2em;
    border-radius: .5em;
  }
`;
const TrackListStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`
const TrackStyled = styled.div`
  position: relative;
  display: flex;
  padding: 1em;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .3s;
  &:hover {
    h2 {
      transform: scale(1.2);
    }
  }
  img {
    max-width: 100%;
  }
  h2 {
    position: absolute;
    color: white;
    z-index: 2;
  }
  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.5);
  }
`

const Track = ({ name, album, preview_url }: any) => {
  const ref = useRef<any>();
  
  function handleTrackClick() {
    if (ref.current.paused) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }
  
  return (
    <TrackStyled onClick={handleTrackClick}>
      <h2>{name}</h2>
      <img src={album.images[0].url} alt="" />
      <audio ref={ref} src={preview_url}></audio>
    </TrackStyled>
  )
}

const Home = () => {
  const formRef = useRef<any>(null);
  const [tracks, setTracks] = useState<any>([])

 async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(formRef.current);
    const search = form.get("search");

    const response = await fetch(`${BASE_API}/search?q=${search}`, {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
        setTracks(data.tracks.items)
  }

  if (!cookie.get("token")) {
    window.location.href =
      "https://accounts.spotify.com/es/authorize?client_id=ad4de3c5b92c497ab25d02397b007b62&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09";
  }
  
  return (
    <main>
      <FormStyled onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="search" placeholder="Search" />
        <button>Search</button>
      </FormStyled>
      <TrackListStyled>
        {tracks.map((track: any) => <Track key={track.name} {...track} />)}
      </TrackListStyled>
    </main>
  );
};

export default Home;
