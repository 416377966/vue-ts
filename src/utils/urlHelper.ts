// 将url中的query部分转成对象形式
export const parseUrlObj = (url:string) => {
	if (!url) {
		console.warn(new Error('url is empty. parse error.'));
		return {};
	}
	url = decodeURIComponent(url)
	let index = url.indexOf('?');
	if (index > -1) {
		url = url.slice(index + 1);
	}
	let obj:ObjTypes<string> = {}, reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
	while (reg.exec(url)) {
		obj[RegExp.$1] = RegExp.$2;
	}
	return obj;
};
// 获取url中指定key对应的值
export const parseUrlValue = (url: string, key: string) => parseUrlObj(url)[key] || '';

// 对象转url &连接格式
export const toUrl = (obj: ObjTypes<number | string | boolean>): string => {
	let str = '';
	Object.keys(obj).map((item): void => {
	  str += `${item}=${obj[item]}&`;
	});
	return str.slice(0, -1);
};

export const getParamVal = (url: string, name: string) => {
	url = url || location.search;
	url = url.replace(/\'|\"|\<|\>/, '');
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	let r = url.substr(url.indexOf('?') + 1).match(reg);
	if (r != null) {
	  return r[2];
	}
	return null;
};

export const htmlCharDecode = (html: string) => {
	html = html.replace(/&amp;/gi, '&');
	html = html.replace(/&quot;/gi, '"');
	html = html.replace(/&#039;/gi, "'");
	html = html.replace(
		/&lt;([\/]?(a|p|img|span|strong|br|h\d|div|table|tbody|thead|tfoot|tr|th|td|dd|dt|dl|ul|li|ol|b|em|u|title|small|pre|i|section))/gi,
		'<$1'
	);
	html = html.replace(/&gt;/gi, '>');
	html = html.replace(/<img [^>]*src=['"]?([^'" ]+)[^>]*>/gi, function(
		match,
		src
	) {
		return '<img src=' + src + '>';
	});
	return html;
}
