import { init, h, styleModule, eventListenersModule  } from '../build'

// 注册模块
const patch = init([
  styleModule,
  eventListenersModule
])
// 
let vnode = h('div#container.container', [
  h('h1', {style: {backgroundColor: 'red'}}, 'Hello world'),
  h('svg', {on: { click: eventHandler }}, 'Hello P')
])

setTimeout(() => {
  let newVNode = h('div#container.container', [
    h('p', { style: {backgroundColor: 'blue'}}, 'Hello world')
  ])

  vnode = patch(vnode, newVNode);
}, 2000)

function eventHandler() {
  alert('别摸我');
}

const app = document.querySelector('#app');
patch(app, vnode);