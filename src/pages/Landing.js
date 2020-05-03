import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../style/landing.css';

export default class Landing extends Component {

  componentDidMount() {
    const items = document.querySelectorAll('.slider-item');
    const itemCount = items.length;
    const nextItem = document.querySelector('.next');
    const previousItem = document.querySelector('.previous');
    const navItem = document.querySelector('a.toggle-nav');
    let count = 0;

    function showNextItem() {
      items[count].classList.remove('active');

      if (count < itemCount - 1) {
        count++;
      } else {
        count = 0;
      }

      items[count].classList.add('active');
      console.log(count);
    }

    function showPreviousItem() {
      items[count].classList.remove('active');

      if (count > 0) {
        count--;
      } else {
        count = itemCount - 1;
      }

      items[count].classList.add('active');
      // Check if working...
      console.log(count);
    }

    function toggleNavigation() {
      this.nextElementSibling.classList.toggle('active');
    }

    function keyPress(e) {
      e = e || window.event;

      if (e.keyCode == '37') {
        showPreviousItem();
      } else if (e.keyCode == '39') {
        showNextItem();
      }
    }

    nextItem.addEventListener('click', showNextItem);
    previousItem.addEventListener('click', showPreviousItem);
    document.addEventListener('keydown', keyPress);
    navItem.addEventListener('click', toggleNavigation);
  }


  render() {
    return (
      <div>
        <nav class="flex-nav">
          <div class="container">
            <div class="grid">
              <div class="column-xs-9 column-md-8">
                <p id="logo">Healthdex<span id="highlight">.</span></p>
              </div>
              <div class="column-xs-3 column-md-4">
                <a href="#" class="toggle-nav">Menu <i class="ion-navicon-round"></i></a>
                <ul>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Source Code</a></li>
                  <li><b><Link class="yolo" id="startLink" to="/dashboard">Get Started</Link></b></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <main class="intro-section">
          <div class="container">
            <div class="grid">
              <div class="column-xs-12">
                <ul class="slider">
                  <li class="slider-item active">
                    <div class="grid vertical">
                      <div class="column-xs-12 column-md-2 hide-mobile">
                        <div class="intro">
                          <a href="#">
                            <h1 class="title"><span class="underline">Patient records, made digital.</span></h1>
                          </a>
                        </div>
                      </div>
                      <div class="column-xs-12 column-md-10">
                        <div class="image-holder">
                          <img src="https://images.unsplash.com/photo-1554734867-bf3c00a49371?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                        </div>
                        <div class="grid">
                          <div class="column-xs-12 column-md-9">
                            <div class="intro show-mobile">
                              <a href="#">
                                <h1 class="title"><span class="underline">Patient records, made digital.</span></h1>
                              </a>
                            </div>
                            <p class="description">Healthdex frees medical professionals from paper records, letting them access documentation from any device anywhere on the planet.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="slider-item">
                    <div class="grid vertical">
                      <div class="column-xs-12 column-md-2 hide-mobile">
                        <div class="intro">
                          <a href="#">
                            <h1 class="title"><span class="underline">Explore Kyoto</span></h1>
                          </a>
                        </div>
                      </div>
                      <div class="column-xs-12 column-md-10">
                        <div class="image-holder">
                          <img src="https://source.unsplash.com/Pz3EHf-KJfc" />
                        </div>
                        <div class="grid">
                          <div class="column-xs-12 column-md-9">
                            <div class="intro show-mobile">
                              <a href="#">
                                <h1 class="title"><span class="underline">Explore Kyoto</span></h1>
                              </a>
                            </div>
                            <p class="description">Kyoto is famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="slider-item">
                    <div class="grid vertical">
                      <div class="column-xs-12 column-md-2 hide-mobile">
                        <div class="intro">
                          <a href="#">
                            <h1 class="title"><span class="underline">Explore Osaka</span></h1>
                          </a>
                        </div>
                      </div>
                      <div class="column-xs-12 column-md-10">
                        <div class="image-holder">
                          <img src="https://source.unsplash.com/peYW3VwICpE" />
                        </div>
                        <div class="grid">
                          <div class="column-xs-12 column-md-9">
                            <div class="intro show-mobile">
                              <a href="#">
                                <h1 class="title"><span class="underline">Explore Osaka</span></h1>
                              </a>
                            </div>
                            <p class="description">Osaka is a large port city and commercial center known for its modern architecture, nightlife and hearty street food.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="slider-item">
                    <div class="grid vertical">
                      <div class="column-xs-12 column-md-2 hide-mobile">
                        <div class="intro">
                          <a href="#">
                            <h1 class="title"><span class="underline">Explore Hokkaido</span></h1>
                          </a>
                        </div>
                      </div>
                      <div class="column-xs-12 column-md-10">
                        <div class="image-holder">
                          <img src="https://source.unsplash.com/VmeOZQjTVGE" />
                        </div>
                        <div class="grid">
                          <div class="column-xs-12 column-md-9">
                            <div class="intro show-mobile">
                              <a href="#">
                                <h1 class="title"><span class="underline">Explore Hokkaido</span></h1>
                              </a>
                            </div>
                            <p class="description">Hokkaido, the northernmost of Japan’s main islands, is known for its volcanoes, natural hot springs ("onsen") and ski areas.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="grid">
                  <div class="column-xs-12">
                    <div class="controls">
                      <button class="previous">
                        <i class="ion-ios-arrow-thin-left"></i>
                      </button>
                      <button class="next">
                        <i class="ion-ios-arrow-thin-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}