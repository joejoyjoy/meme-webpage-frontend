import { useCallback, useContext, useEffect, useState } from 'react';
import useGifApi from '../../../hooks/useGifApi';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { GifDataContext } from '../../../context/GifDataContext';
import { SearchGifsContext } from '../../../context/SearchGifs';
import CopyUrl from '../copyUrl/CopyUrl';
import './contentComponent.scss'
import { TbSortDescending, TbSortAscending } from 'react-icons/tb';
import GifPlaceholder from '../../../assets/webp/gif-placeholder.webp';
import UserPlaceholder from '../../../assets/webp/user-placeholder.webp';
import EmptyError from '../../../assets/png/empty-error.png';

export default function ContentComponent() {
  const { getAllGifs } = useGifApi()
  const { gifMemes, setGifMemes, getGifsOfExternalApi } = useContext(GifDataContext);
  const { keyword } = useContext(SearchGifsContext);
  const [sortOrder, setSortOrder] = useState("ascn");
  const [gifsExternalApi, setGifsExternalApi] = useState([]);
  const [gifsExternalApiNoRepeat, setGifsExternalApiNoRepeat] = useState([]);
  const [listRef] = useAutoAnimate();

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const sortedData = useCallback(
    () => sortData({ reverse: sortOrder === "desc" }),
    [gifMemes, sortOrder]
  );

  function changeSortToAZ() {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
  }

  function sortData({ reverse }) {
    const sortedData = gifMemes.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });

    if (reverse) {
      return sortedData.reverse();
    }

    return sortedData;
  }

  function SortAZButton({ sortOrder, onClick }) {
    return (
      <button
        onClick={onClick}
        className="sort-button-aZ"
      >
        {sortOrder === "desc" ?
          <>
            <TbSortDescending size={21} />
            <p>Z-A</p>
          </>
          :
          <>
            <TbSortAscending size={21} />
            <p>A-Z</p>
          </>
        }
      </button>
    );
  }

  const searchGifs = sortedData().filter((p) =>
    p.name.toString().toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(() => {
    getGifsOfExternalApi().then(data => {
      setGifsExternalApi(data);
    })
    getAllGifs().then(allGifs => {
      setGifMemes(allGifs)
    })
  }, [])

  useEffect(() => {
    const seen = new Set();
    const uniqueAuthors = gifsExternalApi.filter(item => {
      const duplicate = seen.has(item.id);
      seen.add(item.id);
      return !duplicate;
    });
    setGifsExternalApiNoRepeat(uniqueAuthors);
  }, [gifsExternalApi])

  return (
    <div className="content-component" id="searchResult">
      <section className="content-component__head">
        <span className="content-component__head--title">Feed</span>
        <div className="content-component__head--actions">
          <SortAZButton
            sortOrder={sortOrder}
            onClick={changeSortToAZ}
          />
        </div>
      </section>
      <section className="content-component__grid" ref={listRef}>
        {searchGifs.map((gifMeme) => {
          return (
            <article key={gifMeme._id} className="content-component__grid--item">
              <div className="content-component__grid--item__head">
                <img src={UserPlaceholder} alt="User Placeholder" />
                <div className="content-component__grid--item__head--user">
                  <p>User name</p>
                  <span>{`${formatter.format(Date.parse(gifMeme.createdAt))} at ${gifMeme.createdAt.substring(11, 16)} o'clock`}</span>
                </div>
                <CopyUrl gifUrl={gifMeme?.imageUrl ? gifMeme.imageUrl : location.href} />
              </div>
              <img src={gifMeme?.imageUrl ? gifMeme.imageUrl : GifPlaceholder} alt={gifMeme.name} className="content-component__grid--item__image" />
              <span className="content-component__grid--item__name">{gifMeme.name}</span>
            </article>
          );
        })
        }
      </section>
      {gifMemes.length === 0 || searchGifs.length === 0 &&
        <span className="content-component__empty-error">
          <img src={EmptyError} alt="Empty Error Image" />
          There are no Gifs to display
        </span>
      }
      <section className="content-component__giphy">
        <span className="content-component__giphy--title">Top 25 GIFs from GIPHY</span>
      </section>
      <section className="content-component__grid">
        {gifsExternalApiNoRepeat.map((gifMeme) => {
          return (
            <article key={gifMeme.id} className="content-component__grid--item">
              <div className="content-component__grid--item__head">
                <img src={gifMeme.user ? gifMeme.user.avatar_url : UserPlaceholder} alt="Gif uploader avatar" />
                <div className="content-component__grid--item__head--user">
                  <p>{gifMeme.user ? gifMeme.user.username : "Anonymous user"}</p>
                  <span>{`${formatter.format(Date.parse(gifMeme.import_datetime))} at ${gifMeme.import_datetime.substring(11, 16)} o'clock`}</span>
                </div>
                <CopyUrl gifUrl={gifMeme.images.original.webp} />
              </div>
              <img src={gifMeme.images.original.webp} alt={gifMeme.title} className="content-component__grid--item__image" />
              <span className="content-component__grid--item__name">{gifMeme.title}</span>
            </article>
          );
        })
        }
      </section>
    </div>
  )
}

