# Table of Contents
- [Table of Contents](#table-of-contents)
- [Vuex로 해결할 수 있는 문제](#vuex로-해결할-수-있는-문제)
- [Vuex 컨셉](#vuex-컨셉)
  - [State](#state)
  - [View](#view)
  - [Action](#action)
- [Vuex 구조](#vuex-구조)
- [Vuex 기술 요소](#vuex-기술-요소)
  - [state](#state-1)
  - [getters](#getters)
  - [mutations](#mutations)
    - [왜 state를 직접 변경하지 않고 mutations로 변경하는가?](#왜-state를-직접-변경하지-않고-mutations로-변경하는가)
  - [actions](#actions)
    - [actions 비동기 예제 #1](#actions-비동기-예제-1)
    - [actions 비동기 예제 #2](#actions-비동기-예제-2)
    - [왜 비동기 처리 로직은 actions에 선언해야 할까?](#왜-비동기-처리-로직은-actions에-선언해야-할까)
- [Helper](#helper)
  - [mapState](#mapstate)
  - [mapGetters](#mapgetters)
  - [mapMutations](#mapmutations)
  - [mapActions](#mapactions)
  - [helper의 유연한 문법](#helper의-유연한-문법)
    - [Vuex에 선언한 속성 그대로 컴포넌트에 연결](#vuex에-선언한-속성-그대로-컴포넌트에-연결)
    - [Vuex에 선언한 속성을 특정 메서드에 연결](#vuex에-선언한-속성을-특정-메서드에-연결)

Vuex는 Vue.js 애플리케이션에 대한 **상태 관리 패턴 + 라이브러리이다.**

애플리케이션의 모든 컴포넌트에 대한 중앙 집중식 저장소 역할을 하며 예측 가능한 방식으로 상태를 변경할 수 있다.

# Vuex로 해결할 수 있는 문제

1. MVC 패턴에서 발생하는 구조적 오류
2. 컴포넌트 간 데이터 전달 명시
3. 여러 개의 컴포넌트에서 같은 데이터를 업데이트 할 때 동기화 문제

# Vuex 컨셉

## State

컴포넌트 간에 공유하는 데이터 `data()`

## View

데이터를 표시하는 화면 `template`

## Action

사용자의 입력에 따라 데이터를 변경하는 `methods`

# Vuex 구조

- 컴포넌트 → 비동기 로직 → 동기 로직 → 상태
- Mutations: 동기
- Actions: 비동기
- State는 Mutations에서만 변경한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1a8df6c5-6993-4293-9803-83b1017df31a/Untitled.png)

# Vuex 기술 요소

## state

여러 컴포넌트 간에 공유되는 데이터 `data`

```jsx
// Vue
data: {
	message: 'Hello Vue.js!',
}

// Vuex
state: {
	message: 'Hello Vue.js!',
}
```

```html
<!-- Vue -->
<p>{{ message }}</p>

<!-- Vuex -->
<p>{{ this.$store.state.message }}</p>
```

## getters

state 값을 접근하는 속성이자 `computed()` 처럼 미리 연산된 값을 접근하는 속성

```jsx
state: {
	num: 10
},
getters: {
  getNumber(state) {
    return state.num;
  },
  getDoubleNumber(state) {
    return state.num * 2;
  }
}
```

```html

<p>{{ this.$store.getters.getNumber }}</p>
<p>{{ this.$store.getters.getDoubleNumber }}</p>
```

## mutations

state 값을 변경하는 유일한 방법이자 메서드이며, `commit()` 으로 동작시킨다.

```jsx
// store.js
mutations: {
  printNumber(state) {
    return state.num;
  },
  sumNumbers(state, anotherNumber) {
    return state.num + anotherNumber;
  }
}

// App.vue
this.$store.commit('printNumber');
this.$store.commit('sumNumbers', 20);
```

 `payload` 등의 객체를 사용하여 복수 개의 값을 전달할 수 있다.

```jsx
// store.js
state: {
	storeNum: 10,
},
mutations: {
	modifyState(state, payload) {
		return state.storeNum += payload.num;
	}
}

// App.vue
this.$store.commit('modifyState', {
	str: 'passed from payload',
	num: 20,
});
```

### 왜 state를 직접 변경하지 않고 mutations로 변경하는가?

- 여러 개의 컴포넌트에서 아래와 같이 state 값을 변경하는 경우 **어느 컴포넌트에서 해당 state를 변경했는지 추적이 어렵다**.

```jsx
methods: {
	increaseCounter() { this.$store.state.counter++; }
}
```

- 특정 시점에 어떤 컴포넌트가 state를 접근하여 변경한 건지 확인하기 어렵기 때문이다.

## actions

비동기 처리 로직을 선언하는 메서드 혹은 비동기 로직을 담당하는 mutations이다.

**데이터 요청, Promsie, ES6 async와 같은 비동기 처리는 모두 actions에 선언한다.**

```jsx
// store.js
state: {
	num: 10
},
mutations: {
	doubleNumber(state) {
		state.num * 2;
	}
},
actions: {
	delayDoubleNumber(context) { // context로 store의 메서드와 속성 접근
		context.commit('doubleNumber');
	}
}

// App.vue
this.$store.dispatch('delayDoubleNumber');
```

### actions 비동기 예제 #1

```jsx
// store.js
state: {
	counter: 0
},
mutations: {
	addCounter(state) {
		state.counter++;
	}
},
actions: {
	delayAddCounter(context) {
    setTimeout(() => context.commit('addCounter'));
  }
}

// App.vue
methods: {
  increaseCounter() {
    this.$store.dispatch('delayAddCounter');
  }
}
```

### actions 비동기 예제 #2

```jsx
// store.js
mutations: {
	setData(state, fetchedData) {
		state.product = fetchedData;
	}
},
actions: {
	fetchProductData(context) {
    return axios
						.get('https://domain.com/products/1')
						.then(res => context.commit('setData', res));
  }
}

// App.vue
methods: {
  getProduct() {
    this.$store.dispatch('fetchProductData');
  }
}
```

### 왜 비동기 처리 로직은 actions에 선언해야 할까?

언제 어느 컴포넌트에서 해당 state를 호출하고 변경했는지 확인하기가 어렵기 때문이다.

특히, 여러 개의 컴포넌트에서 mutations로 시간 차를 두고 state를 변경하는 경우에는 변화를 추적하기가 더 어려워진다. 따라서 동기 로직은 mutations에 위치시키고 비동기 로직은 actions에 위치시킨다.

# Helper

Store의 4가지 속성들을 간편하게 사용할 수 있도록 도와주는 함수이다.

- state → `mapState`
- getters → `mapGetters`
- mutations → `mapMutations`
- actions → `mapActions`

## mapState

Vuex에 선언한 `state` 속성을 뷰 컴포넌트에 쉽게 연결해주는 helper

```jsx
// App.vue
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['num']),
	}
}

// store.js
state: {
	num: 10
}
```

```html
<!-- <p>{{ this.$store.state.num }}</p>-->
<p>{{ this.num }}</p>
```

## mapGetters

Vuex에 선언한 `getters` 속성을 뷰 컴포넌트에 쉽게 연결해주는 helper

```jsx
// App.vue
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['reverseMessage']),
	}
}

// store.js
gettters: {
	reverseMessage(state) {
		return state.msg.split('').reverse().join('');
	}
}
```

```html
<!-- <p>{{ this.$store.getters.reverseMessage }}</p>-->
<p>{{ this.reverseMessage }}</p>
```

## mapMutations

Vuex에 선언한 `mutations` 속성을 뷰 컴포넌트에 쉽게 연결해주는 helper

```jsx
// App.vue
import { mapMutations } from 'vuex';

export default {
	methods: {
		...mapMutations(['clickBtn']),
		authLogin() {},
		displayTable() {},
	}
}

// store.js
mutations: {
	clickBtn(state) {
		alert(state.message);
	}
}
```

```html
<button @click="clickBtn">popup message</p>
```

## mapActions

Vuex에 선언한 `actions` 속성을 뷰 컴포넌트에 쉽게 연결해주는 helper

```jsx
// App.vue
import { mapActions } from 'vuex';

export default {
	methods: {
		...mapActions(['delayClickBtn']),
		authLogin() {},
		displayTable() {},
	}
}

// store.js
actions: {
	delayClickBtn(context) {
		setTimeout(() => context.commit('clickBtn'), 2000);
	}
}
```

```html
<button @click="delayClickBtn">delay popup message</p>
```

## helper의 유연한 문법

### Vuex에 선언한 속성 그대로 컴포넌트에 연결

```jsx
...mapMutations([
	'clickBtn',
	'addNumber'
]);
```

### Vuex에 선언한 속성을 특정 메서드에 연결

```jsx
...mapMutations([
	'popupMessage': 'clickBtn',
 // 컴포넌트 메서드 명 : Store의 mutation명
]);
```