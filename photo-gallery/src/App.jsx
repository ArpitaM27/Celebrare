
import './App.css'
import weddingEnvelope from './assets/wedding-envelope.png'

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

function InvitationCard({ author }) {
  return (
    <div className="card-scene">
      <Envelope />

      <article className="invitation-card">
        <div className="invitation-inner">
          <p className="invitation-label">A MOMENT TO REMEMBER</p>

          <div className="invitation-photo">
            {/* Photo will go here */}
          </div>

          <h2 className="invitation-name">{author}</h2>

          <p className="invitation-caption">
            A little piece of forever
          </p>

          <button
            className="invitation-favourite"
            type="button"
            aria-label={`Favourite ${author}`}
          >
            ♡
          </button>
        </div>
      </article>
    </div>
  )
}
const cards = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  author: `Memory ${index + 1}`,
}))
export default function App() {
  return (
    <main className="gallery-page">
      <section className="invitation-grid">
        {cards.map((card) => (
          <InvitationCard key={card.id} author={card.author} />
        ))}
      </section>
    </main>
  )
}
