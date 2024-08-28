import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './slider.css';



class CitiesSlider extends Component {
  constructor(props) {
    super(props);
    
    this.IMAGE_PARTS = 4;
    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;
    
    this.state = { 
      activeSlide: -1, 
      prevSlide: -1, 
      sliderReady: false 
    };
  }
  
  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ 
        activeSlide: 0, 
        sliderReady: true 
      });
    }, 0);
  }
  
  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }
  
  runAutochangeTO = () => {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }
  
  changeSlides = (change) => {
    window.clearTimeout(this.changeTO);
    const { length } = this.props.slides;
    const { activeSlide } = this.state;
    let newActiveSlide = activeSlide + change;
    if (newActiveSlide < 0) newActiveSlide = length - 1;
    if (newActiveSlide >= length) newActiveSlide = 0;
    
    this.setState({ 
      activeSlide: newActiveSlide, 
      prevSlide: activeSlide 
    });
  }
  
  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    const { slides } = this.props;
    
    return (
      <div className={classNames('slider', { 's--ready': sliderReady })}>
        <p className="slider__top-heading">파트라슈</p>
        <div className="slider__slides">
          {slides.map((slide, index) => (
            <div
              className={classNames('slider__slide', { 
                's--active': activeSlide === index, 
                's--prev': prevSlide === index  
              })}
              key={slide.city}
            >
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">
                  {slide.country || slide.city}
                </h3>
                <h2 className="slider__slide-heading">
                  {slide.city.split('').map((l, i) => (
                    <span key={i}>{l}</span>
                  ))}
                </h2>
                <p className="slider__slide-readmore">read more</p>
              </div>
              <div className="slider__slide-parts">
                {Array.from({ length: this.IMAGE_PARTS }).map((_, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div 
                      className="slider__slide-part-inner" 
                      style={{ backgroundImage: `url(${slide.img})` }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div 
          className="slider__control" 
          onClick={() => this.changeSlides(-1)} 
        />
        <div 
          className="slider__control slider__control--right" 
          onClick={() => this.changeSlides(1)} 
        />
      </div>
    );
  }
}
export default CitiesSlider;

