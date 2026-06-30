import {useState, useEffect, useRef} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FaMicrophone, FaMicrophoneSlash} from 'react-icons/fa'
import Cookies from 'js-cookie'

import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    categoryOptions,
    changeRating,
    activeRatingId,
    changeCategory,
    activeCategoryId,
    searchInput,
    changeSearchInput,
    enterSearchInput,
    maxPrice,
    changeMaxPrice,
    clearFilters,
  } = props

  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchInput) {
        setSuggestions([])
        return
      }
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/products?title_search=${searchInput}`
      const options = {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      }
      try {
        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const data = await response.json()
          setSuggestions(data.products.slice(0, 5)) // top 5
        }
      } catch (e) {
        console.error(e)
      }
    }
    const timeoutId = setTimeout(() => {
      fetchSuggestions()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchInput])

  const renderRatingsFiltersList = () =>
    ratingsList.map(rating => {
      const onClickRatingItem = () => changeRating(rating.ratingId)

      const ratingClassName =
        activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`

      return (
        <li
          className="rating-item"
          key={rating.ratingId}
          onClick={onClickRatingItem}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-image"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      )
    })

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderCategoriesList = () =>
    categoryOptions.map(category => {
      const onClickCategoryItem = () => changeCategory(category.categoryId)
      const isActive = category.categoryId === activeCategoryId
      const categoryClassName = isActive
        ? `category-name active-category-name`
        : `category-name`

      return (
        <li
          className="category-item"
          key={category.categoryId}
          onClick={onClickCategoryItem}
        >
          <p className={categoryClassName}>{category.name}</p>
        </li>
      )
    })

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  const toggleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      // eslint-disable-next-line no-alert
      alert('Your browser does not support Voice Search.')
      return
    }

    if (isListening) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => setIsListening(true)

    recognition.onresult = event => {
      const {transcript} = event.results[0][0]
      changeSearchInput(transcript)
      setTimeout(() => enterSearchInput(), 500)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognition.start()
  }

  const renderSearchInput = () => (
    <div className="search-input-wrapper" ref={wrapperRef}>
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="search-actions">
          <button
            type="button"
            className={`voice-search-btn ${isListening ? 'listening' : ''}`}
            onClick={toggleVoiceSearch}
            title="Voice Search"
          >
            {isListening ? (
              <FaMicrophoneSlash color="#ef4444" size={16} />
            ) : (
              <FaMicrophone color="#52606D" size={16} />
            )}
          </button>
          <BsSearch 
            className="search-icon" 
            onClick={enterSearchInput}
            style={{cursor: 'pointer'}}
          />
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && searchInput && (
        <div className="search-suggestions-dropdown">
          {suggestions.map(item => (
            <div
              key={item.id}
              className="suggestion-item"
              onClick={() => {
                changeSearchInput(item.title)
                setShowSuggestions(false)
                setTimeout(() => enterSearchInput(), 0)
              }}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  changeSearchInput(item.title)
                  setShowSuggestions(false)
                  setTimeout(() => enterSearchInput(), 0)
                }
              }}
            >
              <BsSearch className="suggestion-icon" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderPriceRange = () => (
    <div className="price-filter-container">
      <h1 className="rating-heading">Max Price</h1>
      <input
        type="range"
        min="0"
        max="100000"
        step="100"
        value={maxPrice}
        onChange={e => changeMaxPrice(e.target.value)}
        className="price-slider"
        aria-label="Max Price"
      />
      <p className="price-value">Rs {maxPrice}/-</p>
    </div>
  )

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderPriceRange()}
      {renderRatingsFilters()}
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
