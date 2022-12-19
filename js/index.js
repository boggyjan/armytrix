const index = {
  el: '#index',

  data () {
    return {
      headerBgOpacity: 0,
      cartVisible: false,
      navVisible: false,
      currentTopBanner: null,
      topBannersVisible: [true, false, false, false, false],
      topBannersInterval: null,
      topBannersVisibleInterval: null
    }
  },

  methods: {
    toggleCart () {
      this.cartVisible = !this.cartVisible
    },
    showNav () {
      this.navVisible = true
    },
    hideNav () {
      this.navVisible = false
    },

    onScroll (evt) {
      const scrollY = evt.target.scrollingElement.scrollTop

      if (scrollY < 100) {
        this.headerBgOpacity = scrollY / 100
      } else {
        this.headerBgOpacity = 1
      }
    },

    onDocumentClick (evt) {
      // cart visible
      if (this.cartVisible && !this.$refs['cart-popup'].contains(evt.target)) {
        this.cartVisible = false
      }
    },

    showTopBanner (idx) {
      if (idx === this.currentTopBanner) return

      const lastCurrent = this.currentTopBanner
      this.currentTopBanner = idx
      this.topBannersVisible[idx] = true

      clearInterval(this.topBannersVisibleInterval)
      this.topBannersVisibleInterval = setTimeout(() => {
        this.topBannersVisible[lastCurrent] = false

        // setTimeout update array
        this.topBannersVisible.push(true)
        this.topBannersVisible.pop()
      }, 500)

      clearInterval(this.topBannersInterval)
      this.topBannersInterval = setTimeout(() => {
        let next = this.currentTopBanner + 1
        next = next >= this.topBannersVisible.length ? 0 : next
        this.showTopBanner(next)
      }, 12000)
    }
  },

  mounted () {
    document.addEventListener('scroll', this.onScroll, { passive: true })
    document.addEventListener('click', this.onDocumentClick)
    this.showTopBanner(0)

    new Rellax('.rellax', {
      speed: 2,
      center: true,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    })
  }
}
new Vue(index)