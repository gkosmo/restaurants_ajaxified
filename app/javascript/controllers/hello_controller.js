// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
import { csrfToken } from "@rails/ujs";
export default class extends Controller {
  static targets = [ "output", "name", "address", "list"]

  connect() {
    console.log("hey hey")
    setTimeout(() => {this.outputTarget.textContent = 'Hello, Stimulus!'}, 2000)
  }

  createRestaurant(){
    let name = this.nameTarget.value
    let address = this.addressTarget.value
    var token = document.querySelector('meta[name="csrf-token"]').content
    let body = JSON.stringify({ restaurant: { name: name, address: address }})
    console.log(body)
    fetch('/restaurants.json', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': token
      },
      body: body
    })
    .then(response => response.json())
    .then((data) => {
        this.listTarget.insertAdjacentHTML('beforeend', data.restaurant_html)
    });

  }
}
