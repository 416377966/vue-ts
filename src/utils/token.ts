import { parseUrlObj } from '@/utils/urlHelper'

let searchObj: ObjTypes<any> = {},
search = sessionStorage.tokenParams || location.search || location.hash;
// 首次加载取不到值
if (search.indexOf('msdkEncodeParam=') > -1) {
	searchObj = parseUrlObj(search) || {};
	searchObj.tokenStr = search;
}
searchObj = Object.assign({
	// openId
	game: 'smoba',
	openid: '',
	// 登录来源
	acctype: ['1', '2'].indexOf(searchObj.area as string) > -1 ? '2' : '1', //1 微信 ,2 手Q
	// 登录状态
	partition: '',
	agent: !navigator.userAgent.match(/iPad|iPhone|iPod/) ? 'android' : 'ios',
	platid: navigator.userAgent.match(/iPhone|iPad|iPod/g) ? '0' : '1',
	msdkEncodeParam: '',
	// APPID
	appid: '',
	version: '',
	tokenStr: '', // app的token
	pageid: window.location.hostname + window.location.pathname,
	ADTAG: ''
}, searchObj);

export const tokenParams = searchObj;
export const token = search;
