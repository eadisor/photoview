import React from 'react'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'
import { useSpring, animated } from 'react-spring'
import LazyLoad from 'react-lazyload'

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const PhotoContainer = styled.div`
  flex-grow: 1;
  height: 200px;
  margin: 4px;
  background-color: #eee;
  position: relative;
`

const Photo = photoProps => {
  const StyledPhoto = styled(animated.img)`
    height: 200px;
    min-width: 100%;
    position: relative;
    object-fit: cover;
  `

  const [props, set, stop] = useSpring(() => ({ opacity: 0 }))

  return (
    <LazyLoad>
      <StyledPhoto
        {...photoProps}
        style={props}
        onLoad={() => {
          set({ opacity: 1 })
        }}
      />
    </LazyLoad>
  )
}

const PhotoOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  ${props =>
    props.active &&
    `
      border: 4px solid rgba(65, 131, 196, 0.6);
    `}
`

const PhotoFiller = styled.div`
  height: 200px;
  flex-grow: 999999;
`

const PhotoGallery = ({
  activeIndex = -1,
  photos,
  loading,
  title,
  onSelectImage,
}) => {
  let photoElements = null
  if (photos) {
    photoElements = photos.map((photo, index) => {
      const active = activeIndex == index

      const minWidth = Math.floor(
        (photo.thumbnail.width / photo.thumbnail.height) * 200
      )

      return (
        <PhotoContainer
          key={photo.id}
          style={{
            cursor: onSelectImage ? 'pointer' : null,
            minWidth: `${minWidth}px`,
          }}
          onClick={() => {
            onSelectImage && onSelectImage(index)
          }}
        >
          <Photo src={photo.thumbnail.path} />
          <PhotoOverlay active={active} />
        </PhotoContainer>
      )
    })
  }

  return (
    <div>
      <h1>{title}</h1>
      <Gallery>
        <Loader active={loading}>Loading images</Loader>
        {photoElements}
        <PhotoFiller />
      </Gallery>
    </div>
  )
}

export default PhotoGallery