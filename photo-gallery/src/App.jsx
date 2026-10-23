import { useReducer,useEffect } from 'react'
import './App.css'
import left from './assets/left.png'
import right from './assets/right.png'
import useFetchPhotos from './hooks/useFetchPhotos'
import weddingEnvelope from './assets/wedding-envelope.png'
function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAV':
      if (state.includes(action.id)) {
        return state.filter((id) => id !== action.id)
      }

      return [...state, action.id]

    default:
      return state
  }
}
function Envelope() {
  return (
    <div className="envelope">
      <img
        src={weddingEnvelope}
        alt=""
        aria-hidden="true"
      />
    </div>
  )
}

function InvitationCard({ author, photoId, isFavourite, onToggle })  {
  return (
    <div className="card-scene group">
      <Envelope />

<article className="invitation-card transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:!shadow-[0_8px_28px_4px_rgba(92,145,65,0.60)]">
  <div className="invitation-inner ">
            <p className="invitation-label font-bold !text-[10px] !text-[#B8860B]">A MOMENT TO REMEMBER</p>

          <div className="invitation-photo">
            <img
    src={`https://picsum.photos/id/${photoId}/400/500`}
    alt={`Photo by ${author}`}
            />
          </div>

          <h2 className="invitation-name !text-base !font-bold text-[#556B2F] ">{author}</h2>

                <button
          className="invitation-favourite"
          type="button"
          aria-label={
            isFavourite
              ? `Remove ${author} from favourites`
              : `Add ${author} to favourites`
          }
          aria-pressed={isFavourite}
          onClick={onToggle}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
   
        </div>
      </article>
    </div>
  )
}

export default function App() {
    const { photos, loading, error } = useFetchPhotos();
    const [favourites, dispatch] = useReducer(
        favouritesReducer,
        [],
        () => {
          try {
            return JSON.parse(localStorage.getItem('favourites')) ?? []
          } catch {
            return []
          }
        }
      )

      useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
      }, [favourites])
   
    if (loading) {
      return (
        <main className="gallery-page flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-lime-200/50 blur-xl animate-pulse" />

              <div
                role="status"
                aria-label="Loading photos"
                className="absolute inset-1 rounded-full border-[3px] border-[#dce5ce] border-t-[#65764b] animate-spin"
              />

              <span className="animate-pulse text-3xl text-[#65764b]">
                ❧
              </span>
            </div>

            <div className="space-y-2">
              <p className="animate-pulse text-2xl italic text-[#41432b]">
                Gathering your moments
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8b8d70]">
                A little patience, a little magic
              </p>
            </div>
          </div>
        </main>
      );
        }


    if (error) {
      return (
        <main className="gallery-page">
          <p role="alert"> Error: {error}</p>
        </main>
      );
    }
  return (
    <main className="gallery-page">
      <header className="mb-12 px-6 pt-12 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#7d8c4b]">
        LITTLE THINGS, LASTING MEMORIES
      </p>
     <div className="mb-4 flex items-center justify-center gap-4">
      <img
        src={left}
        alt=""
        aria-hidden="true"
        className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
      />

      <h1 className="mb-4 font-serif text-8xl font-normal text-[#41432b] md:text-7xl">
        Moments in Bloom
      </h1>

       <img
        src={right}
        alt=""
        aria-hidden="true"
        className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
      />
      </div>

     
      <div className="mx-auto max-w-md">
        <input
          type="search"
          placeholder="Search memories by author..."
          aria-label="Search memories by author"
          className="w-full rounded-full border border-[#dce5ce] bg-[#fffdf7] px-5 py-3 text-sm text-[#41432b] outline-none transition-all duration-300 placeholder:text-[#a0a18b] focus:border-[#7d9460] focus:shadow-[0_0_16px_rgba(125,148,96,0.25)]"
        />
      </div>
    </header>
      <section className="invitation-grid">
              {photos.map((photo) => (
          <InvitationCard
            key={photo.id}
            author={photo.author}
            photoId={photo.id}
            isFavourite={favourites.includes(photo.id)}
            onToggle={() => {
              dispatch({
                type: 'TOGGLE_FAV',
                id: photo.id,
              })
            }}
          />
        ))}
      </section>
    </main>
  )
}
