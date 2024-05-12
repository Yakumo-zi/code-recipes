import Yakumo from './yakumo'
/** @jsx Yakumo.createElement*/
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)

const container = document.querySelector('#app')
Yakumo.render(element, container)

