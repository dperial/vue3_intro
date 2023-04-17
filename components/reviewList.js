app.component('review-list', {
    template:

    /*html*/
    `
    <div class="review-container">
        <h3> Review: </h3>
        <ul>
            <li v-for="(review, index) in reviews" :kex='index'> {{ review.name }} gave this {{ review.rating }}
            <br/>
            "{{review.review}}"
            </li>
            <br/>
            recommend: {{review.recommend}}
        </ul>
    </div>
    ` 
})