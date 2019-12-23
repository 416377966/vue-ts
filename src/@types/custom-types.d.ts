interface HTMLScriptElementExtend extends HTMLScriptElement {
    onreadystatechange: Function | null
  }
  
interface ObjTypes<T> {
    [key: string]: T;
    [key: number]: T;
  }


declare module 'axios' {
    import Axios from 'axios/index';
    export default Axios;
}
