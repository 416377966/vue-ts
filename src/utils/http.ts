/* eslint prefer-promise-reject-errors: off */
import Jsonp from './jsonp.js';
import axios from 'axios';
import { toUrl } from './urlHelper';
let scriptCache: string [],
  timeout = 1500;

interface JsonpConfig {
  prefix: string;
  param?: string;
  timeout?: number;
}
export interface JsonpParamsTypes {
  url: string;
  params?: any;
  config?: JsonpConfig;
}
interface JsonpResponse {
  datas: ObjTypes<string | number | boolean>;
  des: string;
  isSuc: boolean;
  resMsg: {
    code: number;
    message: string;
    method: string;
  };
}

// eslint-disable-next-line
export const jsonp = (obj: JsonpParamsTypes = { url: '', config: { prefix: 'jsonp' }, params: {} }): Promise<any> => {
  return new Promise((resolve, reject): void => {
    let url: string = obj.url;
    if (obj.url && ['http', '//'].every((c): boolean => obj.url.indexOf(c) !== 0)) {
      url = obj.url;
    }
    url += (~obj.url.indexOf('?') ? '&' : '?') + toUrl(obj.params || {});
    if (!obj.config) {
      obj.config = {
        prefix: 'jsonp'
      };
    }
    obj.config.timeout = timeout;
    Jsonp(url, obj.config, (_: number, res: JsonpResponse): void => {
      if (!res) {
        reject(res);
        return;
      }
      if (res.isSuc === true || res.resMsg.code === 1000) {
        // eslint-disable-next-line
        resolve(res.datas);
        return;
      }
      if (res.resMsg.code > -1) {
        console.error(res.resMsg.message);
      }
      reject(res);
    });
  });
};

export const ajax = axios;
/* 加载js文件
  opts.url: js路径
  opts.params 路径携带参数
  opts.loadRemove 自动移除创建的script
*/
interface ScriptOptsTypes {
  url: string;
  params?: ObjTypes<any>;
  attr?: ObjTypes<any>;
  loadRemove?: boolean;
  isCache?: boolean;
}
export const script = (opts: ScriptOptsTypes = { url: '' }): Promise<any> => {
  let options: ScriptOptsTypes = {
	  url: '',
    params: {},
    attr: {},
    loadRemove: true
  };
  options = Object.assign(options, opts);
  // 请求参数
  let queryStr = '',
    script = document.createElement('script') as HTMLScriptElementExtend;
  script.async = true;
  Object.assign(script, options.attr);
  let queryObj = options.params as ObjTypes<number | string | boolean>;
  for (let query in queryObj) {
	  queryStr += `${query}=${queryObj[query]}&`;
  }
  let url: string = options.url as string;
  if (queryStr) {
    queryStr = queryStr.slice(0, -1);
	  if (url.lastIndexOf('&') === url.length - 1) {
      url += queryStr;
	  } else {
      url += '&' + queryStr;
	  }
  }
  // pricescale: Math.pow(10, _this.curMarket.priceDecimal || 1),
  script.src = url;
  if (options.isCache === true) {
    if (scriptCache.indexOf(script.src) > -1) {
      return Promise.resolve();
    }
    scriptCache.push(script.src);
  }
  return new Promise((resolve, reject): void => {
    let headEl = document.getElementsByTagName('head')[0];
    // eslint-disable-next-line
    script.onload = script.onreadystatechange = function (this: any, event: any): void {
      if ([undefined, 'loaded', 'complete'].indexOf(this.readyState) > -1) {
        if (options.loadRemove) {
          script.onload = null;
          headEl.removeChild(script);
        }
        script.onreadystatechange = null;
        resolve();
        return;
      }
      reject(new Error(event));
    };
    script.onerror = reject;
    headEl.appendChild(script);
  });
};

// 判断http/https
export const isHttps = location.protocol.toLowerCase().indexOf('https') > -1;
