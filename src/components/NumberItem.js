import React, { useRef, useEffect, useState } from 'react'
import CountUp from 'react-countup';
import 'intersection-observer';
import ReactMarkdown from 'react-markdown'

const NumberItem = props => {
  const [show, setShow] = useState(false)
  const [number, setNumber] = useState(0)
  const popupEl = useRef(null)

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: [1]
  }

  const observe = (ob, el) => {
    ob.observe(el.current)
  }

  const observeCallback = (entry, observer) => {
    let threshold = observer.thresholds[0]

    if (entry[0].intersectionRatio >= threshold) {
      setShow(true)
      setNumber(parseFloat(props.number))
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(observeCallback, options)
    observe(observer, popupEl)
  }, [])

  const isMinStyles = props.isMin ? 'number-item--value-min' : ''

  return (
    <div ref={popupEl} className={`number-item ${props.className}`}>
      <div className={`number-item--value ${isMinStyles}`}>
        { props.prefix && <h1>{props.prefix}</h1> }
        { props.number && <h1 className="display">
          <CountUp
            start={0}
            end={number}
            separator=","
            delay={500}
            {...props.countUpProps}
          >
            {({ countUpRef }) => (
              <span ref={countUpRef} />
            )}
          </CountUp>
        </h1> }
        { props.suffix && <h1>{props.suffix}</h1> }
      </div>
      { props.caption && <ReactMarkdown className="number-item--caption">{props.caption}</ReactMarkdown>}
      { props.description && <ReactMarkdown className="number-item--description">{props.description}</ReactMarkdown>}

    </div>
  )
}

export default NumberItem
