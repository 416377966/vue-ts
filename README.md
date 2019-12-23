# vue-cli-ts

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```


### 背景
前端程序员很常见的心态是：我宁愿重新写一遍代码也不愿意看他的。Js代码的难以阅读多来自于这门语言特点：弱类型、没有命名空间、难以模块化。加上如果你的项目又重又需要多人维护，那简直是一言难尽。笔者手上的王者荣耀微社区便曾面临着这个问题，直到现在终于有时间着手将它迁移到TypeScript，微社区技术栈是Vue全家桶+webpack,开始决定做之前各种风评Vue2对TS支持不好。还是硬着头皮上了，过程略辛酸，结局还不错。

### 脚手架
在做完迁移后，坑几乎踩了个遍，好消息是，在大型项目中，vue和typescript完全可以很好的结合起来，为了其他项目更好的接入，也为了其他同学少踩一些坑（配置真的有点头疼），抽离出了脚手架，这套脚手架亲测可以接入大型项目，放心使用，为了验证这一点拿了组内同事的一套业务代码放在脚手架里，大概花了一天时间做兼容处理完成了迁移，git地址戳这里[vue-cli-ts](https://git.code.tencent.com/slugteam/vue-cli-ts/)。脚手架中集成了一些通用的工具类方法、给出了基于类的Vue组件用法，集成了VueRouter,Vuex的使用，为了在刚迁移时不要控制台error刷屏，eslint规则定的很宽松，如果你想更严谨，eslint.js中的屏蔽错误规则可以一步步放开。

使用Vue+ts带来的好处：
- 更严格的类型检查
```
// 这是一段vuex的模块配置，他要求所有的变量或参数均有类型说明，避免了开发过程中的很多错误
import { Module } from 'vuex';
import { RootState } from '@/@types/vuex';
interface IndexTypes {
  lang: string;
}
const Index: Module<IndexTypes, RootState> = {
  namespaced: true,
  state: {
    lang: 'typescript'
  },
  getters: {
    curLang (state): string {
      return state.lang;
    }
  },
  mutations: {
    updateLang (state, value: string): void {
      state.lang = value;
    }
  },
  actions: {
    updateLang({ commit }, value: string): void {
      commit('updateLang', value);
    }
  }
};
```
- 更统一的代码风格、更高的可读性和更低的维护成本
```
// 这是一个简单的单文件组件的写法
<template>
  <div class="home">
    <quesLike msg="***"/>
  </div>
</template>
<script lang="ts">
import '@/css/***.css';
import { Component, Vue } from 'vue-property-decorator'
import { getMainInfo, MainInfoItem } from '@/api/kolReq'
import quesLike from '@/components/kolqa/quesLike.vue'
import { State } from 'vuex-class'
@Component({
	components: {
		quesLike
	},
	filters: {
		formatDate(timestamp) {
			let time = new Date(timestamp * 1000);
			let m = time.getMonth() + 1;
			let d = time.getDate();
			return `${m}月${d}日`
		}

	}
})
export default class *** extends Vue {
	volList: MainInfoItem[] | null = null;
    @State('example', { namespace: 'index' }) example

	async created() {
		let data = await getMainInfo()
		this.volList = data
	}
}
</script>
```

### 技术栈
- typescript + vue全家桶 + webpack4
- 类装饰器 vuex-class + vue-property-decorator

Vue官方文档上已经开始有对[TypeScript的支持](https://cn.vuejs.org/v2/guide/typescript.html)，一直以来vue组件都是对象形式， 官方维护了一套基于类的 API [vue-class-component](https://github.com/vuejs/vue-class-component)，[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)进一步装饰了他，用了装饰器之后vue的代码好看的不要不要的,用装饰器之后打包的代码会变大，主要是在sourceMappingURL的一串base64编码，跟业务代码无关但具体是干嘛的还要研究一下，用对象导出的方式和用类导出的方式，一个是在对象本身上挂载方法，一个是在对象原型上挂载方法。Vue提供两种注册组件的方法：
```
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })
```
也就对应用对象导出的方式和用类导出两种方式。当然如果你想基于现有的项目迁移，没有问题，我也有一点零碎的经验分享给你：
### 迁移实录
1. 首先你要升级到webpack4
2. [这里有一篇实用的文章](https://segmentfault.com/a/1190000009630935)，我最初是这样照做的
3. 用webpack打包需要安装tsloader,并加上配置
npm i --save-dev ts-loader
```
{
	test: /\.tsx?$/,
	loader: 'ts-loader',
	exclude: /node_modules/,
	options: {
	  	appendTsSuffixTo: [/\.vue$/],
	}
}
```
4. 会有一段漫长的修错过程，babel的配置会很伤，我建议你直接参考脚手架中的配置。
5. km上有发过比较完整的[ts迁移文章](http://km.oa.com/group/26265/articles/show/370224),笔者在此不赘述

### 一点体会
为什么要迁移：Js设计的很仓促，它的简单是一把双刃剑，其实它并不算糟糕，相反它的编程能力很强大，前途很光明。如果遵守良好的编程规范，Js的缺陷大部分可以回避。这是加入TypeScript的原因，强制让开发者遵循基本的规则，刚开始会很不习惯，后来会觉得自己的代码越来越好阅读，TypeScript中所有的变量都需要声明，将每一个文件都作为一个模块，对变量的声明到使用控制的很严格。如果你懂面向对象，会觉得用ts很爽，如果你不懂，在一步一步写ts的过程中觉得面向对象的思想在前端中应用很爽。

