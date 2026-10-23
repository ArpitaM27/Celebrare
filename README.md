# 🌿 Moments in Bloom

A vintage-inspired photo gallery that transforms everyday moments into keepsakes.

## ✨ Features

- Dynamic Photo Gallery – Fetches 30 photos from the Picsum Photos API.
- Author Search – Find photos by author name in real time.
- Favourites – Add or remove photos from favourites with a heart toggle.
- Persistent Storage – Saves favourites across refreshes using `localStorage`.
- Responsive Design – Adaptable layouts for desktop, tablet, and mobile.
- Interactive UI – Subtle hover effects, botanical accents, and an invitation-inspired design.
- Loading & Error States – Handles API loading and request failures.

## 🛠️ Tech Stack

- React + Vite
- JavaScript
- Tailwind CSS
- Custom CSS
- Picsum Photos API

## ⚛️ React Concepts

- Custom Hooks – Reusable photo-fetching logic with useFetchPhotos.
- useReducer – Manages favourite state through actions.
- useState – Tracks the search query.
- useEffect – Handles API fetching and local storage persistence.
- useCallback – Memoises the search handler.
- useMemo – Memoises filtered photo results.

## 🔌 API

Photos are fetched from the [Picsum Photos API](https://picsum.photos/v2/list?limit=30).



Built with React, inspired by meaningful moments. 🌱
