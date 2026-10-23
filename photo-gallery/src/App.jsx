import { useReducer,useEffect } from 'react'
import './App.css'
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
    <div className="envelope transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:translate-y-1">
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

      <article className="invitation-card transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_14px_32px_rgba(133,160,104,0.28)]">
        
        <div className="invitation-inner transition-colors duration-500 group-hover:bg-[#f3f6e9]">
          <p className="invitation-label">A MOMENT TO REMEMBER</p>

          <div className="invitation-photo">
            <img
    src={`https://picsum.photos/id/${photoId}/400/500`}
    alt={`Photo by ${author}`}
            />
          </div>

          <h2 className="invitation-name">{author}</h2>

          <p className="invitation-caption">
            A little piece of forever
          </p>

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
