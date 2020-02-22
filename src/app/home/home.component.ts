import { Component, OnInit, ViewEncapsulation, AfterViewInit, Output } from '@angular/core';
import Swiper from "swiper";
import { LoaderService } from "../share/loader/public-api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  MainSwiper: Swiper;
  FootSwiper: Swiper;
  RankSwiper: Swiper;
  realIndex: number;
  index: number;
  navSwitch: boolean = false;
  navShow: boolean = false;
  left: Array<string> = ['13%', '37%', '61%', '85%'];


  slides = '1234'.split('').map((x, i) => {
    const num = i;
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: `https://picsum.photos/600/400/?${num}`,
      title: `${num}`,
      id: `${num}`
    };
  });

  constructor(private loader: LoaderService) {  }

  ngOnInit(): void {
    this.loader.importLibs(['swiper']);
  }

  ngAfterViewInit() {
     this.MainSwiper = new Swiper('.swiper-container', {
         autoplay: {
             delay: 6000, 
             stopOnLastSlide: false,
             disableOnInteraction: true,
          },
          direction: 'horizontal',
          loop: true,
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
     });

    this.FootSwiper = new Swiper('.bottom-guiding-swiper', {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        direction: 'horizontal',
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
    });

    this.RankSwiper = new Swiper('.rank-container', {
        direction: 'horizontal',
        slidesPerView: "auto",
        loop: true,
        on: {
          slideChange: () => {
            this.index = Math.floor(this.RankSwiper.realIndex / 2)
          }
        }
    });
  }

  rank(select: number) {
    this.index = select;
    this.RankSwiper.slideTo(select*2)
  }

  navTriger() {
    if (this.navSwitch) {
      setTimeout(() => { this.navSwitch = false }, 200);
      this.navShow = false;
    } else {
      this.navSwitch = true;//solve display one issue must before css3 animation
      setTimeout(() => { this.navShow = true; }, 100);
    }    
  }
  
}
