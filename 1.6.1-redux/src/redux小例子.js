import { createStore } from 'redux';

// 1.建立reducer,根据老的state和action,生成新的state
function counter(state = 0, action) {
  switch (action.type) {
    case '加机关枪':
      return state + 1;
    case '减机关枪':
      return state - 1;
    default:
      return 10
  }
}

// 2.新建store
const store = createStore(counter);
const init = store.getState();
console.log(init);

// 4.创建一个监听者
function listener() {
  const current = store.getState();
  console.log(current);
}

// 5.订阅监听者
store.subscribe(listener);

// 3.派发事件，传递action
store.dispatch( {type: '加机关枪'} )
/* console.log(store.getState()) */
store.dispatch( {type: '减机关枪'} )
/* console.log(store.getState()) */