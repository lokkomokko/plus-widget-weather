import PlusWidget from "./components/PlusWidget/PlusWidget.ce.vue";
import { defineCustomElement } from "vue";

const element = defineCustomElement(PlusWidget);

customElements.define("plus-widget", element);
