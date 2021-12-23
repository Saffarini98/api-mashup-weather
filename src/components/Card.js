import React from 'react'


export default function Card({ title, url, description }) {
  return (
      <div className="card">
          <div className="card__body">
              <h2 className="card__title">{title}</h2>
              <p className="card__description">
                  Weather in {title} is <br /> {description}  °C
              </p>
              <button className="card__btn" onClick={() => {
                  window.open(url, "_blank");
              }}>More about {title}</button>
          </div>
      </div>
  );
}