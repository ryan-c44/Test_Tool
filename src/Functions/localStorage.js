

let ls = {}
ls.get = (keyWord) => {
  return window.localStorage.getItem(keyWord);
}
ls.set = (keyWord, txt) => {
  window.localStorage.setItem(keyWord, txt);
  return ls.get()
}

export default ls