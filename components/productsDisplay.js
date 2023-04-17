app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <!-- image goes here -->
            <img 
              v-bind:src="image" 
              alt="Stocks image"
              :class="{ 'out-of-stock-img': !inStock }">
            
          </div>
          
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p> {{sale}}</p>
            <p v-if="inStock"> In stock</p>
            <!-- <p v-else-if="inventory <= 10 && inventory > 0"> Almost sold Out</p> -->
            <p v-else> Out of Stock</p>
            <p> Shipping: {{ shipping }}</p>

            <product-details :details="details"></product-details>
            

            <ul>
              <li v-for="(size, index) in sizes" :key="index">{{ size }}</li> <!-- Another way to bind the key into the v-for -->
            </ul>
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class="color-circle"
              :class="{active: activeClass}"
              :style="{backgroundColor: variant.color}">
              
            </div>

            <button 
              class="button" 
              v-on:click="addToCart"
              :class="{disabledButton: !inStock}"
              :disabled="!inStock">
              Add to Cart
            </button>

            <button 
                class="button" 
                :class="{ disabledButton: !inStock }" 
                :disabled="!inStock" 
                @click="removeFromCart">
                Remove Item
            </button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
        
      </div>`,

    data() {
        return {
            product : 'Stocks',
            desc: 'This is the most amzing socks for developer',
            /* image: './assets/images/socks_blue.jpg', */
            selectedVariant: 0,
            /* url: 'https://vuejs.org/', */
            /* inStock: true, */
            inventory: 0,
            onSale: true,
            details: ['50% Cotton', '30% Wool', '20% polyester'],
            variants: [
                {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
                {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0},
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            activeClass: true,
            brand: 'Vue Mastery',
            reviews: []
        }
        
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        addReview(review) {
            this.reviews.push(review)
        }

    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            return this.brand + ' ' + this.product + ' ' + 'is on sale!'
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            } else {
                return 2.99 + ' ' + '€'
            }
        }
    }
})