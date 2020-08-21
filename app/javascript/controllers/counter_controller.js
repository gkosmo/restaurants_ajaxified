import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "counter" ]

  connect() {
    console.log(this.counterTarget)
  }

  refresh(e) {
    fetch('/restaurants', { headers:
      { accept: "application/json" }
    })
      .then(response => response.json())
      .then((data) => {
        this.counterTarget.innerHTML = data.restaurants.length
      });

  }
}
